import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from "../../firebase-config"
import { setBorrowHistoryList } from "./borrowHistorySlice";

export const addBorrowHistoryAction = async (borrowHistory) => {
  try {
    await addDoc(collection(db, "borrowHistory"), borrowHistory);
  } catch (e) {
    console.log(e)
  }
}

export const getBorrowHistoryListAction = () => async (dispatch) => {
  try {
    // getting documents from firebase 
    const querySnapshot = await getDocs(collection(db, "borrowHistory"));
    const borrowHistoryList = [];
    querySnapshot.forEach(doc => {
      const borrowHistoryData = doc.data()
      const borrowHistory = {
        ...borrowHistoryData,
        id: doc.id
      } 
      borrowHistoryList.push(borrowHistory);
    })
    
    // adding borrowHistoryList to redux store
    dispatch(setBorrowHistoryList(borrowHistoryList));
  } catch (e) {
    console.log(e)
  }
}

export const getBorrowHistoryListByUserIdAction = (userId) => async (dispatch) => {
  try {
    // getting documents from firebase 
    // form a query
    const q = query(collection(db, "borrowHistory"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q);
    const borrowHistoryList = [];
    querySnapshot.forEach(doc => {
      const borrowHistoryData = doc.data()
      const borrowHistory = {
        ...borrowHistoryData,
        id: doc.id
      } 
      borrowHistoryList.push(borrowHistory);
    })
    
    // adding borrowHistoryList to redux store
    dispatch(setBorrowHistoryList(borrowHistoryList));
  } catch (e) {
    console.log(e)
  }
}
export const updateBorrowHistoryAction = ({id, ...rest}) => async (dispatch) => {
  try {
    const borrowRef = doc(db, "borrowHistory", id);
    await setDoc(borrowRef, rest, { merge: true })
    dispatch(getBorrowHistoryListAction());
  } catch (e) {
    console.log(e)
  }
}
