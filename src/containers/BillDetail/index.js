import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
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
import { Field, reduxForm } from "redux-form";
import { DateField } from "../../components/Element/Form";
import * as navigationAction from "../../store/actions/root_navigation/root_navigation_actions";
import ConfirmModal from "../../components/ConfirmModal";
import PayModal from "../../components/PayModal";
import * as billDetailAction from "../../store/actions/containers/billdetail_actions";
import * as billListAction from "../../store/actions/containers/billList_actions";
import Loading from "../../components/Loading";
// import RNXprinter from "react-native-xprinter";
// RNXprinter.initialize();

class billDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const { bill, balance, totalDebit } = this.props.navigation.state.params;
    let temparr = [];
    for (var i = 0; i < bill.listInvoiceDetail.length; i++) {
      if (bill.listInvoiceDetail[i].invoiceDetailPaid == null) {
        bill.listInvoiceDetail[i].invoiceDetailPaid = 0;
      }
      bill.listInvoiceDetail[i].invoiceDetailAmount =
        bill.listInvoiceDetail[i].invoiceDetailAmount -
        bill.listInvoiceDetail[i].invoiceDetailPaid;
      if (bill.listInvoiceDetail[i].invoiceDetailAmount < 0) {
        bill.listInvoiceDetail[i].invoiceDetailAmount = 0;
      }
    }
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
      otherCashPay: false,
      otherCreditPay: false,
      useRemainCashPay: false,
      useRemainCreditPay: false,
      totalPay: 0,
      totalCashPay: 0,
      totalCreditPay: 0,
      payBalance: 0,
      paymentItemList: []
    };
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
    Number.prototype.format = function (n, x) {
      var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
      return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
    };
  }

  componentDidMount() { }

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

  buildRowBillDetailStartPeriod(item, locale) {
    const {
      buildingEmpty,
      electricEmpty,
      waterEmpty,
      bikeEmpty,
      carEmpty
    } = this.state;
    item.earlyPeriod = item.earlyPeriod ? item.earlyPeriod : 0;
    if (item.serviceName.indexOf("BUILDING") > -1) {
      return (
        <Text
          style={[styles.text, buildingEmpty ? styles.label_row_empty : {}]}
        >
          {item.earlyPeriod.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("ELECTRIC") > -1) {
      return (
        <Text
          style={[styles.text, electricEmpty ? styles.label_row_empty : {}]}
        >
          {item.earlyPeriod.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("WATER") > -1) {
      return (
        <Text style={[styles.text, waterEmpty ? styles.label_row_empty : {}]}>
          {item.earlyPeriod.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("MOTORBIKE") > -1) {
      return (
        <Text style={[styles.text, bikeEmpty ? styles.label_row_empty : {}]}>
          {item.earlyPeriod.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("CAR") > -1) {
      return (
        <Text style={[styles.text, carEmpty ? styles.label_row_empty : {}]}>
          {item.earlyPeriod.format() + " VNĐ"}
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>{item.earlyPeriod.format() + " VNĐ"}</Text>
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
          {item.arisingPeriod.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("ELECTRIC") > -1) {
      return (
        <Text
          style={[styles.text, electricEmpty ? styles.label_row_empty : {}]}
        >
          {item.arisingPeriod.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("WATER") > -1) {
      return (
        <Text style={[styles.text, waterEmpty ? styles.label_row_empty : {}]}>
          {item.arisingPeriod.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("MOTORBIKE") > -1) {
      return (
        <Text style={[styles.text, bikeEmpty ? styles.label_row_empty : {}]}>
          {item.arisingPeriod.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("CAR") > -1) {
      return (
        <Text style={[styles.text, carEmpty ? styles.label_row_empty : {}]}>
          {item.arisingPeriod.format() + " VNĐ"}
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>{item.arisingPeriod.format() + " VNĐ"}</Text>
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
          {item.invoiceDetailAmount.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("ELECTRIC") > -1) {
      return (
        <Text
          style={[styles.text, electricEmpty ? styles.label_row_empty : {}]}
        >
          {item.invoiceDetailAmount.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("WATER") > -1) {
      return (
        <Text style={[styles.text, waterEmpty ? styles.label_row_empty : {}]}>
          {item.invoiceDetailAmount.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("MOTORBIKE") > -1) {
      return (
        <Text style={[styles.text, bikeEmpty ? styles.label_row_empty : {}]}>
          {item.invoiceDetailAmount.format() + " VNĐ"}
        </Text>
      );
    } else if (item.serviceName.indexOf("CAR") > -1) {
      return (
        <Text style={[styles.text, carEmpty ? styles.label_row_empty : {}]}>
          {item.invoiceDetailAmount.format() + " VNĐ"}
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>
          {item.invoiceDetailAmount.format() + " VNĐ"}
        </Text>
      );
    }
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
          {item.invoiceDetailPaid.format() + " VNĐ"}
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
          {item.invoiceDetailPaid.format() + " VNĐ"}
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
          {item.invoiceDetailPaid.format() + " VNĐ"}
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
          {item.invoiceDetailPaid.format() + " VNĐ"}
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
          {item.invoiceDetailPaid.format() + " VNĐ"}
        </Text>
      );
    } else {
      return (
        <Text style={styles.text}>
          {item.invoiceDetailPaid.format() + " VNĐ"}
        </Text>
      );
    }
  }
  buildRowBillDetailCash(item, locale) {
    const {
      buildingEmpty,
      electricEmpty,
      waterEmpty,
      bikeEmpty,
      carEmpty,
      otherEmpty
    } = this.state;
    const { state } = this;
    const { bill, balance, totalDebit } = this.props.navigation.state.params;
    if (item.serviceName.indexOf("BUILDING") > -1) {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.buildingCashPay}
          onPress={() => {
            item.paymentMethod = "CASH";
            item.listInvoiceDetailId = item.listInvoiceDetailId;
            state.buildingCashPay == true
              ? this.setState({
                buildingCashPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCashPay: state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                buildingCashPay: true,
                buildingCreditPay: false,
                totalPay:
                  state.buildingCreditPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCashPay: state.totalCashPay + item.invoiceDetailAmount,
                totalCreditPay:
                  state.buildingCreditPay != true
                    ? state.totalCreditPay
                    : state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    } else if (item.serviceName.indexOf("ELECTRIC") > -1) {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.electricCashPay}
          onPress={() => {
            item.paymentMethod = "CASH";
            item.listInvoiceDetailId = item.listInvoiceDetailId;
            state.electricCashPay == true
              ? this.setState({
                electricCashPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCashPay: state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                electricCashPay: true,
                electricCreditPay: false,
                totalPay:
                  state.electricCreditPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCashPay: state.totalCashPay + item.invoiceDetailAmount,
                totalCreditPay:
                  state.electricCreditPay != true
                    ? state.totalCreditPay
                    : state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    } else if (item.serviceName.indexOf("WATER") > -1) {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.waterCashPay}
          onPress={() => {
            item.paymentMethod = "CASH";
            item.listInvoiceDetailId = item.listInvoiceDetailId;
            state.waterCashPay == true
              ? this.setState({
                waterCashPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCashPay: state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                waterCashPay: true,
                waterCreditPay: false,
                totalPay:
                  state.waterCreditPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCashPay: state.totalCashPay + item.invoiceDetailAmount,
                totalCreditPay:
                  state.waterCreditPay != true
                    ? state.totalCreditPay
                    : state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    } else if (item.serviceName.indexOf("MOTORBIKE") > -1) {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.bikeCashPay}
          onPress={() => {
            item.paymentMethod = "CASH";
            item.listInvoiceDetailId = item.listInvoiceDetailId;
            state.bikeCashPay
              ? this.setState({
                bikeCashPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCashPay: state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                bikeCashPay: true,
                bikeCreditPay: false,
                totalPay:
                  state.bikeCreditPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCashPay: state.totalCashPay + item.invoiceDetailAmount,
                totalCreditPay:
                  state.bikeCreditPay != true
                    ? state.totalCreditPay
                    : state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    } else if (item.serviceName.indexOf("CAR") > -1) {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.carCashPay}
          onPress={() => {
            item.paymentMethod = "CASH";
            item.listInvoiceDetailId = item.listInvoiceDetailId;
            state.carCashPay
              ? this.setState({
                carCashPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCashPay: state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                carCashPay: true,
                carCreditPay: false,
                totalPay:
                  state.carCreditPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCashPay: state.totalCashPay + item.invoiceDetailAmount,
                totalCreditPay:
                  state.carCreditPay != true
                    ? state.totalCreditPay
                    : state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    } else {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.otherCashPay}
          onPress={() => {
            item.paymentMethod = "CASH";
            item.listInvoiceDetailId = item.listInvoiceDetailId;
            state.otherCashPay == true
              ? this.setState({
                otherCashPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCashPay: state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                otherCashPay: true,
                otherCreditPay: false,
                totalPay:
                  state.otherCreditPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCashPay: state.totalCashPay + item.invoiceDetailAmount,
                totalCreditPay:
                  state.otherCreditPay != true
                    ? state.totalCreditPay
                    : state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    }
  }
  buildRowBillDetailCredit(item, locale) {
    const {
      buildingEmpty,
      electricEmpty,
      waterEmpty,
      bikeEmpty,
      carEmpty,
      otherEmpty
    } = this.state;
    const { state } = this;
    const { bill, balance, totalDebit } = this.props.navigation.state.params;
    if (item.serviceName.indexOf("BUILDING") > -1) {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.buildingCreditPay}
          onPress={() => {
            item.paymentMethod = "POS"; item.listInvoiceDetailId = item.listInvoiceDetailId;
            state.buildingCreditPay == true
              ? this.setState({
                buildingCreditPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCreditPay:
                  state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                buildingCreditPay: true,
                buildingCashPay: false,
                totalPay:
                  state.buildingCashPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCreditPay:
                  state.totalCreditPay + item.invoiceDetailAmount,
                totalCashPay:
                  state.buildingCashPay != true
                    ? state.totalCashPay
                    : state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    } else if (item.serviceName.indexOf("ELECTRIC") > -1) {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.electricCreditPay}
          onPress={() => {
            item.paymentMethod = "POS"; item.listInvoiceDetailId = item.listInvoiceDetailId;;
            state.electricCreditPay == true
              ? this.setState({
                electricCreditPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCreditPay:
                  state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                electricCreditPay: true,
                electricCashPay: false,
                totalPay:
                  state.electricCashPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCreditPay:
                  state.totalCreditPay + item.invoiceDetailAmount,
                totalCashPay:
                  state.electricCashPay != true
                    ? state.totalCashPay
                    : state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    } else if (item.serviceName.indexOf("WATER") > -1) {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.waterCreditPay}
          onPress={() => {
            item.paymentMethod = "POS"; item.listInvoiceDetailId = item.listInvoiceDetailId;;
            state.waterCreditPay == true
              ? this.setState({
                waterCreditPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCreditPay:
                  state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                waterCreditPay: true,
                waterCashPay: false,
                totalPay:
                  state.waterCashPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCreditPay:
                  state.totalCreditPay + item.invoiceDetailAmount,
                totalCashPay:
                  state.waterCashPay != true
                    ? state.totalCashPay
                    : state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    } else if (item.serviceName.indexOf("MOTORBIKE") > -1) {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.bikeCreditPay}
          onPress={() => {
            item.paymentMethod = "POS"; item.listInvoiceDetailId = item.listInvoiceDetailId;;
            state.bikeCreditPay == true
              ? this.setState({
                bikeCreditPay: [],
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCreditPay:
                  state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                bikeCreditPay: true,
                bikeCashPay: false,
                totalPay:
                  state.bikeCashPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCreditPay:
                  state.totalCreditPay + item.invoiceDetailAmount,
                totalCashPay:
                  state.bikeCashPay != true
                    ? state.totalCashPay
                    : state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    } else if (item.serviceName.indexOf("CAR") > -1) {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.carCreditPay}
          onPress={() => {
            item.paymentMethod = "POS"; item.listInvoiceDetailId = item.listInvoiceDetailId;;
            state.carCreditPay == true
              ? this.setState({
                carCreditPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCreditPay:
                  state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                carCreditPay: true,
                carCashPay: false,
                totalPay:
                  state.carCashPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCreditPay:
                  state.totalCreditPay + item.invoiceDetailAmount,
                totalCashPay:
                  state.carCashPay != true
                    ? state.totalCashPay
                    : state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    } else {
      return (
        <CheckBox
          style={styles.checkBox}
          disabled={item.invoiceDetailAmount <= 0}
          color={item.invoiceDetailAmount <= 0 ? "#cecece" : "#054f9a"}
          checked={state.otherCreditPay}
          onPress={() => {
            item.paymentMethod = "POS"; item.listInvoiceDetailId = item.listInvoiceDetailId;;
            state.otherCreditPay == true
              ? this.setState({
                otherCreditPay: false,
                totalPay: state.totalPay - item.invoiceDetailAmount,
                totalCreditPay:
                  state.totalCreditPay - item.invoiceDetailAmount,
                paymentItemList: state.paymentItemList.filter((i, index) => {
                  return (
                    i.invoiceDetailId != item.invoiceDetailId &&
                    i.paymentMethod != item.paymentMethod
                  );
                })
              })
              : this.setState({
                otherCreditPay: true,
                otherCashPay: false,
                totalPay:
                  state.otherCashPay != true
                    ? state.totalPay + item.invoiceDetailAmount
                    : state.totalPay,
                totalCreditPay:
                  state.totalCreditPay + item.invoiceDetailAmount,
                totalCashPay:
                  state.otherCashPay != true
                    ? state.totalCashPay
                    : state.totalCashPay - item.invoiceDetailAmount,
                paymentItemList:
                  state.paymentItemList.indexOf(item) == -1
                    ? [...state.paymentItemList, item]
                    : state.paymentItemList
              });
          }}
        />
      );
    }
  }
  render() {
    const locale = "vn";
    const { dispatch } = this.props.navigation;
    const { bill, balance, totalDebit } = this.props.navigation.state.params;
    const { billDetailAction } = this.props;
    const {
      transactionCode,
      billPayError,
      isLoading
    } = this.props.billDetailReducer;
    const { billListAction, navigation } = this.props;
    const { user } = this.props.loginReducer;
    const state = this.state;
    let rentEmpty = false;
    let remainUseEmpty = false;
    if (!state.rentCashPay && !state.rentCreditPay) {
      rentEmpty = true;
    }
    if (billPayError == true) {
      Alert.alert(
        "Thông Báo",
        "Thanh toán hóa đơn lỗi kiểm tra lại đường truyền."
      );
    }
    return (
      <Container style={styles.container}>
        <Header
          headerTitle={
            I18n.t("billDetail", {
              locale: locale ? locale : "vn"
            }) + "8"
          }
          showButtonLeft={true}
          onBack={() => dispatch.pop()}
          // showSearch={true}
          // onSearch={this.onSearchClick.bind(this)}
          showUser={true}
        />
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
                    {bill.invoiceMonth}
                  </H3>
                </Col>
                <Col style={styles.col}>
                  <H3 style={styles.textPadding}>
                    {I18n.t("balancePeriod", {
                      locale: locale ? locale : "vn"
                    })}
                  </H3>
                </Col>
                <Col style={styles.col}>
                  <H3 style={styles.textPadding}>
                    {I18n.t("incresePeriod", {
                      locale: locale ? locale : "vn"
                    })}
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
                    {I18n.t("totalCash", {
                      locale: locale ? locale : "vn"
                    })}
                  </H3>
                </Col>
                <Col style={styles.col}>
                  <H3 style={styles.textPadding}>
                    {I18n.t("totalCredit", {
                      locale: locale ? locale : "vn"
                    })}
                  </H3>
                </Col>
              </Row>
              <Row style={styles.billDetailRow}>
                  <Col style={styles.titleDetailCol}>
                    {bill.listInvoiceDetail.map((item, index) => {
                      return (
                        <Row key={index} style={styles.rowDetail_inner}>
                          {this.buildRowBillDetail(item, locale)}
                        </Row>
                      );
                    })}
                  </Col>
                  <Col style={styles.col_detail}>
                    {bill.listInvoiceDetail.map((item, index) => {
                      return (
                        <Row key={index} style={styles.rowDetail_inner}>
                          {this.buildRowBillDetailStartPeriod(item, locale)}
                        </Row>
                      );
                    })}
                  </Col>
                  <Col style={styles.col_detail}>
                    {bill.listInvoiceDetail.map((item, index) => {
                      return (
                        <Row key={index} style={styles.rowDetail_inner}>
                          {this.buildRowBillDetailInPeriod(item, locale)}
                        </Row>
                      );
                    })}
                  </Col>
                  <Col style={styles.col_detail}>
                    {bill.listInvoiceDetail.map((item, index) => {
                      return (
                        <Row key={index} style={styles.rowDetail_inner}>
                          {this.buildRowBillDetailTotal(item, locale)}
                        </Row>
                      );
                    })}
                  </Col>
                  <Col style={styles.col_detail}>
                    {bill.listInvoiceDetail.map((item, index) => {
                      return (
                        <Row key={index} style={styles.rowDetail_inner}>
                          {this.buildRowBillDetailCash(item, locale)}
                        </Row>
                      );
                    })}
                  </Col>
                  <Col style={styles.col_detail}>
                    {bill.listInvoiceDetail.map((item, index) => {
                      return (
                        <Row key={index} style={styles.rowDetail_inner}>
                          {this.buildRowBillDetailCredit(item, locale)}
                        </Row>
                      );
                    })}
                  </Col>
              </Row>
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
                  <H1
                    style={[
                      styles.pay_item,
                      styles.totalPay,
                      styles.textPadding
                    ]}
                  >
                    {state.totalPay <= 0
                      ? "0 VNĐ"
                      : state.totalPay.format() + " VNĐ"}
                  </H1>
                  <Text style={styles.pay_item}>
                    {I18n.t("inOf", {
                      locale: locale ? locale : "vn"
                    })}
                  </Text>
                  <Item style={[styles.pay_item, styles.borderBottomNone]}>
                    <Icon name="money" style={styles.icon} />
                    <Text>
                      {state.totalCashPay.format() + " VNĐ"}{" "}
                      {state.payBalance > 0
                        ? " - " + state.payBalance.format() + " VNĐ"
                        : ""}
                    </Text>
                  </Item>
                  <Item style={[styles.pay_item, styles.borderBottomNone]}>
                    <Icon name="credit-card-alt" style={styles.icon} />
                    <Text>{state.totalCreditPay.format() + " VNĐ"}</Text>
                  </Item>
                  <Button
                    full
                    disabled={
                      state.paymentItemList && state.paymentItemList.length <= 0
                    }
                    style={
                      state.paymentItemList && state.paymentItemList.length <= 0
                        ? styles.buttomPay_disabled
                        : styles.buttomPay
                    }
                    onPress={() => this.setState({ isModalConfirm: true })}
                  >
                    <Text uppercase={false}>
                      {I18n.t("pay", {
                        locale: locale ? locale : "vn"
                      })}
                    </Text>
                  </Button>
                </View>
              </Row>
            </Col>
          </Grid>
        </View>
        <PayModal
          show={this.state.isModalVisible && transactionCode != null}
          transactionCode={transactionCode}
          onClose={() => {
            this.setState({ isModalVisible: false });

            dispatch.pop();
            setTimeout(() => {
              billListAction.getBillList(bill.apartmentId, user);
            }, 15);
          }}
          onPay={() => {
            // this.printBill();
          }}
        />
        <ConfirmModal
          show={this.state.isModalConfirm}
          onClose={() => this.setState({ isModalConfirm: false })}
          onProcess={() => {
            this.setState({ isModalVisible: true, isModalConfirm: false });
            billDetailAction.billPay(
              state.paymentItemList,
              bill,
              balance,
              user
            );
          }}
        />
      </Container>
    );
  }

  printBill() {
    try {
      let printerList = RNXprinter.getDeviceList().then(printerList => {
        RNXprinter.selectDevice(printerList[0].address);
        // RNXprinter.pickPrinter();
        RNXprinter.pushText("<h1>           bui dhtml              </h1>", 0);
        RNXprinter.pushText("bui dinh bach2", 0);
        RNXprinter.pushText("bui dinh bach3", 0);
        RNXprinter.pushText("bui dinh bach4", 0);
        RNXprinter.pushText("bui dinh bach5", 0);
        RNXprinter.pushText("bui dinh bach6", 0);
        RNXprinter.pushFlashImage(0);

        // Push Cut Paper
        RNXprinter.pushCutPaper();
        RNXprinter.print();
      });
    } catch (e) {
      Alert.alert(
        "Thông báo",
        "In hóa đơn thất bại, kiểm tra lại kết nối máy in !"
      );
    }
  }
}
function mapStateToProps(state, props) {
  return {
    billDetailReducer: state.billDetailReducer,
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    billDetailAction: bindActionCreators(billDetailAction, dispatch),
    billListAction: bindActionCreators(billListAction, dispatch)
  };
}
billDetail = connect(mapStateToProps, mapToDispatch)(billDetail);

export default reduxForm({
  form: "billDetail"
})(billDetail);
