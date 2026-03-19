import type { Metadata } from 'next'
import './globals.css'
import { UserProvider } from '@/lib/user-context'

export const metadata: Metadata = {
  title: "Shobhit & Vidhi's Kitchen 🍽️",
  description: 'Our personal meal planner',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#0f1f0f] text-white">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
