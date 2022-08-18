import { Card } from "antd";
import React from "react";

const { Meta } = Card;
export const ItemCard = ({ image, title, description }) => {
  return (
    <Card style={{ width: 300 }} cover={<img alt="example" src={image} />}>
      <Meta title={title} description={description} />
    </Card>
  );
};
