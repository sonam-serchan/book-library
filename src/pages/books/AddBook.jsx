import { Button, Form } from "react-bootstrap";
import AdminLayout from "../../components/layout/AdminLayout";
import CustomInput from "../../components/customInput/customInput";
import { useState } from "react";
import { addBookAction } from "../../redux/books/bookAction";
import { toast } from "react-toastify";
import { useRef } from "react";
import { Link } from "react-router-dom";

const inputs = [
  { name: "isbn", label: "ISBN", placeholder: "ISBN#", required: true },
  { name: "title", label: "Book Title", placeholder: "Enter book title", required: true },
  { name: "author", label: "Author Name", placeholder: "Enter author name", required: true },
  { name: "summary", label: "Summary", placeholder: "Enter summary", required: true, type: 'text', as: "textarea", rows: 4 },
  { name: "year", label: "Published Year", placeholder: "2000", required: true, type: 'number' },
  { name: "url", label: "Image url", placeholder: "https://image-url.com", required: true },
]

// for controlled inputs
// const intialBookValue = {
//   isbn: "",
//     title: "",
//     author: "",
//     summary: "",
//     year: "",
//     url: "",
// }

const AddBook = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ isAvailable: true });

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
      const { year } = formData;
      console.log(formData);
      if (year > new Date().getFullYear()) {
        return toast.error("Published year is invalid!");
      }
      // isbn validation
      // check if it's unique

      addBookAction(formData);

      //reset form
      // setFormData(intialBookValue);
      formRef.current.reset();
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AdminLayout title={"Add Book"}>
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
                // value={formData[input.name]}
                onChange={handleChange}
                {...input} 
              />
            ))}
            <Button variant="primary" type="submit">
              Add book
            </Button>
          </Form>
        </div>
    </AdminLayout>
  )
}

export default AddBook;