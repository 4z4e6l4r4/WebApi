import { Header } from "antd/es/layout/layout";
import "./App.css";
import { Col } from "antd";
import FooterC from "./Footer";
import Home from "./Home";
import { Routes, Route, Link } from "react-router-dom";
import PageC from "./PageC";
import PageP from "./PageP";
import PageE from "./PageE";

function App() {
  return (
    <div className="App">
      <Header />
      <Col
        style={{
          padding: "30px 200px",
          backgroundColor: "antiquewhite",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "50px",
          }}
        >
          <Link to="/category">Category Page</Link>
          <Link to="/product">Product Page</Link>
          <Link to="/edit">Edit Page</Link>
        </div>
        <br />
        <br />
        <br />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/category" element={<PageC />} />
          <Route path="/product" element={<PageP />} />
          <Route path="/edit" element={<PageE />} />
        </Routes>
        <br />
        <br />
        <br />
        {/* <div 
style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',gap: '70px' }}
        >
        <CategoryForm style={{ flex: '1', maxWidth: '100px' }}/> 
        <CategoryTable style={{ flex: '1', maxWidth: '900px' }} />
        </div> */}
      </Col>

      <FooterC />
    </div>
  );
}

export default App;
