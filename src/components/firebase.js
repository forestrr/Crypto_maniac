import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// connection of codebase to the backend or firesbase
const firebaseApp = initializeApp(firebaseConfig);
// get the firebase auth
const auth = getAuth(firebaseApp);
//gettting the connection to the data base of the firebase ie firestore
const db = getFirestore(firebaseApp);
export { db, auth };
