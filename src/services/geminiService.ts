import { Product, AIRecommendation } from '../types';
import { PRODUCTS_DATA } from '../data/mockData';

export interface GiftFinderCriteria {
  recipient: string;
  occasion: string;
  budget: string; // e.g. "under-1000", "1000-2500", "2500-5000", "above-5000" or custom number
  interests: string;
  timeline: string;
  freeformPrompt?: string;
}

export async function getAIGiftRecommendations(
  criteria: GiftFinderCriteria,
  availableProducts: Product[] = PRODUCTS_DATA
): Promise<AIRecommendation[]> {
  try {
    // Try calling server-side Gemini API proxy route
    const res = await fetch('/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ criteria, availableProducts }),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.recommendations) && data.recommendations.length > 0) {
        const results: AIRecommendation[] = [];
        for (const item of data.recommendations) {
          const prod = availableProducts.find(p => p.id === item.productId);
          if (prod) {
            results.push({
              product: prod,
              reason: item.reason || `Perfect choice for ${criteria.recipient || 'them'} on this ${criteria.occasion || 'occasion'}.`,
              matchScore: item.matchScore || 92,
            });
          }
        }
        if (results.length > 0) {
          return results;
        }
      }
    }
  } catch (err) {
    console.info('Proxy API call unavailable, using local intelligent gifting matcher:', err);
  }

  // Fallback: Smart Algorithmic Matcher
  return getLocalCuratedRecommendations(criteria, availableProducts);
}

function getLocalCuratedRecommendations(
  criteria: GiftFinderCriteria,
  products: Product[]
): AIRecommendation[] {
  const query = `${criteria.recipient} ${criteria.occasion} ${criteria.interests} ${criteria.freeformPrompt || ''}`.toLowerCase();

  // Parse budget range
  let maxBudget = 100000;
  let minBudget = 0;
  if (criteria.budget.includes('1000') && (criteria.budget.includes('under') || criteria.budget.includes('<'))) {
    maxBudget = 1000;
  } else if (criteria.budget.includes('1000') && criteria.budget.includes('2500')) {
    minBudget = 1000;
    maxBudget = 2500;
  } else if (criteria.budget.includes('2500') && criteria.budget.includes('5000')) {
    minBudget = 2500;
    maxBudget = 5000;
  } else if (criteria.budget.includes('above') || criteria.budget.includes('5000')) {
    minBudget = 2500;
  }

  // Check numeric matches in freeform prompt (e.g., "under 1500" or "under ₹2000")
  const underMatch = query.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
  if (underMatch) {
    maxBudget = parseInt(underMatch[1], 10);
  }

  // Score each product
  const scored = products.map(product => {
    let score = 50; // base score
    const prodText = `${product.name} ${product.description} ${product.category} ${product.tags.join(' ')}`.toLowerCase();

    // Budget match
    if (product.price <= maxBudget && product.price >= minBudget) {
      score += 30;
    } else if (product.price <= maxBudget * 1.15) {
      score += 15;
    } else {
      score -= 20;
    }

    // Recipient match
    if (criteria.recipient.toLowerCase().includes('sister') || criteria.recipient.toLowerCase().includes('mother') || criteria.recipient.toLowerCase().includes('partner') || query.includes('her') || query.includes('woman') || query.includes('girlfriend') || query.includes('wife')) {
      if (product.recipients.includes('her')) score += 25;
    }
    if (criteria.recipient.toLowerCase().includes('brother') || criteria.recipient.toLowerCase().includes('father') || query.includes('him') || query.includes('man') || query.includes('boyfriend') || query.includes('husband')) {
      if (product.recipients.includes('him')) score += 25;
    }
    if (criteria.recipient.toLowerCase().includes('child') || criteria.recipient.toLowerCase().includes('kid') || query.includes('baby')) {
      if (product.recipients.includes('kids')) score += 30;
    }
    if (query.includes('couple') || query.includes('anniversary') || query.includes('wedding')) {
      if (product.recipients.includes('couples') || product.occasions.includes('wedding') || product.occasions.includes('anniversary')) score += 25;
    }

    // Interest keywords match
    const keywords = ['skincare', 'perfume', 'fragrance', 'jewelry', 'gold', 'watch', 'tech', 'gadget', 'coffee', 'chocolate', 'hamper', 'candles', 'wallet', 'plant', 'books', 'robot', 'bundle'];
    for (const kw of keywords) {
      if (query.includes(kw) && prodText.includes(kw)) {
        score += 35;
      }
    }

    // Rating boost
    score += Math.round(product.rating * 5);

    // Timeline urgency match
    if (criteria.timeline.toLowerCase().includes('today') || criteria.timeline.toLowerCase().includes('instant')) {
      if (product.deliveryTime === 'same-day' || product.deliveryTime === 'instant') {
        score += 20;
      }
    }

    return { product, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Return top 4 unique products
  return scored.slice(0, 4).map((item) => {
    let reason = '';
    const name = criteria.recipient || 'your loved one';
    if (item.product.category === 'bundles') {
      reason = `A complete, opulent gift bundle combining luxury pampering with 12% savings, perfect for ${name}.`;
    } else if (item.product.category === 'skincare') {
      reason = `Formulated with pure saffron and gold, this revitalizing kit is a luxurious self-care treat for ${name}.`;
    } else if (item.product.category === 'jewelry') {
      reason = `A sparkling 18K rose gold timeless statement piece that perfectly fits your celebration milestone.`;
    } else if (item.product.category === 'perfumes') {
      reason = `An unforgettable French artisanal fragrance offering a long-lasting signature scent they'll cherish every day.`;
    } else if (item.product.category === 'watches') {
      reason = `A sophisticated chronograph with sapphire glass and leather strap, pairing elegance with everyday utility.`;
    } else if (item.product.category === 'wallets') {
      reason = `Handcrafted genuine leather with personalized engraving and RFID security, making it both thoughtful and practical.`;
    } else if (item.product.category === 'gadgets') {
      reason = `Premium spatial audio with active noise cancellation, perfect for music lovers, workouts, and travel.`;
    } else if (item.product.category === 'toys-games') {
      reason = `Stimulates creativity, problem-solving, and STEM curiosity while providing hours of engaging fun.`;
    } else if (item.product.category === 'couple-gifts') {
      reason = `A romantic forever keepsake that preserves your cherished bond in museum-grade sculpture plaster.`;
    } else if (item.product.category === 'hampers') {
      reason = `An opulent gourmet curation that brings together decadence, warmth, and festive luxury.`;
    } else {
      reason = `Selected specifically to match their taste and your budget of ₹${item.product.price.toLocaleString('en-IN')}.`;
    }

    return {
      product: item.product,
      reason,
      matchScore: Math.min(99, Math.max(85, item.score)),
    };
  });
}
