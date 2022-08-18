import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { TransactionCard } from "../Component/TransactionCard";
import { useRequest } from "../context/useRequest";
import { URL } from "../config";

const data = [
  {
    id: 1,
    trx: "d9988399-a92d-496e-8978-11a6b0cbf6d8",
    user_id: "1",
    vehicle_id: "1",
    duration_in_days: 1,
    cost: 250000,
    is_paid: "unpaid",
    created_at: "2022-08-13T16:58:14.000000Z",
    updated_at: null,
    user_name: "user1",
    user_email: "user1@gmail.com",
    vehicle_name: "Toyota Raize",
    vehicle_brand: "Toyota",
    owner_name: "Jakarta Rental",
    owner_email: "jakarta-rental@gmail.com",
  },
  {
    id: 2,
    trx: "37149d7a-32ab-4ce0-8b55-1bfa6355b89a",
    user_id: "1",
    vehicle_id: "1",
    duration_in_days: 1,
    cost: 250000,
    is_paid: "unpaid",
    created_at: "2022-08-13T20:41:31.000000Z",
    updated_at: null,
    user_name: "user1",
    user_email: "user1@gmail.com",
    vehicle_name: "Toyota Raize",
    vehicle_brand: "Toyota",
    owner_name: "Jakarta Rental",
    owner_email: "jakarta-rental@gmail.com",
  },
  {
    id: 3,
    trx: "7544e2b4-3170-44b3-9b26-4e4006c24498",
    user_id: "1",
    vehicle_id: "1",
    duration_in_days: 1,
    cost: 250000,
    is_paid: "unpaid",
    created_at: "2022-08-13T20:41:56.000000Z",
    updated_at: null,
    user_name: "user1",
    user_email: "user1@gmail.com",
    vehicle_name: "Toyota Raize",
    vehicle_brand: "Toyota",
    owner_name: "Jakarta Rental",
    owner_email: "jakarta-rental@gmail.com",
  },
];

export const TranasactionList = () => {
  const [data, setData] = useState([]);
  const { get } = useRequest();
  useEffect(() => {
    const fetchData = async () => {
      const { json } = await get(`${URL}/vehicle/trx/list`);
      setData(json.data.trx_list);
    };
    fetchData();
  }, [setData]);

  return (
    <div style={{ marginTop: "3%", marginLeft: 10, marginRight: 10 }}>
      <div className="f1 mb3">Mobil yang disewa:</div>
      {data.map((d) => {
        return <TransactionCard data={d} />;
      })}
    </div>
  );
};
