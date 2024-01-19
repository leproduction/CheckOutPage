import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageAddress from './ImageSources';

const products = [
  { id: "price_1OaNxnEP2lKACqyoVaNrm6nd", name: 'Coffee', price: '7.99', quantity: 1, src: ImageAddress.addressOne },
  { id: "price_1OaNyWEP2lKACqyo3sOX4GYK", name: 'Sunglasses', price: '20.00', quantity: 1, src: ImageAddress.addressTwo },
  { id: "price_1OaNysEP2lKACqyoXYyzZCA7", name: 'Clock', price: '30.00', quantity: 1, src: ImageAddress.addressThree },
  { id: "price_1OaNz4EP2lKACqyoB0P1JHxZ", name: 'Phone Case', price: '30.00', quantity: 1, src: ImageAddress.addressFour }
];


const ProductList = ({ addToCart, removeProducts, removeAllProducts}) => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };




  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    <Container>
      <h2 className='text-center'>Product List</h2>
      <ul style={{ backgroundColor: 'rgba(176, 235, 13, 0.2)' }} className='list-unstyled d-flex flex-wrap justify-content-center align-items-center py-3 gap-3 border border-info mx-2'>
        {products.map((product) => (
          <Card
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            key={product.id}
            className="p-3 col-md-3 col-sm-6 col-12"
          >
            <img src={product.src} alt={product.name} className='rounded my-1 img-fluid'></img>
            <p className='mb-1'>{product.name} - ${product.price}</p>
            <span>
              <Button className={`${isHovered ? 'bg-info' : 'bg-dark'} rounded`} onClick={() => { addToCart(product) }}>
                +
              </Button>
              <Button className={`${isHovered ? 'bg-info' : 'bg-dark'} rounded`} onClick={() => { removeProducts(product) }}>
                -
              </Button>
            </span>
            <Button className={`${isHovered ? 'bg-info' : 'bg-dark'}  rounded`} onClick={() => { removeAllProducts(product) }}>
              Remove All
            </Button>
          </Card>
        ))}
      </ul>
    </Container>
  );
};

export default ProductList;
export { products };
