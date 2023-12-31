import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Navbar() {

    const navigate = useNavigate();
    const [cart, setCart] = useState({});

    useEffect(() => {

        const fetchCarts = () => {

            fetch('https://dummyjson.com/carts/user/15')
                .then(res => res.json())
                .then(re => setCart(re.carts[0]));
        }

        fetchCarts();

    }, []);

    const handleCartButtonClick = () => {
        navigate('/home/cart', { state: cart })
    }

    const handleLogout = () => {
        Cookies.remove('token')
    }

    return (
        <>
            <div className="alert alert-success d-flex justify-content-center align-items-center" role="alert">
                <div>
                    Successfully logged in!! Your session is started and will end after 5 minutes automatically.
                </div>
            </div>
            <nav className="navbar bg-primary " data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Vishal Saini</a>
                    <div className=" float-end me-3">
                        <button onClick={handleLogout} className='btn btn-danger m-3'>Logout</button>
                        <button type="button" onClick={handleCartButtonClick} className="btn btn-dark position-relative">
                            <i className='bi bi-cart'></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cart.totalProducts}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar