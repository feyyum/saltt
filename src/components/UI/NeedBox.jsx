import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { useQueryClient, useQuery } from "@tanstack/react-query";

import { getNearest, sortLocations } from "../../lib/location";
import { getDemands } from "../../lib/crud";

import { donor_locations, recipient_locations } from "../../constants/places";
import {
  Home,
  HomeFilled,
  Target,
  TargetFilled,
  Up,
  UpLight,
} from "../../constants/images";
import { getCategory } from "../../constants/demand";

import { useNavigate } from "react-router-dom";

function NeedBox() {
  const [donorLocation, setDonorLocation] = useState(null);
  const [recipientLocation, setRecipientLocation] = useState(null);
  const [demand, setDemand] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          sortLocations(
            donor_locations,
            position.coords.latitude,
            position.coords.longitude
          );
          setDonorLocation(
            getNearest(
              donor_locations,
              position.coords.latitude,
              position.coords.longitude
            )
          );
        },
        (error) => {
          console.log(error);
          setDonorLocation(donor_locations[0]);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    console.log(donorLocation);
    if (donorLocation !== null) {
      sortLocations(
        recipient_locations,
        donorLocation.coords.latitude,
        donorLocation.coords.longitude
      );
      setRecipientLocation(
        getNearest(
          recipient_locations,
          donorLocation.coords.latitude,
          donorLocation.coords.longitude
        )
      );
    }
  }, [donorLocation]);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["demands"],
    queryFn: getDemands,
    staleTime: 0,
  });

  const navigate = useNavigate();

  return (
    <div className="flex gap-16 flex-wrap my-16">
      <div className="flex flex-col min-w-[320px] gap-2 flex-1">
        <h3 className="text-base font-semibold text-center">Nereden</h3>
        <div className="w-full bg-gray pt-8 pb-8 px-5 rounded-3xl">
          {donorLocation === null ? (
            <div className="flex justify-center items-center h-[240px]">
              <Oval
                height={80}
                width={80}
                color="#7EB2FF"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#c1d6f5"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            <ul className="h-[240px] overflow-y-auto">
              {donor_locations.map((item, index) => {
                return (
                  <li
                    className={`py-4 px-6 flex gap-4 rounded-xl text-sm ${
                      item.id === donorLocation.id &&
                      "bg-blue text-white font-bold"
                    } cursor-pointer items-center`}
                    key={index}
                    onClick={() => setDonorLocation(donor_locations[index])}
                  >
                    <div className="mt-[-4px]">
                      {item.id === donorLocation.id ? <HomeFilled /> : <Home />}
                    </div>
                    <p>{item.name}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col min-w-[320px] gap-2 flex-1">
        <h3 className="text-base font-semibold text-center">Nereye</h3>
        <div className="w-full bg-gray pt-8 pb-8 px-5 rounded-3xl">
          {donorLocation === null ? (
            <div className="flex justify-center items-center h-[240px]">
              <Oval
                height={80}
                width={80}
                color="#FFDC84"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#fcedc5"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : recipientLocation !== null ? (
            <ul className="h-[240px] overflow-y-auto">
              {recipient_locations.map((item, index) => {
                return (
                  <li
                    className={`py-4 px-6 flex gap-4 rounded-xl text-sm ${
                      item.id === recipientLocation.id &&
                      "bg-yellow text-white font-bold"
                    } cursor-pointer items-center`}
                    key={index}
                    onClick={() =>
                      setRecipientLocation(recipient_locations[index])
                    }
                  >
                    <div className="mt-[-4px]">
                      {item.id === recipientLocation.id ? (
                        <TargetFilled />
                      ) : (
                        <Target />
                      )}
                    </div>
                    <p>{item.name}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex justify-center items-center h-[240px]">
              <Oval
                height={80}
                width={80}
                color="#FFDC84"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#fcedc5"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col min-w-[320px] gap-2 flex-1">
        <h3 className="text-base font-semibold text-center">
          Öncelikli İhtiyaçlar
        </h3>
        <div className="w-full bg-gray pt-8 px-5 rounded-3xl">
          <ul className="h-[208px] overflow-y-auto">
            {data &&
              recipientLocation !== null &&
              data
                .filter((item) => item.location === recipientLocation.name)
                .sort((a, b) => b.priority - a.priority)
                .map((item, index) => {
                  return index === demand ? (
                    <li
                      key={index}
                      className=" py-3 px-6 flex gap-4 items-center bg-red rounded-xl text-white font-bold text-sm"
                    >
                      <Up />
                      {getCategory(item.category)}
                    </li>
                  ) : (
                    <li
                      key={index}
                      className=" py-3 px-6 flex gap-4 items-center rounded-xl text-sm"
                    >
                      <UpLight />
                      {getCategory(item.category)}
                    </li>
                  );
                })}
            {isLoading && (
              <div className="flex justify-center items-center h-[240px]">
                <Oval
                  height={80}
                  width={80}
                  color="#FF7E7E"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#FFC8C8"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            )}
            {data &&
              recipientLocation !== null &&
              data.filter((item) => item.location === recipientLocation.name)
                .length === 0 && (
                <div className="flex justify-center items-center h-[240px]">
                  <p>Yakınınızdaki ihtiyaçlar bulunamadı.</p>
                </div>
              )}
          </ul>
          <div className="h-16 flex justify-center items-center">
            {data &&
              recipientLocation !== null &&
              data.filter((item) => item.location === recipientLocation.name)
                .length > 0 && (
                <p
                  onClick={() => navigate("/needs", { replace: true })}
                  className="w-full text-center items-center cursor-pointer text-red"
                >
                  Tümünü İncele
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NeedBox;
