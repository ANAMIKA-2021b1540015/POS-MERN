/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";

const itemPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [itemsData, setitemsData] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [popupModel, setPopupModel] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editItem, setEditItem] = useState(null);

  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/items/get-item");
      setitemsData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/items/delete-item", { itemId: record._id })
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Item deleted successdully");
        getAllItems();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong");
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditItem(record);
              setPopupModel(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() => deleteItem(record)} />
        </div>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.post("/api/items/add-item", value);
        message.success("Item Added successfully");
        setPopupModel(false);
        getAllItems();
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        message.error("Something went wrong");
        dispatch({
          type: "HIDE_LOADING",
        });
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put("/api/items/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item Updated successfully");
        setPopupModel(false);
        getAllItems();
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        message.error("Something went wrong");
        dispatch({
          type: "HIDE_LOADING",
        });
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List Here</h1>
        <Button type="primary" onClick={() => setPopupModel(true)}>
          Add Item
        </Button>
      </div>
      <Table dataSource={itemsData} columns={coloums} bordered />
      {popupModel && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          open={popupModel}
          onCancel={() => {
            setEditItem(null);
            setPopupModel(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Username">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodles</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default itemPage;
