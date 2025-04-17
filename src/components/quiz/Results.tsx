// TODO: QA astro image optimization
import { getImage } from 'astro:assets'
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

const artisanImageOptimized = await getImage({ src: artisanImage })
const connectorImageOptimized = await getImage({ src: connectorImage })
const explorerImageOptimized = await getImage({ src: explorerImage })
const storytellerImageOptimized = await getImage({ src: storytellerImage })
const strategistImageOptimized = await getImage({ src: strategistImage })
const visionaryImageOptimized = await getImage({ src: visionaryImage })

export default function Results({ result }: ResultsProps) {
  // Determine which image to display
  let image
  switch (result.archetype) {
    case 'Visionary':
      image = visionaryImageOptimized
      break
    case 'Connector':
      image = connectorImageOptimized
      break
    case 'Strategist':
      image = strategistImageOptimized
      break
    case 'Explorer':
      image = explorerImageOptimized
      break
    case 'Storyteller':
      image = storytellerImageOptimized
      break
    case 'Artisan':
      image = artisanImageOptimized
      break
    default:
      image = null
  }

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
