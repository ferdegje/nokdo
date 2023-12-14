import React from "react"
import { Link } from "gatsby"


class DefaultLayout extends React.Component {
  render() {
    return (
      <div
        style={{
          margin: `0 auto`,
          marginTop: rhythm(1.5),
          marginBottom: rhythm(1.5),
          maxWidth: 650,
          paddingLeft: rhythm(3 / 4),
          paddingRight: rhythm(3 / 4),
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