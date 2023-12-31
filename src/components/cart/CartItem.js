import React from 'react'

function CartItem(props) {
  return (

    <>

      <div className="card mt-3 h-auto" style={{width: '15rem'}}>
        <img src={props.thumbnail} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.desc}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">${props.price}</li>
          <li className="list-group-item">Quantity: {props.quantity}</li>
          <li className="list-group-item"><s>${props.total}</s> <p className='text-success'>${props.discountedPrice}</p> {props.discount}% Off</li>
        </ul>
      </div>

    </>
  )
}

export default CartItem