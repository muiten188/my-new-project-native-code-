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
import ConfirmModal from "../../components/ConfirmModal";
import PayModal from "../../components/PayModal";

class billDetail extends Component {
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

  render() {
    const locale = "vn";
    const { dispatch } = this.props.navigation;
    const state = this.state;
    let rentEmpty = false;
    let electricEmpty = false;
    let waterEmpty = false;
    let buildingEmpty = false;
    let bikeEmpty = false;
    let carEmpty = false;
    let remainUseEmpty = false;
    if (!state.rentCashPay && !state.rentCreditPay) {
      rentEmpty = true;
    }
    if (!state.electricCashPay && !state.electricCreditPay) {
      electricEmpty = true;
    }
    if (!state.waterCashPay && !state.waterCreditPay) {
      waterEmpty = true;
    }
    if (!state.buildingCashPay && !state.buildingCreditPay) {
      buildingEmpty = true;
    }
    if (!state.bikeCashPay && !state.bikeCreditPay) {
      bikeEmpty = true;
    }
    if (!state.carCashPay && !state.carCreditPay) {
      carEmpty = true;
    }
    if (!state.useRemainCashPay && !state.useRemainCreditPay) {
      remainUseEmpty = true;
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
          <Grid>
            <Col style={styles.titleCol}>
              <Row style={styles.row_Header}>
                <Text />
              </Row>
              <Row style={styles.rowRent}>
                <H3 style={rentEmpty ? styles.label_row_empty : {}}>
                  {I18n.t("pay1stRent", {
                    locale: locale ? locale : "vn"
                  })}
                </H3>
              </Row>
              <Row style={styles.billDetailRow}>
                <Col>
                  <Row style={styles.rowDetail_inner_title}>
                    <H3>
                      {I18n.t("billCostTitle", {
                        locale: locale ? locale : "vn"
                      })}{" "}
                      {"T12"}
                    </H3>
                  </Row>
                  <Row style={styles.rowDetail_inner}>
                    <Item style={styles.borderBottomNone}>
                      <Icon
                        name="plug"
                        style={[
                          styles.icon,
                          electricEmpty ? styles.label_row_empty : {}
                        ]}
                      />
                      <Label
                        style={electricEmpty ? styles.label_row_empty : {}}
                      >
                        {I18n.t("electricCost", {
                          locale: locale ? locale : "vn"
                        })}
                      </Label>
                    </Item>
                  </Row>
                  <Row style={styles.rowDetail_inner}>
                    <Item style={styles.borderBottomNone}>
                      <Icon
                        name="tint"
                        style={[
                          styles.icon,
                          waterEmpty ? styles.label_row_empty : {}
                        ]}
                      />
                      <Label style={waterEmpty ? styles.label_row_empty : {}}>
                        {I18n.t("waterCost", {
                          locale: locale ? locale : "vn"
                        })}
                      </Label>
                    </Item>
                  </Row>
                  <Row style={styles.rowDetail_inner}>
                    <Item style={styles.borderBottomNone}>
                      <Icon
                        name="building"
                        style={[
                          styles.icon,
                          buildingEmpty ? styles.label_row_empty : {}
                        ]}
                      />
                      <Label
                        style={buildingEmpty ? styles.label_row_empty : {}}
                      >
                        {I18n.t("buildingCost", {
                          locale: locale ? locale : "vn"
                        })}
                      </Label>
                    </Item>
                  </Row>
                  <Row style={styles.rowDetail_inner}>
                    <Item style={styles.borderBottomNone}>
                      <Icon
                        name="motorcycle"
                        style={[
                          styles.icon,
                          bikeEmpty ? styles.label_row_empty : {}
                        ]}
                      />
                      <Label style={bikeEmpty ? styles.label_row_empty : {}}>
                        {I18n.t("bikeCost", {
                          locale: locale ? locale : "vn"
                        })}
                      </Label>
                    </Item>
                  </Row>
                  <Row style={styles.rowDetail_inner}>
                    <Item style={styles.borderBottomNone}>
                      <Icon
                        name="car"
                        style={[
                          styles.icon,
                          carEmpty ? styles.label_row_empty : {}
                        ]}
                      />
                      <Label style={carEmpty ? styles.label_row_empty : {}}>
                        {I18n.t("carCost", {
                          locale: locale ? locale : "vn"
                        })}
                      </Label>
                    </Item>
                  </Row>
                </Col>
              </Row>
              <Row style={styles.rowUse}>
                <H3 style={remainUseEmpty ? styles.label_row_empty : {}}>
                  {I18n.t("use1stRent", {
                    locale: locale ? locale : "vn"
                  })}
                </H3>
              </Row>
              <Row style={styles.lastRow} />
            </Col>
            <Col>
              <Row style={styles.row_Header}>
                <H2>
                  {I18n.t("totalMoney", {
                    locale: locale ? locale : "vn"
                  })}
                </H2>
              </Row>
              <Row style={styles.rowRent}>
                <Text style={rentEmpty ? styles.label_row_empty : {}}>
                  350.000.000.000 VNĐ
                </Text>
              </Row>
              <Row style={styles.billDetailRow}>
                <Col>
                  <Row style={styles.rowDetail_inner_title} />
                  <Row style={styles.rowDetail_inner}>
                    <Text style={electricEmpty ? styles.label_row_empty : {}}>
                      500.000 VNĐ
                    </Text>
                  </Row>
                  <Row style={styles.rowDetail_inner}>
                    <Text style={waterEmpty ? styles.label_row_empty : {}}>
                      350.000 VNĐ
                    </Text>
                  </Row>
                  <Row style={styles.rowDetail_inner}>
                    <Text style={buildingEmpty ? styles.label_row_empty : {}}>
                      500.000 VNĐ
                    </Text>
                  </Row>
                  <Row style={styles.rowDetail_inner}>
                    <Text style={bikeEmpty ? styles.label_row_empty : {}}>
                      100.000 VNĐ
                    </Text>
                  </Row>
                  <Row style={styles.rowDetail_inner}>
                    <Text style={carEmpty ? styles.label_row_empty : {}}>
                      1.100.000 VNĐ
                    </Text>
                  </Row>
                </Col>
              </Row>
              <Row style={styles.rowUse}>
                <Text style={remainUseEmpty ? styles.label_row_empty : {}}>
                  100.000 VNĐ
                </Text>
              </Row>
              <Row style={styles.lastRow} />
            </Col>
            <Col>
              <Row style={styles.row_Header}>
                <H2>
                  {I18n.t("totalCash", {
                    locale: locale ? locale : "vn"
                  })}
                </H2>
              </Row>
              <Row style={styles.rowRent_checkBox}>
                <CheckBox
                  color={rentEmpty ? "#ff373a" : "#054f9a"}
                  checked={state.rentCashPay}
                  onPress={() =>
                    state.rentCashPay == true
                      ? this.setState({ rentCashPay: false })
                      : this.setState({ rentCashPay: true })
                  }
                />
              </Row>
              <Row style={styles.billDetailRow}>
                <Col>
                  <Row style={styles.rowDetail_inner_title} />
                  <Row style={styles.rowDetail_inner_checkBox}>
                    <CheckBox
                      color={electricEmpty ? "#ff373a" : "#054f9a"}
                      checked={state.electricCashPay}
                      onPress={() =>
                        state.electricCashPay == true
                          ? this.setState({ electricCashPay: false })
                          : this.setState({ electricCashPay: true })
                      }
                    />
                  </Row>
                  <Row style={styles.rowDetail_inner_checkBox}>
                    <CheckBox
                      color={waterEmpty ? "#ff373a" : "#054f9a"}
                      checked={state.waterCashPay}
                      onPress={() =>
                        state.waterCashPay == true
                          ? this.setState({ waterCashPay: false })
                          : this.setState({ waterCashPay: true })
                      }
                    />
                  </Row>
                  <Row style={styles.rowDetail_inner_checkBox}>
                    <CheckBox
                      color={buildingEmpty ? "#ff373a" : "#054f9a"}
                      checked={state.buildingCashPay}
                      onPress={() =>
                        state.buildingCashPay == true
                          ? this.setState({ buildingCashPay: false })
                          : this.setState({ buildingCashPay: true })
                      }
                    />
                  </Row>
                  <Row style={styles.rowDetail_inner_checkBox}>
                    <CheckBox
                      color={bikeEmpty ? "#ff373a" : "#054f9a"}
                      checked={state.bikeCashPay}
                      onPress={() =>
                        state.bikeCashPay == true
                          ? this.setState({ bikeCashPay: false })
                          : this.setState({ bikeCashPay: true })
                      }
                    />
                  </Row>
                  <Row style={styles.rowDetail_inner_checkBox}>
                    <CheckBox
                      color={carEmpty ? "#ff373a" : "#054f9a"}
                      checked={state.carCashPay}
                      onPress={() =>
                        state.carCashPay == true
                          ? this.setState({ carCashPay: false })
                          : this.setState({ carCashPay: true })
                      }
                    />
                  </Row>
                </Col>
              </Row>
              <Row style={styles.rowUse_checkbox}>
                <CheckBox
                  color={remainUseEmpty ? "#ff373a" : "#054f9a"}
                  checked={state.useRemainCashPay}
                  onPress={() =>
                    state.useRemainCashPay == true
                      ? this.setState({ useRemainCashPay: false })
                      : this.setState({ useRemainCashPay: true })
                  }
                />
              </Row>
              <Row style={styles.lastRow} />
            </Col>
            <Col>
              <Row style={styles.row_Header}>
                <H2>
                  {I18n.t("totalCredit", {
                    locale: locale ? locale : "vn"
                  })}
                </H2>
              </Row>
              <Row style={styles.rowRent_checkBox}>
                <CheckBox
                  color={rentEmpty ? "#ff373a" : "#054f9a"}
                  checked={state.rentCreditPay}
                  onPress={() =>
                    state.rentCreditPay == true
                      ? this.setState({ rentCreditPay: false })
                      : this.setState({ rentCreditPay: true })
                  }
                />
              </Row>
              <Row style={styles.billDetailRow}>
                <Col>
                  <Row style={styles.rowDetail_inner_title} />
                  <Row style={styles.rowDetail_inner_checkBox}>
                    <CheckBox
                      color={electricEmpty ? "#ff373a" : "#054f9a"}
                      checked={state.electricCreditPay}
                      onPress={() =>
                        state.electricCreditPay == true
                          ? this.setState({ electricCreditPay: false })
                          : this.setState({ electricCreditPay: true })
                      }
                    />
                  </Row>
                  <Row style={styles.rowDetail_inner_checkBox}>
                    <CheckBox
                      color={waterEmpty ? "#ff373a" : "#054f9a"}
                      checked={state.waterCreditPay}
                      onPress={() =>
                        state.waterCreditPay == true
                          ? this.setState({ waterCreditPay: false })
                          : this.setState({ waterCreditPay: true })
                      }
                    />
                  </Row>
                  <Row style={styles.rowDetail_inner_checkBox}>
                    <CheckBox
                      color={buildingEmpty ? "#ff373a" : "#054f9a"}
                      checked={state.buildingCreditPay}
                      onPress={() =>
                        state.buildingCreditPay == true
                          ? this.setState({ buildingCreditPay: false })
                          : this.setState({ buildingCreditPay: true })
                      }
                    />
                  </Row>
                  <Row style={styles.rowDetail_inner_checkBox}>
                    <CheckBox
                      color={bikeEmpty ? "#ff373a" : "#054f9a"}
                      checked={state.bikeCreditPay}
                      onPress={() =>
                        state.bikeCreditPay == true
                          ? this.setState({ bikeCreditPay: false })
                          : this.setState({ bikeCreditPay: true })
                      }
                    />
                  </Row>
                  <Row style={styles.rowDetail_inner_checkBox}>
                    <CheckBox
                      color={carEmpty ? "#ff373a" : "#054f9a"}
                      checked={state.carCreditPay}
                      onPress={() =>
                        state.carCreditPay == true
                          ? this.setState({ carCreditPay: false })
                          : this.setState({ carCreditPay: true })
                      }
                    />
                  </Row>
                </Col>
              </Row>
              <Row style={styles.rowUse_checkbox}>
                <CheckBox
                  color={remainUseEmpty ? "#ff373a" : "#054f9a"}
                  checked={state.useRemainCreditPay}
                  onPress={() =>
                    state.useRemainCreditPay == true
                      ? this.setState({ useRemainCreditPay: false })
                      : this.setState({ useRemainCreditPay: true })
                  }
                />
              </Row>
              <Row style={styles.lastRow} />
            </Col>
            <Col style={styles.totalCol}>
              <Row style={styles.row_Header}>
                <H2>
                  {I18n.t("TotalPay", {
                    locale: locale ? locale : "vn"
                  })}
                </H2>
              </Row>
              <Row style={[styles.border, styles.center]}>
                <View style={[{ flex: 1 }, styles.center]}>
                  <H1 style={[styles.pay_item, styles.totalPay]}>
                    1.500.000.000 VNĐ
                  </H1>
                  <Text style={styles.pay_item}>
                    {I18n.t("inOf", {
                      locale: locale ? locale : "vn"
                    })}
                  </Text>
                  <Item style={[styles.pay_item, styles.borderBottomNone]}>
                    <Icon name="plug" style={styles.icon} />
                    <Text>750.000 VNĐ</Text>
                  </Item>
                  <Item style={[styles.pay_item, styles.borderBottomNone]}>
                    <Icon name="credit-card-alt" style={styles.icon} />
                    <Text>750.000 VNĐ</Text>
                  </Item>
                  <Button
                    full
                    style={{ marginLeft: 20, marginRight: 20, borderRadius: 3 }}
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
          show={this.state.isModalVisible}
          onClose={() => this.setState({ isModalVisible: false })}
        />
        <ConfirmModal
          show={this.state.isModalConfirm}
          onClose={() => this.setState({ isModalConfirm: false })}
          onProcess={()=>this.setState({ isModalVisible: true,isModalConfirm:false })}
        />
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
billDetail = connect(mapStateToProps, mapToDispatch)(billDetail);

export default reduxForm({
  form: "billDetail"
})(billDetail);
