import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../../components/customInput/customInput";
import { useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const inputs = [
  { name: "isbn", label: "ISBN", placeholder: "ISBN#", required: true },
  { name: "title", label: "Book Title", placeholder: "Enter book title", required: true },
  { name: "author", label: "Author Name", placeholder: "Enter author name", required: true },
  { name: "summary", label: "Summary", placeholder: "Enter summary", required: true, type: 'text', as: "textarea", rows: 4 },
  { name: "year", label: "Published Year", placeholder: "2000", required: true, type: 'number' },
  { name: "url", label: "Image url", placeholder: "https://image-url.com", required: true },
]

const EditBook = () => {
  const params = useParams();
  console.log(params);
  
  const formRef = useRef();
  const [formData, setFormData] = useState({});

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
      console.log('usbmitted')
    } catch (e) {
      console.log(e)
    }
  }

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
                // value={formData[input.name]}
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