import React, { useEffect, useReducer } from "react";
import { Header } from "../components";
import { Close } from "../constants/images";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "react-dropdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { category, priority } from "../constants/demand";
import { updateDemands } from "../lib/crud";

const initial_values = {
  priority: 0,
  category: "",
  title: "",
  amount: 0,
  location: "",
  desc: "",
};

// write reducer for initial_values
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_PRIORITY":
      return { ...state, priority: action.payload };
    case "UPDATE_CATEGORY":
      return { ...state, category: action.payload };
    case "UPDATE_TITLE":
      return { ...state, title: action.payload };
    case "UPDATE_AMOUNT":
      return { ...state, amount: action.payload };
    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };
    case "UPDATE_DESC":
      return { ...state, desc: action.payload };
    default:
      return state;
  }
}

function Demand() {
  const user = useSelector((state) => state.user.user);
  const [values, dispatch] = useReducer(reducer, initial_values);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch({ type: "UPDATE_LOCATION", payload: user.location });
  }, [user]);

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: updateDemands,
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
          <h3 className="font-semibold text-2xl text-black">
            İhtiyaç Talebi Oluştur
          </h3>
          <div className="p-3 rounded-xl w-12 h-12 bg-gray cursor-pointer">
            <Link to="/">
              <Close />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-8">
          <div className="flex-1 min-w-[400px] mb-6">
            <h5 className="font-semibold text-xs text-black mb-2">
              Öncelik Düzeyi
            </h5>
            <Dropdown
              options={priority}
              onChange={(e) =>
                dispatch({ type: "UPDATE_PRIORITY", payload: e.value })
              }
              placeholder="Seçiniz"
            />
          </div>
          <div className="flex-1 min-w-[400px] mb-6">
            <h5 className="font-semibold text-xs text-black mb-2">Kategori</h5>
            <Dropdown
              options={category}
              onChange={(e) =>
                dispatch({ type: "UPDATE_CATEGORY", payload: e.value })
              }
              placeholder="Seçiniz"
            />
          </div>
          <div className="flex-1 min-w-[400px] mb-6">
            <h5 className="font-semibold text-xs text-black mb-2">
              Talep Edilen Yardım
            </h5>
            <input
              type="text"
              placeholder="Yazın"
              className="flex-1 w-full min-w-[400px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) =>
                dispatch({ type: "UPDATE_TITLE", payload: e.target.value })
              }
            />
          </div>
          <div className="flex-1 min-w-[400px] mb-6">
            <h5 className="font-semibold text-xs text-black mb-2">
              Talep Miktarı
            </h5>
            <input
              type="number"
              placeholder="Yazın"
              className="flex-1 w-full min-w-[400px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
              onChange={(e) =>
                dispatch({ type: "UPDATE_AMOUNT", payload: e.target.value })
              }
            />
          </div>
          <div className="flex-1 min-w-[400px] mb-6">
            <h5 className="font-semibold text-xs text-black mb-2">
              Yardım Talep Edilen Merkez
            </h5>
            <input
              type="text"
              disabled
              value={user.location}
              className="flex-1 w-full min-w-[400px] border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black"
            />
          </div>
          <div className="flex-1 min-w-full mb-6">
            <h5 className="font-semibold text-xs text-black mb-2">Açıklama</h5>
            <textarea
              className="flex-1 min-w-full border-[1px] border-gray p-3 rounded-lg outline-none placeholder:text-black resize-none h-36 mb-6"
              onChange={(e) =>
                dispatch({ type: "UPDATE_DESC", payload: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 py-4 mb-16">
          <h3
            className="text-center bg-green py-3 px-32 rounded-lg text-white text-base cursor-pointer transition-all ease-in-out duration-300 hover:bg-darkgreen"
            onClick={() => mutation.mutate(values)}
          >
            Talep Oluştur
          </h3>
          <h3
            onClick={() => navigate("/", { replace: true })}
            className="text-center bg-gray py-3 rounded-lg text-black text-base cursor-pointer transition-all ease-in-out duration-300 px-32 hover:bg-red hover:text-white"
          >
            İptal Et
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Demand;
