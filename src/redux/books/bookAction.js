import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";
import { setBookList } from "./bookSlice";

export const addBookAction = async (bookInfo) => {
  try {
    const docRef = await addDoc(collection(db, "books"), bookInfo);
    console.log("Document written with ID: ", docRef.id);
    toast.success("Book added!");
  } catch (e) {
    console.log(e);
  }
}

export const getBookListAction = () => async (dispatch) => {
  try {
    // get books list from firebase db
    const querySnapshotPromise = getDocs(collection(db, "books"));
    toast.promise(querySnapshotPromise, {
      pending: 'In progress...'
    })

    const querySnapshot = await querySnapshotPromise; 
    const booksListArr = [];
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const bookData = doc.data();
      booksListArr.push({
       id,
        ...bookData
      });
    });
    // save to redux store
    dispatch(setBookList(booksListArr));
  } catch (e) {
    console.log(e);
  }
}
