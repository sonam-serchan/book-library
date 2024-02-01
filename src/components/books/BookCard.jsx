import { Card } from "react-bootstrap"
import { Link } from "react-router-dom";

const BookCard = ({ id, title, url }) => {
  return (
    <Link to={`/books/${id}`}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default BookCard;
