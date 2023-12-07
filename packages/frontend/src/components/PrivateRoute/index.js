import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn, handleLogin } from "../../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/login`) {
    handleLogin('john', 'pass')
    navigate("/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute