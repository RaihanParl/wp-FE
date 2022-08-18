import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ItemCard } from "../Component/ItemCard";
import { URL } from "../config";
import { useRequest } from "../context/useRequest";

export const ItemList = () => {
  const [data, setData] = useState([]);
  const { get } = useRequest();

  useEffect(() => {
    const fetchData = async () => {
      const { json } = await get(`${URL}/vehicle/list`);
      console.log(json);
      setData(json.data.vehicle_list);
    };
    fetchData();
  }, [setData]);
  return (
    <div style={{ marginTop: "3%", marginLeft: 10, marginRight: 10 }}>
      <div className="f1 mb3">List of car</div>
      <Row gutter={[16, 16]} wrap={true}>
        {data.map(({ id, image_link, description, name, price_per_day }) => {
          return (
            <Link to={`/car/${id}`}>
              <Col>
                {" "}
                <ItemCard
                  image={image_link}
                  description={`RP.${price_per_day}`}
                  title={name}
                />{" "}
              </Col>
            </Link>
          );
        })}
      </Row>
    </div>
  );
};
