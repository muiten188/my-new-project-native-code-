import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Text,
  Button,
  Content,
  Body,
  Thumbnail,
  Form,
  Item,
  Icon,
  Field,
  Input,
  H1,
  H2,
  H3
} from "native-base";
import styles from "./styles";
import Header from "../../components/Header";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";

export default class extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { message = "Application Loading..." } = this.props;
    const locale = "vn";
    return (
      <Container style={styles.container}>
        <Header
          headerTitle={I18n.t("userinfo", {
            locale: locale ? locale : "vn"
          })}
          showFind={true}
        />
        <Content>
          <Container style={styles.container_info_outer}>
            <View style={styles.container_info_inter} >
                <H1>thông tin người dùng</H1>
            </View>
          </Container>
        </Content>
      </Container>
    );
  }
}
