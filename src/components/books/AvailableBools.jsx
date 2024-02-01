import { Col, Container, Row } from "react-bootstrap";
import BookCard from "./BookCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBookListAction } from "../../redux/books/bookAction";

const AvailableBooks = () => {
  const dispatch = useDispatch();
  const { bookList } = useSelector(state => state.book);

  useEffect(() => {
    dispatch(getBookListAction());
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Available Books</h1>
          <hr />
        </Col>
      </Row>
      <Row>
        {/* display the books */}
        <Col  className="d-flex flex-wrap gap-2 justify-content-around">
          {bookList.map(book => (
            <BookCard key={book.id} {...book}  />
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default AvailableBooks;
