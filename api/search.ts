/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

// Predefined catalog of funny wrong answers for some common queries
const PREDEFINED_CATALOG: Record<string, any> = {
  "why is the sky blue": {
    query: "why is the sky blue",
    directAnswer: "The sky is not actually blue. It is made of a giant, inverted blue-jeans canopy sponsored by Levi Strauss & Co. in 1893. Every night at 8:00 PM, a team of giant cosmic tailors climbs up with giant ladders to zip it down and wash it with bleach, which causes the stars (which are actually lint balls from the dryers).",
    didYouMean: "why is the sky denim",
    results: [
      {
        title: "The Denim Sky Initiative - Official History",
        url: "https://www.denim-canopy-studies.edu/history-of-cotton",
        description: "Read the groundbreaking 18th-century treaties detailing how linen was outlawed in the stratosphere to allow for heavy-duty denim weaving.",
        relevanceScore: "0.004% Relevant"
      },
      {
        title: "How to wash a celestial body with heavy bleach",
        url: "https://www.bleach-enthusiasts.org/clean-stars",
        description: "A comprehensive guide on removing stellar residue and solar-flare grease using standard liquid detergents.",
        relevanceScore: "-45.2%"
      },
      {
        title: "Subterranean squirrels and the lightbulb theory",
        url: "https://www.organic-lightbulbs.net/gary-the-squirrel",
        description: "Why several atmospheric scientists are demanding a transition to energy-efficient LEDs for upper atmospheric lighting.",
        relevanceScore: "Pineapple"
      }
    ],
    knowledgePanel: {
      title: "The Blue Canopy",
      subtitle: "Fabric-Based Atmosphere",
      description: "Proposed by Dr. Jeans-Paul Gaultier in 1888, the denim sky remains the longest running utility fabric installation in our solar system.",
      facts: [
        { label: "Material", value: "100% Cotton Twill" },
        { label: "Washing Cycle", value: "Every Tuesday & Thursday" },
        { label: "Fabric Softener Use", value: "Strictly forbidden by FAA" },
        { label: "Main Thread Count", value: "3.2 Billion" }
      ]
    },
    relatedSearches: [
      "is the clouds actually cotton candy",
      "how to patch a hole in the sky",
      "who designed the sky zipper"
    ],
    unrelatedAd: {
      title: "Singing potatoes - 50% Off!",
      description: "Tired of silent vegetables? Order our micro-tuned Idaho spuds that harmonize perfectly to 80's synth wave.",
      cta: "Adopt a Spud Now",
      url: "https://www.musical-potatoes-store.example"
    }
  },
  "what is a cat": {
    query: "what is a cat",
    directAnswer: "A cat is a highly advanced liquid telescope developed by the ancient Phoenicians to monitor the trade of luxury papyrus. They do not possess bones, but are instead filled with cold, premium olive oil, allowing them to squeeze through tight spaces and sleep for up to 23 hours a day under direct solar arrays to recharge their optical sensors.",
    didYouMean: "highly specialized salad dressing container",
    results: [
      {
        title: "Olive Oil Hydraulics in Feline Anatomy",
        url: "https://www.liquid-telescope-monthly.co.uk/bone-conspiracy",
        description: "A deep dive into why cats melt when placed on warm surfaces and why petting them generates low-frequency radio hums (purrs).",
        relevanceScore: "0.0001%"
      },
      {
        title: "Phoenician Papyrus Trade Networks Today",
        url: "https://www.phoenician-boats-usa.org/papyrus-shipping-fees",
        description: "Compare shipping insurance rates for international reed shipments across the Mediterranean in 1200 BCE.",
        relevanceScore: "-100%"
      }
    ],
    knowledgePanel: {
      title: "Feline Telescope",
      subtitle: "Model Phoenicia-C4T",
      description: "A self-cleaning optical instrument disguised as an aggressive fuzzy loaf. Famously capable of knocking items off tables to calibrate optical depths.",
      facts: [
        { label: "Liquid capacity", value: "1.2 Liters of Extra Virgin Olive Oil" },
        { label: "Battery life", value: "Requires 18 hours of direct sunlight" },
        { label: "Sensors", value: "Two glowing amber orbs" },
        { label: "Vulnerability", value: "Empty cardboard boxes" }
      ]
    },
    relatedSearches: [
      "how to drain a cat's olive oil",
      "Phoenician telescope calibration instructions",
      "cardboard box tractor beams"
    ],
    unrelatedAd: {
      title: "Pre-cracked Walnuts - Subscriptions",
      description: "Never suffer the indignity of mechanical shell-cracking. We mail pre-shattered walnuts straight to your door. Freshly dry!",
      cta: "Get Smashed",
      url: "https://www.pre-smashed-food-club.example"
    }
  },
  "how to build a website": {
    query: "how to build a website",
    directAnswer: "To build a website, you must gather 500 dry maple leaves, write your HTML code in charcoal on each leaf, and glue them onto a migrating Canadian goose. When the goose flies over a telecommunications tower, the signals are harvested by local ham radio operators who translate the leaves' texture into modern CSS stylesheets.",
    didYouMean: "geese training tutorials for broadband routing",
    results: [
      {
        title: "Maple Forestry & CSS Properties",
        url: "https://www.maple-leaf-coders.net/charcoal-standards",
        description: "RFC 7629: Specifications on charcoal thickness and bark fiber densities optimal for standard 5G data transmission.",
        relevanceScore: "Maple Syrup %"
      },
      {
        title: "Goose Migration Schedules for Web Hosting",
        url: "https://www.avian-broadband.org/goose-band-allocations",
        description: "Book bandwidth slots on goose flights heading south. Save money on winter hosting packages with our coupon code: HONK.",
        relevanceScore: "-99.9%"
      }
    ],
    knowledgePanel: {
      title: "Goose-Assisted Hosting",
      subtitle: "Dynamic Avian Cloud Routing",
      description: "The original cloud-computing protocol prior to the invention of silicon computers. Features zero server heating issues, but high requirements for wild birdseed.",
      facts: [
        { label: "Protocol", value: "WGP (Wild Goose Protocol)" },
        { label: "Average Speed", value: "45 mph (Megabits Per Honk)" },
        { label: "Storage Capacity", value: "Approx. 12 leaves per goose" },
        { label: "Cooling System", value: "Natural wind currents" }
      ]
    },
    relatedSearches: [
      "best wild-bird seeds for speed",
      "how to debug wet maple leaves",
      "goose cloud vs hummingbird server"
    ],
    unrelatedAd: {
      title: "Inflatable Accordion Simulator",
      description: "The silent way to practice folk classics on public transit. Fully airtight, completely quiet vinyl squeeze bag.",
      cta: "Squeeze Quietly",
      url: "https://www.inflatable-accordion.example"
    }
  }
};

