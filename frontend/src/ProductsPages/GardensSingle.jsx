import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Center,
  Circle,
  Divider,
  Flex,
  HStack,
  Image,
  Icon,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { storeData } from "../utils/localStorage";
import axios from "axios";
const GardenSingle = () => {
  const [data, setData] = useState({});
  const [image, setImage] = useState();

  const { id } = useParams();
  const toast = useToast();

  React.useEffect(() => {
    axios
      .get(`https://stock-server.onrender.com/products/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const AddToCart = () => {
    fetch("http://localhost:8025/todo/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("psctoken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((er) => console.log(er));
    toast({
      title: "Added",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    console.log(data);
  };

  return (
    <Wrap spacing={10} justify="center" marginTop="60px">
      <HStack spacing={5}>
        <VStack padding={3}>
          <ChevronDownIcon boxSize="30px" color="gray.500" cursor="pointer" />

          {data.otherimg?.map((colors, i) => (
            <Image
              borderRadius={5}
              alt="colorsimg"
              width="70px"
              objectFit="cover"
              src={data.otherimg[(colors, i)]}
              onClick={() => setImage(data.otherimg[(colors, i)])}
              cursor="pointer"
            />
          ))}
          <ChevronUpIcon boxSize="30px" color="gray.500" cursor="pointer" />
        </VStack>

        <Image
          borderRadius={15}
          src={image ? image : data.image}
          w="470px"
          minW="200px"
        />
      </HStack>

      <VStack width={550} align="revert-layer" spacing={5} marginTop={50}>
        <Text fontSize="2xl" color="gray.500">
          {data.name}
        </Text>
        <div style={{ display: "flex", marginTop: "-5px" }}>
          <Badge
            fontSize="18px"
            variant="outline"
            width="60px"
            height="35px"
            mt="10px"
            colorScheme="teal"
          >
            {"4.4  ⭐"}
          </Badge>

          <HStack alignContent="center">
            <Text fontWeight="bold" fontSize="4xl" ml="5px">
              ${data.price}
            </Text>
            <Text as="s" marginLeft={4} fontSize="xl">
              ${data.price - 15}
            </Text>
          </HStack>
        </div>

        <Divider />

        <div style={{ display: "flex" }}>
          <Link to="/gardens">
            {" "}
            <Button colorScheme="teal" variant="outline" padding="6px">
              GO BACK
            </Button>{" "}
          </Link>
          <Button
            onClick={() => AddToCart(data.id)}
            ml="10px"
            w="230px"
            padding="6px"
            colorScheme="yellow"
          >
            <Icon as={MdAddShoppingCart} mr="10px" />
            ADD TO BASKET
          </Button>
        </div>
      </VStack>
    </Wrap>
  );
};

export default GardenSingle;
