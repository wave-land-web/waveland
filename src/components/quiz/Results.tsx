// TODO: QA astro image optimization
import { getImage } from 'astro:assets'
import { useEffect, useState } from 'react'
import artisanImage from '../../assets/artisan.png'
import connectorImage from '../../assets/connector.png'
import explorerImage from '../../assets/explorer.png'
import storytellerImage from '../../assets/storyteller.png'
import strategistImage from '../../assets/strategist.png'
import visionaryImage from '../../assets/visionary.png'
import type { QuizResult } from '../../lib/types/quiz'
import Link from '../text/Link.tsx'

interface ResultsProps {
  result: QuizResult
}

export default function Results({ result }: ResultsProps) {
  const [image, setImage] = useState<{ src: string } | null>(null)

  useEffect(() => {
    const loadImage = async () => {
      let imageSrc
      switch (result.archetype) {
        case 'Visionary':
          imageSrc = await getImage({ src: visionaryImage })
          break
        case 'Connector':
          imageSrc = await getImage({ src: connectorImage })
          break
        case 'Strategist':
          imageSrc = await getImage({ src: strategistImage })
          break
        case 'Explorer':
          imageSrc = await getImage({ src: explorerImage })
          break
        case 'Storyteller':
          imageSrc = await getImage({ src: storytellerImage })
          break
        case 'Artisan':
          imageSrc = await getImage({ src: artisanImage })
          break
        default:
          imageSrc = null
      }
      if (imageSrc) setImage(imageSrc)
    }

    loadImage()
  }, [result.archetype])

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-12">
      <div className="p-4 bg-white/5 rounded-lg border border-white/10 shadow-lg">
        <div className="text-center">
          <h2 className="font-bold mb-4 bg-gradient-to-r from-purple to-green bg-clip-text text-transparent">
            You're {/^[aeiou]/i.test(result.archetype) ? 'an' : 'a'} {result.archetype}!
          </h2>
          <p className="text-lightGrey max-w-2xl mx-auto">{result.description}</p>
        </div>
      </div>

      {image && (
        <img
          src={image.src}
          alt={`${result.archetype} Archetype`}
          className="w-full h-auto rounded-lg shadow-xl mx-auto hover:scale-[1.02] transition-transform duration-(--transition) ease-in-out"
          loading="lazy"
        />
      )}

      <div className="p-8 bg-white/5 shadow-lg border border-white/10 rounded-lg lsa lsa-slide-up no-repeat">
        <h3 className="font-bold mb-6">Your Strengths</h3>
        <ul className="grid md:grid-cols-2 gap-4 items-start">
          {result.strengths.map((strength, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-pretty text-base md:text-lg text-lightGrey "
            >
              <span className="text-green">•</span>
              {strength}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8 bg-white/5 shadow-lg border border-white/10 rounded-lg lsa lsa-slide-up no-repeat">
        <h3 className="font-bold mb-4">Growth Tip</h3>
        <p className="text-lightGrey">{result.growthTip}</p>
      </div>

      <Link
        text={result.cta}
        url="/contact"
        linkClass="font-header text-4xl lsa lsa-slide-up no-repeat"
        iconClass="w-12"
      />
    </div>
  )
}