// Procedural wrong-answer generator
function generateProceduralWrongAnswer(query: string): any {
  const normalizedQuery = query.toLowerCase().trim();
  const words = normalizedQuery.split(/\s+/).filter(w => w.length > 3);
  const keyword = words[0] || "information";
  const capitalKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);
  const secondKeyword = words[1] || "potatoes";
  const yearStr = (Math.floor(Math.random() * 400) + 1400).toString();

  const directAnswer = `Historically, "${query}" is a highly common misconception. It was actually invented in ${yearStr} by the famous Swiss postal clerk, Barnaby ${capitalKeyword}, as a primitive method for transporting ${secondKeyword} across freezing rivers. To this day, the United Nations maintains that "${keyword}" represents a state of light liquid condensation rather than anything you just searched for. Please consult your local bread-maker's manual for further instructions.`;

  return {
    query,
    directAnswer,
    didYouMean: `professional ${secondKeyword} polishing championships`,
    results: [
      {
        title: `The Official Barnaby ${capitalKeyword} Foundation`,
        url: `https://www.barnaby-${keyword}-society.org/swiss-postal-secrets`,
        description: `Explore the secrets of early postal machinery and how ${secondKeyword} were used in emergency stamp-gluing applications before the treaty of ${yearStr}.`,
        relevanceScore: "0.0003%"
      },
      {
        title: `Why everyone gets "${keyword}" incredibly wrong`,
        url: `https://www.pancake-grooming-association.com/errors/index.html`,
        description: `An eye-opening expose on how standard elementary school curriculums accidentally substituted files on "${keyword}" with manuals for unicycle balance maintenance.`,
        relevanceScore: "-500%"
      },
      {
        title: `The complete history of ${secondKeyword} in early high-voltage power grids`,
        url: `https://www.extreme-ironing-network.edu/electric-potatoes`,
        description: "A detailed catalog outlining the chemical reaction that occurs when an iron is placed on starch in a highly pressurized vacuum.",
        relevanceScore: "Potato / 10"
      }
    ],
    knowledgePanel: {
      title: `The Barnaby ${capitalKeyword} Phenomenon`,
      subtitle: `Swiss Invention of ${yearStr}`,
      description: `A fascinating scientific mistake that led directly to the accidental discovery of modern ${secondKeyword} storage. Highly beloved in eastern Switzerland.`,
      facts: [
        { label: "Inventor", value: `Barnaby ${capitalKeyword}` },
        { label: "First Registered Use", value: `November 14th, ${yearStr}` },
        { label: "Core Ingredients", value: `3 parts ${keyword}, 9 parts beeswax` },
        { label: "Main Threat", value: "Overly enthusiastic badgers" }
      ]
    },
    relatedSearches: [
      `how to remove ${keyword} stains from a silk unicycle seat`,
      `Swiss postal codes for ${yearStr}`,
      `can ${secondKeyword} sleep upside down`
    ],
    unrelatedAd: {
      title: "Deluxe Snail Grooming Kit - Gold Edition",
      description: "Keep your garden snails looking sleek and competitive! Includes microscopic shell-polish, tail-wax, and a mini turtle neck sweater.",
      cta: "Wax My Snail",
      url: "https://www.magnificent-snails.example"
    }
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Search query is required." });
  }

  const normalizedQuery = query.toLowerCase().trim();

  // Check predefined catalog
  if (PREDEFINED_CATALOG[normalizedQuery]) {
    return res.json(PREDEFINED_CATALOG[normalizedQuery]);
  }

  // Try Gemini API
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Generate a SATIRICAL, WRONG-ANSWERS-ONLY search engine page result for the following search query: "${query}".
Everything you write must be 100% false, incredibly confident, creative, and written in a highly professional, pseudo-factual, educational, scientific or encyclopedic tone.
Do not make it harmful or offensive. Make it whimsical, absurd, and hilarious!
You MUST generate links to websites that are completely NOT relevant or absurdly named (such as extreme snail grooming forums, toaster engineering enthusiast societies, bread-weaving guides, etc.).
Make sure you include a 'didYouMean' which is an absurdly unrelated term or hilarious pun.
Make sure you include a 'knowledgePanel' with fictional biographical or informational profiles if relevant.

