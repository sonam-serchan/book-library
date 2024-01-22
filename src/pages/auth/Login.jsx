import { Button, Form } from "react-bootstrap";
import BaseLayout from "../../components/layout/BaseLayout";
import CustomInput from "../../components/customInput/customInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from "../../redux/auth/authSlice";
import { useEffect } from "react";

const inputs = [
  { name: "email", label: "Email", placeholder: "abc@abc.com", type: "email", required: true },
  { name: "password", label: "Password", placeholder: "********", type: "password", required: true, minLength: 6 },
]

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { userInfo } = useSelector(state => state.auth);

  const handleChange = (e) => {
    const { name, value }  = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate inputs
    // Todo: 
    const { email, password } = formData;
    try {
      const signInPromise = signInWithEmailAndPassword(auth, email, password);
      toast.promise(signInPromise, {
        pending: "In progress..."
      });
      const userCredential = await signInPromise;
      const { user } = userCredential; 

      // store the user info in redux store
      dispatch(setUserInfo(user));

      toast("Logged in!");
    } catch (e) {
      const errorCode = e.code;
      if(errorCode.includes("auth/invalid-credential")){
        toast.error("Invalid email or password!");
      }
    }
  }

  useEffect(() => {
    if (userInfo.uid) {
      // if there is uid (at least one property in userInfo
      // -> state, we assume the user is logged in)
      navigate("/dashboard");
    }
  }, [userInfo]);

  return (
    <>
      <BaseLayout>
        <div className="p-3 border shadow rounded admin-form">
          <h1>Login</h1>
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

export default Login;