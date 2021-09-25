import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="login" onSubmit={this.onSubmitLoginForm}>
          <div className="login-details-container">
            <div className="login-elements">
              <img
                src="https://res.cloudinary.com/dqu21kv9o/image/upload/v1632551255/Frame_274_jpbpmr.png"
                alt="website login"
                className="login-logo"
              />
              <h1 className="logo-heading">Tasty Kitchens</h1>
              <h1 className="login-heading">Login</h1>
            </div>
            <label htmlFor="username" className="label-style">
              USERNAME
            </label>
            <input
              type="text"
              className="input-style"
              id="username"
              onChange={this.getUsername}
              value={username}
            />
            <br />
            <br />
            <label htmlFor="password" className="label-style">
              PASSWORD
            </label>
            <input
              type="password"
              className="input-style"
              id="password"
              onChange={this.getPassword}
              value={password}
            />
            {showSubmitError && <p className="error-message">{errorMsg}</p>}

            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
        <div className="login-image-container">
          <img
            src="https://res.cloudinary.com/dqu21kv9o/image/upload/v1632550350/Rectangle_1456_wmcd2c.png"
            alt="website logo"
            className="image"
          />
        </div>
      </div>
    )
  }
}

export default Login
