import { Col, Container, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import storeItems from '../data/items.json';
import { GetProducts } from '../components/GetProducts';
import { useState, ChangeEvent } from 'react';

export function Search() {
  const query = useQuery();
  const s = query.get('q')?.toLocaleLowerCase();
  const [from, setFrom] = useState<number>();
  const [to, setTo] = useState<number>();
  const [orderPrice, setOrderPrice] = useState<number>();
  const [orderDate, setOrderDate] = useState<number>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'to') {
      setTo(Number(e.target.value));
    } else if (e.target.name === 'from') {
      setFrom(Number(e.target.value));
    } else if (e.target.name === 'price') {
      setOrderPrice(Number(e.target.value));
    } else if (e.target.name === 'date') {
      setOrderDate(Number(e.target.value));
    }
  };

  return (
    <Container>
      <Row>
        <Col sm={7}>
          <h1>Search</h1>
          <div id="search">
            <h2>You are looking for: {s}</h2>
            {storeItems
              .filter((val) => {
                if (s === '') {
                  return val;
                } else if (
                  (from || to) != (0 || undefined) &&
                  val.name.includes(s)
                ) {
                  return val.price > from && val.price < to;
                } else if (val.name.includes(s)) {
                  return val;
                }
              })
              .map((val) => {
                if (val.id !== null) {
                  return <GetProducts key={val.id} {...val} />;
                } else {
                  return <h3>No results</h3>;
                }
              })}
          </div>
        </Col>
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
                    name="from"
                    onChange={handleChange}
                    value={from}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>To:</Form.Label>
                  <Form.Control
                    placeholder="$0.00"
                    type="number"
                    name="to"
                    value={to}
                    onChange={handleChange}
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
                    <Form.Select
                      aria-label="Default select example"
                      name="price"
                      value={orderPrice}
                      onChange={handleChange}
                    >
                      <option>Select</option>
                      <option value="1">Lowest price</option>
                      <option value="2">Biggest price</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-2">
                    <Form.Label>Date:</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="date"
                      value={orderDate}
                      onChange={handleChange}
                    >
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
      </Row>
      <div className="pt-3">
        <Link to="/store" className="underline text-black">
          Back
        </Link>
      </div>
    </Container>
  );
}
