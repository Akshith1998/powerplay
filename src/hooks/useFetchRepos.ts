import { useEffect, useState } from 'react'
import { searchRepos } from '../services/github.service'
import type { CardTypes } from '../types'

export const useFetchRepos=(query:string)=>{
  const [data,setData] = useState<CardTypes[] | undefined>(undefined)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState<string | null>(null)

  useEffect(()=>{
    if(!query || query.trim() === ''){
      setData(undefined)
      setLoading(false)
      setError(null)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    searchRepos(query, 30, 1, { signal: controller.signal })
      .then(res => {
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        if(err.name === 'AbortError') return
        setError(err.message || 'Failed to fetch')
        setLoading(false)
      })

    return ()=> controller.abort()
  },[query])

  return { data, loading, error }
}
