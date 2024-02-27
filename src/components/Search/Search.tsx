import { useState, useEffect } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';
import { getProductsFromCategoryAndQuery } from '../../services/api';

function Search() {
  const [products, setProducts] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const handleSearch = async () => {
    try {
      const response = await getProductsFromCategoryAndQuery('', query);
      setProducts(response.results);
      console.log(response.results);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    if (query.trim() !== '') {
      handleSearch();
    }
  }, [query]);
  return (
    <>
      <CategoriesList />
      <h1 className="title">Listagem de produtos</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Digite o nome do produto"
          value={ query }
          onChange={ (e) => setQuery(e.target.value) }
          data-testid="query-input"
        />
        <button type="button" onClick={ handleSearch } data-testid="query-button">
          Buscar
        </button>
      </div>
      <p data-testid="home-initial-message" className="no-products-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      {products.length > 0 && (
        <div>
          <h2>Resultados da pesquisa:</h2>
          <ul>
            {Array.isArray(products) && products.map((product, index) => (
              <li key={ index } data-testid="product">{product.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Search;
