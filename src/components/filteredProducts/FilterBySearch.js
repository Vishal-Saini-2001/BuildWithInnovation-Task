import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { Navigate, useLocation } from 'react-router-dom';
import SearchedCards from './SearchedCards';
import './FilterBySearch.css'

function FilterBySearch() {

    const location = useLocation();
    const search = location.state;

    const [searchProducts,setSearchProducts] = useState([]);

    const [cookieValue, setCookieValue] = useState(Cookies.get('token'));
    const [isCookieExpired, setIsCookieExpired] = useState(false);
  
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

        const fetchProducts = async () => {
            console.log(search);
            await fetch(`https://dummyjson.com/products/search?q=${search}`)
            .then(res => res.json())
            .then(data => setSearchProducts(data.products));
        }

        fetchProducts();

    },[search]);

    {
        if(isCookieExpired){
            return(
                <>
                    <h1 style={{textAlign:'center',marginTop:'100px'}}>Your Session has been Expired</h1><br />
                    <h3 style={{textAlign:'center'}}>Redirecting to login page in 5 seconds...</h3>
                    {
                       setTimeout(() => {
                        Navigate('../')
                       }, 5000)

                    }
                </>
            )
        }else
        {
            return(
                <>                
                {    
                    searchProducts.map((p)=>{
                        return <SearchedCards
                        key={p.id}
                        thumbnail={p.thumbnail}
                        title={p.title}
                        desc={p.description}
                        price={p.price}
                        discount={p.discountPercentage}
                        stock={p.stock}
                        rating={p.rating}                       
                        />
                    })
                }
                </>
            )
        }
        
       
    }
}

export default FilterBySearch