import React from 'react'

function SearchedCards(props) {
  return (
    <div className="card mb-3 ps-4">
        <div className="row g-0">
            <div className="col-md-4 p-2">
                <img src={props.thumbnail} className="img-fluid rounded-start h-75 mt-3" alt="..."/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.desc}</p>
                    <p className="card-text fw-bold">$ {props.price}</p>
                    <p className="card-text"><span className='fw-bold'>Ratings:</span> {props.rating}</p>
                    <p className="card-text">{props.discount}% Off</p>
                    <p className="card-text text-success">{props.stock?"In Stock":"Currently Out of Stock"}</p>
                    <p className="card-text"><small className="text-body-secondary">Last updated {Math.floor((Math.random()*30)+1)} mins ago</small></p>
                </div>
                <div id="buttons">
                    <button className='btn btn-primary'>{props.stock?"Add to Cart":"Out Of Stock"}</button>
                    <button className='btn btn-primary' disabled={props.stock?false:true}>Buy Now</button>

                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchedCards