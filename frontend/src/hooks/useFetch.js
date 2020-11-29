import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'

import useLocalStorage from 'hooks/useLocalStorage'

export default (url) => {
  //const baseUrl = 'https://conduit.productionready.io/api'
  const baseUrl = '/api' //(docker service)
  //const baseUrl = ''; //'http://127.0.0.1:3101'
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  const [token] = useLocalStorage('token')

  const doFetch = useCallback( (options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    let skip = false
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      }
    }
    if (!isLoading) {
      return;
    }
    console.log('useEffect-fetch');
    axios(baseUrl + url, requestOptions)
      .then(res => {
        //console.log('success');
        if(!skip) {
          setIsLoading(false)
          setResponse(res.data)
        }
      }).catch(error => {
        //console.log('error', error.response);
        if(!skip) {
          setIsLoading(false)
          if(error.response) {
            setError(error.response.data)
          }
        }
      })

    return () => {
      skip = true
    }  
  }, [isLoading, options, url])



  return [{response, isLoading, error}, doFetch]
}