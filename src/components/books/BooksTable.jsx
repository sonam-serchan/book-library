import { useEffect } from "react";
import { Table } from "react-bootstrap"
import { getBookListAction } from "../../redux/books/bookAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const BooksTable = () => {
  const dispatch = useDispatch();
  // get books list from redux
  const { bookList } = useSelector(state => state.book);
  // display the books in the table

  useEffect(() => {
    dispatch(getBookListAction());
  }, []);

  return(
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ISBN</th>
          <th>Image</th>
          <th>Title</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {bookList.map(({ id, isbn, url, title, author, summary, year }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{isbn}</td>
              <td>
                <img src={url} alt="book-image" />
              </td>
              <td>
                {title} - {year}
                <p>{summary}</p>
              </td>
              <td>{author}</td>
            </tr>
          ))
        }
        
      </tbody>
    </Table>
  )
};

export default BooksTable;
