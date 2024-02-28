import { useState, useEffect } from 'react';
import { getProductsFromCategoryAndQuery, getCategories } from '../../services/api';

interface Category {
  id: string;
  name: string;
}

function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategoriesList(categoriesData);
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    };

    if (categoriesList.length === 0) {
      console.log(categoriesList);
      fetchCategories();
    }
  }, [categoriesList]);

  const handleCategoryClick = async (categoryId: string) => {
    try {
      const productsData = await getProductsFromCategoryAndQuery(categoryId, '');
      // console.log('Produtos:', productsData);
      setProducts(productsData.results);
    } catch (error) {
      console.error('Erro ao obter produtos da categoria:', error);
    }
  };

  return (
    <>
      <div>
        {categoriesList.map((category) => (
          <button
            key={ category.id }
            onClick={ () => handleCategoryClick(category.id) }
            data-testid="category"
          >
            {category.name}
          </button>
        ))}

      </div>

      <div>
        {
    Array.isArray(products) && products.map((product, index) => (
      <div className="cardProducts" key={ index } data-testid="product">

        <p>{product.title}</p>
        <p>{product.price}</p>
        <img src={ product.thumbnail } alt={ product.title } />

      </div>
    ))
}
      </div>

    </>

  );
}

export default CategoriesList;
