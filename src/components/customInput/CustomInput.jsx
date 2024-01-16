import { Form } from "react-bootstrap";

const CustomInput = ({ label, placeholder, type }) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={placeholder} />
    </Form.Group>
  )
}

export default CustomInput;
