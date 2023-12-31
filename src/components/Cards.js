import React, { useState } from 'react'

function Cards(props) {

    
  return (
    <>
       <div className="card m-3" style={{width:'210px',height:'410px', fontSize:'9px'}}>
            <img src={props.thumbnail}  height="120px" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.des}</p>
            </div>
            <ul className="list-group list-group-flush fs-6">
                <li className="list-group-item fw-bold">${props.price} |  {props.discount}% Off</li>
                <li className="list-group-item fw-bold">Ratings: {props.rating}</li>
                <li className="list-group-item text-success">Stocks: {props.stock}</li>
            </ul>
            <div style={{display:'flex',marginTop:'5px'}}>
                <button className='hover bg-primary rounded-start-2 border border-end-1 fs-7 w-50 p-1 text-light'>{props.stock?"Add to Cart":"Out Of Stock"}</button>
                <button className='hover bg-primary rounded-end-2 border border-start-1 fs-7 w-50 p-1 text-light' disabled={props.stock?false:true}>Buy Now</button>
            </div>
        </div>    
    </>
  )
}

export default Cards