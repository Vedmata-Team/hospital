'use client'
import { useState } from 'react'
import { Mic, MicOff, Video, VideoOff, Phone, MessageCircle, ScreenShare, MoreHorizontal } from 'lucide-react'

export default function VideoCallUI({ onClose }: { onClose: () => void }) {
  const [muted, setMuted] = useState(false)
  const [camOff, setCamOff] = useState(false)
  const [duration, setDuration] = useState('04:32')

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
      <div className="relative flex-1 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-6xl mx-auto mb-4 shadow-2xl">
            👩‍⚕️
          </div>
          <p className="text-white text-xl font-bold">Dr. Priya Sharma</p>
          <p className="text-slate-400 text-sm mt-1">Cardiologist</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-soft" />
            <span className="text-green-400 text-sm">{duration}</span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 w-24 h-32 bg-slate-700 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-600 flex items-center justify-center">
          {camOff ? (
            <div className="text-4xl">🙂</div>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-blue-900 to-slate-800 flex items-center justify-center text-3xl">🙂</div>
          )}
          <span className="absolute bottom-1 left-2 text-white text-[10px] font-medium">You</span>
        </div>
      </div>

      <div className="bg-slate-900 px-6 py-5 safe-area-bottom">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          <button onClick={() => setMuted(!muted)} className={`p-4 rounded-2xl ${muted ? 'bg-red-500' : 'bg-slate-700'}`}>
            {muted ? <MicOff size={22} className="text-white" /> : <Mic size={22} className="text-white" />}
          </button>
          <button onClick={() => setCamOff(!camOff)} className={`p-4 rounded-2xl ${camOff ? 'bg-red-500' : 'bg-slate-700'}`}>
            {camOff ? <VideoOff size={22} className="text-white" /> : <Video size={22} className="text-white" />}
          </button>
          <button onClick={onClose} className="p-5 rounded-full bg-red-500 shadow-lg">
            <Phone size={24} className="text-white rotate-[135deg]" />
          </button>
          <button className="p-4 rounded-2xl bg-slate-700">
            <MessageCircle size={22} className="text-white" />
          </button>
          <button className="p-4 rounded-2xl bg-slate-700">
            <MoreHorizontal size={22} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
