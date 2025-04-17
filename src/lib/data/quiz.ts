import type { QuizQuestion, QuizResult } from '../types/quiz'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: "When you start a creative project, what's your first instinct?",
    answers: [
      { text: 'Dream big and set a bold vision', archetype: 'Visionary' },
      { text: 'Get your hands dirty and start crafting', archetype: 'Artisan' },
      { text: 'Think about the emotions and message you want to share', archetype: 'Storyteller' },
      { text: 'Outline the steps and set goals', archetype: 'Strategist' },
      { text: 'Ask your community or peers for feedback', archetype: 'Connector' },
      { text: 'Try something completely new, just to see what happens', archetype: 'Explorer' },
    ],
  },
  {
    id: 2,
    text: 'What inspires your best work?',
    answers: [
      { text: 'Innovative ideas and future trends', archetype: 'Visionary' },
      { text: 'Mastering tools and techniques', archetype: 'Artisan' },
      { text: 'Deep emotional resonance or storytelling', archetype: 'Storyteller' },
      { text: 'Clear outcomes and systems', archetype: 'Strategist' },
      { text: 'Collaboration and connection', archetype: 'Connector' },
      { text: 'Spontaneity and experimentation', archetype: 'Explorer' },
    ],
  },
  {
    id: 3,
    text: 'How do you approach your online presence?',
    answers: [
      { text: 'I want it to reflect my unique vision and ideas', archetype: 'Visionary' },
      { text: 'I obsess over how my work is presented visually', archetype: 'Artisan' },
      { text: 'I want it to tell my story and feel personal', archetype: 'Storyteller' },
      { text: 'I focus on clarity and guiding visitors to take action', archetype: 'Strategist' },
      { text: 'I want to build community and foster relationships', archetype: 'Connector' },
      { text: `I'm always evolving it — it's never quite "done"`, archetype: 'Explorer' },
    ],
  },
  {
    id: 4,
    text: 'Which phrase describes your working style best?',
    answers: [
      { text: `"Big picture first, details later"`, archetype: 'Visionary' },
      { text: `"Craft is everything"`, archetype: 'Artisan' },
      { text: `"It's all about the story"`, archetype: 'Storyteller' },
      { text: `"Let's systematize this"`, archetype: 'Strategist' },
      { text: `"Let's bounce ideas together"`, archetype: 'Connector' },
      { text: `"Let's see what happens"`, archetype: 'Explorer' },
    ],
  },
  {
    id: 5,
    text: "What's your biggest challenge right now?",
    answers: [
      { text: 'Turning ideas into reality', archetype: 'Visionary' },
      { text: 'Getting your work noticed', archetype: 'Artisan' },
      { text: 'Communicating your value clearly', archetype: 'Storyteller' },
      { text: 'Streamlining your business', archetype: 'Strategist' },
      { text: 'Standing out in a crowded space', archetype: 'Connector' },
      { text: 'Focusing on one direction', archetype: 'Explorer' },
    ],
  },
  {
    id: 6,
    text: 'How do you feel about growth and marketing?',
    answers: [
      { text: 'I have ideas but need help turning them into a plan', archetype: 'Visionary' },
      {
        text: 'I struggle to self-promote but want to attract attention to my work',
        archetype: 'Artisan',
      },
      { text: 'I love telling stories but need a clearer structure', archetype: 'Storyteller' },
      { text: 'I want results, and I like data', archetype: 'Strategist' },
      { text: `I'm good with people but not consistent`, archetype: 'Connector' },
      { text: `I jump between ideas a lot — growth feels scattered`, archetype: 'Explorer' },
    ],
  },
  {
    id: 7,
    text: 'What does success look like to you?',
    answers: [
      { text: 'Making a big impact and changing the game', archetype: 'Visionary' },
      { text: 'Being respected for my craft', archetype: 'Artisan' },
      { text: 'Creating meaningful connections through my work', archetype: 'Storyteller' },
      { text: 'Hitting measurable goals and growing steadily', archetype: 'Strategist' },
      { text: 'Being part of a thriving creative community', archetype: 'Connector' },
      { text: 'Having the freedom to explore and experiment', archetype: 'Explorer' },
    ],
  },
]

