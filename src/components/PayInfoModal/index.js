import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Text, TouchableOpacity, View, FlatList, Alert } from "react-native";
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
const dateNow = new Date()
class PayInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payStartDate: dateNow,
      payEndDate: dateNow
    };
    Number.prototype.format = function (n, x) {
      var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
      return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
    };
  }

  componentDidMount() {
    this.loadData(dateNow, dateNow)
  }

  formatDate(date) {
    // var monthNames = [
    //   "January", "February", "March",
    //   "April", "May", "June", "July",
    //   "August", "September", "October",
    //   "November", "December"
    // ];

    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + "-" + monthIndex + "-" + year;
  }

  render() {
    const { show, onClose, transactionCode, onOk, onClearError } = this.props;
    const { user } = this.props.loginReducer;
    let { payInfo, isLoading, listPayError } = this.props.app_Reducer;
    const locale = "vn";
    if (listPayError == true) {
      Alert.alert(
        "Thông báo",
        "Lấy danh sách thanh toán thất bại vui lòng kiểm tra lại đường truyền.",
        [
          {
            text: "Ok",
            onPress: onClearError
          }
        ],
        { cancelable: false }
      );
    }
    return (
      <Modal isVisible={show} style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <H3 style={[styles.item_content, styles.textPadding]}>
              {I18n.t("payOfDay", {
                locale: locale ? locale : "vn"
              })}
            </H3>
            <Grid style={{ width: 600, height: '100%' }}>
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
                        rawDate.setHours(7);
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
                        rawDate.setHours(7);
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
              <Row style={{}}>
                <Loading isShow={isLoading} />
                {/* <FlatList
                  ref={ref => {
                    this.list = ref;
                  }}
                  keyExtractor={this._keyExtractor}
                  style={{}}
                  data={payInfo ? [payInfo] : []}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderFlatListItem.bind(this)}
                  numColumns={1}
                /> */}
              </Row>
              {/* <Row style={{ minHeight: 90 }}>

                <Col style={styles.center}>
                  <Item style={styles.itemPayInfo}>
                    <Label>
                      Tiền mặt:
                      </Label>
                    <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!payInfo.totalCash ? 0 : payInfo.totalCash.format()}{" VNĐ"}</Text>
                  </Item>
                </Col>
                <Col style={styles.center}>
                  <Item style={styles.itemPayInfo}>
                    <Label>
                      Quẹt thẻ:
                </Label>
                    <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!payInfo.totalPos ? 0 : payInfo.totalPos.format()}{" VNĐ"}</Text>
                  </Item>
                </Col>
                <Col style={styles.center}>
                  <Item style={styles.itemPayInfo}>
                    <Label>
                      Tổng tiền:
                </Label>
                    <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!payInfo.total ? 0 : payInfo.total.format()}{" VNĐ"}</Text>
                  </Item>
                </Col>
              </Row> */}
            </Grid>
            <View style={{ width: 600, minHeight: 70, flexDirection: 'row', marginBottom: 50 }}>
              <View style={{ flex: 1 }}>
                <View style={[{ flex: 1, minHeight: 70, flexDirection: 'row' }, styles.center]} >
                  <View style={[styles.center, { width: 80}]}><Label>Tiền mặt:</Label></View>
                  <View style={[styles.center, { flex: 1 }]}><Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!payInfo.totalCash ? 0 : payInfo.totalCash.format()}</Text></View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, minHeight: 70, flexDirection: 'row', }}>
                  <View style={[styles.center, { width: 80 }]}><Label> Quẹt thẻ:</Label></View>
                  <View style={[styles.center, { flex: 1 }]}>
                    <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!payInfo.totalPos ? 0 : payInfo.totalPos.format()}</Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, minHeight: 70, flexDirection: 'row', }}>
                  <View style={[styles.center, { width: 80 }]}><Label>Tổng tiền:</Label></View>
                  <View style={[styles.center, { flex: 1 }]}>
                    <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!payInfo.total ? 0 : payInfo.total.format()}</Text>
                  </View>
                </View>
              </View>
            </View>


          </View>
          <Footer style={styles.Footer}>
            <Item style={styles.border_bottomNone}>
              <Button onPress={onOk} style={styles.buttonCancel}>
                <Text style={[styles.textSize, styles.textOk]}>OK</Text>
              </Button>
            </Item>
          </Footer>
        </View>
      </Modal >
    );
  }

  buildList(payInfo) {
    var arrResult = [];
    total = 0;
    for (var i = 0; i < payInfo.length; i++) {
      total = total + payInfo[i];
    }
    arrResult = [...payInfo, total];
    return arrResult;
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    const { payInfo } = this.props.app_Reducer;
    return (
      <View key={dataItem.index}>
        <Grid>
          <Row>
            <Col>
              <Item style={styles.itemPayInfo}>
                <Label>
                  Tiền mặt:
                </Label>
                <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!item.totalCash ? 0 : item.totalCash.format()}{" VNĐ"}</Text>
              </Item>
            </Col>
            <Col>
              <Item style={styles.itemPayInfo}>
                <Label>
                  Quẹt thẻ:
                </Label>
                <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!item.totalPos ? 0 : item.totalPos.format()}{" VNĐ"}</Text>
              </Item>
            </Col>
            <Col>
              <Item style={styles.itemPayInfo}>
                <Label>
                  Tổng tiền:
                </Label>
                <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!item.total ? 0 : item.total.format()}{" VNĐ"}</Text>
              </Item>
            </Col>

          </Row>
        </Grid>

      </View>
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
