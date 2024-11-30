import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }
  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCart = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredCart})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCart = cartList.map(each =>
      each.id === id ? {...each, quantity: each.quantity + 1} : each,
    )
    this.setState({cartList: updatedCart})
  }
  decrementCartItemQuantity = (id,quantity) => {
    const {cartList} = this.state
    if(quantity>1){
    const updatedCart = cartList.map(each =>
      each.id === id ? {...each, quantity: each.quantity - 1} : each,
    )
    this.setState({cartList: updatedCart})
    }else{
      const filteredCart = cartList.filter(each => each.id !== id)
      this.setState({cartList: filteredCart})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {id, quantity} = product
    const findProduct = cartList.find(each => each.id === id)
    if (findProduct) {
      const updatedCart = cartList.map(each =>
        each.id === id ? {...each, quantity: each.quantity + quantity} : each,
      )
      this.setState({cartList: updatedCart})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
