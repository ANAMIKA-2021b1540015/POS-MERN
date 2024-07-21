import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  //upDATE CART
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
  };

  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 240,
          padding: 20,
          height: 320,
          marginBottom: 24,
          marginRight: 10,
        }}
        cover={<img alt="example" src={item.image} style={{ height: 180 }} />}
        // actions={[
        //   <SettingOutlined key="setting" />,
        //   <EditOutlined key="edit" />,
        //   <EllipsisOutlined key="ellipsis" />,
        // ]}
      >
        <Meta title={item.name} />
        <div className="item-button">
          <Button onClick={() => handleAddToCart()}>Add to Cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