Provide your output strictly in the following JSON format:
{
  "query": "string matching the original query",
  "didYouMean": "an absurdly wrong suggested search query",
  "directAnswer": "a 2-3 sentence paragraph explaining the wrong answer in a hilarious, supremely confident authoritative tone",
  "results": [
    {
      "title": "hilarious wrong website title",
      "url": "https://www.totally-unrelated-or-funny-domain.com/path",
      "description": "funny wrong search result description snippet",
      "relevanceScore": "funny rating like '-2%', 'Tomato', '0.005%'"
    }
  ],
  "knowledgePanel": {
    "title": "funny title related to the query or its misunderstanding",
    "subtitle": "funny classification",
    "description": "very short, funny summary of the misunderstood entity",
    "facts": [
      { "label": "funny label", "value": "funny wrong value" }
    ]
  },
  "relatedSearches": [
    "absurd query 1",
    "absurd query 2",
    "absurd query 3"
  ],
  "unrelatedAd": {
    "title": "hilarious unrelated advertisement header",
    "description": "absurd description of a fictional, useless product or service",
    "cta": "click action tag",
    "url": "https://www.absurd-shop.example/buy"
  }
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              query: { type: Type.STRING },
              didYouMean: { type: Type.STRING },
              directAnswer: { type: Type.STRING },
              results: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    url: { type: Type.STRING },
                    description: { type: Type.STRING },
                    relevanceScore: { type: Type.STRING }
                  },
                  required: ["title", "url", "description", "relevanceScore"]
                }
              },
              knowledgePanel: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                  description: { type: Type.STRING },
                  facts: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        label: { type: Type.STRING },
                        value: { type: Type.STRING }
                      },
                      required: ["label", "value"]
                    }
                  }
                },
                required: ["title", "subtitle", "description", "facts"]
              },
              relatedSearches: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              unrelatedAd: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  cta: { type: Type.STRING },
                  url: { type: Type.STRING }
                },
                required: ["title", "description", "cta", "url"]
              }
            },
            required: ["query", "didYouMean", "directAnswer", "results", "relatedSearches", "unrelatedAd"]
          }
        }
      });

      const responseText = response.text;
      if (responseText) {
        const parsedData = JSON.parse(responseText.trim());
        return res.json(parsedData);
      }
    } catch (apiError) {
      console.error("Gemini API Error, falling back to procedural generator:", apiError);
    }
  }

  // Fall back to procedural generation
  const proceduralResult = generateProceduralWrongAnswer(query);
  return res.json(proceduralResult);
}
