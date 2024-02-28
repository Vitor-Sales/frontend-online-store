import { Route, Routes } from 'react-router-dom';
import './App.css';
import Carrinho from './components/Carrinho/Carrinho';
import Layout from './components/Layout';
import Search from './components/Search/Search';
import Product from './components/Product/Product';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={ <Layout /> }>
          <Route path="/" element={ <Search /> } />
          <Route path="/Carrinho" element={ <Carrinho /> } />
          <Route path="/product/:id" element={ <Product /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
