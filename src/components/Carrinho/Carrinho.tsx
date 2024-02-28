import React, { useEffect, useState } from 'react';

type Product = {
  id: string;
  title: string;
  price: number;
  quantity?: number;
};

function Carrinho() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      setCartItems(JSON.parse(storedCart) as Product[]);
    }
  }, []);

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
                <p data-testid="shopping-cart-product-quantity">1</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Carrinho;
