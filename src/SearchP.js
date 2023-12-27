import React, { useState } from 'react';
import { Input, List } from 'antd';

const { Search } = Input;

const SearchP = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = async (value) => {
    try {
      const response = await fetch(`https://localhost:7178/api/product?search=${value}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Arama sırasında bir hata oluştu:', error);
      setSearchResults([]);
    }
  };

  const handleProductSelect = (product) => {
    console.log('Seçilen Ürün:', product);
    setSelectedProduct(product);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    // Sadece kelimenin ilk harfini kontrol et ve arama fonksiyonunu çalıştır
    if (value.trim() !== '' && /\s/.test(value[value.length - 1])) {
      handleSearch(value.trim());
    }
  };

  console.log('searchTerm:', searchTerm);
  console.log('searchResults:', searchResults);
  console.log('selectedProduct:', selectedProduct);

  // Arama sonuçlarını filtreleme
  const filteredResults = searchResults.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <Search
        placeholder="Ürün ara..."
        enterButton
        onSearch={handleSearch}
        onChange={handleInputChange}
        style={{ marginBottom: '16px' }}
      />

      <div>
        <h3>Arama Sonuçları</h3>
        <List
          dataSource={filteredResults}
          renderItem={(product) => (
            <List.Item
              onClick={() => handleProductSelect(product)}
              style={{ cursor: 'pointer', backgroundColor: '#f0f0f0', padding: '8px', margin: '4px 0', borderRadius: '4px' }}
            >
              {product.name}
            </List.Item>
          )}
        />
      </div>

      {selectedProduct && (
        <div>
          <h3>Seçilen Ürün Detayları</h3>
          <p>Ürün Adı: {selectedProduct.name}</p>
          <p>Fiyat: {selectedProduct.price}</p>
          <p>Stok: {selectedProduct.stock}</p>
        </div>
      )}
    </div>
  );
};

export default SearchP;
