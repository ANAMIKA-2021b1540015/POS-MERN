import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout.js";
import axios from "axios";
import { Col, Row } from "antd";
import ItemList from "../components/ItemList.js";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const [itemsData, setitemsData] = useState([]);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("noodles");
  const categories = [
    {
      name: "drinks",
      sn: "Drinks",
      imgUrl:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      id: "drinks",
    },
    {
      name: "rice",
      sn: "Rice",
      imgUrl:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      id: "rice",
    },
    {
      name: "noodles",
      sn: "Noodles",
      imgUrl:
        "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      id: "noodles",
    },
  ];

  useEffect(() => {
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
    getAllItems();
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selectedCategory === category.name && "category-active "
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <h4>{category.sn}</h4>
            <img
              src={category.imgUrl}
              alt={category.name}
              height="60"
              width="80"
            />
          </div>
        ))}
      </div>

      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};
export default Homepage;
