import React, { useEffect, useState } from 'react';
import { IoMdAddCircle, IoIosRemoveCircle } from 'react-icons/io';
import { CiCircleRemove } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

function Carrinho() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      setCartItems(JSON.parse(storedCart) as Product[]);
    }
  }, []);

  const handleRemoveQuantity = (productId: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId && item.quantity && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleAddToCart = (product: Product) => {
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex]
        .quantity = (updatedCart[existingProductIndex].quantity || 0) + 1;

      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];

      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleRemoveProduct = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      ) : (
        <div>
          <h2>Seu Carrinho</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={ item.id }>
                <p data-testid="shopping-cart-product-name">{item.title}</p>
                <p>
                  R$
                  {item.price}
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
    </div>
  );
}

export default Carrinho;
//
