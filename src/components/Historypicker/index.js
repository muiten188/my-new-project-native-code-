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
import { View, Picker } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Grid, Col, Row } from "react-native-easy-grid";
import styles from "./styles";
import User from "../User";
import I18n from "../../i18n/i18n";
export default class extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      language: 'java'
    }
  }
  render() {
    const { locale = "vn" } = this.props;
    const { isCash, totalMoney, content, date, tranCode } = this.props;
    return (
      <View style={styles.datePicker_Container}>
        <Grid>
          <Col style={{ width: 60, backgroundColor: '#fff' }}>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </Col>
          <Col>
            <View style={styles.content_Header}>
              <Item style={[styles.borderBottomNone, styles.center]}>
                <Button style={styles.buttonChangeDate}>
                  <Icon name="chevron-left"></Icon>
                </Button>
                <Item style={[styles.borderBottomNone]}>
                  <Text style={[styles.prev_next_text,styles.text_center]}>7/2018</Text>
                  <Text style={[styles.current_Text,styles.text_center]}>8/2018</Text>
                  <Text style={[styles.prev_next_text,styles.text_center]}>9/2018</Text>
                </Item>
                <Button style={styles.buttonChangeDate}>
                  <Icon name="chevron-right"></Icon>
                </Button>
              </Item>
            </View>
          </Col>
        </Grid>
      </View>
    );
  }
}
