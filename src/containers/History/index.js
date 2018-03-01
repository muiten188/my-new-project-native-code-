import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
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
import { Field, reduxForm, startAsyncValidation } from "redux-form";
import { DateField } from "../../components/Element/Form";
import ItemHistory from "../../components/Item_history";
import Loading from "../../components/Loading";
import * as navigationAction from "../../store/actions/root_navigation/root_navigation_actions";
import HistoryPicker from "../../components/Historypicker";
import * as historyAction from "../../store/actions/containers/history_action";
import { printBill } from "../../helper";
const currentDate = new Date();
const currentListResult = null;
class history extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    this.state = {
      currentTime: currentMonth + "/" + currentYear,
      arrCheck: [],
      isCheckAll: false,
      totalPay: 0
    };
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
    Number.prototype.format = function (n, x) {
      var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
      return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
    };
  }

  componentDidMount() {
    const { historyAction, navigation } = this.props;
    const { user } = this.props.loginReducer;
    const { state } = this;
    historyAction.getHistory(
      navigation.state.params.apartment.apartmentId,
      state.currentTime,
      user
    );
  }

  componentDidUpdate() {
    const { listResult } = this.props.historyReducer;
    if (currentListResult != listResult) {
      this.setState({ isCheckAll: false, arrCheck: [] });
      currentListResult = listResult;
    }
  }

  HistoryPickerChange(month, year) {
    const { historyAction, navigation } = this.props;
    const { user } = this.props.loginReducer;
    let currentTime = month + "/" + year;
    this.setState({ currentTime: currentTime });
    historyAction.getHistory(
      navigation.state.params.apartment.apartmentId,
      currentTime,
      user
    );
  }

  _onPressHandle() {
    this.picker.toggle();
  }

  render() {
    const locale = "vn";
    const { dispatch } = this.props.navigation;
    const { historyAction, navigation } = this.props;
    const { user } = this.props.loginReducer;
    const state = this.state;
    const {arrCheck}=this.state;
    const { apartment } = this.props.navigation.state.params;
    const { listResult, isLoading, historyError } = this.props.historyReducer;
    if (historyError == true) {
      Alert.alert("Thông báo", "Lấy danh sách lịch sử giao dịch thất bại kiểm tra lại đường truyền.", [{
        text: 'Ok',
        onPress: (e) => {
          historyAction.clearError();
        }
      }],
        { cancelable: false });
    }
    const bill = {};
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
          <Loading isShow={isLoading} />
          <HistoryPicker onChange={this.HistoryPickerChange.bind(this)} />
          <View style={styles.container_info_outer}>
            <Loading isShow={isLoading} />
            <Grid style={{ paddingTop: 2 }}>
              <Col>
                <Row style={styles.row_Header}>
                  <Col style={styles.titleCol}>
                    <H3 style={[{ paddingLeft: 16 }, styles.textPadding]}>
                      {I18n.t("billCostTitle", {
                        locale: locale ? locale : "vn"
                      })}{" "}
                    </H3>
                  </Col>
                  <Col style={styles.col}>
                    <H3 style={styles.textPadding}>
                      {I18n.t("totalMoney", {
                        locale: locale ? locale : "vn"
                      })}
                    </H3>
                  </Col>
                  <Col style={styles.col}>
                    <H3 style={styles.textPadding}>
                      {I18n.t("payed", {
                        locale: locale ? locale : "vn"
                      })}
                    </H3>
                  </Col>
                  <Col style={styles.col}>
                    <H3 style={styles.textPadding}>
                      {I18n.t("didCheck", {
                        locale: locale ? locale : "vn"
                      })}
                    </H3>
                  </Col>
                </Row>
                <Content>
                  <Row style={[styles.firstDetailRow]}>
                    <Col style={styles.titleDetailCol} />
                    <Col style={styles.col_detail} />
                    <Col style={styles.col_detail} />
                    <Col style={styles.col_detail}>
                      <CheckBox
                        style={styles.checkBox}
                        disabled={bill.listInvoiceDetail <= 0}
                        color={
                          bill.listInvoiceDetail <= 0 ? "#cecece" : "#054f9a"
                        }
                        checked={state.isCheckAll}
                        onPress={this.checkAll.bind(this)}
                      />
                    </Col>
                  </Row>
                  <Row style={styles.billDetailRow}>
                    <Col style={styles.titleDetailCol}>
                      {listResult.map((item, index) => {
                        return (
                          <Row key={index} style={styles.rowDetail_inner}>
                            {this.buildRowBillDetail(item, locale)}
                          </Row>
                        );
                      })}
                    </Col>
                    <Col style={styles.col_detail}>
                      {listResult.map((item, index) => {
                        return (
                          <Row key={index} style={styles.rowDetail_inner}>
                            {this.buildRowBillDetailTotal(item, locale)}
                          </Row>
                        );
                      })}
                    </Col>
                    <Col style={styles.col_detail}>
                      {listResult.map((item, index) => {
                        return (
                          <Row key={index} style={styles.rowDetail_inner}>
                            {this.buildRowBillDetailTotal(item, locale)}
                          </Row>
                        );
                      })}
                    </Col>
                    <Col style={styles.col_detail}>
                      {listResult.map((item, index) => {
                        return (
                          <Row key={index} style={styles.rowDetail_inner}>
                            {this.buildRowBillDetailCheck(item, locale)}
                          </Row>
                        );
                      })}
                    </Col>
                  </Row>
                </Content>
              </Col>
              <Col style={styles.totalCol}>
                <Row style={styles.row_Header}>
                  <H3 style={styles.textPadding}>
                    {I18n.t("TotalPay", {
                      locale: locale ? locale : "vn"
                    })}
                  </H3>
                </Row>
                <Row style={[styles.border, styles.center]}>
                  <View style={[{ flex: 1 }, styles.center]}>
                    <Item
                      style={[
                        styles.center,
                        styles.borderBottomNone,
                        { width: "100%" }
                      ]}
                    >
                      <H1
                        style={[
                          styles.pay_item,
                          styles.totalPay,
                          styles.textPadding
                        ]}
                      >
                        {state.totalPay <= 0
                          ? "0 "
                          : state.totalPay.format() + " "}
                      </H1>
                    </Item>
                    <Button
                      full
                      disabled={
                        arrCheck &&
                        arrCheck.length <= 0
                      }
                      style={
                        arrCheck &&
                          arrCheck.length <= 0
                          ? styles.buttomPay_disabled
                          : styles.buttomPay
                      }
                      onPress={async () => {
                        await printBill(
                          listResult,
                          state.arrCheck,
                          apartment.ownerName,
                          user.fullName,
                          listResult[0].transactionCode,
                          listResult[0].invoiceMonth,
                          apartment.apartmentName,
                          true
                        );
                      }}
                    >
                      <Text uppercase={false}>
                        {I18n.t("printBill", {
                          locale: locale ? locale : "vn"
                        })}
                      </Text>
                    </Button>

                  </View>
                </Row>
              </Col>
            </Grid>
          </View>
          {/* <FlatList
            style={styles.listResult}
            data={listResult ? listResult : []}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderFlatListItem.bind(this)}
            numColumns={2}
          /> */}
        </View>
      </Container >
    );
  }

  checkAll() {
    const state = this.state;
    const { isCheckAll, arrCheck } = this.state
    const { listResult } = this.props.historyReducer;
    let tempArrCheck = [];
    let tempTotalPay = 0;
    for (var i = 0; i < listResult.length; i++) {
      var item = listResult[i];
      if (isCheckAll == false) {
        tempArrCheck.push(item);
        tempTotalPay = tempTotalPay + item.paymentAmount;
      }
    }
    this.setState({ isCheckAll: !isCheckAll, arrCheck: tempArrCheck, totalPay: tempTotalPay })
  }

  buildRowBillDetail(item, locale) {
    const {
      buildingEmpty,
      electricEmpty,
      waterEmpty,
      bikeEmpty,
      carEmpty
    } = this.state;
    if (item.serviceName.indexOf("BUILDING") > -1) {
      return (
        <Item style={styles.borderBottomNone}>
          <Icon
            name="building"
            style={[styles.icon, buildingEmpty ? styles.label_row_empty : {}]}
          />
          <Label
            style={[styles.text, buildingEmpty ? styles.label_row_empty : {}]}
          >
            {I18n.t("buildingCost", {
              locale: locale ? locale : "vn"
            })}
          </Label>
        </Item>
      );
    } else if (item.serviceName.indexOf("ELECTRIC") > -1) {
      return (
        <Item style={styles.borderBottomNone}>
          <Icon
            name="plug"
            style={[styles.icon, electricEmpty ? styles.label_row_empty : {}]}
          />
          <Label
            style={[styles.text, electricEmpty ? styles.label_row_empty : {}]}
          >
            {I18n.t("electricCost", {
              locale: locale ? locale : "vn"
            })}
          </Label>
        </Item>
      );
    } else if (item.serviceName.indexOf("WATER") > -1) {
      return (
        <Item style={styles.borderBottomNone}>
          <Icon
            name="tint"
            style={[styles.icon, waterEmpty ? styles.label_row_empty : {}]}
          />
          <Label
            style={[styles.text, waterEmpty ? styles.label_row_empty : {}]}
          >
            {I18n.t("waterCost", {
              locale: locale ? locale : "vn"
            })}
          </Label>
        </Item>
      );
    } else if (item.serviceName.indexOf("MOTORBIKE") > -1) {
      return (
        <Item style={styles.borderBottomNone}>
          <Icon
            name="motorcycle"
            style={[styles.icon, bikeEmpty ? styles.label_row_empty : {}]}
          />
          <Label style={[styles.text, bikeEmpty ? styles.label_row_empty : {}]}>
            {I18n.t("bikeCost", {
              locale: locale ? locale : "vn"
            })}
          </Label>
        </Item>
      );
    } else if (item.serviceName.indexOf("CAR") > -1) {
      return (
        <Item style={styles.borderBottomNone}>
          <Icon
            name="car"
            style={[styles.icon, carEmpty ? styles.label_row_empty : {}]}
          />
          <Label style={[styles.text, carEmpty ? styles.label_row_empty : {}]}>
            {I18n.t("carCost", {
              locale: locale ? locale : "vn"
            })}
          </Label>
        </Item>
      );
    } else {
      return (
        <Item style={styles.itemBorderNone}>
          <Label style={styles.text}>
            {I18n.t("serviceOther", {
              locale: locale ? locale : "vn"
            })}
          </Label>
        </Item>
      );
    }
  }

  buildRowBillDetailInPeriod(item, locale) {
    const {
      buildingEmpty,
      electricEmpty,
      waterEmpty,
      bikeEmpty,
      carEmpty
    } = this.state;
    item.arisingPeriod = item.arisingPeriod ? item.arisingPeriod : 0;
    if (item.serviceName.indexOf("BUILDING") > -1) {
      return (
        <Text
          style={[styles.text, buildingEmpty ? styles.label_row_empty : {}]}
        >
          {" "}
        </Text>
      );
    } else if (item.serviceName.indexOf("ELECTRIC") > -1) {
      return (
        <Text
          style={[styles.text, electricEmpty ? styles.label_row_empty : {}]}
        >
          {" "}
        </Text>
      );
    } else if (item.serviceName.indexOf("WATER") > -1) {
      return (
        <Text style={[styles.text, waterEmpty ? styles.label_row_empty : {}]}>
          {" "}
        </Text>
      );
    } else if (item.serviceName.indexOf("MOTORBIKE") > -1) {
      return (
        <Text style={[styles.text, bikeEmpty ? styles.label_row_empty : {}]}>
          {" "}
        </Text>
      );
    } else if (item.serviceName.indexOf("CAR") > -1) {
      return (
        <Text style={[styles.text, carEmpty ? styles.label_row_empty : {}]}>
          {" "}
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>{" "}</Text>
      );
    }
  }

  buildRowBillDetailTotal(item, locale) {
    const {
      buildingEmpty,
      electricEmpty,
      waterEmpty,
      bikeEmpty,
      carEmpty
    } = this.state;
    if (item.serviceName.indexOf("BUILDING") > -1) {
      return (
        <Text
          style={[styles.text, buildingEmpty ? styles.label_row_empty : {}]}
        >
          {item.paymentAmount.format() + " "}
        </Text>
      );
    } else if (item.serviceName.indexOf("ELECTRIC") > -1) {
      return (
        <Text
          style={[styles.text, electricEmpty ? styles.label_row_empty : {}]}
        >
          {item.paymentAmount.format() + " "}
        </Text>
      );
    } else if (item.serviceName.indexOf("WATER") > -1) {
      return (
        <Text style={[styles.text, waterEmpty ? styles.label_row_empty : {}]}>
          {item.paymentAmount.format() + " "}
        </Text>
      );
    } else if (item.serviceName.indexOf("MOTORBIKE") > -1) {
      return (
        <Text style={[styles.text, bikeEmpty ? styles.label_row_empty : {}]}>
          {item.paymentAmount.format() + " "}
        </Text>
      );
    } else if (item.serviceName.indexOf("CAR") > -1) {
      return (
        <Text style={[styles.text, carEmpty ? styles.label_row_empty : {}]}>
          {item.paymentAmount.format() + " "}
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>
          {item.paymentAmount.format() + " "}
        </Text>
      );
    }
  }

  buildRowBillDetailCheck(item, locale) {
    const {
      buildingEmpty,
      electricEmpty,
      waterEmpty,
      bikeEmpty,
      carEmpty,
      otherEmpty,
      arrCheck
    } = this.state;
    const { state } = this;
    return (
      <CheckBox
        style={styles.checkBox}
        disabled={item.paymentAmount <= 0}
        color={item.paymentAmount <= 0 ? "#cecece" : "#054f9a"}
        checked={arrCheck.indexOf(item) > -1}
        onPress={() => {
          if (arrCheck.indexOf(item) > -1) {
            this.setState({
              isCheckAll: false,
              totalPay: state.totalPay - item.paymentAmount,
              arrCheck: state.arrCheck.filter((i, index) => {
                return i != item
              })
            })
          }
          else {
            this.setState({
              isCheckAll: false,
              totalPay: state.totalPay + item.paymentAmount,
              arrCheck: state.arrCheck.indexOf(item) == -1
                ? [...state.arrCheck, item]
                : state.arrCheck
            })
          }
        }}
      />
    );
  }

  buildRowBillDetailPaid(item, locale) {
    const {
      buildingEmpty,
      electricEmpty,
      waterEmpty,
      bikeEmpty,
      carEmpty
    } = this.state;
    if (item.invoiceDetailPaid == null) {
      item.invoiceDetailPaid = 0;
    }
    if (item.serviceName.indexOf("BUILDING") > -1) {
      return (
        <Text
          style={[
            styles.text,
            buildingEmpty ? styles.label_row_empty : {},
            styles.primary
          ]}
        >
          {item.invoiceDetailPaid.format() + " "}
        </Text>
      );
    } else if (item.serviceName.indexOf("ELECTRIC") > -1) {
      return (
        <Text
          style={[
            styles.text,
            electricEmpty ? styles.label_row_empty : {},
            styles.primary
          ]}
        >
          {item.invoiceDetailPaid.format() + " "}
        </Text>
      );
    } else if (item.serviceName.indexOf("WATER") > -1) {
      return (
        <Text
          style={[
            styles.text,
            waterEmpty ? styles.label_row_empty : {},
            styles.primary
          ]}
        >
          {item.invoiceDetailPaid.format() + " "}
        </Text>
      );
    } else if (item.serviceName.indexOf("MOTORBIKE") > -1) {
      return (
        <Text
          style={[
            styles.text,
            bikeEmpty ? styles.label_row_empty : {},
            styles.primary
          ]}
        >
          {item.invoiceDetailPaid.format() + " "}
        </Text>
      );
    } else if (item.serviceName.indexOf("CAR") > -1) {
      return (
        <Text
          style={[
            styles.text,
            carEmpty ? styles.label_row_empty : {},
            styles.primary
          ]}
        >
          {item.invoiceDetailPaid.format() + " "}
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>
          {item.invoiceDetailPaid.format() + " "}
        </Text>
      );
    }
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    const { dispatch } = this.props.navigation;
    const { listResult } = this.props.historyReducer;
    return (
      <TouchableOpacity
        key={item.index}
        style={
          listResult && listResult.length >= 2
            ? styles.item_container_half
            : styles.item_container_full
        }
      // onPress={() => dispatch.push({ id: "HistoryDetail", userId: 1 })}
      >
        <ItemHistory
          tranCode={item.paymentCode}
          date={item.paymentDate}
          isCash={item.paymentMethod == "CASH"}
          totalMoney={item.paymentAmount.format() + " "}
          content={"TTHD " + item.invoiceMonth}
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
    historyReducer: state.historyReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    historyAction: bindActionCreators(historyAction, dispatch)
  };
}
history = connect(mapStateToProps, mapToDispatch)(history);

export default reduxForm({
  form: "history"
})(history);
