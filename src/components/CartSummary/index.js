// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const total = cartList.reduce(
        (tot, each) => each.price * each.quantity + tot,
        0,
      )
      const cartItems = cartList.length
      return (
        <div className="cartsummary">
          <h1>Order Total: Rs {total}/-</h1>
          <p>{cartItems} Items in cart</p>
          <button className="checkout">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
