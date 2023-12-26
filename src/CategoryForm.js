import React from 'react';
import { Button, Form, Input, Space, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CategoryForm =  () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Received values:', values);

    // Kategori nesnesini oluştur
    const category = {
        id: 25,
        name: values.Name,
        isStatus: true, // isStatus değeri belirtilmemişse false kabul ediyoruz
    };

    try {
      // Kategoriyi API'ye gönder
      const response = await fetch('https://localhost:7178/api/category', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(category),
});

      console.log(JSON.stringify(category));

      if (response.ok) {
        console.log('Kategori başarıyla eklendi.');
        form.resetFields(); // Formu sıfırla
      } else {
        console.error('Kategori eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Fetch hatası:', error);
    }
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >

      <Form.Item
        name="Name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input the category name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="isStatus"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
        
      >
        <Checkbox>Is Status?</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Add Category
          </Button>
          <Button type="link" htmlType="button">
            <Link to="/">Home</Link>
          </Button>
        </Space>
      </Form.Item>
      
    </Form>
  );
};

export default CategoryForm;
