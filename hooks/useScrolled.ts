import { useEffect, useState } from 'react'

/**
 * Returns true if the window is scrolled vertically.
 */
export function useScrolled(offset = 0) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > offset)
    }

    handleScroll() // set initial state

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset])

  return scrolled
}
