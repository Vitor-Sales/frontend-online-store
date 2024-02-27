import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';

function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Carrinho');
  };

  return (
    <header className="App-header">
      <button
        data-testid="shopping-cart-button"
        className="shoppingCar-button"
        onClick={ handleClick }
      >
        <FaCartShopping />
      </button>
    </header>
  );
}

export default Header;
