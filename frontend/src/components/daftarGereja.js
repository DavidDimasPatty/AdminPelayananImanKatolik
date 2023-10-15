import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Leftnavbar from "./leftnavbar";
import Header from "./header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CanvasJSReact from "@canvasjs/react-charts";

const DaftarGereja = () => {
  const [gereja, setGereja] = useState([]);
  const [gerejaTemp, setGerejaTemp] = useState([]);
  const [bannedAccount, setBannedAcount] = useState([]);
  const [pelayanan, setPelayanan] = useState([]);
  const [pelayananGereja, setPelayananGereja] = useState([]);
  const nav = useNavigate();
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

  useEffect(() => {
    getAllGereja();
  }, []);


  const deleteGereja = async (id) => {
    await axios
      .delete(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/deletegereja`,
        {
          data: {
            id: id,
          },
        }
      )
      .then((window.location.href = "/daftargereja"));
  };

  const getAllGereja = async () => {
    await axios
      .get(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/getgereja`
      )
      .then((res) => {
        if (res.data.length != 0) {
          setGereja(res.data[0]);
          setGerejaTemp(res.data[0]);
       
          var bannedArr = [0, 0];
          var pelayananTemp = [0, 0, 0, 0];
          var pelayananFinal = [0, 0, 0, 0];
          var pelayananMost = [];
          var jumlahPelayananGereja = new Array(res.data[0].length).fill(0);

          for (var i = 0; i < res.data[0].length; i++) {
            if (res.data[0][i].banned == 1) {
              bannedArr[0]++;
            } else {
              bannedArr[1]++;
            }
            pelayananMost.push(res.data[0][i]._id);
          }

          for (var i = 1; i < res.data.length; i++) {
            for (var j = 0; j < res.data[i].length; j++) {
              if (i == 1) {
                if (res.data[i][j].status == 0) {
                  pelayananTemp[0]++;
                }
              }
              if (i == 2) {
                if (res.data[i][j].status == 0) {
                  pelayananTemp[1]++;
                }
              }
              if (i == 3) {
                if (res.data[i][j].status == 0) {
                  pelayananTemp[2]++;
                }
              }
              if (i == 4) {
                if (res.data[i][j].status == 0) {
                  pelayananTemp[3]++;
                }
              }
              var idGereja = pelayananMost.indexOf(
                String(res.data[i][j].idGereja)
              );
              jumlahPelayananGereja[idGereja]++;
            }
          }

          for (var i = 0; i < pelayananFinal.length; i++) {
            pelayananFinal[i] =
              (pelayananTemp[i] /
                (pelayananTemp[0] +
                  pelayananTemp[1] +
                  pelayananTemp[2] +
                  pelayananTemp[3])) *
              100;
          }
          var tempJson = [];
       
          for (var i = 0; i < jumlahPelayananGereja.length; i++) {
            tempJson.push({
              label: res.data[0][i].nama,
              y: jumlahPelayananGereja[i],
            });
          }

          setPelayananGereja(tempJson);
          setBannedAcount(bannedArr);
          setPelayanan(pelayananFinal);
        }
      })
      .catch((e) => {
        window.location.reload();
      });
  };


  function Search(name) {
    setGereja(gerejaTemp);
    var arr=[]
    if(name!=""){
      for(var i=0;i<gerejaTemp.length;i++){
        if(gerejaTemp[i].nama.toLowerCase().includes(name.toLowerCase())){
          arr.push(gerejaTemp[i])
        }
      }
      setGereja(arr);
    }
  }

  const options2 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "Banyak Pelayanan",
    },
    data: [
      {
        type: "column",
        dataPoints: pelayananGereja,
      },
    ],
  };

  const options4 = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Pembukaan Pelayanan",
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
          { y: pelayanan[0], label: "Baptis" },
          { y: pelayanan[1], label: "Komuni" },
          { y: pelayanan[2], label: "Krisma" },
          { y: pelayanan[3], label: "Umum" },
        ],
      },
    ],
  };

  return (
    <div>
      <Header />
      <div class="main-content columns">
        <Col md={1} className="mt-6">
          <Leftnavbar />
        </Col>

        <Col className="mt-6">
          <center>
          
            <div class="input-group mb-3"   style={{width:"50%"}}>
              <span class="input-group-text" id="basic-addon1">
                Cari Gereja
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Cari Gereja"
                aria-describedby="basic-addon1"
                onChange={(e)=>Search(e.target.value)}
              />
            </div>

            <div
              class="table-responsive"
              style={{
                "max-height": "500px",
                overflow: "auto",
              }}
            >
              <table
                className="table is-stripped is-mobile"
                style={{
                  width: "90%",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Id Gereja</th>
                    <th>Nama</th>
                    <th>Address</th>
                    <th>Paroki</th>
                    <th>Lingkungan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {gereja.map((Gereja, index) => (
                    <tr key={Gereja._id}>
                      <td>{index + 1}</td>
                      <td>{Gereja._id}</td>
                      <td>{Gereja.nama}</td>
                      <td>{Gereja.address}</td>
                      <td>{Gereja.paroki}</td>
                      <td>{Gereja.lingkungan}</td>
                      <td>
                        <Link
                          to={`/editgereja/${Gereja._id}`}
                          className="button is-small is-info"
                        >
                          Banned
                        </Link>
                        <button
                          onClick={() => deleteGereja(Gereja._id)}
                          className="button is-small is-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </center>
        </Col>
      </div>
      <Row className="mt-5 mb-5">
        <center>
          <h2 style={{ fontSize: "40px", position: "center" }}>
            Dashboard Gereja
          </h2>
        </center>
        <center className="mt-5">
          <div
            class="columns"
            style={{
              width: "95%",
              border: "1px solid black",
              borderRadius: "10px",
            }}
          >
            <div class="column is-half">
              <CanvasJSChart options={options2} />
            </div>

            <div class="column is-half">
              <CanvasJSChart options={options4} />
            </div>
          </div>
        </center>
      </Row>
    </div>
  );
};

export default DaftarGereja;
