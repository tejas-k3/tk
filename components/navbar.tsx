"use client"

import { useState } from "react"
import { FileText } from "lucide-react"

interface NavBarProps {
  onToggleResume: () => void
  isResumeMode: boolean
}

export default function NavBar({ onToggleResume, isResumeMode }: NavBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Tejas Kothari</h1>
      <button
        onClick={onToggleResume}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-all"
      >
        <FileText size={20} />
        {isResumeMode ? "View Portfolio" : "View Resume"}
      </button>
    </div>
  )
}