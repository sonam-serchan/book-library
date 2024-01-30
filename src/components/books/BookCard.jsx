import { Card } from "react-bootstrap"
import { Link } from "react-router-dom";

const BookCard = ({ id, title, url, summary }) => {
  return (
    <Link to={`/books/${id}`}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {summary}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default BookCard;
