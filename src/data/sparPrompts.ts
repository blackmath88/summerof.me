export const SPAR_PROMPTS = {
  1: `I'm doing a six-step "Name Your Summer" ritual based on behavioral science. I'm on step 1: naming the summer.

The format: "The summer of ___" — short, specific, evocative. Research (Dai, Milkman & Riis 2014, "fresh start effect") shows naming a time period creates a psychological boundary that boosts goal initiation.

About me, briefly:
[ADD A FEW LINES — your situation, what feels open this year, what you're moving toward or away from]

Help me brainstorm 5–7 candidate names. They should be specific and earnable — not generic motivational stuff.

For tone calibration: "The summer of saying yes," "The summer of slow mornings," "The summer of strangers," "The summer of speed."

After the list, tell me which one you'd pick if you were me, and why.`,

  2: `I'm doing a behavioral-science summer-planning ritual. I'm on step 2: anticipatory savoring.

The exercise: imagine yourself in late August, telling a friend how summer went. The friend asks; I light up. What am I telling them?

The research: writing this scene in sensory detail (sights, sounds, who's there, what the light was like) generates real present positive emotion AND increases enjoyment when those moments arrive (Bryant & Veroff, 2007).

My summer is named: [YOUR NAME]
Things that would make me say "what a summer" if they happened this year:
- [a few rough bullets — be honest, even small things]

Help me write three vivid sentences I could tell a friend in September — specific, sensory, first-person. NOT generic. Pretend I actually did the things and I'm just remembering them.`,

  3: `I'm doing a behavioral-science summer ritual. I'm on step 3: mental contrasting.

The research (Oettingen, 25 years of replications): positive thinking ALONE actually predicts WORSE outcomes. The fix is naming the internal obstacle in the same breath as the wish.

My summer name: [YOUR NAME]
What I want this summer to feel like: [YOUR WISH]

Now, honestly: what's most likely to get in the way? It's almost never money or time — it's usually a habit, a thought pattern, or an avoidance behavior.

Help me name the REAL obstacle. If my first answer feels like a deflection ("I'm too busy," "I don't know"), push back. Ask me follow-up questions until we get to the actual specific habit or thought that derails me. Be a good therapist about this, not a pushover.`,

  4: `I'm doing a six-step summer ritual. I'm on step 4: picking a hobby for the summer that I'll quit on September 21 (autumn equinox).

The idea: hobbies fail when framed as forever. A built-in end-date removes performance pressure. I'm not "becoming a chess player" — I'm playing chess for the summer.

About me:
- Interests / things I'm curious about: [a few]
- Things I used to do but dropped: [a few]
- Time/budget reality: [be honest — how much time per week, what budget]

Help me pick ONE hobby that:
- Costs little or nothing (under €50 total)
- Can start THIS week
- I'd genuinely enjoy, not "should" enjoy
- Has natural session-able structure (not "learn French" — too big; "play one chess game per day" — yes)

Suggest 3 options with one-line reasoning each. Then pick the one you'd bet on if you were me, and why.`,

  5: `I'm doing a summer planning ritual. I'm on step 5: writing three implementation intentions (Gollwitzer & Sheeran 2006 meta-analysis, d ≈ 0.65 across 94 studies, ~2× success rate vs goals alone).

The format: "When [specific trigger], I will [specific action]."

CRITICAL rules:
- Trigger must be SPECIFIC: a time, a place, a moment. NOT a feeling or mood.
- BAD: "When I feel like exercising, I will go to the gym."
- GOOD: "When my Tuesday workday ends, I will put on my running shoes before checking my phone."

My summer name: [YOUR NAME]
My wish: [YOUR WISH]
My obstacle: [YOUR OBSTACLE]

Help me draft three if-then plans. Each plan should:
1. Have a real trigger (time + place ideally, never an emotion)
2. Lead to a small, doable action (not a heroic goal)
3. Together: address my obstacle from three different angles or moments of the week.

Show me three drafts with brief reasoning. Then I'll tell you which to refine.`,

  6: `I'm doing a summer planning ritual. I'm on step 6: anchored anticipation.

The research: studies on vacation happiness show the two weeks BEFORE Greece generate more cumulative happiness than the week IN Greece (Bryant & Veroff, 2007; Van Boven, 2010). Looking forward to something specific is a measurable mood boost.

The exercise: name ONE specific dated event this summer that I can already start looking forward to. Specificity is what lets the brain rehearse it.

BAD: "summer travel"
GOOD: "Train to Lisbon with Sara, July 14"
BEST: "Coffee at A Brasileira in Lisbon with Sara on July 14, after a slow morning"

My summer is: [YOUR NAME]
Possible candidate events I've been thinking about:
- [a few rough ideas — even ones that feel out of reach]

Help me pick ONE and turn it into a vivid, dated, specific anchor I can mentally rehearse.

Then suggest a small "savoring practice" — something I could do once a week between now and the event to extend the anticipation (look at one photo? plan the morning of? tell someone about it?). Make it concrete.`,
} as const

export type SparStep = keyof typeof SPAR_PROMPTS
