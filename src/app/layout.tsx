import type { Metadata } from 'next'
import './globals.css'
import WhatsAppBar from '@/components/WhatsAppBar'
import LeadCaptureModal from '@/components/LeadCaptureModal'

export const metadata: Metadata = {
  title: 'MediCare Pro — Hospital Management System',
  description: "India's own hospital management demo — built by an IITian developer.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pb-14 pt-7">
        <LeadCaptureModal />
        {children}
        <WhatsAppBar />
      </body>
    </html>
  )
}
