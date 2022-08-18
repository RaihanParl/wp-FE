import { Image } from "antd";
import React from "react";

const formatDate = (date) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${weekday[date.getDay()]}, ${date.getDate()} ${
    month[date.getMonth()]
  }, ${date.getFullYear()}`;
};

const addDays = (date, n) => {
  const oneDayInMs = 86400 * 1000;
  return new Date(Date.parse(date) + n * oneDayInMs);
};

export const TransactionCard = ({ data }) => {
  const {
    vehicle_name,
    owner_name,
    created_at,
    duration_in_days,
    cost,
    vehicle_image_link,
  } = data;
  const startSewa = formatDate(new Date(created_at));
  const endSewa = formatDate(addDays(new Date(created_at), duration_in_days));
  return (
    <div className="w-100 flex flex-row mt3 bg-near-white">
      <div className="flex flex-column justify-center">
        <Image width={300} height={150} src={vehicle_image_link} />
      </div>
      <div className="flex flex-column ml3">
        <div className="flex flex-row mb2 self-end">
          <div class="f3">{vehicle_name}</div>
          <div class="f4 flex flex-column self-end">
            , {startSewa} - {endSewa}
          </div>
        </div>
        <h2 class="f4 mb2">RP.{cost}</h2>
        <div>{owner_name}</div>
      </div>
    </div>
  );
};
