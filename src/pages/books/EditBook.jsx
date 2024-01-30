import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/customInput/customInput";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBookByIdAction, getBookListAction, updateBookAction } from "../../redux/books/bookAction";
import { useDispatch } from "react-redux";

const inputs = [
  { name: "isbn", label: "ISBN", placeholder: "ISBN#", required: true },
  { name: "title", label: "Book Title", placeholder: "Enter book title", required: true },
  { name: "author", label: "Author Name", placeholder: "Enter author name", required: true },
  { name: "summary", label: "Summary", placeholder: "Enter summary", required: true, type: 'text', as: "textarea", rows: 4 },
  { name: "year", label: "Published Year", placeholder: "2000", required: true, type: 'number' },
  { name: "url", label: "Image url", placeholder: "https://image-url.com", required: true },
]

// for controlled inputs
const intialBookValue = {
  isbn: "",
  title: "",
  author: "",
  summary: "",
  year: "",
  url: "",
}

const EditBook = () => {
  const { selectedBook } = useSelector(state => state.book);
  const dispatch = useDispatch();
  const params = useParams();

  const formRef = useRef();
  const [formData, setFormData] = useState(intialBookValue);

  const handleChange = (e) => {
    const { name, value }  = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      updateBookAction(formData);
      dispatch(getBookListAction());
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    dispatch(getBookByIdAction(params.id));
  }, [params.id]);

  useEffect(() => {
    // const bookEdit = bookList.find(book => book.id === params.id);
    if (selectedBook.id) {
      setFormData(selectedBook);
    }
  }, [selectedBook])

  return (
    <AdminLayout title={"Edit book"}>
      <Link to={"/books"}>
        <Button>Go back</Button>
      </Link>
      <div className="p-3 border shadow rounded admin-form">
          <h1>Book Info</h1>
          <Form onSubmit={handleSubmit} ref={formRef}>
            {inputs.map(input => (
              <CustomInput
                key={input.name}
                label={input.label}
                value={formData[input.name]}
                onChange={handleChange}
                {...input} 
              />
            ))}
            <Button variant="primary" type="submit">
              Update book
            </Button>
          </Form>
        </div>
    </AdminLayout>
  )
}

export default EditBook;