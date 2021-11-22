import React, { Component } from "react";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import ListCategories from "./components/ListCategories";
import Hasil from "./components/Hasil";
import { API_URL } from "./utils/constants";
import axios from "axios";
import Menus from "./components/Menus";
import swal from "sweetalert";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      choosedCategory: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products")
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  changeCategory = (value) => {
    this.setState({
      choosedCategory: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Berhasil",
                text: keranjang.product.nama + "Masuk Keranjang",
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Berhasil",
                text: keranjang.product.nama + "Masuk Keranjang",
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, choosedCategory, keranjangs } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                choosedCategory={choosedCategory}
              />
              <Col>
                <h4>
                  <strong>Daftar Menu</strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        addKeranjang={this.addKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
