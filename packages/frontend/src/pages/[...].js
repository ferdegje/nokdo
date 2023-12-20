import React from "react"
import { Router, Link, Location } from "@reach/router"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import IndexPage from '../app/pages/index'
import ShopPage from '../app/pages/shop'
import SignupPage from '../app/pages/signup'
import ProductSample from '../app/pages/product/sample'
import Blog from '../app/pages/blog'
import BlogSample from '../app/pages/blog/sample'
import About from '../app/pages/about'
import AccountFavorites from '../app/pages/account/favorites'
import Login from '../app/pages/login'
import Cart from '../app/pages/cart'
import AccountSuccess from "../app/pages/accountSuccess"

import PrivateRoute from "../components/privateRoute"

const App = () => (

    <Router>
    <IndexPage path='/' />
    <PrivateRoute path='/shop' component={ShopPage}/>
    <SignupPage path='/signup' />
    <ProductSample path='/product/sample' />
    <Blog path='/blog' />
    <BlogSample path='/blog/sample' />
    <About path='/about' />
    <AccountFavorites path='/account/favorites' />
    <Login path='/login' />
    <Cart path='/cart' />
    <AccountSuccess path='/accountSuccess' />
    </Router>
)

// const FadeTransitionRouter = props => (
//   <Location>
//     {({ location }) => (
//       <TransitionGroup className="transition-group">
//         <CSSTransition key={location.key} classNames="fade" timeout={500}>
//           {/* the only difference between a router animation and
//               any other animation is that you have to pass the
//               location to the router so the old screen renders
//               the "old location" */}
//           <Router location={location} className="router">
//             {props.children}
//           </Router>
//         </CSSTransition>
//       </TransitionGroup>
//     )}
//   </Location>
// )

// const Page = props => (
//   <div
//     className="page"
//     style={{ background: `hsl(${props.page * 75}, 60%, 60%)` }}
//   >
//     {props.page}
//   </div>
// )

export default App