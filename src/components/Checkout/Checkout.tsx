import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../CarrinhoContext/CarrinhoContext';

function Checkout() {
  const { carrinho } = useCarrinho();
  const navigate = useNavigate();
  const { dispatch } = useCarrinho();
  const [formValid, setFormValid] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    paymentMethod: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validationForm = () => {
    const fullNameValid = formData.fullName.length > 0;
    const emailValid = formData.email.length > 0;
    const cpfValid = formData.cpf.length > 0;
    const phoneValid = formData.phone.length > 0;
    const cepValid = formData.cep.length > 0;
    const addressValid = formData.address.length > 0;
    const paymentMethodValid = formData.paymentMethod.length > 0;

    return fullNameValid
    && emailValid
    && cpfValid
    && phoneValid
    && cepValid
    && addressValid
    && paymentMethodValid;
  };

  const handleFormSubmit = (event: any) => {
    const isFormValid = validationForm();
    event.preventDefault();
    console.log(isFormValid);

    if (!isFormValid) {
      setFormValid(true);
    } else {
      dispatch({ type: 'CLEAR_CART' });
      localStorage.setItem('cart', JSON.stringify([]));
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {carrinho.map((item) => (
          <li key={ item.id }>
            <p>{item.title}</p>
            <p>
              R$
              {item.price}
            </p>
            <p>
              Quantidade:
              {item.quantity}
            </p>
          </li>
        ))}
      </ul>
      <form action="">
        <input
          type="text"
          data-testid="checkout-fullname"
          name="fullName"
          id="fullName"
          placeholder="Nome Completo"
          value={ formData.fullName }
          onChange={ (event) => handleChange(event) }
        />
        <input
          type="text"
          data-testid="checkout-email"
          name="email"
          placeholder="E-mail"
          value={ formData.email }
          onChange={ (event) => handleChange(event) }
        />
        <input
          type="text"
          data-testid="checkout-cpf"
          name="cpf"
          placeholder="CPF"
          value={ formData.cpf }
          onChange={ (event) => handleChange(event) }
        />
        <input
          type="text"
          data-testid="checkout-phone"
          name="phone"
          placeholder="Telefone"
          value={ formData.phone }
          onChange={ (event) => handleChange(event) }
        />
        <input
          type="text"
          data-testid="checkout-cep"
          name="cep"
          placeholder="Cep"
          value={ formData.cep }
          onChange={ (event) => handleChange(event) }
        />
        <input
          type="text"
          data-testid="checkout-address"
          name="address"
          placeholder="Endereço"
          value={ formData.address }
          onChange={ (event) => handleChange(event) }
        />
        <label>
          Forma de Pagamento:
          <input
            type="radio"
            data-testid="ticket-payment"
            name="paymentMethod"
            value="boleto"
            checked={ formData.paymentMethod === 'boleto' }
            onChange={ (event) => handleChange(event) }
            required
          />
          {' '}
          Boleto
          <input
            type="radio"
            data-testid="visa-payment"
            name="paymentMethod"
            value="visa"
            checked={ formData.paymentMethod === 'visa' }
            onChange={ (event) => handleChange(event) }
            required
          />
          {' '}
          Visa
          <input
            type="radio"
            data-testid="master-payment"
            name="paymentMethod"
            value="masterCard"
            checked={ formData.paymentMethod === 'masterCard' }
            onChange={ (event) => handleChange(event) }
            required
          />
          {' '}
          MasterCard
          <input
            type="radio"
            data-testid="elo-payment"
            name="paymentMethod"
            value="elo"
            checked={ formData.paymentMethod === 'elo' }
            onChange={ (event) => handleChange(event) }
            required
          />
          {' '}
          Elo
        </label>
        <button
          type="submit"
          data-testid="checkout-btn"
          onClick={ (event) => handleFormSubmit(event) }
        >
          Finalizar Compra
        </button>
      </form>
      {formValid && <div data-testid="error-msg">Campos inválidos</div>}
    </div>
  );
}

export default Checkout;
