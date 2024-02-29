import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

type ProductType = {
  id: string;
  title: string;
  price: number;
  image: string;
};

interface ProductTypeWithQuantity extends ProductType {
  quantity: number;
}

function Product() {
  const location = useLocation();
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);

  const handleAddToCart = () => {
    if (productDetail) {
      const storedCart = localStorage.getItem('cart');
      const currentCart: ProductTypeWithQuantity[] = storedCart ? JSON
        .parse(storedCart) : [];
      const existingProductIndex = currentCart
        .findIndex((item) => item.id === productDetail.id);

      if (existingProductIndex !== -1) {
        const updatedCart = [...currentCart];
        updatedCart[existingProductIndex]
          .quantity = (updatedCart[existingProductIndex].quantity || 0) + 1;
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        const updatedCart = [...currentCart, { ...productDetail, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    }
  };

  if (!location.state) {
    return <div>Nenhum detalhe do produto disponível.</div>;
  }

  const { title, price, image } = location.state as ProductType;

  return (
    <div>
      <h2 data-testid="product-detail-name">{title}</h2>
      <p data-testid="product-detail-price">{price}</p>
      <img data-testid="product-detail-image" src={ image } alt={ `Foto: ${title}` } />

      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => {
          setProductDetail(location.state as ProductType);
          handleAddToCart();
        } }
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default Product;
