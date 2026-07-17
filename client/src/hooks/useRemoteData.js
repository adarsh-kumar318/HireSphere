import { useEffect, useState } from 'react'

export const useRemoteData = (loader, fallback) => {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    Promise.resolve()
      .then(() => {
        if (isMounted) {
          setLoading(true)
        }
        return loader()
      })
      .then((response) => {
        if (isMounted) {
          setData(response?.data || response || fallback)
          setError('')
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setData(fallback)
          setError(requestError.response?.data?.message || 'Showing sample data until the API responds.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [fallback, loader])

  return { data, loading, error }
}
