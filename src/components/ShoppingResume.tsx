import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import { TableRow } from './TableRow';
import storeItems from '../data/items.json';

export function ItemCheckout() {
  const { cartItems, cartQuantity } = useShoppingCart();

  const totalCost = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const delivery = totalCost < 100 ? 10 : 0;
  
  const total = delivery + totalCost;

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
              <span
                className="text-center mt-1 text-primary"
                style={{ fontSize: '14px' }}
              >
                *Free shipping for purchases over $100*
              </span>
              <div className="d-flex justify-content-between align-items-center mx-4 mt-3">
                <div className="">Subtotal:</div>
                <div className=" fw-bold fs-5">{formatCurrency(totalCost)}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-0 pt-0 mx-4">
                <div className="">Deliver:</div>
                <div className=" fw-bold fs-5">{formatCurrency(delivery)}</div>
              </div>
              <div className="border-bottom w-75 mb-4 ms-5 me-2 mt-4"></div>
              <div className="d-flex justify-content-between align-items-center mt-0 pt-0 mx-4 mb-3">
                <div className="">Total:</div>
                <div className=" fw-bold fs-5">{formatCurrency(total)}</div>
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
