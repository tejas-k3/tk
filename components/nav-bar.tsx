"use client"

import { useState } from "react"
import { FileText } from "lucide-react" // Using Lucide React icon

interface NavBarProps {
  onResumeToggle: () => void
  isResumeMode: boolean
}

export default function NavBar({ onResumeToggle, isResumeMode }: NavBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Tejas Kothari</div>
      <button
        onClick={onResumeToggle}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
      >
        <FileText size={18} />
        {isResumeMode ? "View Portfolio" : "View Resume"}
      </button>
    </div>
  )
}