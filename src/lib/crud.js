import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { priority } from "../constants/demand";
import { recipient_locations } from "../constants/places";

// write method for register user to firebase auth and firestore
// if email is already taken, return error
// user shuould have name, surname, email, password, tcid, birth, role=0|1|2, location=coords, description
export const registerUser = async (user) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const docRef = await addDoc(collection(db, "users"), {
      name: user.name,
      surname: user.surname,
      email: user.email,
      tcid: user.tcid,
      birth: user.birth,
      type: user.type,
      location: user.location,
      desc: user.desc,
    });
    console.log("Document written with ID: ", docRef.id);
    return res;
  } catch (error) {
    return error;
  }
};

// write method for login user to firebase auth
export const loginUser = async (user) => {
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    return res;
  } catch (error) {
    return error;
  }
};

// write method for updating demand
export const updatePeople = async (data) => {
  let temp = null;
  try {
    // get data from firestore
    const docRef = doc(db, "demands", data.location);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      temp = docSnap.data();
    }
  } catch (error) {
    return error;
  }
  console.log(data.location, data.type, parseInt(data.amount));
  const peopleRef = doc(db, "demands", data.location);
  if (temp) {
    try {
      const res = await updateDoc(peopleRef, {
        ...temp,
        people: {
          ...temp.people,
          [data.type]: parseInt(data.amount) + parseInt(temp.people[data.type]),
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
};

export const updateDemands = async (data) => {
  let temp = null;
  try {
    // get data from firestore
    const docRef = doc(db, "demands", data.location);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      temp = docSnap.data();
    }
  } catch (error) {
    return error;
  }
  const peopleRef = doc(db, "demands", data.location);
  if (temp) {
    // If category exist in demands, update it; if it is not, create it

    const exists =
      temp.demands.filter((item) => item.category == data.category).length > 0;

    if (!exists) {
      temp.demands.push({
        amount: parseInt(data.amount),
        category: data.category,
        priority: parseInt(data.priority),
        desc: data.desc,
        title: data.title,
      });
    } else {
      temp.demands = temp.demands.map((item) => {
        if (item.category == data.category) {
          return {
            ...item,
            amount: parseInt(data.amount) + parseInt(item.amount),
          };
        } else {
          return item;
        }
      });
    }

    try {
      const res = await updateDoc(peopleRef, {
        ...temp,
        demands: temp.demands,
      });
      return res;
    } catch (error) {
      return error;
    }
  }
};

export const getDemands = async () => {
  let temp = [];
  try {
    // get data from firestore
    const docRef = collection(db, "demands");
    const docSnap = await getDocs(docRef);
    docSnap.forEach((doc) => {
      // add property location to doc.data().demands items
      doc.data().demands.forEach((item) => {
        temp.push({ ...item, location: doc.id });
      });
    });
  } catch (error) {
    return error;
  }
  return temp;
};
