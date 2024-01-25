import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { Button } from "react-bootstrap";

const Books = () => {
  return (
    <AdminLayout title={"Books"}>
      <Link to={"/books/add"} className="d-flex justify-content-end">
        <Button>Add a book</Button>
      </Link>
      {/* Book List in Table */}
    </AdminLayout>
  )
}

export default Books;