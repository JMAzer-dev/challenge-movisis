import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export function Filter() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [orderPrice, setOrderPrice] = useState(null);
  const [orderDate, setOrderDate] = useState(null);

  return (
    <Col className="mt-sm-0 mt-5">
      <h3>Filter</h3>
      <Form className="">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>From:</Form.Label>
              <Form.Control
                placeholder="$0.00"
                type="number"
                onChange={(e) => setFrom(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>To:</Form.Label>
              <Form.Control
                placeholder="$0.00"
                type="number"
                onChange={(e) => setTo(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h3>Order</h3>
          <Row>
            <Col>
              <Form.Group className="mb-3 mt-2">
                <Form.Label>Price:</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setOrderPrice(e.target.value)}>
                  <option>Select</option>
                  <option value="1">Lowest price</option>
                  <option value="2">Biggest price</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mt-2">
                <Form.Label>Date:</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setOrderDate(e.target.value)}>
                  <option>Select</option>
                  <option value="1">Most Recent</option>
                  <option value="2">Most Older</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Row>
      </Form>
    </Col>
  );
}
