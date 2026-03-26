import TopBar from '@/components/TopBar'
import { DoctorBottomNav } from '@/components/BottomNav'
import ChatUI from '@/components/ChatUI'

export default function DoctorChat() {
  return (
    <>
      <div className="flex flex-col h-screen bg-slate-50 pb-16">
        <TopBar title="Chat" subtitle="Ananya Singh · Patient" />
        <div className="flex-1 overflow-hidden max-w-lg mx-auto w-full">
          <ChatUI doctorName="Ananya Singh" />
        </div>
      </div>
      <DoctorBottomNav />
    </>
  )
}
