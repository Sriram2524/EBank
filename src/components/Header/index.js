import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <div className="header-container">
      <img
        className="logo"
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
      />
      <button onClick={onClickLogout} className="button" type="button">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
