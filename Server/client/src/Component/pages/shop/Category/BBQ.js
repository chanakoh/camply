import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../shop/css/ShopMain.css";
import Pagination from "react-js-pagination";
import ShopLayout from "../ShopLayout";

const BBQ = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://camply.store/shop/category/main/fireplace"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("상품을 불러오는 중 에러 발생", error);
      }
    };

    fetchData();
  }, []);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <ShopLayout />
      <div
        className='category-item'
        style={{ display: "flex", justifyContent: "center" }}
      >
        {displayedProducts.length > 0 ? (
          <div>
            <section>
              <h2 style={{ display: "flex", justifyContent: "center" }}>
                화로&BBQ
              </h2>
              <br />
              <ul className='swiper-wrapper'>
                {displayedProducts.map((product) => (
                  <li
                    key={product.productId}
                    className='swiper-slide swiper-slide-active'
                    style={{
                      width: "272.5px",
                      marginRight: "30px",
                    }}
                  >
                    <Link to={`/shop/detail/${product.productId}`}>
                      <div className='imgWrap'>
                        <img
                          src={product.productThumbnail}
                          className='imgs'
                          alt={product.productName}
                        />
                      </div>
                      <div className='textWrap'>
                        <p style={{ fontSize: "20px" }} className='companyName'>
                          <b>{product.productName}</b>
                        </p>
                        <p className='itemName1'>
                          {product.productDescription}
                        </p>
                        <div className='itemsPrice clearfix'>
                          <div className='fr'>
                            <strong className='sellPrice'>
                              {product.formattedProductPrice}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className='itemFotter clearfix'>
                      <div className='fr'></div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <p>상품을 찾을 수 없습니다.</p>
        )}
      </div>
      <div
        className='pagination'
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={products.length}
          pageRangeDisplayed={2}
          onChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    </>
  );
};

export default BBQ;
