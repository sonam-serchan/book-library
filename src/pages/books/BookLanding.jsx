import { useParams } from "react-router-dom";
import BaseLayout from "../../components/layout/BaseLayout"

const BookLanding = () => {
  const { id } = useParams();
  console.log(id)

  // 1. Display the book detail based on the id
  // fetch book from redux
  // get all books
  // find by id (match)

  // Burrow
  // should be logged in
  // if not logged in, login button (redirect to login)
  // pass the current path in state

  // login -> if path exists navigate to path else dashboard

  return (
    <BaseLayout>
      Individual Book
    </BaseLayout>
  )
}

export default BookLanding;
