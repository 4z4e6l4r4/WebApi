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
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://localhost:7178/api/ProductPagination/${currentPage}`);
        const data = await response.json();
        setTotalPages(data.pageCount);
        setProducts(data.products);
      } catch (error) {
        console.error('Ürünleri çekerken bir hata oluştu:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);

    // API'den arama sonuçlarını çek
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`https://localhost:7178/api/SearchProduct?search=${value}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Arama sırasında bir hata oluştu:', error);
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  };

  // Her sayfada 3 ürün göster
  const pageSize = 3;

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
        total={searchTerm ? totalPages * pageSize : products.length} 
        pageSize={pageSize} 
        onChange={handlePageChange}
      />
    </div>
  );
};

export default SearchP;
