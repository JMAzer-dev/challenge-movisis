import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import storeItems from '../data/items.json';
import { GetProducts } from '../components/GetProducts';
import { Filter } from '../components/Filter';

export function Search() {
  const query = useQuery();
  const s = query.get('q')?.toLocaleLowerCase();

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
                } else if (val.name.includes(s)) {
                  return val;
                }
              })
              .map((val) => {
                if (val.id !== null) {
                  return <GetProducts key={val.id} {...val} />;
                } else {
                  return <h3>sem return</h3>;
                }
              })}
          </div>
        </Col>
        <Filter />
      </Row>
      <div className="pt-3">
        <Link to="/store" className="underline text-black">
          Back
        </Link>
      </div>
    </Container>
  );
}
