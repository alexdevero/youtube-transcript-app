import { expect, afterEach, beforeAll, vi, MockInstance } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

beforeAll(() => {
  // This is a global setup for all tests
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  // Fix for "Error: Not implemented: window.computedStyle(elt, pseudoElt)"
  const { getComputedStyle } = window
  window.getComputedStyle = elt => getComputedStyle(elt)
})

afterEach(() => {
  cleanup()
})
