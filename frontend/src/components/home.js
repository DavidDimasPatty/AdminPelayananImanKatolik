import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css";
import CanvasJSReact from "@canvasjs/react-charts";
import Leftnavbar from "./leftnavbar";
import Header from "./header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const [dataGereja, setDataGereja] = useState([]);
  const [dataImam, setDataImam] = useState([]);
  const [bannedAccount, setBannedAcount] = useState([]);
  const [daftarAccount, setDaftarAccount] = useState([]);
  const [daftarPelayanan, setDaftarPelayanan] = useState([]);
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
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
        if (res.data.length != 0) {
          setDataUser(res.data[0]);
          setDataGereja(res.data[1]);
          setDataImam(res.data[2]);
          const updatedBannedAccount = [0, 0, 0];
          const daftarAccount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          const userPelayanan = [0, 0, 0];
          const PercentageuserPelayanan = [0, 0, 0];

          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < res.data[i].length; j++) {
              if (res.data[i][j].banned == 1) {
                updatedBannedAccount[i]++;
              }
              if (res.data[i][j].tanggalDaftar !== undefined) {
                daftarAccount[
                  parseInt(
                    res.data[i][j].tanggalDaftar.toString().substring(5, 7)
                  )
                ]++;
              } else if (res.data[i][j].createdAt !== undefined) {
                daftarAccount[
                  parseInt(res.data[i][j].createdAt.toString().substring(5, 7))
                ]++;
              }
            }
          }

          console.log(res.data);
          for (let i = 3; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].length; j++) {
              if (i < 6) {
                if (res.data[i][j].status == 0) {
                  userPelayanan[0]++;
                }
              }
              if (i == 7) {
                if (res.data[i][j].status == 0) {
                  userPelayanan[1]++;
                }
              }
              if (i == 8) {
                if (res.data[i][j].status == 0) {
                  userPelayanan[2]++;
                }
              }
            }
          }
          PercentageuserPelayanan[0] =
            (userPelayanan[0] /
              (userPelayanan[0] + userPelayanan[1] + userPelayanan[2])) *
            100;
          PercentageuserPelayanan[1] =
            (userPelayanan[1] /
              (userPelayanan[0] + userPelayanan[1] + userPelayanan[2])) *
            100;
          PercentageuserPelayanan[2] =
            (userPelayanan[2] /
              (userPelayanan[0] + userPelayanan[1] + userPelayanan[2])) *
            100;
          setBannedAcount(updatedBannedAccount);
          setDaftarAccount(daftarAccount);
          setDaftarPelayanan(PercentageuserPelayanan);
        }
      })
      .catch((e) => {
        window.location.reload();
      });
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "Registered Accounts",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "User", y: dataUser.length },
          { label: "Imam", y: dataImam.length },
          { label: "Gereja", y: dataGereja.length },
        ],
      },
    ],
  };

  const options2 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "Banned Accounts",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "User", y: bannedAccount[0] },
          { label: "Imam", y: bannedAccount[2] },
          { label: "Gereja", y: bannedAccount[1] },
        ],
      },
    ],
  };

  const options3 = {
    theme: "light2",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Accounts Registration 2023",
    },
    data: [
      {
        type: "line",
        dataPoints: [
          { label: "Januari", y: daftarAccount[0] },
          { label: "Febuari", y: daftarAccount[1] },
          { label: "Maret", y: daftarAccount[2] },
          { label: "April", y: daftarAccount[3] },
          { label: "Mei", y: daftarAccount[4] },
          { label: "Juni", y: daftarAccount[5] },
          { label: "Juli", y: daftarAccount[6] },
          { label: "Agustus", y: daftarAccount[7] },
          { label: "September", y: daftarAccount[8] },
          { label: "Oktober", y: daftarAccount[9] },
          { label: "November", y: daftarAccount[10] },
          { label: "Desember", y: daftarAccount[11] },
        ],
      },
    ],
  };

  const options4 = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Pelayanan Registrations",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: daftarPelayanan[0], label: "Sakramen" },
          { y: daftarPelayanan[1], label: "Sakramentali" },
          { y: daftarPelayanan[2], label: "Kegiatan Umum" },
        ],
      },
    ],
  };

  return (
    <section>
      <Header />
      <div class="main-content columns">
        <Col md={1} className="mt-6">
          <Leftnavbar />
        </Col>

        <Col>
          <center>
            <div>
              <div className="column has-text-centered">
                <h1 style={{ color: "Black", fontSize: "40px" }}>
                  Welcome To Admin Page
                </h1>
              </div>
            </div>
            <div style={{ border: " 2px solid black", borderRadius: "10px",width:"90%"}}>
              <center class="mb-5">
                <h1 style={{ fontSize: "40px" }}>Dashboard</h1>
              </center>
              <div class="columns ">
                <div class="column is-half">
                  <CanvasJSChart options={options} />
                </div>

                <div class="column is-half">
                  <CanvasJSChart options={options2} />
                </div>
              </div>

              <div class="columns">
                <div class="column is-half">
                  <CanvasJSChart options={options3} />
                </div>

                <div class="column is-half">
                  <CanvasJSChart options={options4} />
                </div>
              </div>
            </div>{" "}
          </center>
        </Col>
      </div>
    </section>
  );
}

export default Home;
