import { useState } from 'react'

export default function useLocalStorage<T>(key : string, value : T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : value
    } catch (error) {
      console.log(error)
      return value
    }
  })

  const setValue = (value:T) => {
    try {
      const valueStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueStore)
      window.localStorage.setItem(key, JSON.stringify(valueStore))
    } catch (error) {
      console.log(error)
    }
  };

  return [storedValue, setValue] as const
}