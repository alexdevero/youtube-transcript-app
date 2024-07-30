import { act, fireEvent, render } from '@testing-library/react'
import { Homepage } from '../Homepage'

describe('Homepage', () => {
  it('should render', () => {
    const { baseElement } = render(<Homepage />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render page title', () => {
    const { getByText } = render(<Homepage />)
    expect(getByText('Youtube transcript downloader app')).toBeInTheDocument()
  })

  it('should render page description', () => {
    const { getByText } = render(<Homepage />)
    expect(
      getByText(
        'Paste your Youtube video link in the input below to get its transcription. The transcription will be saved as a .txt file.',
      ),
    ).toBeInTheDocument()
  })

  it('should render input', () => {
    const { getByPlaceholderText } = render(<Homepage />)
    expect(getByPlaceholderText('Enter Youtube video link')).toBeInTheDocument()
  })

  it('should render submit button', () => {
    const { getByText } = render(<Homepage />)
    expect(getByText('Download transcript')).toBeInTheDocument()
  })

  it('should disable submit button when input is empty', () => {
    const { getByText } = render(<Homepage />)
    expect(getByText('Download transcript')).toBeDisabled()
  })

  it('should enable submit button when input is not empty', () => {
    const { getByText, getByPlaceholderText } = render(<Homepage />)
    const input = getByPlaceholderText('Enter Youtube video link')
    const button = getByText('Download transcript')

    act(() => {
      fireEvent.change(input, {
        target: { value: 'https://www.youtube.com/watch?v=123456' },
      })
    })

    expect(button).not.toBeDisabled()
  })

  it('should disable submit button when input is empty after being not empty', () => {
    const { getByText, getByPlaceholderText } = render(<Homepage />)
    const input = getByPlaceholderText('Enter Youtube video link')
    const button = getByText('Download transcript')

    act(() => {
      fireEvent.change(input, {
        target: { value: 'https://www.youtube.com/watch?v=123456' },
      })
    })

    act(() => {
      fireEvent.change(input, {
        target: { value: '' },
      })
    })

    expect(button).toBeDisabled()
  })

  it('should render error message when input is invalid', () => {
    const { getByText, getByPlaceholderText } = render(<Homepage />)
    const input = getByPlaceholderText('Enter Youtube video link')

    act(() => {
      fireEvent.change(input, {
        target: { value: 'invalid input' },
      })
    })

    act(() => {
      fireEvent.click(getByText('Download transcript'))
    })

    expect(getByText('Invalid Youtube video link')).toBeInTheDocument()
  })
})
