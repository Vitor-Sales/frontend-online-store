import { Route, Routes } from 'react-router-dom';
import './App.css';
import Carrinho from './components/Carrinho/Carrinho';
import Layout from './components/Layout';
import Search from './components/Search/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={ <Layout /> }>
          <Route path="/" element={ <Search /> } />
          <Route path="/Carrinho" element={ <Carrinho /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
