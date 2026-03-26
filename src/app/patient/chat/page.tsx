import TopBar from '@/components/TopBar'
import { PatientBottomNav } from '@/components/BottomNav'
import ChatUI from '@/components/ChatUI'

export default function PatientChat() {
  return (
    <>
      <div className="flex flex-col h-screen bg-slate-50 pb-16">
        <TopBar title="Chat" subtitle="Dr. Priya Sharma" />
        <div className="flex-1 overflow-hidden max-w-lg mx-auto w-full">
          <ChatUI doctorName="Dr. Priya Sharma" />
        </div>
      </div>
      <PatientBottomNav />
    </>
  )
}
