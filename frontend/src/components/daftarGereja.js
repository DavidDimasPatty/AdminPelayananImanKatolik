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
  const nav = useNavigate();
  useEffect(() => {
    getAllGereja();
  }, []);

  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
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
        console.log(res.data);
        if (res.data.length != 0) {
          setGereja(res.data);
        }
      })
      .catch((e) => {
        window.location.reload();
      });
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
                        Edit
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
    </div>
  );
};

export default DaftarGereja;
