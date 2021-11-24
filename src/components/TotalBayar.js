import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";

class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/success");
    });
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :{" "}
              <strong className="float-end mr-2">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <div class="d-grid gap-2">
              <Button
                variant="primary"
                className="mb-2 mt-3 mr-2"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TotalBayar;
