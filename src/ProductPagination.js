import React, { useState, useEffect } from 'react';
import { List, Pagination, Input } from 'antd';

const { Search } = Input;

const SearchP = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // API'den sayfa başına düşen ürünleri çek
    fetch(`https://localhost:7178/api/ProductPagination/${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setTotalPages(data.pageCount);
        setProducts(data.products);
      })
      .catch((error) => {
        console.error('Ürünleri çekerken bir hata oluştu:', error);
      });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);

    // API'den arama sonuçlarını çek
    fetch(`https://localhost:7178/api/SearchProduct?search=${value}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error('Arama sırasında bir hata oluştu:', error);
        setSearchResults([]);
      });
  };

  return (
    <div>
      <Search
        placeholder="Ürün ara..."
        enterButton
        onSearch={handleSearch}
        style={{ marginBottom: '16px' }}
      />

      <List
        dataSource={searchTerm ? searchResults : products}
        renderItem={(item) => (
          <List.Item style={{ backgroundColor: '#f0f0f0', padding: '8px', margin: '4px 0', borderRadius: '4px' }}>
            {item.name}
          </List.Item>
        )}
      />

<Pagination
  current={currentPage}
  total={searchTerm ? totalPages * 2 : products.length} 
  pageSize={2} 
  onChange={handlePageChange}
/>

    </div>
  );
};

export default SearchP;
