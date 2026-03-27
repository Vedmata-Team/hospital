import type { Metadata } from 'next'
import './globals.css'
import WhatsAppBar from '@/components/WhatsAppBar'
import LeadCaptureModal from '@/components/LeadCaptureModal'

const BASE_URL = 'https://hospital.vmdonline.cloud'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'MediCare Pro — Hospital Management System for Indian Clinics',
    template: '%s | MediCare Pro',
  },
  description:
    'Get more patients & manage your clinic easily in 7 days. Smart appointments, doctor chat, video consultations & analytics. Built by an IITian developer. Starting ₹9,999.',
  keywords: [
    'hospital management system India',
    'clinic management software',
    'hospital software India',
    'doctor appointment system',
    'patient management system',
    'hospital management system',
    'clinic software India',
    'IITian developer hospital software',
  ],
  authors: [{ name: 'MediCare Pro' }],
  creator: 'MediCare Pro',
  publisher: 'MediCare Pro',

  // Canonical
  alternates: {
    canonical: BASE_URL,
  },

  // Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph — controls how link looks on WhatsApp, Facebook, LinkedIn
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'MediCare Pro',
    title: 'MediCare Pro — Get More Patients & Manage Your Clinic in 7 Days',
    description:
      'Smart hospital management system for Indian clinics. Appointments, doctor chat, video calls, analytics. Starting ₹9,999. Free demo available.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MediCare Pro — Hospital Management System',
      },
    ],
    locale: 'en_IN',
  },

  // Twitter / X Card
  twitter: {
    card: 'summary_large_image',
    title: 'MediCare Pro — Hospital Management System',
    description:
      'Get more patients & manage your clinic in 7 days. Starting ₹9,999.',
    images: ['/og-image.png'],
  },

  // Search Console & Bing Webmaster verification
  // Replace these values after you verify ownership
  verification: {
    google: 'REPLACE_WITH_GOOGLE_VERIFICATION_CODE',
    other: {
      'msvalidate.01': 'REPLACE_WITH_BING_VERIFICATION_CODE',
    },
  },
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
