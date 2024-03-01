import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCarrinho } from '../CarrinhoContext/CarrinhoContext';

type ProductType = {
  id: string;
  title: string;
  price: number;
  image: string;
  thumbnail: string;
  quantity: number;
};

function Product() {
  const location = useLocation();
  const productDetail = location.state as ProductType;
  const { dispatch, carrinho } = useCarrinho();

  const handleAddToCart = () => {
    if (productDetail) {
      const existingItem = carrinho.find((item) => item.id === productDetail.id);

      if (existingItem) {
        dispatch({ type: 'UPDATE_QUANTITY',
          payload: { id: productDetail.id, quantity: 1 } });
      } else {
        dispatch({ type: 'ADD_TO_CART',
          payload: { ...productDetail, quantity: 1 } as ProductType });
      }
    }
    localStorage.setItem('cart', JSON.stringify(carrinho));
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
        onClick={ handleAddToCart }
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default Product;
