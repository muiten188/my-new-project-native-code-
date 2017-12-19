import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text,
  H3,
  Item
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import User from "../User";
export default class extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { showButtonLeft, headerTitle, showUser, showFind } = this.props;
    return (
      <Header style={styles.header}>
        <Grid>
          {showButtonLeft == true ? (
            <Col style={styles.itemHeader}>
              <Button transparent>
                <Icon name="arrow-back" />
              </Button>
            </Col>
          ) : null}
          <Col style={styles.itemHeaderBody}>
            <H3 style={styles.text}>{headerTitle}</H3>
          </Col>
          {showUser == true ? (
            <Col style={styles.itemHeader}>
              <User
                actions={["item1", "item2", "LogOut"]}
                onPress={(e, i) => console.log(i)}
              />
            </Col>
          ) : null}
          {showFind == true ? (
            <Col style={styles.itemHeader}>
              <Button transparent style={styles.buttonSearch}>
                <Text style={styles.text}>tim kiếm</Text>
                <Icon name="search" />
              </Button>
            </Col>
          ) : null}
        </Grid>
      </Header>
    );
  }
}
