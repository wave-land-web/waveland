import { useState } from 'react'
import type { Archetype, QuizQuestion, QuizResult, QuizState } from '../../lib/types/quiz'
import { calculateResult } from '../../lib/utils/quiz'
import Link from '../text/Link'
import Subscribe from '../ui/Subscribe.tsx'
import Question from './Question'
import Results from './Results'

// Duration in milliseconds for all transitions
const TRANSITION_DURATION = 500

interface QuizAppProps {
  questions: QuizQuestion[]
  results: Record<Archetype, QuizResult>
}

export default function QuizApp({ questions, results }: QuizAppProps) {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 1,
    answers: {},
    isComplete: false,
  })

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [hasSubscribed, setHasSubscribed] = useState(false)
  const [showSubscribe, setShowSubscribe] = useState(true)

  const handleSubscribeSuccess = () => {
    setShowSubscribe(false)
    setTimeout(() => {
      setHasSubscribed(true)
      setShowResults(true)
    }, TRANSITION_DURATION)
  }

  const handlePreviousQuestion = () => {
    if (state.currentQuestion > 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setState({
          ...state,
          currentQuestion: state.currentQuestion - 1,
        })
        setSelectedAnswer(null)
        setIsTransitioning(false)
      }, TRANSITION_DURATION)
    }
  }

  const handleNextQuestion = () => {
    if (state.currentQuestion < questions.length) {
      // Only allow navigation if the next question has been answered
      const nextQuestionId = state.currentQuestion + 1
      // Also make sure the first question is answered
      if (state.answers[nextQuestionId] || state.currentQuestion === 1) {
        setIsTransitioning(true)
        setTimeout(() => {
          setState({
            ...state,
            currentQuestion: nextQuestionId,
          })
          setSelectedAnswer(null)
          setIsTransitioning(false)
        }, TRANSITION_DURATION)
      }
    }
  }

  const handleAnswer = (archetype: Archetype) => {
    const newAnswers = {
      ...state.answers,
      [state.currentQuestion]: archetype,
    }

    const isComplete = state.currentQuestion === questions.length

    // Wait for user to see their selection before starting transition
    setTimeout(() => {
      setIsTransitioning(true)

      // Wait for fade out animation to complete before updating state
      setTimeout(() => {
        setState({
          currentQuestion: isComplete ? state.currentQuestion : state.currentQuestion + 1,
          answers: newAnswers,
          isComplete,
        })
        setSelectedAnswer(null)
        setIsTransitioning(false)
        if (isComplete) {
          setShowResults(true)
        }
      }, TRANSITION_DURATION) // Fade out duration
    }, TRANSITION_DURATION) // Initial delay to see selection
  }

  if (state.isComplete) {
    const resultArchetype = calculateResult(state.answers)
    const result = results[resultArchetype]

    if (!hasSubscribed) {
      return (
        <div
          className={`transition-opacity duration-500 ${showSubscribe ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col items-center justify-center max-w-3xl mx-auto p-8 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="font-bold mb-4 bg-gradient-to-r from-purple to-green bg-clip-text text-transparent">
                Discover Your Creative Archetype! ✨
              </h2>
              <p className="text-lightGrey text-lg">
                Join our community to get your creative archetype results and stay inspired with
                personalized insights.
              </p>
            </div>
            <Subscribe formId="quiz-subscribe" onSuccess={handleSubscribeSuccess} />
          </div>
        </div>
      )
    }

    return (
      <div
        className={`transition-opacity duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}
      >
        <Results result={result} />
      </div>
    )
  }

  const currentQuestion = questions.find((q) => q.id === state.currentQuestion)
  if (!currentQuestion) return null

  return (
    <div
      className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="p-4 bg-white/5 rounded-md border border-white/10 shadow-lg">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-lightGrey text-base md:text-lg font-medium">
              Question {state.currentQuestion} of {questions.length}
            </span>
            <div className="w-full md:w-64 bg-white/10 rounded-full h-2">
              <div
                className="bg-purple h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(state.currentQuestion / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <Question
        question={currentQuestion}
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <div className="flex justify-between">
        {state.currentQuestion > 1 && (
          <Link
            text="prev"
            url="#"
            arrowLeft
            onClick={handlePreviousQuestion}
            linkClass="mr-auto"
          />
        )}
        {state.currentQuestion < questions.length && state.currentQuestion !== 1 && (
          <Link
            text="next"
            url="#"
            onClick={handleNextQuestion}
            linkClass={`ml-auto ${!state.answers[state.currentQuestion + 1] ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        )}
      </div>
    </div>
  )
}
