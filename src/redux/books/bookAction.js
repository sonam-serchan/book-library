import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";
import { setBookList, setSelectedBook } from "./bookSlice";

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

export const updateBookAction = async ({ id, ...restBook }) => {
  try {
    const bookRef = doc(db, "books", id);
    await setDoc(bookRef, restBook, { merge: true })
    toast.success("Book updated!")
  } catch(e) {
    console.log(e);
  }
}

export const getBookByIdAction = (id) => async (dispatch) => {
  try {
    // get the user document from firestore database
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const book = {
        ...docSnap.data(),
        id
      }
      dispatch(setSelectedBook(book))
    } else {
      toast.error("Book not found!")
      // navig
    }
    
  } catch(e) {
    console.log(e);
  } 
}


export const deleteBookAction = (id) => async (dispatch) => {
  try {
    const docPromise = deleteDoc(doc(db, "books", id));
    toast.promise(docPromise, {
      pending: 'In progress...'
    })
    await docPromise;

    dispatch(getBookListAction())
    toast.success("Book deleted!")
  } catch(e) {
    console.log(e)
  }
}









