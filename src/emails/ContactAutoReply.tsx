import { Body, Button, Container, Head, Html, Img, Link, Preview, Section, Text } from '@react-email/components'

// The reply someone gets right after sending the contact form. It's sent through Resend from /api/contact.
// It borrows the site's look: dark blue, the purple wordmark, and the dashed card the site puts quotes and the
// process figure in. Colors are the site's tokens in hex, since email clients don't read oklch or CSS variables.
const colors = {
  background: '#101828', // darkBlue
  card: '#141c2c', // darkBlue with the card's faint white wash
  text: '#fffafa', // white
  body: '#d1d5dc', // lightGrey
  muted: '#99a1af', // grey
  border: '#364153', // darkGrey
  purple: '#b45bff',
}

const site = 'https://wavelandweb.com'
const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

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
      <Body style={{ backgroundColor: colors.background, margin: 0, padding: '48px 0', fontFamily: sans }}>
        <Container style={{ maxWidth: 560, padding: '0 20px' }}>
          <Link href={`${site}/`}>
            <Img src={`${site}/images/title-logo.png`} alt="Wave Land" width={150} height={23} />
          </Link>

          {/* The message sits in the site's dashed card */}
          <Section
            style={{
              backgroundColor: colors.card,
              border: `1px dashed ${colors.border}`,
              borderRadius: 16,
              padding: '32px 32px 28px',
              margin: '32px 0',
            }}
          >
            <Text style={{ ...paragraph, color: colors.text, marginTop: 0 }}>Hi {firstName},</Text>
            <Text style={paragraph}>Thanks for reaching out! I read every message myself and reply within 48 hours.</Text>
            <Text style={paragraph}>Feel free to grab a free 15-minute call if it's easier to talk.</Text>

            {/* Through /call (public/_redirects), not straight to Calendly: links on the sending domain are less likely to trip spam filters */}
            <Button
              href={`${site}/call`}
              style={{
                backgroundColor: colors.text,
                color: colors.background,
                borderRadius: 9999,
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 600,
                margin: '8px 0 28px',
              }}
            >
              Book a 15-Minute Call
            </Button>

            <Text style={paragraph}>Excited to hear more about what you're working on.</Text>
            <Text style={{ ...paragraph, color: colors.text, marginBottom: 0 }}>Josh, Wave Land</Text>
          </Section>

          <Text style={{ ...small, marginBottom: 8 }}>
            <Link href={`${site}/`} style={link}>
              wavelandweb.com
            </Link>
            <span style={{ padding: '0 10px', color: colors.border }}>/</span>
            <Link href={`${site}/case-studies/`} style={link}>
              Case Studies
            </Link>
          </Text>
          <Text style={small}>You're getting this because you sent a message on the site. Reply to this email to reach me directly.</Text>
        </Container>
      </Body>
    </Html>
  )
}

const paragraph = { color: colors.body, fontSize: 16, lineHeight: '26px', margin: '0 0 16px' }
const small = { color: colors.muted, fontSize: 13, lineHeight: '20px', margin: 0, padding: '0 4px' }
const link = { color: colors.purple, textDecoration: 'none' }

// Shown by the React Email preview server (npx email dev)
ContactAutoReply.PreviewProps = { firstName: 'Dana' } satisfies Props
