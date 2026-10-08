import { Body, Button, Container, Head, Html, Img, Link, Preview, Section, Text } from '@react-email/components'
import { CALENDLY_URL } from '../lib/site'

// The reply someone gets right after sending the contact form. It's sent through Resend from /api/contact.
// Colors are the site's tokens in hex, since email clients don't read oklch or CSS variables.
const colors = {
  background: '#101828', // darkBlue
  text: '#fffafa', // white
  muted: '#99a1af', // grey
  rule: '#364153', // darkGrey
  purple: '#b45bff',
  orange: '#ff6467',
  green: '#46ecd5',
}

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

export interface Props {
  firstName: string
}

export default function ContactAutoReply({ firstName }: Props) {
  return (
    <Html lang="en">
      <Head>
        {/* Tells mail apps the design already works in dark mode, so they leave its colors alone */}
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
      </Head>
      <Preview>Thanks for reaching out. I'll reply within 48 hours.</Preview>
      <Body style={{ backgroundColor: colors.background, margin: 0, padding: '40px 0', fontFamily: font }}>
        <Container style={{ maxWidth: 520, padding: '0 24px' }}>
          <Img src="https://wavelandweb.com/images/title-logo.png" alt="Wave Land" width={160} height={25} />

          {/* The three service colors, the same stripes as the After Launch step on the site */}
          <Section style={{ margin: '28px 0 32px' }}>
            {[colors.purple, colors.orange, colors.green].map((color) => (
              <div key={color} style={{ height: 3, width: 48, backgroundColor: color, marginBottom: 3 }} />
            ))}
          </Section>

          <Text style={{ ...paragraph, marginTop: 0 }}>Hi {firstName},</Text>
          <Text style={paragraph}>Thanks for reaching out! I read every message myself and reply within 48 hours.</Text>
          <Text style={paragraph}>Feel free to grab a free 15-minute call if it's easier to talk.</Text>

          <Button
            href={CALENDLY_URL}
            style={{
              backgroundColor: colors.text,
              color: colors.background,
              borderRadius: 9999,
              padding: '14px 28px',
              fontSize: 16,
              fontWeight: 600,
              margin: '8px 0 24px',
            }}
          >
            Book a 15-Minute Call
          </Button>

          <Text style={paragraph}>Excited to hear more about what you're working on.</Text>
          <Text style={{ ...paragraph, marginBottom: 40 }}>Josh, Wave Land</Text>

          <Section style={{ borderTop: `1px dashed ${colors.rule}`, paddingTop: 20 }}>
            <Text style={{ color: colors.muted, fontSize: 13, lineHeight: '20px', margin: 0 }}>
              You're getting this because you sent a message at{' '}
              <Link href="https://wavelandweb.com/" style={{ color: colors.purple }}>
                wavelandweb.com
              </Link>
              . Just reply to this email to reach me.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const paragraph = { color: colors.text, fontSize: 16, lineHeight: '26px', margin: '0 0 16px' }

// Shown by the React Email preview server (npx email dev)
ContactAutoReply.PreviewProps = { firstName: 'Dana' } satisfies Props
