import { Button, Table } from "react-bootstrap";
import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect } from "react";
import { getBorrowHistoryListAction, getBorrowHistoryListByUserIdAction, updateBorrowHistoryAction } from "../../redux/borrowHistory/borrowHistoryAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateTime";
import { isAdmin } from "../../utils";
import { updateBookAction } from "../../redux/books/bookAction";

const History = () => {
  const dispatch = useDispatch()
  // select from the store
  const { borrowList } = useSelector(state => state.borrowHistory);
  const { userInfo } = useSelector(state => state.auth);

  const handleBookReturned = (borrowHistory) => {
    dispatch(updateBorrowHistoryAction({
      ...borrowHistory,
      isReturned: true,
      availableFrom: Date.now()
    }))

    // update book - isAvailable - true
    dispatch(updateBookAction({
      id: borrowHistory.bookId,
      isAvailable: true,
      availableFrom: Date.now()
    }))
  }

  // getting borrow history list from firebase
  useEffect(() => {
    if (isAdmin(userInfo)) {
      dispatch(getBorrowHistoryListAction())
    } else {
      dispatch(getBorrowHistoryListByUserIdAction(userInfo.uid))
    }
  }, [])

  return (
    <AdminLayout title={"History"}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Borrowed At</th>
            <th>Borrowed By</th>
            <th>Returned At</th>
            {isAdmin(userInfo) && <th>Action</th> }
          </tr>
        </thead>
        <tbody>
          {borrowList.map((borrow,index) => (
            <tr key={borrow.id}>
              <td>{index + 1}</td>
              <td>
                <img src={borrow.url} alt="book image" style={{ width: '150px' }} />
              </td>
              <td>{formatDate(borrow.borrowAt)}</td>
              <td>{borrow.userName}</td>
              <td>
                {borrow.isReturned ? 
                  ""
                  : "Expected: "
                }
                <div>{formatDate(borrow.availableFrom)} </div>
              </td>
              {isAdmin(userInfo) &&
                <td>    
                    {borrow.isReturned ?
                      <Button disabled>Mark as Returned</Button>
                    : <Button onClick={() => handleBookReturned(borrow)}>Mark as Returned</Button>
                  }
                </td>
              }
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  )
}

export default History; 