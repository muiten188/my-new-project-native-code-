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
import styles from "./styles";
import User from "../User";
export default class extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { key, userName, position, phone, avatarUrl } = this.props;
    return (
      <View key={key} style={styles.itemList}>
        <View style={styles.header}>
          <Grid>
            <Col style={[styles.center, styles.left]}>
              <Text>31/08/2017</Text>
            </Col>
            <Col style={[styles.center, styles.right]}>
              <Text style={styles.tranCode}>GD-2-171006-2017</Text>
            </Col>
          </Grid>
        </View>
        <View style={styles.item}>
          <Item style={[styles.itemPostion,styles.borderBottomNone]}>
            <Icon name="money" style={styles.icon} />
            <Text>Tiền mặt</Text>
          </Item>
          <Item style={[styles.borderBottomNone,styles.itemCash]}>
            <H1 style={[styles.pay_item, styles.totalPay]}>1.500.000 VNĐ</H1>
          </Item>
          <Item style={[styles.itemPhone,styles.borderBottomNone]}>
            <Label>Nội dung</Label>
            <Text>TTHD 8/2017</Text>
          </Item>
        </View>
      </View>
    );
  }
}
