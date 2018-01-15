import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import {
  Button,
  Item,
  Footer,
  Left,
  Right,
  Content,
  Label,
  H1,
  H3
} from "native-base";
import styles from "./styles";
import Modal from "react-native-modal";
import I18n from "../../i18n/i18n";
import DatePicker from "../../components/DatePicker";
import { Grid, Col, Row } from "react-native-easy-grid";
import * as appAction from "../../store/actions/app_action";
import Loading from "../../components/Loading";
const dateNow=new Date()
class PayInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payStartDate: dateNow,
      payEndDate: dateNow
    };
  }

  componentDidMount(){
    this.loadData(dateNow,dateNow)
  }

  formatDate(date) {
    // var monthNames = [
    //   "January", "February", "March",
    //   "April", "May", "June", "July",
    //   "August", "September", "October",
    //   "November", "December"
    // ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + "-" + monthIndex + 1 + "-" + year;
  }

  render() {
    const { show, onClose, transactionCode, onOk } = this.props;
    const { user } = this.props.loginReducer;
    let { listPayInfo,isLoading } = this.props.app_Reducer;
    const locale = "vn";
    return (
      <Modal isVisible={show} style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <H3 style={[styles.item_content, styles.textPadding]}>
              {I18n.t("payOfDay", {
                locale: locale ? locale : "vn"
              })}
            </H3>
            <Grid style={{ width: 460 }}>
              <Row style={{ height: 50 }}>
                <Col>
                  <Item
                    style={{
                      paddingLeft: 6,
                      borderBottomWidth: 0
                    }}
                  >
                    <Label>Từ ngày</Label>
                    <DatePicker
                      style={{ width: 30 }}
                      width={30}
                      date={this.state.payStartDate}
                      mode="date"
                      placeholder="Chọn ngày thanh toán"
                      onDateChange={(date, rawDate) => {
                        if (rawDate > this.state.payEndDate) {
                          this.setState({
                            payStartDate: rawDate,
                            payEndDate: rawDate
                          });
                          this.loadData(rawDate, rawDate);
                        } else {
                          this.setState({
                            payStartDate: rawDate
                          });
                          this.loadData(rawDate, this.state.payEndDate);
                        }
                      }}
                    />
                  </Item>
                </Col>
                <Col>
                  <Item style={{ borderBottomWidth: 0 }}>
                    <Label>Đến ngày</Label>
                    <DatePicker
                      style={{}}
                      date={this.state.payEndDate}
                      mode="date"
                      placeholder="Chọn ngày thanh toán"
                      onDateChange={(date, rawDate) => {
                        this.setState({ payEndDate: rawDate });
                        if (rawDate < this.state.payStartDate) {
                          this.setState({
                            payStartDate: rawDate,
                            payEndDate: rawDate
                          });
                          this.loadData(rawDate, rawDate);
                        } else {
                          this.setState({
                            payEndDate: rawDate
                          });
                          this.loadData(this.state.payStartDate, rawDate);
                        }
                      }}
                    />
                  </Item>
                </Col>
              </Row>
              <Row style={{ marginBottom: 60 }}>
                <Loading isShow={isLoading} />
                <FlatList
                  ref={ref => {
                    this.list = ref;
                  }}
                  keyExtractor={this._keyExtractor}
                  style={{}}
                  data={listPayInfo ? this.buildList(listPayInfo) : []}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderFlatListItem.bind(this)}
                  numColumns={1}
                />
              </Row>
            </Grid>
          </View>
          <Footer style={styles.Footer}>
            <Item style={styles.border_bottomNone}>
              {/* <Button
                onPress={onClose}
                style={[styles.buttonOk, styles.button_margin]}
              >
                <Text style={[styles.textSize, styles.textCancel]}>
                  Quay lại
                </Text>
              </Button> */}
              <Button onPress={onOk} style={styles.buttonCancel}>
                <Text style={[styles.textSize, styles.textOk]}>OK</Text>
              </Button>
            </Item>
          </Footer>
        </View>
      </Modal>
    );
  }

  buildList(listPayInfo) {
    var arrResult = [];
    total = 0;
    for (var i = 0; i < listPayInfo.length; i++) {
      total = total + listPayInfo[i];
    }
    arrResult = [...listPayInfo, total];
    return arrResult;
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    const { listPayInfo } = this.props.app_Reducer;
    return (
      <Item key={dataItem.index} style={styles.itemPayInfo}>
        <Label>
          {dataItem.index == listPayInfo.length
            ? "Tổng cộng"
            : "Thu ngày: 15-1-2018"}
        </Label>
        <Text>{"0 VNĐ "}</Text>
      </Item>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }

  loadData(startDate, endDate) {
    const { appAction } = this.props;
    const { user } = this.props.loginReducer;
    appAction.getPayInfo(startDate, endDate, user);
  }
}
function mapStateToProps(state, props) {
  return {
    loginReducer: state.loginReducer,
    app_Reducer: state.app_Reducer
  };
}
function mapToDispatch(dispatch) {
  return {
    appAction: bindActionCreators(appAction, dispatch)
  };
}

PayInfoModal = connect(mapStateToProps, mapToDispatch)(PayInfoModal);
export default PayInfoModal;
