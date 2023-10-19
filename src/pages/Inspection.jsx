import { useEffect, useReducer } from "react";
import { Header } from "../components";
import { Close } from "../constants/images";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { population } from "../constants/population";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dropdown from "react-dropdown";
import { updatePeople } from "../lib/crud";

const initial_values = {
  category: 0,
  population: 0,
};

// write reducer for initial_values
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_CATEGORY":
      return { ...state, category: action.payload };
    case "UPDATE_POPULATION":
      return { ...state, population: action.payload };
    default:
      return state;
  }
}

function Inspection() {
  const user = useSelector((state) => state.user.user);
  const [values, dispatch] = useReducer(reducer, initial_values);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: updatePeople,
    onSuccess: (res) => {
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-semibold text-2xl text-black">Sayım Ekle</h3>
          <div className="p-3 rounded-xl w-12 h-12 bg-gray cursor-pointer">
            <Link to="/">
              <Close />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 mb-16">
          <div className="flex-1 min-w-[400px] mb-6">
            <h5 className="font-semibold text-xs text-black mb-2">
              Sayım Yapılan Merkez
            </h5>
            <input
              type="text"
              disabled
              value={user.location}
              className="flex-1 w-full min-w-[400px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) => {}}
            />
          </div>
          <div className=" w-full mb-6">
            <h5 className="font-semibold text-xs text-black mb-2">Kategori</h5>
            <Dropdown
              options={population}
              onChange={(e) =>
                dispatch({ type: "UPDATE_CATEGORY", payload: e.value })
              }
              placeholder="Seçiniz"
            />
          </div>
          <div className="flex-1 min-w-[400px] mb-6">
            <h5 className="font-semibold text-xs text-black mb-2">
              Kişi Sayısı
            </h5>
            <input
              type="number"
              placeholder="Yazın"
              className="flex-1 w-full min-w-[400px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_POPULATION",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex-1 min-w-[400px] mb-6 ">
            <h3
              onClick={() =>
                mutation.mutate({
                  location: user.location,
                  type: values.category,
                  amount: values.population,
                })
              }
              className="bg-green text-white font- transition-all duration-300 cursor-pointer mt-6 text-center items-center p-3 rounded-lg hover:bg-darkgreen"
            >
              Ekle
            </h3>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inspection;
