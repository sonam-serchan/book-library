import AvailableBooks from "../../components/books/AvailableBools";
import BookCarousels from "../../components/carousels/BookCarousels";
import BaseLayout from "../../components/layout/BaseLayout"

const Home = () => {
  return (
    <BaseLayout>
      {/* Carousels images of books */}
      <BookCarousels />
      {/* Display avialable books */}
      <AvailableBooks /> 
    </BaseLayout>
  )
}

export default Home;
