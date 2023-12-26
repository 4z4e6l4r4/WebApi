import React from "react";
import { Form } from "antd";
import ProductTables from "./ProductTables";
import CategoryForm from "./CategoryForm";

const PageP = () => {
  return (
    <div>
      <CategoryForm/>

      <br/>

      <ProductTables />
    </div>
  );
};
export default PageP;
