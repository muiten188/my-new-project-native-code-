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
  Thumbnail
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
    const { key,userName,position,phone,avatarUrl } = this.props;
    return (
      <View key={key} style={styles.itemList}>
        <Thumbnail
          style={styles.thumbnail_avatar}
          source={{
            uri:avatarUrl?avatarUrl:
              "http://www.chupdep.com/wp-content/uploads/2015/08/xu_huong_hoc_anh_chan_dung_cua_gioi_tre__4.jpg"
          }}
        />
        <View style={styles.item}>
          <H3>{userName}</H3>
          <Item style={styles.itemPostion}>
            <Icon name="map-marker" style={styles.icon} />
            <Text>{position}</Text>
          </Item>
          <Item style={styles.itemPhone}>
            <Icon name="phone" style={styles.icon} />
            <Text>{phone}</Text>
          </Item>
        </View>
      </View>
    );
  }
}
