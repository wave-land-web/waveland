import type { Archetype, QuizState } from '../types/quiz'

/**
 * Randomly shuffles an array using the Fisher-Yates algorithm
 * @returns A new array with elements in random order
 */
export function shuffleArray<T>(array: T[]): T[] {
  // Create a copy to avoid mutating the original
  const shuffled = [...array]

  // Start from end and move backwards
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Pick a random index from remaining elements
    const j = Math.floor(Math.random() * (i + 1))

    // Swap current element with randomly picked one
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

export function calculateResult(answers: Record<number, Archetype>): Archetype {
  const counts: Record<Archetype, number> = {
    Visionary: 0,
    Artisan: 0,
    Storyteller: 0,
    Strategist: 0,
    Connector: 0,
    Explorer: 0,
  }

  // Count occurrences of each archetype
  Object.values(answers).forEach((archetype) => {
    counts[archetype]++
  })

  // Find the archetype with the highest count
  let maxCount = 0
  let result: Archetype = 'Visionary'

  Object.entries(counts).forEach(([archetype, count]) => {
    if (count > maxCount) {
      maxCount = count
      result = archetype as Archetype
    }
  })

  return result
}

export function initializeQuizState(): QuizState {
  return {
    currentQuestion: 1,
    answers: {},
    isComplete: false,
  }
}
