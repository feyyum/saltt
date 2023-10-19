import { useState, useReducer } from "react";
import Modal from "react-modal";
import Dropdown from "react-dropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./style.css";

import {
  donor_locations,
  recipient_locations,
} from "../../../constants/places";
import { Close } from "../../../constants/images";

import { registerUser } from "../../../lib/crud";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflowY: "auto",
    display: "block",
  },
  content: {
    // top: "50%",
    // width: "768px",
    // borderRadius: "36px",
    // border: "none",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const location_options = ["Afet Bölgesindeyim", "Afet Bölgesi Dışındayım"];

const initial_user = {
  name: "",
  surname: "",
  tcid: 0,
  birth: new Date(),
  email: "",
  password: "",
  type: 0,
  location: "",
  desc: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_SURNAME":
      return { ...state, surname: action.payload };
    case "UPDATE_TCID":
      return { ...state, tcid: action.payload };
    case "UPDATE_BIRTH":
      return { ...state, birth: action.payload };
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "UPDATE_TYPE":
      return { ...state, type: action.payload };
    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };
    case "UPDATE_DESC":
      return { ...state, desc: action.payload };
    default:
      return state;
  }
};

function RegisterModal({ isOpen, setIsOpen }) {
  const [volunteerType, setVolunteerType] = useState(0);
  const [user, dispatch] = useReducer(reducer, initial_user);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     User is signed in, see docs for a list of available properties
  //     https://firebase.google.com/docs/reference/js/auth.user
  //     console.log(user);
  //     ...
  //   } else {
  //     User is signed out
  //     ...
  //   }
  // });

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      console.log(res);
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      style={customStyles}
      contentLabel="Kayıt Ol"
      className="w-full outline-none bg-white py-16 px-20 md:rounded-3xl md:w-[768px] md:mx-auto md:my-16"
    >
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-semibold text-2xl">Yetkili Kayıt</h1>
          <div className="p-3 rounded-xl w-12 h-12 bg-gray cursor-pointer">
            <Close onClick={toggleModal} />
          </div>
        </div>
        <div className="mb-6">
          <h5 className="font-semibold text-xs mb-6">
            Gönüllü Bilgileri{" "}
            <span className="font-normal">
              (Kimlik bilgileriniz resmi kayıtlarla uyuşmalıdır.)
            </span>
          </h5>
          <div className="flex flex-wrap gap-6">
            <input
              type="text"
              placeholder="Adınız"
              className="flex-1 min-w-[240px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) =>
                dispatch({ type: "UPDATE_NAME", payload: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Soyadınız"
              className="flex-1 min-w-[240px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) => {
                dispatch({ type: "UPDATE_SURNAME", payload: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="T.C. Kimlik Numaranız"
              className="flex-1 min-w-[240px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) => {
                dispatch({ type: "UPDATE_TCID", payload: e.target.value });
              }}
            />
            <input
              type="date"
              className="flex-1 min-w-[240px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_BIRTH",
                  payload: e.target.value,
                });
              }}
            />
            <input
              type="email"
              placeholder="E-Posta Adresiniz"
              className="flex-1 min-w-[240px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) => {
                dispatch({ type: "UPDATE_EMAIL", payload: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Şifreniz"
              className="flex-1 min-w-[240px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) => {
                dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="mb-6">
          <h5 className="font-semibold text-xs mb-6">Konum Bilgileri</h5>
          <div className="flex flex-col gap-3">
            <Dropdown
              options={location_options}
              onChange={(e) => {
                e.value === "Afet Bölgesindeyim"
                  ? setVolunteerType(1)
                  : setVolunteerType(2);
                e.value === "Afet Bölgesindeyim"
                  ? dispatch({ type: "UPDATE_TYPE", payload: 1 })
                  : dispatch({ type: "UPDATE_TYPE", payload: 2 });
              }}
              placeholder="Afet Bölgesindeyim / Afet Bölgesi Dışındayım"
            />
            <Dropdown
              options={
                volunteerType === 1
                  ? recipient_locations.map((location) => location.name)
                  : donor_locations.map((location) => location.name)
              }
              placeholder="Görev Bölgenizi Seçin"
              disabled={volunteerType === 0}
              onChange={(e) => {
                dispatch({ type: "UPDATE_LOCATION", payload: e.value });
              }}
            />
          </div>
        </div>
        <div className="mb-6">
          <h5 className="font-semibold text-xs mb-2">
            Görev Kapsamınız <span className="font-normal">(Opsiyonel)</span>
          </h5>
          <textarea
            className="w-full resize-none border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => {
              dispatch({ type: "UPDATE_DESC", payload: e.target.value });
            }}
          />
        </div>
        <div className="py-6 flex flex-wrap gap-8">
          <h3
            className="flex-1 min-w-[240px] text-center bg-green py-3 px-4 rounded-lg text-white text-base cursor-pointer transition-all ease-in-out duration-300 hover:bg-darkgreen"
            onClick={() => mutation.mutate(user)}
          >
            Kayıt Ol
          </h3>
          <h3
            onClick={() => toggleModal()}
            className="flex-1 min-w-[240px] text-center bg-gray py-3 px-4 rounded-lg text-black text-base cursor-pointer transition-all ease-in-out duration-300 hover:bg-red hover:text-white"
          >
            İptal Et
          </h3>
        </div>
      </div>
    </Modal>
  );
}

export default RegisterModal;
