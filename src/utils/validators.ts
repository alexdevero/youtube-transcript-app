const YoutubeUrlPattern =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/watch\?v=.+$/

export const isValidYoutubeVideoUrl = (url: string) =>
  YoutubeUrlPattern.test(url)
