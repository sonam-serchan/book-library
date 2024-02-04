import { signOut } from "firebase/auth";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/auth/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUserInfo({}));
    }).catch((error) => {
      toast.error(error.message)
    });
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to={"/"} className="nav-link"><Navbar.Brand href="#home">Book Store</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo.uid ? (
              <>
                {userInfo.role === "student" ?
                  <Link to="/history" className="nav-link">History</Link>
                :
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                }
                <Link to="#" onClick={handleLogout} className="nav-link">Logout</Link>
              </>            
            ): (
              <>
                
                <Link to="/signup" className="nav-link">Signup</Link>
                <Link to="/login" className="nav-link">Login</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;