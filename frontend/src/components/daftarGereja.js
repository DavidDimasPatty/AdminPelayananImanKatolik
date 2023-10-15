import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Leftnavbar from "./leftnavbar";
import Header from "./header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CanvasJSReact from "@canvasjs/react-charts";
import { Card, Button, Modal, Form, InputGroup, Toast } from "react-bootstrap";

const DaftarGereja = () => {
  const [gereja, setGereja] = useState([]);
  const [nama, setNama] = useState();
  const [address, setAddress] = useState();
  const [paroki, setParoki] = useState();
  const [lingkungan, setLingkungan] = useState();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [gerejaTemp, setGerejaTemp] = useState([]);
  const [bannedAccount, setBannedAcount] = useState([]);
  const [pelayanan, setPelayanan] = useState([]);
  const [pelayananGereja, setPelayananGereja] = useState([]);
  const nav = useNavigate();
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllGereja();
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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

  const saveGereja= async ()=>{
    const devEnv = process.env.NODE_ENV !== "production";
    const {REACT_APP_DEV_URL, REACT_APP_PROD_URL} = process.env;

    await axios.post(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/addgereja `,{
       
        nama:nama,
        address:address,
        paroki:paroki,
        lingkungan:lingkungan,
        lat:lat,
        lng:lng
    }).then( window.location.href="/daftargereja")
}

  function Search(name) {
    setGereja(gerejaTemp);
    var arr = [];
    if (name != "") {
      for (var i = 0; i < gerejaTemp.length; i++) {
        if (gerejaTemp[i].nama.toLowerCase().includes(name.toLowerCase())) {
          arr.push(gerejaTemp[i]);
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
            <div class="input-group mb-3" style={{ width: "50%" }}>
              <span class="input-group-text" id="basic-addon1">
                Cari Gereja
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Cari Gereja"
                aria-describedby="basic-addon1"
                onChange={(e) => Search(e.target.value)}
              />
              <button
                className="button is-info is-light ml-5"
                onClick={handleShowModal}
              >
                Add Gereja
              </button>
            </div>

            <Modal
              show={showModal}
              onHide={handleCloseModal}
              style={{ "z-index": "1500" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Gereja</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Nama"
                      autoFocus
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </Form.Group>
                </Form>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    autoFocus
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Paroki</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Paroki"
                    autoFocus
                    onChange={(e) => setParoki(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Lingkungan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Lingkungan"
                    autoFocus
                    onChange={(e) => setLingkungan(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Koordinat Posisi Gereja (Based on Google Map)
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Latitude and Longitude </InputGroup.Text>
                    <Form.Control
                      placeholder="Enter Latitude"
                      onChange={(e) => setLat(e.target.value)}
                    />
                    <Form.Control
                      placeholder="Enter Longitude"
                      onChange={(e) => setLng(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>saveGereja()}>Add</Button>
              </Modal.Footer>
            </Modal>

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
