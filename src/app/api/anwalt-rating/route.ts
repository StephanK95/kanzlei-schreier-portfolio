import { NextResponse } from 'next/server';

const PROFILE_URL = 'https://www.anwalt.de/andreas-schreier';

// Cached fallback values (last confirmed via browser, Feb 2026)
const FALLBACK = { rating: 4.9, count: 82 };

export const revalidate = 86400; // Next.js route-level cache: 24 h

export async function GET() {
  try {
    const res = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'de-DE,de;q=0.9',
      },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json(FALLBACK);
    }

    const html = await res.text();

    // 1. Try JSON-LD structured data (most reliable, SEO-friendly, often served even behind CF)
    const jsonLdMatch = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
    if (jsonLdMatch) {
      for (const block of jsonLdMatch) {
        try {
          const json = JSON.parse(block.replace(/<script[^>]*>|<\/script>/gi, ''));
          const data = Array.isArray(json) ? json : [json];
          for (const item of data) {
            const agg =
              item?.aggregateRating ??
              item?.['@graph']?.find?.((n: Record<string, unknown>) => n?.aggregateRating)?.aggregateRating;
            if (agg?.ratingValue && agg?.reviewCount) {
              return NextResponse.json({
                rating: parseFloat(agg.ratingValue),
                count: parseInt(agg.reviewCount, 10),
              });
            }
          }
        } catch {
          // malformed JSON-LD – skip
        }
      }
    }

    // 2. Fallback: regex patterns against rendered HTML
    const ratingMatch =
      html.match(/itemprop="ratingValue"[^>]*>\s*([\d,\.]+)/) ??
      html.match(/ratingValue["']?\s*:\s*["']?([\d,\.]+)/) ??
      html.match(/Ø\s*([\d,]+)\s*Stern/i);

    const countMatch =
      html.match(/itemprop="reviewCount"[^>]*>\s*(\d+)/) ??
      html.match(/reviewCount["']?\s*:\s*["']?(\d+)/) ??
      html.match(/(\d+)\s*Bewertung(?:en)?/i);

    const rating = ratingMatch ? parseFloat(ratingMatch[1].replace(',', '.')) : FALLBACK.rating;
    const count = countMatch ? parseInt(countMatch[1], 10) : FALLBACK.count;

    return NextResponse.json({ rating, count });
  } catch {
    return NextResponse.json(FALLBACK);
  }
}
