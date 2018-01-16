import React, { Component } from "react";
import { Spinner } from "native-base";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
const tempShow = false;
export default class extends Component {
  render() {
    const { isShow } = this.props;
    return (
      <View style={tempShow || isShow ? styles.spin_Container : {}}>
        {tempShow || isShow ? <Spinner color="#054f9a" /> : null}
      </View>
    );
  }

  tempShow() {
    tempShow = true;
    setTimeout(() => {
      tempShow = false;
      this.setState({})
    }, 200);
    this.setState({});
  }
}
