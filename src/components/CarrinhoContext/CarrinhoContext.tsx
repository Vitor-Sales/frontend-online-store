import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import carrinhoReducer from '../CarrinhoReducer/CarrinhoReducer';

interface ProductType {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

type CarrinhoAction =
  | { type: 'ADD_TO_CART'; payload: ProductType }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } };

interface CarrinhoContextType {
  carrinho: ProductType[];
  dispatch: Dispatch<CarrinhoAction>;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const carrinhoTernary = localStorage
    .getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [];
  const [carrinho, dispatch] = useReducer(carrinhoReducer, carrinhoTernary);

  return (
    <CarrinhoContext.Provider value={ { carrinho, dispatch } }>
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);

  if (!context) {
    throw new Error('useCarrinho deve ser utilizado dentro de um CarrinhoProvider');
  }

  return context;
};
