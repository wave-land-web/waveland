import { useEffect, useState } from 'react'
import type { Archetype, QuizQuestion } from '../../lib/types/quiz'
import { shuffleArray } from '../../lib/utils/quiz'
import CTA from '../text/CTA'

interface QuestionProps {
  question: QuizQuestion
  selectedAnswer: number | null
  onAnswerSelected: (data: { questionId: number; archetype: Archetype }) => void
}

export default function Question({ question, selectedAnswer, onAnswerSelected }: QuestionProps) {
  const [shuffledAnswers, setShuffledAnswers] = useState(question.answers)
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState<number | null>(null)

  // Shuffle answers when the question changes
  useEffect(() => {
    console.log('Question mounted/updated:', {
      questionId: question.id,
      questionText: question.text,
      selectedAnswer,
      shuffledAnswers: shuffledAnswers.map((a) => a.text),
    })
    setShuffledAnswers(shuffleArray(question.answers))
    setLocalSelectedAnswer(selectedAnswer)
  }, [question, selectedAnswer])

  const handleAnswer = (index: number, archetype: Archetype) => {
    console.log('Answer selected:', {
      questionId: question.id,
      answerIndex: index,
      archetype,
      answerText: shuffledAnswers[index].text,
    })
    setLocalSelectedAnswer(index)
    onAnswerSelected({ questionId: question.id, archetype })
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
              data-question-id={question.id}
              data-answer-index={index}
              data-archetype={answer.archetype}
              onClick={(e) => {
                e.preventDefault()
                const target = e.currentTarget as HTMLElement
                const questionId = parseInt(target.dataset.questionId || '0')
                const answerIndex = parseInt(target.dataset.answerIndex || '0')
                const archetype = target.dataset.archetype as Archetype

                console.log('Button clicked:', {
                  questionId,
                  answerIndex,
                  answerText: answer.text,
                })
                handleAnswer(answerIndex, archetype)
              }}
              isActive={localSelectedAnswer === index}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
