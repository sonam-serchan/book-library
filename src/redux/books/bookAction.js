import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";

export const addBookAction = async (bookInfo) => {
  try {
    const docRef = await addDoc(collection(db, "books"), bookInfo);
    console.log("Document written with ID: ", docRef.id);
    toast.success("Book added!");
  } catch (e) {
    console.log(e);
  }
}