import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="home-container">
      <Header />
      <div className="text-con">
        <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
        <img
          className="home-img"
          alt="digital card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        />
      </div>
    </div>
  )
}
export default Home
