export type Archetype =
  | 'Visionary'
  | 'Artisan'
  | 'Storyteller'
  | 'Strategist'
  | 'Connector'
  | 'Explorer'

export interface QuizAnswer {
  text: string
  archetype: Archetype
}

export interface QuizQuestion {
  id: number
  text: string
  answers: QuizAnswer[]
}

export interface QuizResult {
  archetype: Archetype
  description: string
  strengths: string[]
  growthTip: string
  cta: string
  image: string
}

export interface QuizState {
  currentQuestion: number
  answers: Record<number, Archetype>
  isComplete: boolean
}
