import React, { useState, useEffect } from 'react';
import { Table, Switch } from 'antd';
import { Button} from 'antd';



const CategoryTables = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("https://localhost:7178/api/category");
      const json = await response.json();
      setProducts(json);
      console.log(json);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
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
      title: 'Status',
      dataIndex: 'isStatus',
      render: (text) => (
        <Switch
          checked={text} 
           
        />
        
      ),
    },
   
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return    <Table columns={columns} dataSource={products} onChange={onChange} /> ;
};

export default CategoryTables;
