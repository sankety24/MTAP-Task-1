import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Button,
  Stack,
  Select,
  Heading,
  Link,
  Image,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./CartPage.css";
import { useEffect } from "react";
import { useState } from "react";
import Cart_single_Item from "./Cart_single_Item";

const CartPage = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [sumo, setsum] = useState(1);
  const handleSubmit = (todoID) => {
    fetch(`http://localhost:8025/todo/delete/${todoID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("psctoken")}`,
      },
    });
  };

  console.log("ram");
  useEffect(() => {
    fetch("http://localhost:8025/todo", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("psctoken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        // setLoading(false);
        console.log(res);
      })
      .catch((er) => {
        console.log(er);
        // setError(true);
        // setLoading(false);
      });
    const getAverageAge = () => {
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i].price * data[i].quantity;
      }
      setsum(sum);
    };
    getAverageAge();
  }, [sumo]);

  function Update(value) {
    // Setfull([...full,value]);
    // console.log(full);
  }

  const handleCheckout = () => {
    localStorage.setItem("Carts", sumo);
    navigate("/");
  };
  return (
    <Box>
      <Box className="main_div">
        <Box className="maindiv_left">
          <Box display={"flex"} justifyContent={"space-between"} mb={"20px"}>
            <Heading fontSize={"20px"} mt={"15px"}>
              CART DETAILS
            </Heading>
            
          </Box>
          <Box mb={"10px"}>
            <Grid
              h="auto"
              templateRows="auto"
              templateColumns="1.3fr 2fr 3fr"
              columnGap={"20px"}
              rowGap="10px"
            >
              <GridItem></GridItem>
              <GridItem>
                <Text>Item</Text>
              </GridItem>
              <GridItem>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Text>Item Price</Text>
                  <Text>Quantity</Text>
                  <Text>Total Price</Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>

          {data.map((elem) => (
            <Cart_single_Item elem={elem} Update={Update} />
          ))}
        </Box>
        <Box className={"top-left"}>
          <Box ml={"60px"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Heading fontSize={"18px"} mt={"15px"}>
                Order Summary
              </Heading>
              <Link
                mt={"15px"}
                textDecoration={"underline"}
                fontSize="13px"
                color={"#167A92"}
              ></Link>
            </Box>
            <Box m={"20px"}>
              <Box
                display={"flex"}
                justifyContent="space-between"
                fontSize={"13px"}
              >
                <Text>Subtotal</Text>
                <Text>${sumo}</Text>
              </Box>

              <Box
                display={"flex"}
                justifyContent="space-between"
                fontSize={"15px"}
              >
                <Text fontWeight={"bold"} color={"black"}>
                  Total
                </Text>
                <Text>${sumo}</Text>
              </Box>
              <br />
              <Box fontSize={"11px"}>
                <br />
              </Box>

              <Box>
                <Button
                  onClick={handleCheckout}
                  p={"10px 20px"}
                  background="#4B5666"
                  color={"white"}
                  border="none"
                  width={"100%"}
                  fontSize={"1.1rem"}
                  mb="10px"
                >
                  Place your order
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box id="swiper" className={"swiper_down"}></Box>
    </Box>
  );
};

export default CartPage;
