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
import * as AppConfig from "../../config/app_config";
export default class extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { key, userName, position, phone, avatarUrl } = this.props;
    return (
      <View key={key} style={styles.itemList}>
        <Thumbnail
          style={styles.thumbnail_avatar}
          source={{
            uri: avatarUrl
              ? `${AppConfig}${avatarUrl}`
              : "https://exelord.github.io/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg"
          }}
        />
        <View style={styles.item}>
          <Item style={[styles.name_center, styles.borderBottomNone]}>
            <H3>{userName}</H3>
          </Item>
          <Item style={[styles.itemPostion, styles.borderBottomNone]}>
            <Icon name="map-marker" style={styles.icon} />
            <Text>{position}</Text>
          </Item>
          <Item style={[styles.itemPhone, styles.borderBottomNone]}>
            <Icon name="phone" style={styles.icon} />
            <Text>{phone}</Text>
          </Item>
        </View>
      </View>
    );
  }
}
