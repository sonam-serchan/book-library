import { Button, Form } from "react-bootstrap";
import BaseLayout from "../../components/layout/BaseLayout";
import CustomInput from "../../components/customInput/customInput";

const inputs = [
  { name: "fName", label: "First Name", placeholder: "Enter first name", type: "text", required: true },
  { name: "lName", label: "Last Name", placeholder: "Enter last name", type: "text", required: true },
  { name: "phone", label: "Phone", placeholder: "04## ### ###", type: "number", required: true },
  { name: "email", label: "Email", placeholder: "abc@abc.com", type: "email", required: true },
  { name: "password", label: "Password", placeholder: "********", type: "password", required: true },
  { name: "confirmPassword", label: "Confirm Password", placeholder: "********", type: "password", required: true },
]

const AdminSignup = () => {
  return (
    <>
      <BaseLayout>
        <div className="p-3 border shadow rounded admin-form">
          <h1>Admin Signup</h1>
          <Form>
            {inputs.map(input => (
              <CustomInput key={input.name} label={input.label} placeholder={input.placeholder} type={input.type} />
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