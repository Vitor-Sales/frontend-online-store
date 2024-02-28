import { useLocation } from 'react-router-dom';

function Product() {
  const location = useLocation();
  return (
    <div>
      <h2 data-testid="product-detail-name">{ location.state.title }</h2>
      <p data-testid="product-detail-price">{ location.state.price }</p>
      <img
        data-testid="product-detail-image"
        src={ location.state.image }
        alt={ `Foto: ${location.state.title}` }
      />
    </div>
  );
}

export default Product;
