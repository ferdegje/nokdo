import React from "react"
import { Link } from "gatsby"


class DefaultLayout extends React.Component {
  render() {
    return (
      <div
        style={{
          margin: `0 auto`,
        }}
      >
        <Link style={{ textDecoration: `none` }} to="/">
          <h3>
            Example of adding client only paths
          </h3>
        </Link>
        {this.props.children}
      </div>
    )
  }
}

export default DefaultLayout