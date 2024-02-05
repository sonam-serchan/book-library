import { Button, Table } from "react-bootstrap";
import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect } from "react";
import { getBorrowHistoryListAction, updateBorrowHistoryAction } from "../../redux/borrowHistory/borrowHistoryAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateTime";

const History = () => {
  const dispatch = useDispatch()
  // select from the store
  const { borrowList } = useSelector(state => state.borrowHistory);

  const handleBookReturned = (borrowHistory) => {
    dispatch(updateBorrowHistoryAction({
      ...borrowHistory,
      isReturned: true,
      availableFrom: Date.now()
    })) 
  }

  // getting borrow history list from firebase
  useEffect(() => {
    dispatch(getBorrowHistoryListAction())
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
            <th>Action</th>
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
              <td>
                {borrow.isReturned ?
                  <Button disabled>Mark as Returned</Button>
                : <Button onClick={() => handleBookReturned(borrow)}>Mark as Returned</Button>
                }
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  )
}

export default History; 