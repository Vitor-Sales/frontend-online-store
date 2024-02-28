import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../../services/api';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

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

  const handleAddToCart = (product: Product) => {
    const storedCart = localStorage.getItem('cart');
    const currentCart: Product[] = storedCart ? JSON.parse(storedCart) : [];

    currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    setCartItems(currentCart);
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
        Array.isArray(products) && products.map((product) => (
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
        ))
        }
      </div>
    </>
  );
}

export default CategoriesList;
