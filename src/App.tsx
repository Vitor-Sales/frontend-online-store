import { Route, Routes } from 'react-router-dom';
import { CarrinhoProvider } from './components/CarrinhoContext/CarrinhoContext';
import './App.css';
import Carrinho from './components/Carrinho/Carrinho';
import Layout from './components/Layout';
import Search from './components/Search/Search';
import Product from './components/Product/Product';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <div className="App">
      <CarrinhoProvider>
        <Routes>
          <Route element={ <Layout /> }>
            <Route path="/" element={ <Search /> } />
            <Route path="/Carrinho" element={ <Carrinho /> } />
            <Route path="/product/:id" element={ <Product /> } />
            <Route path="/checkout" element={ <Checkout /> } />
          </Route>
        </Routes>
      </CarrinhoProvider>
    </div>
  );
}

export default App;
