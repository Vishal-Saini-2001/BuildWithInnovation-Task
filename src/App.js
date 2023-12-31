import './App.css';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import FilterBySearch from './components/filteredProducts/FilterBySearch';
import Carts from './components/cart/Carts'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginPage/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/home/filteredProducts/FilterBySearch' element={<FilterBySearch/>}/>
          <Route exact path='/home/cart' element={<Carts/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
