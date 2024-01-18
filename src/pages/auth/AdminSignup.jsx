import { Button, Form } from "react-bootstrap";
import BaseLayout from "../../components/layout/BaseLayout";
import CustomInput from "../../components/customInput/customInput";
import { useState } from "react";
import { toast } from "react-toastify";

const inputs = [
  { name: "fName", label: "First Name", placeholder: "Enter first name", type: "text", required: true },
  { name: "lName", label: "Last Name", placeholder: "Enter last name", type: "text", required: true },
  { name: "phone", label: "Phone", placeholder: "04## ### ###", type: "number", required: true },
  { name: "email", label: "Email", placeholder: "abc@abc.com", type: "email", required: true },
  { name: "password", label: "Password", placeholder: "********", type: "password", required: true, minLength: 6 },
  { name: "confirmPassword", label: "Confirm Password", placeholder: "********", type: "password", required: true },
]
const AdminSignup = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value }  = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if password match
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      return toast.error("Password did not match!");
    }

    // validate inputs
    // Todo: 

    toast("Admin form data submitted!");
  }
  return (
    <>
      <BaseLayout>
        <div className="p-3 border shadow rounded admin-form">
          <h1>Admin Signup</h1>
          <Form onSubmit={handleSubmit}>
            {inputs.map(input => (
              <CustomInput key={input.name} label={input.label} {...input} onChange={handleChange} />
            ))}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </BaseLayout>
    </>
  )
}

export default AdminSignup;