import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { Button } from "react-bootstrap";
import BooksTable from "../../components/books/BooksTable";

const Books = () => {
  return (
    <AdminLayout title={"Books"}>
      <Link to={"/books/add"} className="d-flex justify-content-end mb-4">
        <Button>Add a book</Button>
      </Link>
      {/* Book List in Table */}
      <BooksTable />
    </AdminLayout>
  )
}

export default Books;