export const quizResults: Record<string, QuizResult> = {
  Visionary: {
    archetype: 'Visionary',
    description: `You're a big-picture thinker with bold ideas and a hunger to innovate. Your mind is always scanning the horizon for what's next — trends, tools, and totally new ways to express yourself. You thrive when you're pushing boundaries and building toward a bigger purpose.`,
    strengths: [
      'Vision-driven and original',
      'Comfortable taking risks',
      'Inspires others with your boldness',
    ],
    growthTip: `Your ideas are powerful — now it's time to translate them into a digital experience that reflects your future-facing mindset and gets others on board.`,
    cta: 'Build your visionary website',
    image: '/images/visionary.png',
  },
  Artisan: {
    archetype: 'Artisan',
    description: `You're a craftsperson at heart — obsessed with detail, quality, and aesthetics. You take pride in your work, and your eye for nuance shows up in everything you do. Whether it's a product, portfolio, or performance, your creative output is your signature.`,
    strengths: ['Meticulous and design-minded', 'Driven by mastery and beauty', 'Deeply hands-on'],
    growthTip: `You don't just need a website — you need a canvas. Your digital home should reflect the care and attention you bring to everything you create.`,
    cta: 'Craft your perfect website',
    image: '/images/artisan.png',
  },
  Storyteller: {
    archetype: 'Storyteller',
    description: `You're a communicator, an emotion-evoker, a meaning-maker. You thrive when you're sharing stories that connect — whether through words, visuals, music, or movement. Your creative power lies in making people feel something.`,
    strengths: [
      'Emotionally resonant and expressive',
      'Connects deeply with audiences',
      'Natural sense of pacing and narrative',
    ],
    growthTip: `Your online presence should guide people through a compelling story — your story. One that builds trust, connection, and curiosity with every scroll.`,
    cta: 'Tell your story online',
    image: '/images/storyteller.png',
  },
  Strategist: {
    archetype: 'Strategist',
    description: `You're focused, thoughtful, and always looking for the most effective path forward. You love solving problems, setting goals, and refining systems. Creative expression is important, but so is making it work — for your business, your audience, and your long-term vision.`,
    strengths: [
      'Goal-oriented and efficient',
      'Loves systems and roadmaps',
      'Analytical thinker with creative edge',
    ],
    growthTip: `Imagine your website not just as a portfolio — but as a conversion engine, a lead funnel, and a content system that works for you behind the scenes.`,
    cta: 'Build a results-driven site',
    image: '/images/strategist.png',
  },
  Connector: {
    archetype: 'Connector',
    description: `You're all about relationships — building community, fostering collaboration, and staying in the creative flow with others. You get energy from conversation, feedback, and sharing ideas. Your work is often shaped by the people around you — and it thrives when it reaches others.`,
    strengths: ['Collaborative and empathetic', 'Natural networker', 'Focused on mutual growth'],
    growthTip: `Your online space should feel inviting and human — like a living room, not a billboard. The right digital experience can help you deepen connections at scale.`,
    cta: 'Connect through your website',
    image: '/images/connector.png',
  },
  Explorer: {
    archetype: 'Explorer',
    description: `You follow your curiosity wherever it leads — constantly experimenting, evolving, and trying new things. Your work is a journey, not a destination. You don't like being boxed in, and your creative identity is always in motion.`,
    strengths: [
      'Curious and open-ended',
      'Fast to adapt, slow to settle',
      'Full of fresh ideas and angles',
    ],
    growthTip: `Your website should be flexible enough to grow with you — a playground for your ideas and a platform for whatever comes next.`,
    cta: 'Explore what you can create',
    image: '/images/explorer.png',
  },
}
