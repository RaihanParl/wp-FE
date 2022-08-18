import React, { useContext, useEffect, useState } from "react";
import { ItemCard } from "../Component/ItemCard";
import { Button, Card, Col, Image, InputNumber, Row, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useRequest } from "../context/useRequest";
import { URL } from "../config";

const { Title } = Typography;

export const Detail = () => {
  const [count, setCount] = useState(1);
  const [data, setData] = useState({ vehicle: {}, owner: {} });
  const { vehicle, owner } = data;

  const navigate = useNavigate();

  const { carId } = useParams();

  const { get, post } = useRequest();

  const createTransaction = React.useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("vehicle_id", carId);
      formData.append("duration_in_days", count);
      const { json } = await post(`${URL}/vehicle/rent`, {
        body: formData,
      });
      navigate("/transaction");
    } catch (error) {
      console.log(error);
      return;
    }
  }, [carId, count]);

  useEffect(() => {
    console.log(`${URL}/vehicle/detail?vehicle_id=${carId}`);
    const fetchData = async () => {
      const { json } = await get(`${URL}/vehicle/detail?vehicle_id=${carId}`);
      setData(json.data);
    };
    fetchData();
  }, [setData, carId]);

  return (
    <div className="flex flex-column">
      <div className="w-100 flex flex-row justify-center bg-light-silver pt3 pb3">
        <Image width={400} src={vehicle.image_link} />
      </div>
      <div className="flex flex-row justify-between ma3">
        <div className="flex flex-column mt2 ml5">
          <div className="f1">{vehicle.name}</div>
          <div className="f6">
            {owner.name} ({owner.email})
          </div>
          <div className="f4 mt4">{vehicle.desc}</div>
        </div>
        <div className="flex flex-column">
          <div className="f4 mt2">
            Pilih hari untuk pesan kendaraan:(Rp.{vehicle.price_per_day}/hari)
          </div>
          <div className="f6 mt2">
            *pesanan akan dihitung H+1 sejak hari pemesanan
          </div>
          <div className="flex flex-row justify-center mt2">
            <InputNumber
              min={1}
              max={10}
              defaultValue={count}
              onChange={() => setCount(count + 1)}
            />
          </div>
          <Button className="mt2" type="primary" onClick={createTransaction}>
            Pesan Kendaraan
          </Button>
        </div>
      </div>
    </div>
  );
};
