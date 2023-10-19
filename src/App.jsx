import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/user/userSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Demand, Inspection, Needs } from "./pages";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

function App() {
  const dispatch = useDispatch();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const querySnapshot = getDocs(collection(db, "users")).then(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().email === user.email) {
              dispatch(login(doc.data()));
            }
          });
        }
      );
    } else {
      dispatch(logout());
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="demand" element={<Demand />} />
          <Route path="inspection" element={<Inspection />} />
          <Route path="needs" element={<Needs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
