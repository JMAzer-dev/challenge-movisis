import { ListGroup } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';
import * as Ai from 'react-icons/ai';

type TableRowProps = {
  id: number;
};

export function GetProducts({ id }: TableRowProps) {
  const { increaseCartQuantity } = useShoppingCart();

  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <div>
      <ListGroup variant="flush">
        <ListGroup.Item className="list-group-item mt-2 d-flex justify-content-between align-items-center border border-black">
          <div className="d-flex align-items-center">
            <img
              src={item.imgUrl}
              style={{
                width: '90px',
                height: '90px',
                objectFit: 'cover',
              }}
            />
            <div className="ms-1 d-flex flex-column pt-2 text-capitalize">
              <span>{item.name}</span>
              <p> {formatCurrency(item.price)}</p>
              <span>released At: {item.createdAt}</span>
            </div>
          </div>
          <div></div>
          <div className="d-flex align-items-center">
            <div
              onClick={() => increaseCartQuantity(id)}
              className="btn btn-link"
            >
              <Ai.AiOutlinePlusCircle size={25} />
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
