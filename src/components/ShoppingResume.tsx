import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import { TableRow } from './TableRow';
import storeItems from '../data/items.json';
import { useEffect, useState } from 'react';

export function ItemCheckout() {
  const { cartItems, cartQuantity } = useShoppingCart();

  const totalCost = formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0)
  );
  const delivery = formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity < 100 ? 10 : 0;
    }, 0)
  );
  const total = formatCurrency(
    cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity < 100
        ? total + (item?.price || 0) * cartItem.quantity + 10
        : total + (item?.price || 0) * cartItem.quantity;
    }, 0)
  );

  return cartQuantity > 0 ? (
    <>
      <Container>
        <h1>Shopping cart</h1>
        <Row>
          <Col sm={8}>
            {cartItems.map((item) => (
              <TableRow key={item.id} {...item} />
            ))}
          </Col>
          <Col>
            <Card className="col-4 mt-2 w-100">
              <div className="d-flex justify-content-between align-items-center mx-4 mt-3">
                <div className="">Subtotal:</div>
                <div className=" fw-bold fs-5">{totalCost}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-0 pt-0 mx-4">
                <div className="">Deliver:</div>
                <div className=" fw-bold fs-5">{delivery}</div>
              </div>
              <div className='border-bottom w-75 mb-4 ms-5 me-2 mt-4'></div>
              <div className="d-flex justify-content-between align-items-center mt-0 pt-0 mx-4 mb-3">
                <div className="">Total:</div>
                <div className=" fw-bold fs-5">{total}</div>
              </div>
              
              <Button className="mx-4">Check Out</Button>
              <Link to="/store" className="btn btn-success mx-4 mt-2 mb-4">
                Keep Buying
              </Link>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  ) : (
    <p>
      Cart is empty. <Link to="/store"> Go shopping</Link>
    </p>
  );
}
