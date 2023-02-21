import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { RiGlobeLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

import { getData } from "../utils/localStorage";

function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(false);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");
  const toast = useToast();
  const [query, setQuery] = React.useState("");
  const [data, setData] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const cartlength = getData("Cart");
    setCart(cartlength);
  }, []);

  const gotohome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    if (isAuth) {
      setAuth(!isAuth);
      setToken("");
    }
  };
  useEffect(() => {
    if (token) {
      setAuth(true);
      navigate("/");
    }
  }, [token]);

  const handleSubmit = () => {
    const payload = {
      name,
      email,
      password,
    };

    axios
      .post("http://localhost:8026/signup", payload)
      .then((res) => navigate("/"))
      .catch((er) => console.log(er));
  }
    

  const handleLogin = () => {
    const payload = {
      email,
      password,
    };
    if (email === "sanket.yadav@mtap.in" && password === "admin@123") {
      setAdmin(true);
      toast({
        title: "hello Admin",
        status: "success",
        duration: 3000,
        isClosable: true,
        color: "red",
      });
    } else {
      // fetch("https://viridian-python-wrap.cyclic.app/login", {
      fetch("http://localhost:8026/login", {

        
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          localStorage.setItem("psctoken", res.token);
          if (res.token) {
            setToken(res.token);
            toast({
              title: "Login Successfull",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            alert(" wrong credentials");
            toast({
              title: "Login fail",
              status: "success",
              duration: 3000,
              isClosable: true,
              color: "red",
            });
          }
        })
        .catch((er) => console.log(er));
    }
  };

  useEffect(() => {
    fetch("http://localhost:8026/todo", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("psctoken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCart(res);
        // console.log(res);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  
  // console.log(data);
  React.useEffect(() => {
    if (query) {
      setTimeout(() => {
        axios
          .get(
            `https://stock-server.onrender.com/products?_limit=3&_page=1&q=${query}`
          )
          .then((r) => {
            setData(r.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }, 800);
    }
  }, [query]);
  return (
    <div>

      <div
        className="d-flex justify-content-end align-items-center py-1"
        style={{ background: "#f7f6f2", height: "40px" }}
      >
        
        <div
          className="modal"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <p className="text-center fs-2 mb-auto">Sign Up</p>
              <hr />
              
              <div className="modal-body">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "90%%",
                    margin: "auto",
                    padding: "0.4%",
                    marginTop: "30px",
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <input
                    style={{ padding: "7px", border: "1px solid grey" }}
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  <input
                    style={{ padding: "7px", border: "1px solid grey" }}
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <input
                    style={{ padding: "7px", border: "1px solid grey" }}
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <button
                    style={{
                      padding: "7px",
                      border: "1px solid grey",
                      fontFamily: "sans-serif",
                      fontSize: "16px",
                      backgroundColor: "grey",
                      color: "white",
                      fontWeight: "550",
                    }}
                    onClick={handleSubmit}
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                  >
                    Create
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <p
                  className="text-center mx-auto"
                  style={{ fontFamily: "sans-serif" }}
                >
                  If Already Have An Account Click Sign In.
                </p>
                <button
                  className="btn btn-secondary d-grid col-10 row-2 mx-auto"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------------sign in------------------------------ */}
        <div
          className="modal"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <p className="text-center fs-1 mb-1">Sign In</p>
              <hr />
              <div className="modal-body">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "90%%",
                    margin: "auto",
                    padding: "0.4%",
                    marginTop: "30px",
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <input
                    style={{ padding: "7px", border: "1px solid grey" }}
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <input
                    style={{ padding: "7px", border: "1px solid grey" }}
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <button
                    style={{
                      padding: "7px",
                      border: "1px solid grey",
                      fontFamily: "sans-serif",
                      fontSize: "16px",
                      backgroundColor: "grey",
                      color: "white",
                      fontWeight: "550",
                    }}
                    onClick={handleLogin}
                    data-bs-dismiss="modal"
                  >
                    Sign In
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <p className="text-center mx-auto">
                  If Don't Have An Account Click Create An Account.
                </p>
                <button
                  className="btn btn-secondary d-grid col-10 row-2 mx-auto"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                >
                  CREATE AN ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <a className="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a> */}
        <div style={{ marginTop: "0px" }}>
          <AiOutlineUser fontSize="24px" color="#2e80a1" />
        </div>{" "}
        <div style={{ marginTop: "18px" }} className={`me-5 ${styles.cont}`}>
          {isAuth ? (
            <span onClick={handleLogout} className={styles.spans}>
              SignOut
            </span>
          ) : (
            <span
              role="button"
              href="#exampleModalToggle"
              data-bs-toggle="modal"
              className={styles.spans}
            >
              {" "}
              SignIn
            </span>
          )}
        </div>
      </div>

      {/* Search-area */}
      <div
      // style={{ border:"10px soild red" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="antropology"
            style={{
              border: "10px soild red",
              display: "flex",
              width: "28%",
              justifyContent: "space-between",
              marginLeft: "20px",
            }}
          >
            <div
              onClick={gotohome}
              
            >
              HOME
            </div>
            
          </div>
          <div style={{ display: "flex", marginRight: "80px" }}>

            <Link to="/cartPage">
              <div style={{ paddingTop: "10px" }}>
                <Link to="/cartPage">
                  <BsHandbag color="#2e80a1" fontSize="25px" />
                </Link>
              </div>
              <span className="translate-middle badge rounded-pill bg-danger">
                {cart.length == 0 ? 0 : cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>
          </div>
        </div>
        {data.length > 0 && (
          <div
            style={{
              width: "18%",
              borderRadius: "10px",
              borderTop: "1px solid grey",
              zIndex: "3",
              display: "grid",
              position: "absolute",
              left: "72.6%",
              top: "120px",
              backgroundColor: "#EDF2F7",
            }}
          >
            <Link to="cloth">
              {" "}
              <p
                onClick={() => setData([])}
                style={{
                  paddingLeft: "5px",
                  fontFamily: "sans-serif",
                  paddingTop: "10px",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "12px",
                }}
              >
                Trending
              </p>
            </Link>
            {data.length > 0 &&
              data.map((item) => (
                <Link to={`/gardens/${item.id}`}>
                  {" "}
                  <p onClick={() => setData([])} className="searchTitle">
                    {item.name}
                  </p>
                </Link>
              ))}
            <p
              onClick={() => setData([])}
              style={{
                paddingLeft: "5px",
                fontFamily: "sans-serif",
                paddingTop: "10px",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "12px",
              }}
            >
              Category
            </p>
            <div className="icon">
              <Link to="/shoes">
                {" "}
                <h2 onClick={() => setData([])} className="iconh">
                  <SearchIcon fontSize="12px" /> shoes
                </h2>{" "}
              </Link>
              <Link to="/furniture">
                <h2 onClick={() => setData([])} className="iconh">
                  <SearchIcon fontSize="12px" /> furniture
                </h2>{" "}
              </Link>
              <Link to="gardens">
                {" "}
                <h2 onClick={() => setData([])} className="iconh">
                  <SearchIcon fontSize="12px" /> gardens
                </h2>{" "}
              </Link>
              <Link to="/sale">
                {" "}
                <h2 onClick={() => setData([])} className="iconh">
                  <SearchIcon fontSize="12px" /> sale
                </h2>{" "}
              </Link>
            </div>
            <h2
              style={{
                marginTop: "10px",
                paddingLeft: "5px",
                textDecoration: "underline",
                fontFamily: "sans-serif",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "12px",
              }}
            >
              Product Image
            </h2>
            <div className="searchImage">
              {" "}
              {data.length > 0 &&
                data.map((item) => (
                  <Link to={`/cloth/${item.id}`}>
                    {" "}
                    <img
                      className="searchimg"
                      onClick={() => setData([])}
                      width="80%"
                      src={item.image}
                    />
                  </Link>
                ))}
            </div>
          </div>
        )}
        <hr />

        <div className={"navnav"} style={{ borderBottom: "1px solid #d3d3d3" }}>
          <div className="d-flex" style={{ margin: "auto", width: "100%" }}>
            <ul className={styles.lists}>
             
              <li>
                <Link to="/cloth"> Clothing</Link>
              </li>
              <li>
                <Link to="/shoes"> Shoes</Link>
              </li>
              
              <li>
                <Link to="furniture"> Home & Furniture</Link>
              </li>
             
              <li>
                <Link to="gardens"> Garden & Outdoor</Link>
              </li>
              
              <li>
                <Link to="sale"> Sale</Link>
              </li>
              <li>
                {admin && (
                  <Link to="/admin">
                    <h1 style={{ color: "red", fontWeight: "650" }}>Admin</h1>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          {/* <MenSubNav/> */}
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Navbar;
