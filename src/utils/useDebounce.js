import { useEffect, useMemo, useRef } from "react"


const useDebounce = (callback) => {
	const ref = useRef(callback)

  useEffect(() => {
    ref.current = callback
  }, [callback])

  const debounce = (callback, delay) => {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        callback(...args)
      }, delay)
    }
  }

  const debouncedCallback = useMemo(() => {
    const f = () => {
      ref.current?.()
    }
    return debounce(f, 1000)
	}, [])
	
	return debouncedCallback
}

export default useDebounce;