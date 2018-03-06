import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Text, TouchableOpacity, View, FlatList, Alert, Dimensions } from "react-native";
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
import { formatDate } from "../../helper";
import RowPayInfo from "./rowPayInfo";
const dateNow = new Date()
const blockAction = false;
const blockLoadMoreAction = false;
const wd_width = Dimensions.get('window').width;
const wd_height = Dimensions.get('window').height;
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

  componentDidUpdate(prevProps, prevState) {
    if (this.smallLoading.getState() == true) {
      this.smallLoading.hide();
    }
  }
  componentWillUnmount() {
    const { appAction } = this.props;
    appAction.resetState();
  }

  // formatDate(date) {
  //   // var monthNames = [
  //   //   "January", "February", "March",
  //   //   "April", "May", "June", "July",
  //   //   "August", "September", "October",
  //   //   "November", "December"
  //   // ];

  //   var day = date.getDate();
  //   var monthIndex = date.getMonth() + 1;
  //   var year = date.getFullYear();
  //   return day + "-" + monthIndex + "-" + year;
  // }

  render() {
    const { show, onClose, transactionCode, onOk, onClearError } = this.props;
    const { user } = this.props.loginReducer;
    const { payInfo, isLoading, listPayError, listResult, pageSize, currentPage, loadEnd, totalElement } = this.props.app_Reducer;
    const { appAction } = this.props;
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
        <View style={[styles.modalContainer, { width: wd_width * 0.9, height: wd_height * 0.9 }]}>
          <View style={styles.modalContent}>
            <H3 style={[styles.item_content, styles.textPadding]}>
              {I18n.t("payOfDay", {
                locale: locale ? locale : "vn"
              })}
            </H3>
            <Grid style={{ width: wd_width * 0.9, height: 200, paddingLeft: 6, paddingRight: 6 }}>
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
              <Row style={{ height: 35 }}>
                <View style={{ width: wd_width * 0.9, flexDirection: 'row' }}>
                  <View style={[styles.center, { width: 60, borderWidth: 0.5, borderColor: '#cecece' }]}>
                    <Label>STT</Label>
                  </View>
                  <View style={[styles.center, { flex: 1, borderWidth: 0.5, borderColor: '#cecece' }]}>
                    <Label>Tên căn hộ</Label>
                  </View>
                  <View style={[styles.center, { flex: 1, borderWidth: 0.5, borderColor: '#cecece' }]}>
                    <Label>Tiền mặt</Label>
                  </View>
                  <View style={[styles.center, { flex: 1, borderWidth: 0.5, borderColor: '#cecece' }]}>
                    <Label>Quẹt thẻ</Label>
                  </View>
                  <View style={[styles.center, { flex: 1, borderWidth: 0.5, borderColor: '#cecece' }]}>
                    <Label>Mã hóa đơn</Label>
                  </View>
                  <View style={[styles.center, { flex: 1, borderWidth: 0.5, borderColor: '#cecece' }]}>
                    <Label>Ngày thanh toán</Label>
                  </View>
                </View>
              </Row>
              <Row style={{}}>
                <FlatList
                  ref={ref => {
                    this.list = ref;
                  }}
                  keyExtractor={this._keyExtractor}
                  style={{}}
                  data={listResult ? listResult : []}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderFlatListItem.bind(this)}
                  onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                  numColumns={1}
                  onEndReached={({ distanceFromEnd }) => {
                    console.log("scroll down:" + distanceFromEnd)
                    if (distanceFromEnd > 0) {
                      // this.onEndReachedCalledDuringMomentum = true;
                      console.log("load action: " + blockLoadMoreAction)
                      console.log("list length: " + listResult.length)
                      console.log("pageSize: " + pageSize)
                      if (
                        !(listResult.length < pageSize)
                      ) {
                        console.log("scroll downed:" + distanceFromEnd)
                        //blockLoadMoreAction = true;
                        this.smallLoading.show();
                        setTimeout(() => {
                          appAction.loadPayInfoMore(
                            { fromDate: this.state.payStartDate.toISOString(), toDate: this.state.payEndDate.toISOString() },
                            currentPage,
                            pageSize,
                            user
                          )
                        }, 0);

                        // setTimeout(() => {
                        //   if (loadEnd != true) {
                        //     blockLoadMoreAction = false;
                        //   }
                        // }, 300);
                      }
                    }
                  }}
                  onEndReachedThreshold={1}
                />
                <Loading ref={ref => {
                  this.smallLoading = ref;
                }} />
              </Row>
            </Grid>
            <View style={{ width: wd_width * 0.9, paddingLeft: 6, paddingRight: 6, minHeight: 45, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#cecece' }}>
              <View style={{ flex: 1 }}>
                <View style={[{ flex: 1, minHeight: 45, flexDirection: 'row' }, styles.center]} >
                  <View style={[styles.center, { width: 80 }]}><Label>Tiền mặt:</Label></View>
                  <View style={[styles.center, { flex: 1 }]}><Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!payInfo.totalCash ? 0 : payInfo.totalCash.format()}</Text></View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, minHeight: 45, flexDirection: 'row', }}>
                  <View style={[styles.center, { width: 80 }]}><Label> Quẹt thẻ:</Label></View>
                  <View style={[styles.center, { flex: 1 }]}>
                    <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!payInfo.totalPos ? 0 : payInfo.totalPos.format()}</Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, minHeight: 45, flexDirection: 'row', }}>
                  <View style={[styles.center, { width: 80 }]}><Label>Tổng tiền:</Label></View>
                  <View style={[styles.center, { flex: 1 }]}>
                    <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{!payInfo.total ? 0 : payInfo.total.format()}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ width: wd_width * 0.9, paddingLeft: 6, paddingRight: 6, minHeight: 45, flexDirection: 'row', marginBottom: 90, borderTopWidth: 1, borderTopColor: '#cecece' }}>
              <View style={[{ marginLeft: 6, justifyContent: 'center', width: 180 }]}><Label>Tổng số căn hộ đã thu: </Label></View>
              <View style={[{ justifyContent: 'center', flex: 1 }]}>
                <Text style={{ marginRight: 6, marginLeft: 6, fontSize: 18 }}>{totalElement ? totalElement : 0}</Text>
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
        <RowPayInfo item={item} index={dataItem.index}></RowPayInfo>
      </View>
    );
  }

  _keyExtractor(item, index) {
    return index;
  }

  loadData(startDate, endDate) {
    const { appAction } = this.props;
    const { currentPage, pageSize, listResult } = this.props.app_Reducer;
    const { user } = this.props.loginReducer;
    if (listResult.length > 0) {
      this.list.scrollToIndex({ index: 0 });
    }
    appAction.searchPayInfo({ fromDate: startDate.toISOString(), toDate: endDate.toISOString() }, currentPage, pageSize, user, user);
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
