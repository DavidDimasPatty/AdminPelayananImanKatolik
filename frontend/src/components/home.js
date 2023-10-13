import React from "react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const [dataGereja, setDataGereja] = useState([]);
  const [dataImam, setDataImam] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

  const getAllData = async () => {
    await axios
      .get(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/getalldata`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.length != 0) {
          setDataUser(res.data[0])
          setDataGereja(res.data[0])
          setDataImam(res.data[0])
        }
      })
      .catch((e) => {
        window.location.reload();
      });
  };
  return (
    <body className="container">
      <div classNameName="columns  is-centered is-vcentered is-mobile">
        <div className="column is-narrow has-text-centered">
          <h1 style={{ color: "Black", fontSize: "20px" }}>
            Welcome To Admin Page
          </h1>
        </div>
      </div>

      <div className="columns is-centered is-vcentered is-mobile">
        <div className="column is-narrow has-text-centered">
          <button
            onClick={() =>
              navigate.call((window.location.href = `/daftargereja`))
            }
            id="start"
            className="button is-link"
          >
            Daftar Gereja
          </button>
        </div>
      </div>

      <div className="columns is-centered is-vcentered is-mobile">
        <div className="column is-narrow has-text-centered">
          <button
            onClick={() =>
              navigate.call((window.location.href = `/daftaruser`))
            }
            id="scoreboard"
            className="button is-link"
          >
            Daftar User
          </button>
        </div>
      </div>

      <div className="columns is-centered is-vcentered is-mobile">
        <div className="column is-narrow has-text-centered">
          <button
            onClick={() =>
              navigate.call((window.location.href = `/daftaruser`))
            }
            id="scoreboard"
            className="button is-link"
          >
            Daftar Imam
          </button>
        </div>
      </div>
    </body>
  );
}

export default Home;
