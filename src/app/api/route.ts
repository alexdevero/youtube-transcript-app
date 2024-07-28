import { type TranscriptResponse, YoutubeTranscript } from 'youtube-transcript'

const extractTranscription = (ytTranscription?: TranscriptResponse[]) => {
  if (!ytTranscription) return ''

  const transcription = ytTranscription
    .map(line => line.text)
    .join(' ')
    .replace(/(?:\r\n|\r|\n)/g, ' ')
  return transcription
}

export async function POST(request: Request) {
  const { url } = (await request.json()) as { url?: string }
  const videoId = url?.split('?v=')[1]

  if (!videoId) {
    return Response.json('Invalid youtube video link', {
      headers: { 'content-type': 'application/json' },
      status: 400,
    })
  }

  const ytTranscription = await YoutubeTranscript.fetchTranscript(videoId)

  return Response.json(
    {
      videoId,
      transcription: extractTranscription(ytTranscription),
    },
    {
      headers: { 'content-type': 'application/json' },
      status: 200,
    },
  )
}
