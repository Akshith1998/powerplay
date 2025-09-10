import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage<T>(key:string, initial:T){
  const [state, setState] = useState<T>(()=>{
    try{
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) as T : initial
    }catch(e){
      console.warn('localStorage read error', e)
      return initial
    }
  })

  useEffect(()=>{
    try{
      localStorage.setItem(key, JSON.stringify(state))
    }catch(e){
      console.warn('localStorage write error', e)
    }
  },[key,state])

  const set = useCallback((next:T)=> setState(next),[])
  return [state, set] as const
}
