import Modal from "react-modal";
import { useReducer } from "react";
import { Close } from "../../../constants/images";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginUser } from "../../../lib/crud";

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

const initial_credentials = {
  email: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

function LoginModal({ isOpen, setIsOpen }) {
  const [credentials, dispatch] = useReducer(reducer, initial_credentials);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: loginUser,
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
      contentLabel="Giriş Yap"
      className="w-full outline-none bg-white py-16 px-20 md:rounded-3xl md:w-[768px] md:mx-auto md:my-16"
    >
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-semibold text-2xl">Yetkili Giriş</h1>
          <div className="p-3 rounded-xl w-12 h-12 bg-gray cursor-pointer">
            <Close onClick={toggleModal} />
          </div>
        </div>
        <div className="mb-6">
          <h5 className="font-semibold text-xs mb-6">
            Giriş Bilgileri{" "}
            <span className="font-normal">
              (Giriş yapabilmek için hesabınızın onaylanmış olması
              gerekmektedir.)
            </span>
          </h5>
          <div className="flex flex-wrap gap-6">
            <input
              type="email"
              placeholder="E-Posta Adresiniz"
              className="flex-1 min-w-[240px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) =>
                dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Şifreniz"
              className="flex-1 min-w-[240px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) =>
                dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value })
              }
            />
          </div>
        </div>
        <div className="py-6 flex flex-wrap gap-8">
          <h3
            onClick={() => mutation.mutate(credentials)}
            className="flex-1 min-w-[240px] text-center bg-green py-3 px-4 rounded-lg text-white text-base cursor-pointer transition-all ease-in-out duration-300 hover:bg-darkgreen"
          >
            Giriş Yap
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

export default LoginModal;
