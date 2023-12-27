import React, { useState, useEffect } from "react";
import { Table, Switch, Button, Select } from "antd";
import { Link } from "react-router-dom";


const { Option } = Select;

const ProductTables = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getCategories = async () => {
    try {
      const response = await fetch("https://localhost:7178/api/category");
      const json = await response.json();
      setCategories(json);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch("https://localhost:7178/api/product");
      const json = await response.json();
      setProducts(json);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Status",
      dataIndex: "isStatus",
      render: (text) => <Switch checked={text} />,
    },

    {
      title: "Category Name",
      dataIndex: "categoryId",
      render: (categoryId, record) => (
        <Select
          value={categoryId}
          style={{ width: "100%" }}
          onChange={(value) => handleCategoryChange(record.id, value)}
        >
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Settings",
      dataIndex: "id",
      render: (id, record) => (
        <Button type="primary" onClick={() => handleEditClick(record)}>
          <Link to="/edit">Edit</Link>
        </Button>
      ),
    },
  ];

  const handleEditClick = (record) => {
    setSelectedProduct(record);
    console.log(`Edit button clicked for product ID: ${record.id}`);
  };

  const handleCategoryChange = (productId, categoryId) => {
    console.log(
      `Product ID: ${productId}, Selected Category ID: ${categoryId}`
    );
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return <Table  columns={columns} dataSource={products} onChange={onChange} />;

};

export default ProductTables;
