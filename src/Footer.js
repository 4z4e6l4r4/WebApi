import React from 'react';
import { Layout, theme } from 'antd';

const {Footer} = Layout;

const FooterC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>


      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: 'gray'
        }}
      >
        El De Va ©2023 Created by Azra
      </Footer>
    </Layout>
  );
};
export default FooterC;