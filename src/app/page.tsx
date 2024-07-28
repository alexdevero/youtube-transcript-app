'use client'

import { useState } from 'react'

import { Button } from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import { YTResponseData } from '@/types/yt'

const saveToFile = (data: string, filename: string) => {
  const blob = new Blob([data], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('')

  const handleTranscribeDownload = async () => {
    try {
      const res = await fetch('/api', {
        body: JSON.stringify({ url: inputValue }),
        method: 'POST',
      })
      const data: YTResponseData = await res.json()

      if (data.transcription) {
        saveToFile(
          data.transcription,
          `${data.videoId ? `${data.videoId}-` : ''}transcription.txt`,
        )
      } else {
        console.error('Missing transcription data')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-medium mb-8 text-gray-400">
          Youtube transcribe app
        </h1>
        <Input
          className="mb-7"
          placeholder="Enter youtube video link"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <Button onClick={handleTranscribeDownload}>
          Download transcription
        </Button>
      </div>
    </main>
  )
}
