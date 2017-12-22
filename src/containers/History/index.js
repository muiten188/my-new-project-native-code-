import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { View, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import {
  Container,
  Text,
  Button,
  Content,
  Body,
  Thumbnail,
  Form,
  Item,
  Input,
  H1,
  H2,
  H3,
  Label,
  CheckBox
} from "native-base";
import styles from "./styles";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import { Field, reduxForm } from "redux-form";
import { DateField } from "../../components/Element/Form";
import * as navigationAction from "../../store/actions/root_navigation/root_navigation_actions";
import Picker from "react-native-picker";
class history extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      rentCashPay: false,
      rentCreditPay: false,
      electricCashPay: false,
      electricCreditPay: false,
      waterCashPay: false,
      waterCreditPay: false,
      buildingCashPay: false,
      buildingCreditPay: false,
      bikeCashPay: false,
      bikeCreditPay: false,
      carCashPay: false,
      carCreditPay: false,
      useRemainCashPay: false,
      useRemainCreditPay: false
    };
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  createDateData() {
    let date = {};
    for (let i = 1950; i < 2050; i++) {
      let month = {};
      for (let j = 1; j < 13; j++) {
        let day = [];
        if (j === 2) {
          for (let k = 1; k < 29; k++) {
            day.push(k + "日");
          }
        } else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
          for (let k = 1; k < 32; k++) {
            day.push(k + "日");
          }
        } else {
          for (let k = 1; k < 31; k++) {
            day.push(k + "日");
          }
        }
        month[j + "月"] = day;
      }
      date[i + "年"] = month;
    }
    return date;
  }

  onSearchClick() {
    const { dispatch } = this.props.navigation;
    dispatch.push({ id: "Search" });
  }

  _onPressHandle() {
    this.picker.toggle();
  }

  render() {
    const locale = "vn";
    const { dispatch } = this.props.navigation;
    const state = this.state;
    let data=this.createDateData();
    return (
      <Container style={styles.container}>
        <Header
          headerTitle={I18n.t("history", {
            locale: locale ? locale : "vn"
          })}
          showButtonLeft={true}
          onBack={() => dispatch.pop()}
          // showSearch={true}
          // onSearch={this.onSearchClick.bind(this)}
          showUser={true}
        />
        <View style={styles.container_info_outer}>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={this._onPressHandle.bind(this)}
          >
            <Text>点我</Text>
          </TouchableOpacity>
          {/* <Picker
		style={{
			height: 300
		}}
		showDuration={300}
		showMask={true}
		pickerData={}//picker`s value List
		selectedValue={}//default to be selected value
		onPickerDone={}//when confirm your choice
	/> */}
          {/* <Picker
            ref={picker => (this.picker = picker)}
            style={{ height: 320 }}
            showDuration={300}
            pickerData={ [1,2,3,4]}
            selectedValue={["2015年", "12月", "12日"]}
            onPickerDone={pickedValue => {
              console.log(pickedValue);
            }}
          /> */}
        </View>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    // navigationReducer: state.navigationReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    //navigationAction: bindActionCreators(navigationAction, dispatch),
  };
}
history = connect(mapStateToProps, mapToDispatch)(history);

export default reduxForm({
  form: "history"
})(history);
