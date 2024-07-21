import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DeleteOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import { Button, Table, Modal, Form, Input, Select, message } from "antd";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [subTotal, setSubTotal] = useState(0);
  const [billPopUp, setBillPopUp] = useState(false);
  const dispatch = useDispatch();
  const handleIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const handleDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };
  const coloums = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <MinusSquareOutlined
            className="mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrement(record)}
          />
          <b>{record.quantity}</b>
          <PlusSquareOutlined
            className="mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp += item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  const navigate = useNavigate();
    
  //handle Submit->
  const handleSubmit = async (values) => {
    const reqObject = {
      ...values,
      cartItems,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      totalAmount: Number(
        subTotal + Number(((subTotal / 100) * 10).toFixed(2))
      ),
      userId: JSON.parse(localStorage.getItem("auth"))._id,
    };
    console.log(reqObject);
    await axios
      .post("/api/bills/add-bill", reqObject)
      .then(() => {
        message.success("Bill Generated Successfully");
        navigate("/bills")
      })
      .catch(() => {
        message.error("Billing Failed");
      });
  };
  return (
    <DefaultLayout>
      <h1>Cart Page</h1>
      <Table dataSource={cartItems} columns={coloums} bordered />
      <div className="d-flex flex-column align-items-end">
        <hr />
        <h3>
          Sub Total: <span>&#8377;</span>
          <b>{subTotal}</b>{" "}
        </h3>
        <Button type="primary" onClick={() => setBillPopUp(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        open={billPopUp}
        onCancel={() => {
          setBillPopUp(false);
        }}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerNumber" label="Contact Number">
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
              <Select.Option value="upi">UPI</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill">
            <h6>
              Amount: <span>&#8377;</span>
              <b>{subTotal}</b>{" "}
            </h6>
            <h6>
              GST :<span>&#8377;</span>
              <b>{(subTotal * 0.1).toFixed(2)}</b>{" "}
            </h6>
            <h4>
              Total Amount: <span>&#8377;</span>
              <b>{(subTotal + subTotal * 0.1).toFixed(2)}</b>{" "}
            </h4>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
