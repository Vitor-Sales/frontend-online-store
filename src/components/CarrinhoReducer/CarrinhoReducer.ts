import { type ProductType } from '../Carrinho/Carrinho';

interface CarrinhoItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  available_quantity: number;
}

  type CarrinhoAction =
    | { type: 'ADD_TO_CART'; payload: CarrinhoItem }
    | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };

  type CarrinhoState = CarrinhoItem[];

function carrinhoReducer(state: CarrinhoState, action: CarrinhoAction): CarrinhoState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      localStorage.setItem('cart', JSON.stringify([...state, action.payload]));
      return [...state, action.payload];
    }
    case 'REMOVE_FROM_CART': {
      const cart = localStorage.getItem('cart') || '[]';
      const cartParse = JSON.parse(cart);
      const filtredCart = cartParse
        .filter((item: ProductType) => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(filtredCart));
      return state.filter((item) => item.id !== action.payload.id);
    }
    case 'UPDATE_QUANTITY':
      return state.map((item) => (
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, item.quantity + action.payload.quantity) }
          : item
      ));
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export default carrinhoReducer;
