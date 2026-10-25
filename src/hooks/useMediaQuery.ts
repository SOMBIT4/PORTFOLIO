import { useEffect, useState } from 'react'
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const callback = () => setMatches(media.matches)
    media.addEventListener('change', callback)
    return () => media.removeEventListener('change', callback)
  }, [query])
  return matches
}
