import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Leftnavbar from "./leftnavbar";
import Header from "./header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CanvasJSReact from "@canvasjs/react-charts";


const DaftarImam = () => {
  const [user, setUser] = useState([]);
  const [userTemp, setUserTemp] = useState([]);
  const [completedPelayanan, setCompletedPelayanan] = useState([]);
  const [accountRegistration, setAccountRegistrations] = useState([]);
  useEffect(() => {
    getAllImam();
  }, []);

  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const deleteUser = async (id) => {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

    await axios
      .delete(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/deleteuser`,
        {
          data: {
            id: id,
          },
        }
      )
      .then((window.location.href = "/daftaruser"));
  };

  const bannedUser = async (id, banned) => {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

    await axios
      .patch(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/banneduser`,
        {
          data: {
            id: id,
            banned: banned,
          },
        }
      )
      .then((window.location.href = "/daftaruser"));
  };

  const getAllImam = async () => {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    await axios
      .get(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/getimam`
      )
      .then((res) => {
        if (res.data.length != 0) {
          setUser(res.data[0]);
          setUserTemp(res.data[0]);
          var completePelayanan = [0, 0];
          var daftarAccount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (var i = 0; i < res.data[0].length; i++) {
            daftarAccount[
              parseInt(res.data[0][i].createdAt.toString().substring(5, 7))
            ]++;
          }

          for (var i = 1; i < res.data.length; i++) {
           
            for (var j = 0; j < res.data[i].length; j++) {
                if(res.data[i][j].status==2){
                  completePelayanan[i-1]++
                }
            }
          }

          setCompletedPelayanan(completePelayanan);
          setAccountRegistrations(daftarAccount);
        }
      })
      .catch((e) => {
        window.location.reload();
      });
  };

  function Search(name) {
    setUser(userTemp);
    var arr=[]
    if(name!=""){
      for(var i=0;i<userTemp.length;i++){
        if(userTemp[i].nama.toLowerCase().includes(name.toLowerCase())){
          arr.push(userTemp[i])
        }
      }
      setUser(arr);
    }
  }


  const options2 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "Completed Pelayanan",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Pemberkatan", y: completedPelayanan[0] },
          { label: "Perkawinan", y: completedPelayanan[1] },
        ],
      },
    ],
  };

  const options3 = {
    theme: "light2",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Imam Accounts Registration 2023",
    },
    data: [
      {
        type: "line",
        dataPoints: [
          { label: "Januari", y: accountRegistration[0] },
          { label: "Febuari", y: accountRegistration[1] },
          { label: "Maret", y: accountRegistration[2] },
          { label: "April", y: accountRegistration[3] },
          { label: "Mei", y: accountRegistration[4] },
          { label: "Juni", y: accountRegistration[5] },
          { label: "Juli", y: accountRegistration[6] },
          { label: "Agustus", y: accountRegistration[7] },
          { label: "September", y: accountRegistration[8] },
          { label: "Oktober", y: accountRegistration[9] },
          { label: "November", y: accountRegistration[10] },
          { label: "Desember", y: accountRegistration[11] },
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
                Cari Imam
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Cari Imam"
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
                    <th>Id</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Picture</th>
                    <th>Role</th>
                    <th>Banned</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((User, index) => (
                    <tr key={User._id}>
                      <td>{index + 1}</td>
                      <td>{User._id}</td>
                      <td>{User.nama}</td>
                      <td>{User.email}</td>
                      <td>
                        {" "}
                        {User.picture == "" ? (
                          "No Picture"
                        ) : (
                          <img src={User.picture} width="50" height="50" />
                        )}
                      </td>
                      <td>
                        {User.role==1?"Sekretariat":"Imam"}
                      </td>
                      <td>{User.banned == 0 ? "No" : "Yes"}</td>
                      <td>
                        {User.banned == 0 ? (
                          <button
                            onClick={() => bannedUser(User._id, User.banned)}
                            className="button is-small is-info"
                          >
                            Banned
                          </button>
                        ) : (
                          <button
                            onClick={() => bannedUser(User._id, User.banned)}
                            className="button is-small is-info"
                          >
                            Unbanned
                          </button>
                        )}

                        <button
                          onClick={() => deleteUser(User._id)}
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
            Dashboard Imam
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
              <CanvasJSChart options={options3} />
            </div>
          </div>
        </center>
      </Row>
    </div>
  );
};

export default DaftarImam;
