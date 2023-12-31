import './Home.css';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Cards from './Cards';
import Navbar from './navbar/Navbar';


function Home() {

    const navigate = useNavigate();
    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(1);

    const [budget, setBudget] = useState("");
    const [search, setSearch] = useState("");

    const [budgetFilteredProducts, setBudgetFilteredProducts] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    const [products, setProducts] = useState([]);
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
            await fetch(`https://dummyjson.com/products?limit=25&skip=${skip}`)
                .then(res => res.json())
                .then(data => setProducts(data.products));
        }

        fetchProducts();

    }, [skip]);

    const gotoPreviousPage = () => {
        setSkip(skip - 25);
        setPage(page - 1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const gotoNextPage = () => {
        setSkip(skip + 25);
        setPage(page + 1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handleProductChange = (e) => {
        setSearch(e.target.value)
    }

    const handleBudgetChange = (e) => {
        setBudget(e.target.value);
    }

    const handleBudgetFilter = async (e) => {
        if (!budget) {
            alert(
                "Enter budget first"
            )
        } else {
        e.preventDefault();
            const b = parseInt(budget);
            const data = await fetch('https://dummyjson.com/products?limit=0');
            const jsonData = await data.json();
            const allProducts = jsonData.products;
            const filteredProducts = allProducts.filter((p, i) => {
                if (p.price <= b) {
                    return p
                }
            });
            setBudgetFilteredProducts(filteredProducts);
            setFilterApplied(true);
        }
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })

    }

    const removeFilter = () => {
        setFilterApplied(false);
        setBudgetFilteredProducts([]);
        console.log("Filtered Products:",budgetFilteredProducts);
        console.log("Filter Applied:",filterApplied);
    }


    const handleFilterSearchedProducts = (e) => {
        e.preventDefault();
        if (!search) {
            alert("Please enter some product name")
        }
        else navigate('./filteredProducts/FilterBySearch', { state: search })
    }

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
        }
        else
            return (
                <>
                    <Navbar />

                    <div className="d-flex">
                        <div id="filter">
                            <div style={{ position: 'fixed', padding: '10px' }}>
                                <h4>Filter</h4>
                                <br />
                                <label htmlFor="budgetText">Budget</label>
                                <form onSubmit={handleBudgetFilter}>
                                    <div id='budget'>
                                        <span className="bg-dark text-light ps-1 pe-1">$</span>
                                        <input type="text" onChange={handleBudgetChange} id="budgetText" name="budget" />
                                    </div>

                                    <button type="submit" className='btn btn-primary mt-3 w-75'>Apply</button>
                                </form>
                                <br />
                                <button className="btn btn-danger" onClick={removeFilter}>Remove Filter</button>
                            </div>

                        </div>

                        <div id="products">
                            <form onSubmit={handleFilterSearchedProducts}>
                                <div className="input-group m-3 w-50">
                                    <input onChange={handleProductChange} value={search} type="text" name="search" className="form-control" placeholder="Search" />
                                    <button className="btn btn-primary" type="submit" >Search</button>
                                </div>
                            </form>
                            {
                                (!filterApplied) &&
                                <div id="cards">
                                    {
                                        products.map((p) => {
                                            return <Cards
                                                key={p.id}
                                                title={p.title}
                                                price={p.price}
                                                des={p.description}
                                                rating={p.rating}
                                                stock={p.stock}
                                                id={p.id}
                                                thumbnail={p.thumbnail}
                                                discount={p.discountPercentage}

                                            />
                                        })
                                    }
                                </div>
                            }
                            {
                                filterApplied &&
                                <div id="cards">
                                    {
                                        budgetFilteredProducts.map((p) => {
                                            return <Cards
                                                key={p.id}
                                                title={p.title}
                                                price={p.price}
                                                des={p.description}
                                                rating={p.rating}
                                                stock={p.stock}
                                                id={p.id}
                                                thumbnail={p.thumbnail}
                                                discount={p.discountPercentage}

                                            />
                                        })
                                    }
                                </div>

                            }
                            {
                                !budgetFilteredProducts &&
                                <div className="container">
                                    <button disabled={page === 1 ? true : false} onClick={gotoPreviousPage} className="btn btn-dark m-1">Previous</button>
                                    <button disabled={page === 4 ? true : false} onClick={gotoNextPage} className="btn btn-dark m-1">Next</button>
                                </div>
                            }


                        </div>
                    </div>
                </>
            )
    }


}

export default Home