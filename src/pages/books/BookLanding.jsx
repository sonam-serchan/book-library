import { useParams } from "react-router-dom";
import BaseLayout from "../../components/layout/BaseLayout"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addBorrowHistoryAction } from "../../redux/borrowHistory/borrowHistoryAction";
import { updateBookAction } from "../../redux/books/bookAction";
import { useDispatch } from "react-redux";

const FOURTEEN_DAYS_IN_MS = 14 * 24 * 60 * 60 * 1000;

const BookLanding = () => {
  const { id } = useParams();
  const { userInfo } = useSelector(state => state.auth);
  const { bookList } = useSelector(state => state.book);
  const [selectedBook, setSelectedBook] = useState({});
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 1. Display the book detail based on the id
  // fetch book from redux
  // get all books
  // find by id (match)

  // Burrow
  // should be logged in
  // if not logged in, login button (redirect to login)
  // pass the current path in state

  // login -> if path exists navigate to path else dashboard


  const handleOnBorrow = () => {
    console.log('borrowed');
    const availableFrom = Date.now() + FOURTEEN_DAYS_IN_MS;

    // 1. Create borrowHistory - who what when
    const borrowHistory = {
      userId: userInfo.uid,
      userName: userInfo.fName,
      bookId: id,
      bookTitle: selectedBook.title,
      url: selectedBook.url,
      borrowAt: Date.now(),
      availableFrom
    }
    
    addBorrowHistoryAction(borrowHistory)

    dispatch(updateBookAction({
      id,
      isAvailable: false,
      availableFrom 
    }))
    // 2. cannot borrow again for 2 weeks
  }

  useEffect(() => {
    const currentBook = bookList.find(book => book.id === id);
    if (currentBook) {
      setSelectedBook(currentBook);
    } else {
      navigate("/")
    }
  }, [bookList, id, navigate]);

  return (
    <BaseLayout>
      <Container>
        <Row>
          <Link to={"/"}><Button>Go back</Button></Link>
        </Row>
        <Row className="mt-4">
          <Col>
            <img src={selectedBook.url} alt="book image" />
          </Col>
          <Col>
            <h3>{selectedBook.title}</h3>
            <p>By {selectedBook.author}</p>
            <p>Rating 5 star</p>
            <p>Published {selectedBook.year}</p>
            <p>{selectedBook.summary}</p>
            <div>
              {userInfo.uid ? (
                selectedBook.isAvailable ?
                  <Button onClick={handleOnBorrow}>Borrow</Button>
                :
                  <Button disabled onClick={handleOnBorrow}>
                    Available from {new Date(selectedBook.availableFrom).toLocaleDateString()}
                  </Button>
              )
              : (
                <Link to={"/login"} state={{ path: `/books/${id}` }}>
                  <Button>Login to Borrow</Button>
                </Link>
              )}
            </div>
          </Col>
      </Row>
      </Container>  
    </BaseLayout>
  )
}

export default BookLanding;
