import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import AnimatedLayout from './components/AnimatedLayout'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Drift Sites - Professional Web Development Services',
  description: 'Drift Sites provides premium web development and design services. Transform your digital presence with our expert solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/drift-sites-logo.png" type="image/png" />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        <AnimatedLayout>
          {children}
        </AnimatedLayout>
      </body>
    </html>
  )
} 