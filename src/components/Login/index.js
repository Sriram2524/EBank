import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {email: '', pin: '', showSubmitError: false, errorMsg: ''}

  onChangeUserId = event => {
    this.setState({email: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, pin} = this.state
    const userDetails = {user_id: email, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {email, pin, showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="img-container">
            <img
              className="login-img"
              alt="website login"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            />
          </div>
          <div className="form-containter">
            <h1 className="login-heading">Welcome Back!</h1>
            <form onSubmit={this.submitForm} className="form">
              <label className="label" htmlFor="email">
                User ID
              </label>
              <input
                onChange={this.onChangeUserId}
                placeholder="Enter User ID"
                className="input"
                type="text"
                value={email}
                id="email"
              />
              <label className="label" htmlFor="pin">
                PIN
              </label>
              <input
                onChange={this.onChangePin}
                placeholder="Enter PIN"
                className="input"
                type="password"
                value={pin}
                id="pin"
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
