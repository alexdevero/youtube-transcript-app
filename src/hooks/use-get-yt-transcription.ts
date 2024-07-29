import { YTResponseData } from '@/types/yt'
import { useState } from 'react'

export const useGetYTTranscription = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<YTResponseData | null>(null)

  const handleYTRequest = async (url: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api', {
        body: JSON.stringify({ url }),
        method: 'POST',
      })
      const data = (await res.json()) as YTResponseData
      setLoading(false)
      setData(data)
      return data
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  return {
    data,
    loading,
    handleYTRequest,
  }
}
