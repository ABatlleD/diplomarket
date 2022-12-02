import { useEffect, useState } from 'react'

function useScrollY() {
  const [scrollY, setScrollY] = useState(0)

  // ? Controlar posición del scroll en tiempo real
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollY
}

export default useScrollY
