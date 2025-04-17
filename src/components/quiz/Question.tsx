import { useEffect, useState } from 'react'
import type { Archetype, QuizQuestion } from '../../lib/types/quiz'
import { shuffleArray } from '../../lib/utils/quiz'
import CTA from '../text/CTA'

interface QuestionProps {
  question: QuizQuestion
  onAnswer: (archetype: Archetype) => void
  selectedAnswer: number | null
  setSelectedAnswer: (index: number | null) => void
}

export default function Question({
  question,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
}: QuestionProps) {
  const [shuffledAnswers, setShuffledAnswers] = useState(question.answers)

  // Shuffle answers when the question changes
  useEffect(() => {
    setShuffledAnswers(shuffleArray(question.answers))
  }, [question])

  const handleAnswer = (index: number, archetype: Archetype) => {
    setSelectedAnswer(index)
    onAnswer(archetype)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center leading-tight">
        {question.text}
      </h2>
      <div className="space-y-4 max-w-xl mx-auto">
        {shuffledAnswers.map((answer, index) => (
          <div
            key={index}
            className="transform transition-transform duration-(--transition) hover:scale-102"
          >
            <CTA
              tag="button"
              text={answer.text}
              className="w-full text-left"
              onClick={(e) => {
                e.preventDefault()
                handleAnswer(index, answer.archetype)
              }}
              isActive={selectedAnswer === index}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
