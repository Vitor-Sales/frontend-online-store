interface CarrinhoItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

  type CarrinhoAction =
    | { type: 'ADD_TO_CART'; payload: CarrinhoItem }
    | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } };

  type CarrinhoState = CarrinhoItem[];

function carrinhoReducer(state: CarrinhoState, action: CarrinhoAction): CarrinhoState {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload.id);
    case 'UPDATE_QUANTITY':
      return state.map((item) => (
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ));
    default:
      return state;
  }
}

export default carrinhoReducer;
