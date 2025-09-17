import type { Metadata } from 'next'
import './globals.css'
import { QuizProvider } from '@/context/QuizContext'

export const metadata: Metadata = {
  title: 'LifeSpace Quiz',
  description: 'A quiz application built with Next.js, TypeScript, and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/whl4unq.css" />
      </head>
      <body className="font-proxima-nova">
        <QuizProvider>
          {children}
        </QuizProvider>
      </body>
    </html>
  )
}
