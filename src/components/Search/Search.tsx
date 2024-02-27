import CategoriesList from '../CategoriesList/CategoriesList';

function Search() {
  return (
    <>
      <CategoriesList />
      <input
        type="search"
      />
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    </>
  );
}

export default Search;
