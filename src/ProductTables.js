import React, { useState, useEffect } from 'react';
import { Table, Switch } from 'antd';
import { Form } from 'antd';

const ProductTables = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
      console.log(json);
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
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
    },
    {
      title: 'Status',
      dataIndex: 'isStatus',
      render: (text) => (
        <Switch checked={text} />
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <Table columns={columns} dataSource={products} onChange={onChange} />;
};

export default ProductTables;
