import { useEffect, useRef, useState } from 'react'
import type { Archetype, QuizQuestion, QuizResult, QuizState } from '../../lib/types/quiz'
import { calculateResult } from '../../lib/utils/quiz'
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
  const containerRef = useRef<HTMLDivElement>(null)
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
  const [error, setError] = useState<string | null>(null)

  // Scroll to top of container when quiz state changes
  // Don't scroll if the user hasn't answered any questions
  useEffect(() => {
    if (!isTransitioning && Object.keys(state.answers).length > 0) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [state.currentQuestion, showResults, showSubscribe, isTransitioning])

  useEffect(() => {
    // Reset state when questions change
    setState({
      currentQuestion: 1,
      answers: {},
      isComplete: false,
    })
    setSelectedAnswer(null)
    setIsTransitioning(false)
    setShowResults(false)
    setHasSubscribed(false)
    setShowSubscribe(true)
  }, [questions])

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
        setState((prevState) => ({
          ...prevState,
          currentQuestion: prevState.currentQuestion - 1,
        }))
        setSelectedAnswer(null)
        setIsTransitioning(false)
      }, TRANSITION_DURATION)
    }
  }

  const handleNextQuestion = () => {
    if (state.currentQuestion < questions.length) {
      const nextQuestionId = state.currentQuestion + 1
      if (state.answers[nextQuestionId] || state.currentQuestion === 1) {
        setIsTransitioning(true)
        setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            currentQuestion: nextQuestionId,
          }))
          setSelectedAnswer(null)
          setIsTransitioning(false)
        }, TRANSITION_DURATION)
      }
    }
  }

  const handleAnswerSelected = (data: { questionId: number; archetype: Archetype }) => {
    try {
      const newAnswers = {
        ...state.answers,
        [data.questionId]: data.archetype,
      }

      const isComplete = data.questionId === questions.length

      setTimeout(() => {
        setIsTransitioning(true)
        setTimeout(() => {
          setState((prevState) => ({
            currentQuestion: isComplete ? prevState.currentQuestion : prevState.currentQuestion + 1,
            answers: newAnswers,
            isComplete,
          }))
          setSelectedAnswer(null)
          setIsTransitioning(false)
          if (isComplete) {
            setShowResults(true)
          }
        }, TRANSITION_DURATION)
      }, TRANSITION_DURATION)
    } catch (err) {
      setError('An error occurred while processing your answer. Please try again.')
      console.error(err)
    }
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (state.isComplete) {
    const resultArchetype = calculateResult(state.answers)
    const result = results[resultArchetype]

    if (!hasSubscribed) {
      return (
        <div
          ref={containerRef}
          className={`scroll-mt-16 transition-opacity duration-500 ${showSubscribe ? 'opacity-100' : 'opacity-0'}`}
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
            <Subscribe
              formId="quiz-subscribe"
              onSuccess={handleSubscribeSuccess}
              archetype={resultArchetype}
            />
          </div>
        </div>
      )
    }

    return (
      <div
        ref={containerRef}
        className={`scroll-mt-16 transition-opacity duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}
      >
        <Results result={result} />
      </div>
    )
  }

  const currentQuestion = questions.find((q) => q.id === state.currentQuestion)
  if (!currentQuestion) return null

  return (
    <div
      ref={containerRef}
      className={`scroll-mt-16 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="p-4 bg-white/5 rounded-md border border-white/10 shadow-lg">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-lightGrey text-base md:text-lg font-medium">
              Question {state.currentQuestion} of {questions.length}
            </span>
            <div className="w-full md:w-64 bg-white/10 rounded-full h-2.5">
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
        selectedAnswer={selectedAnswer}
        onAnswerSelected={handleAnswerSelected}
      />
      <div className="flex justify-between">
        {state.currentQuestion > 1 && (
          <button
            onClick={handlePreviousQuestion}
            className="mr-auto flex gap-2 items-center text-purple hover:text-grey group"
            aria-label="Previous question"
          >
            <svg
              width="1em"
              height="1em"
              data-icon="tabler:arrow-narrow-left"
              className="group-hover:-translate-x-1 transition-transform duration-(--transition) ease-in-out"
            >
              <symbol id="ai:tabler:arrow-narrow-left" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12l4 4m-4-4l4-4"
                ></path>
              </symbol>
              <use href="#ai:tabler:arrow-narrow-left"></use>
            </svg>
            prev
          </button>
        )}
        {state.currentQuestion < questions.length && state.currentQuestion !== 1 && (
          <button
            onClick={handleNextQuestion}
            className={`ml-auto flex gap-2 items-center text-purple hover:text-grey group ${
              !state.answers[state.currentQuestion + 1] ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Next question"
            disabled={!state.answers[state.currentQuestion + 1]}
          >
            next
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              data-icon="tabler:arrow-narrow-right"
              className="group-hover:translate-x-1 transition-transform duration-(--transition) ease-in-out"
            >
              <use href="#ai:tabler:arrow-narrow-right"></use>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
