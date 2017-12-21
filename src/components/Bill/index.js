import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  H3,
  H2,
  H1,
  Item,
  Thumbnail,
  Label
} from "native-base";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import styles from "./styles";
import User from "../User";
export default class extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const locale = "vn";
    const { key, status = 1 } = this.props;
    return (
      <View style={styles.itemList}>
        <View
          style={[
            styles.header,
            status == 1 ? styles.header_payed : styles.header_notPayed
          ]}
        >
          <Grid>
            <Col style={styles.headerLeft}>
              <Item style={[styles.itemBorderNone, styles.flex_start]}>
                <Label>
                  {I18n.t("bill", {
                    locale: locale ? locale : "vn"
                  })}
                </Label>
                <Text>8/2017</Text>
              </Item>
            </Col>
            <Col style={styles.headerRight}>
              <Item style={[styles.itemBorderNone,styles.flex_end]}>
                <Label>
                  {I18n.t("status", {
                    locale: locale ? locale : "vn"
                  })}
                </Label>
                <Text
                  style={
                    status == 1 ? styles.text_paymented : styles.text_notPayment
                  }
                >
                  {status == 1 ? "Chưa thanh toán" : "Đã thanh toán"}
                </Text>
              </Item>
            </Col>
          </Grid>
        </View>
        <View style={styles.billContent}>
          <Grid>
            {/* row nợ tháng */}
            <Row style={[styles.item_marginTop, styles.itemRent]}>
              <Col>
                <Item style={styles.itemBorderNone}>
                  <Label>
                    {I18n.t("rentMonth", {
                      locale: locale ? locale : "vn"
                    })}
                  </Label>
                  <Text>7/2017</Text>
                </Item>
              </Col>
              <Col>
                <Text>200.000 VNĐ</Text>
              </Col>
            </Row>
            {/* row hóa đơn  */}
            <Row>
              <Col>
                <Item style={styles.itemBorderNone}>
                  <Icon name="plug" />
                  <Label>
                    {I18n.t("billElectric", {
                      locale: locale ? locale : "vn"
                    })}
                  </Label>
                </Item>
              </Col>
              <Col>
                <Text>300.000 VNĐ</Text>
              </Col>
            </Row>
            {/* row tông tiền hóa đơn */}
            <Row>
              <Col>
                <Item style={styles.itemBorderNone}>
                  <Icon name="tint" />
                  <Label>
                    {I18n.t("billWater", {
                      locale: locale ? locale : "vn"
                    })}
                  </Label>
                </Item>
              </Col>
              <Col>
                <Text>300.000 VNĐ</Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Item style={styles.itemBorderNone}>
                  <Icon name="building" />
                  <Label>
                    {I18n.t("billServices", {
                      locale: locale ? locale : "vn"
                    })}
                  </Label>
                </Item>
              </Col>
              <Col>
                <Text>300.000 VNĐ</Text>
              </Col>
            </Row>
            {/* tổng tiền */}
            <Row style={[styles.itemTotal]}>
              <Col>
                <H3>
                  {I18n.t("billTotal", {
                    locale: locale ? locale : "vn"
                  })}
                </H3>
              </Col>
              <Col>
                <H3>300.000 VNĐ</H3>
              </Col>
            </Row>
          </Grid>
        </View>
      </View>
    );
  }
}
