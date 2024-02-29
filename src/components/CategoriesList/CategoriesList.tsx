import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../../services/api';
import { useCarrinho } from '../CarrinhoContext/CarrinhoContext';

interface Category {
  id: string;
  name: string;
}

interface ProductType {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const { dispatch, carrinho } = useCarrinho();

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
      fetchCategories();
    }
  }, [categoriesList]);

  const handleCategoryClick = async (categoryId: string) => {
    try {
      const productsData = await getProductsFromCategoryAndQuery(categoryId, '');
      setProducts(productsData.results);
    } catch (error) {
      console.error('Erro ao obter produtos da categoria:', error);
    }
  };

  const handleAddToCart = (product: ProductType) => {
    const existingItem = carrinho.find((item) => item.id === product.id);
    if (existingItem) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: product.id, quantity: 1 } });
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
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
        {Array.isArray(products) && products.map((product) => (
          <div key={ product.id } className="cardProducts" data-testid="product">
            <Link
              to={ `/product/${product.id}` }
              state={ {
                title: product.title,
                price: product.price,
                image: product.thumbnail,
              } }
              data-testid="product-detail-link"
            >
              <p>{product.title}</p>
              <p>{product.price}</p>
              <img src={ product.thumbnail } alt={ product.title } />
            </Link>
            <button
              data-testid="product-add-to-cart"
              onClick={ () => handleAddToCart(product) }
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoriesList;
