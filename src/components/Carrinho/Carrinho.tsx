import React, { useEffect } from 'react';
import { IoMdAddCircle, IoIosRemoveCircle } from 'react-icons/io';
import { CiCircleRemove } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../CarrinhoContext/CarrinhoContext';

export interface ProductType {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

function Carrinho() {
  const { carrinho, dispatch } = useCarrinho();
  const navigate = useNavigate();

  useEffect(() => {
    const cart = localStorage.getItem('cart') || '[]';
    const cartParse = JSON.parse(cart);
  }, [carrinho]);

  const handleRemoveQuantity = (productId: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: -1 } });
  };

  const handleAddToCart = (product: ProductType) => {
    const existingItem = carrinho.find((item) => item.id === product.id);

    if (existingItem) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: product.id, quantity: 1 } });
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
    }
  };

  const handleRemoveProduct = (productId: string) => {
    if (carrinho.length > 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    navigate('/Checkout');
  };

  return (
    <div>
      {carrinho.length === 0 ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      ) : (
        <div>
          <h2>Seu Carrinho</h2>
          <ul>
            {carrinho.map((item) => (
              <li key={ item.id }>
                <p data-testid="shopping-cart-product-name">{item.title}</p>
                <p>
                  R$
                  { item.price }
                </p>
                <p data-testid="shopping-cart-product-quantity">{item.quantity}</p>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => handleRemoveQuantity(item.id) }
                >
                  <IoIosRemoveCircle />
                </button>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ () => handleAddToCart(item) }
                >
                  <IoMdAddCircle />
                </button>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ () => handleRemoveProduct(item.id) }
                >
                  <CiCircleRemove />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        data-testid="shopping-cart-button"
        className="shoppingCar-button"
        onClick={ handleBack }
      >
        Voltar
      </button>
      <button
        data-testid="checkout-products"
        className="checkout-button"
        onClick={ handleCheckout }
      >
        Finalizar Compra
      </button>
    </div>
  );
}

export default Carrinho;
