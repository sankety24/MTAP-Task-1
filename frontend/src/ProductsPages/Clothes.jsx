import "./Clothes.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Clothes = () => {
  const [cloth, setClothes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = (page) => {
    axios
      .get(`https://dataapi.onrender.com/cloths?_limit=12&_page=${page}`)
      .then((e) => {
        setLoading(true);
        console.log(e);
        setClothes(e.data);
      })
      .catch((r) => {
        setLoading(false);
        setError(true);
        console.log(r);
      });
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (changeBy) => {
    setPage(page + changeBy);
  };

  const filterCloth = (e) => {
    const sorting = e.target.value;
    let arr = [...cloth];

    console.log("working the sort");
    if (sorting == "featured") {
      fetchData();
    }
    if (sorting === "low") {
      arr.sort((a, b) => a.price - b.price);
      setClothes(arr);
    }
    if (sorting === "high") {
      arr.sort((a, b) => b.price - a.price);
      setClothes(arr);
    }
    if (sorting === "asc") {
      arr.sort(function (a, b) {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
      setClothes(arr);
    }

    if (sorting === "dsc") {
      arr.sort(function (a, b) {
        if (b.title > a.title) return 1;
        if (b.title < a.title) return -1;
        return 0;
      });
      setClothes(arr);
    }
  };
  return (
    <div>
      <div className="main">
        <div className="product">
          <div className="product-child1">
            <p>
              Women's Clothing{" "}
              <span
                style={{ fontSize: "12px", color: "grey", marginLeft: "10px" }}
              >
                {cloth.length} products
              </span>
            </p>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <label style={{ marginTop: "5px" }}>Sort:</label>
              <select className="select" onChange={filterCloth}>
                <option value="featured">Featured</option>
                <option value="low">Price:Low to High</option>
                <option value="high">Price:High to Low</option>
                <option value="asc">A-Z</option>
                <option value="dsc">Z-A</option>
              </select>
              <div style={{ marginLeft: "10px" }}>
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(-1)}
                >
                  <ChevronLeftIcon w={10} h={10} />
                </button>
                {page}
                <button
                  disabled={page === 2}
                  onClick={() => handlePageChange(1)}
                >
                  {" "}
                  <ChevronRightIcon w={10} h={10} />
                </button>
              </div>
            </div>
          </div>
          {!loading && (
            <Spinner
              ml="40%"
              mt="13%"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}
          <div className="clothData">
            {cloth.length > 0 &&
              cloth.map((data) => (
                <div key={data.id} className="cloth">
                  <Link to={`/cloth/${data.id}`}>
                    <div className="image">
                      <img src={data.img1} alt="" />
                    </div>
                  </Link>
                  <div>
                    {" "}
                    <h1>{data.title}</h1>
                  </div>
                  <div>
                    <p>${data.price}</p>
                  </div>
                  {data.id % 2 == 0 ? (
                    <div style={{ display: "flex", marginTop: "5px" }}>
                      <img
                        width="5%"
                        src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg"
                      />
                      <img
                        width="5%"
                        src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg"
                      />
                      <img
                        width="5%"
                        src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg"
                      />
                      <img
                        width="5%"
                        src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg"
                      />
                    </div>
                  ) : (
                    <div style={{ display: "flex", margintop: "10px" }}>
                      <img
                        width="5%"
                        src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg"
                      />
                      <img
                        width="5%"
                        src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg"
                      />
                      <img
                        width="5%"
                        src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg"
                      />
                      <img
                        width="5%"
                        src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg"
                      />
                      <img
                        width="5%"
                        src="https://ak1.ostkcdn.com/img/mxc/20200227_rating-star-full.svg"
                      />
                    </div>
                  )}
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    {" "}
                    {data.color?.map((colors, i) => (
                      <img
                        width="11%"
                        style={{
                          borderRadius: "50%",
                          marginLeft: "5px",
                          marginBottom: "20px",
                          border: "2px solid black",
                          cursor: "pointer",
                        }}
                        src={data.color[(colors, i)]}
                        alt="colorsimg"
                      ></img>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothes;
