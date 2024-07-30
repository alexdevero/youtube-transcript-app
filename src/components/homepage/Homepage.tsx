'use client'

import { type FC, useState } from 'react'

import { Button } from '@/components/button/Button'
import { Input } from '@/components/input/Input'
import { useGetYTTranscription } from '@/hooks/use-get-yt-transcription'
import { isValidYoutubeVideoUrl } from '@/utils/validators'

const saveToFile = (data: string, filename: string) => {
  const blob = new Blob([data], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}

export const Homepage: FC = () => {
  const { loading, handleYTRequest } = useGetYTTranscription()
  const [ytUrl, setYTUrl] = useState<string>('')
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false)

  const handleTranscribeDownload = async () => {
    try {
      const isYTUrlValid = isValidYoutubeVideoUrl(ytUrl)

      if (!isYTUrlValid) {
        setIsInputInvalid(true)
        return
      }

      setIsInputInvalid(false)

      const data = await handleYTRequest(ytUrl)

      if (data?.transcription) {
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
          Youtube transcript downloader app
        </h1>

        <p className="text-gray-400 mb-7 max-w-96 text-center">
          Paste your Youtube video link in the input below to get its
          transcription. The transcription will be saved as a .txt file.
        </p>

        <Input
          className="mb-7"
          placeholder="Enter Youtube video link"
          value={ytUrl}
          onChange={e => setYTUrl(e.target.value)}
        />
        {isInputInvalid && (
          <p className="text-red-500 text-sm mb-7">
            Invalid Youtube video link
          </p>
        )}
        <Button
          disabled={loading || !ytUrl.length}
          onClick={handleTranscribeDownload}
        >
          Download transcript
        </Button>
      </div>
    </main>
  )
}
