import React from "react";
import ProductTables from "./ProductTables";
import ProductForm from "./ProductForm";
import SearchP from "./SearchP";
import ProductPagination from "./ProductPagination";

const PageP = () => {
  return (
    <div>
      <ProductForm/>

      <br/>
<SearchP/>
<br/>
<br/>
 <ProductPagination/>
 <br/>
 <br/>
 <br/>

 <ProductTables/>

    </div>
  );
};
export default PageP;
