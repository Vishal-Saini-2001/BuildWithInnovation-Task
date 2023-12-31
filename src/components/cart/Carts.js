import React, { useState, useEffect, } from 'react'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import './Carts.css'
import CartItem from './CartItem'

function Carts() {

  const navigate = useNavigate();

  const [cookieValue, setCookieValue] = useState(Cookies.get('token'));
  const [isCookieExpired, setIsCookieExpired] = useState(false);

  const location = useLocation();
  const cart = location.state;


  useEffect(() => {
    const checkCookieExpiration = () => {

      const currentCookieValue = Cookies.get('token');
      setCookieValue(currentCookieValue);

      if (!currentCookieValue) {
        setIsCookieExpired(true);
      }
    };

    setInterval(() => {
      checkCookieExpiration();

    }, 50);

  }, [])


  {
    if (isCookieExpired) {
      return (
        <>
          <h1 style={{ textAlign: 'center', marginTop: '100px' }}>Your Session has been Expired</h1><br />
          <h3 style={{ textAlign: 'center' }}>Redirecting to login page in 5 seconds...</h3>
          {
            setTimeout(() => {
              navigate('../')
            }, 5000)

          }
        </>
      )
    } else {
      return (
        <>
          <div id="container">
              <div id="cartItems">
                {
                  cart.products.map((p) => {
                    return <CartItem

                      // For Cart Items
                      key={p.id}
                      thumbnail={p.thumbnail}
                      title={p.title}
                      desc={p.description}
                      price={p.price}
                      discount={p.discountPercentage}
                      discountedPrice={p.discountedPrice}
                      quantity={p.quantity}
                      total={p.total}

                    />
                  })
                }
              </div>
            <div id="total">
              <h3>Cart Total</h3>
              <hr />
              <br />
              <br />
              <div id="price-calculate">
                <table>
                  <tr>
                    <th>Total Products</th>
                    <td>{cart.totalProducts}</td>
                  </tr>
                  <tr>
                    <th>Total Quantity</th>
                    <td>{cart.totalQuantity}</td>
                  </tr>
                  <tr>
                    <th>Total Amount</th>
                    <td>${cart.total}</td>
                  </tr>
                  <tr>
                    <th>Total Discounted Amount:</th>
                    <th>${cart.discountedTotal}</th>
                  </tr>
                </table>
              </div>
              <br />
            </div>
          </div>


        </>
      )
    }
  }
}


export default Carts