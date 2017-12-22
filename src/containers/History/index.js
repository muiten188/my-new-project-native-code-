import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { View, KeyboardAvoidingView, TouchableOpacity,FlatList } from "react-native";
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
import ItemHistory from "../../components/Item_history";
import Loading from "../../components/Loading";
import * as navigationAction from "../../store/actions/root_navigation/root_navigation_actions";
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
    const listResult  = [
      { key: "a" },
      { key: "b" },
      { key: "b" },
      { key: "b" },
      { key: "f" },
      { key: "b" },
      { key: "b" },
      { key: "b" },
      { key: "f" },
      { key: "b" },
      { key: "b" },
      { key: "b" },
      { key: "f" },
      { key: "b" },
      { key: "b" },
      { key: "b" },
      { key: "f" },
      { key: "b" },
      { key: "b" },
      { key: "b" },
      { key: "f" },
      { key: "b" },
      { key: "b" },
      { key: "b" },
      { key: "f" },
      { key: "b" },
      { key: "b" },
      { key: "b" },
      { key: "f" },
      { key: "b" },
      { key: "b" },
      { key: "b" },
      { key: "f" },
      { key: "b" },
      { key: "b" },
      { key: "b" },
      { key: "f" }
    ];
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
          {/* <Loading /> */}
          <FlatList
            style={styles.listResult}
            data={listResult ? listResult : []}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderFlatListItem.bind(this)}
            numColumns={2}
          />
        </View>
      </Container>
    );
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    const { dispatch } = this.props.navigation;
    return (
      <TouchableOpacity
        key={item.index}
        style={styles.item_container}
        onPress={() => dispatch.push({ id: "BillList", userId: 1 })}
      >
        <ItemHistory
          key={item.index}
          userName="Lê Như Quỳnh"
          position="17T1 15 1503"
          phone="01676 305 996"
        />
      </TouchableOpacity>
    );
  }
  _keyExtractor(item, index) {
    return index;
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
