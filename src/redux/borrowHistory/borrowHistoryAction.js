import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase-config"

export const addBorrowHistoryAction = async (borrowHistory) => {
  try {
    await addDoc(collection(db, "borrowHistory"), borrowHistory);
  } catch (e) {
    console.log(e)
  }
}