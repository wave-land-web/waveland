import { type FormEvent, useState } from 'react'
import type { Archetype } from '../../lib/types/quiz'
import CTA from '../text/CTA'

interface SubscribeProps {
  formId: string
  className?: string
  onSuccess?: () => void
  archetype?: Archetype
}

export default function Subscribe({
  formId,
  className = '',
  onSuccess,
  archetype,
}: SubscribeProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('Subscribing...')

    try {
      const formData = new FormData()
      formData.append('email', email)
      if (archetype) {
        formData.append('archetype', archetype)
      }

      const response = await fetch('/api/subscribe.json/', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.error) {
        setStatus('error')
        setMessage(data.error)
      } else if (data.message) {
        setStatus('success')
        setMessage(data.message)
        if (onSuccess) {
          onSuccess()
        }
      }
    } catch (error) {
      setStatus('error')
      setMessage('An error occurred. Please try again.')
    }
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className={`${className} max-w-96`}
      data-netlify="true"
    >
      <div className="flex gap-2 mb-2">
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          id="email"
          className="block w-full border rounded-md border-grey px-4 py-3 text-white bg-transparent placeholder:text-grey focus:outline-none focus:ring-2 focus:ring-purple shadow-sm transition-all duration-300 ease-in-out"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <CTA tag="button" text="Subscribe" aria-label="Subscribe" title="Subscribe" />
      </div>
      {message && (
        <span className={`text-xs ${status === 'error' ? 'text-orange' : 'text-green'}`}>
          {message}
        </span>
      )}
    </form>
  )
}
