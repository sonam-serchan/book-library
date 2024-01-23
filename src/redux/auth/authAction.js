import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";
import { setUserInfo } from "./authSlice";

export const getUserInfoAction = (uid) => async (dispatch) => {
  // get the user document from firestore database
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    // store the user info in redux store
    dispatch(setUserInfo(userData));
    toast("Logged in!");
  } else {
    // docSnap.data() will be undefined in this case
    toast.error("No user found!");
  }
}