import React, { Component } from "react";
import { Spinner } from "native-base";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
export default class extends Component {
  render() {
    const { isShow } = this.props;
    return (
      <View style={isShow ?styles.spin_Container:{}}>
        {isShow ? <Spinner color="#054f9a" /> : null}
      </View>
    );
  }
}
