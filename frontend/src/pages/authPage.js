import React, {useEffect, useState} from 'react'
import 'materialize-css'

import useFetch from 'hooks/useFetch'

const AuthPage = () => {

  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')

  const apiUrl = '/users/login'
  const apiUrlReg = '/users/register'
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
  const [{responseReg, isLoadingReg, errorReg}, doFetchReg] = useFetch(apiUrlReg)
  const handleLogin = (event) => {
    event.preventDefault()
    console.log('login', login, pass);
    doFetch({
      method: 'post',
      data: { 
        login: login, 
        password: pass 
      }
    })
  }
  const handleReg = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    if(!response) {
      return
    }
    console.log('response login', response);
  }, [response])

  return (
    <div className="container">
      <div className="row">
        <h3 className="col s6 offset-s3">Login</h3>
        <form className="col s6 offset-s3">
  
          <div className="row">
            <div className="input-field col s12">
              <input 
                id="email" 
                type="email" 
                className="validate"
                value={login}
                onChange={e => setLogin(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input 
                  id="password" 
                  type="password" 
                  className="validate"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                />
                <label htmlFor="password">Password</label>
            </div>
          </div>
  
          <div className="row">
            <div className="col s6">
              <button 
                className="waves-effect waves-light btn"
                onClick={handleLogin}
              >Login</button>
            </div>
            <div className="col s6">
              <button 
                className="waves-effect waves-light btn"
                onClick={handleReg}
              >Регистрация</button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default AuthPage
