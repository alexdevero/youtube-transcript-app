import { isValidYoutubeVideoUrl } from '../validators'

test.each([
  ['https://www.youtube.com/watch?v=12345678901', true],
  ['https://www.youtube.com/watch?v=12345678901&list=PL1234567890', true],
  ['https://www.youtube.com/watch?v=ABCD1234', true],
  ['https://www.youtube.com/', false],
  ['https://www.youtube.com/watch?v', false],
  ['https://www.google.com', false],
  ['', false],
])('isValidYoutubeUrl(%s) should return %s', (url, expected) => {
  expect(isValidYoutubeVideoUrl(url)).toBe(expected)
})
