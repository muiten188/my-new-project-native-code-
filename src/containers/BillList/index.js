import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity
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
  Label
} from "native-base";
import styles from "./styles";
import HeaderForm from "../../components/Header_form";
import HeaderContent from "../../components/Header_content";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-native-easy-grid";
import I18n from "../../i18n/i18n";
import { InputField } from "../../components/Element/Form/index";
import Icon from "react-native-vector-icons/FontAwesome";
import { Field, reduxForm } from "redux-form";
import { DateField } from "../../components/Element/Form";
import Bill from "../../components/Bill";
import ItemResult from "../../components/Item_result";
import * as billListAction from "../../store/actions/containers/billList_actions";
import Loading from "../../components/Loading";
class billList extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false
    };
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }

  componentDidMount() {
    const { billListAction, navigation } = this.props;
    billListAction.getBillList(navigation.state.params.apartment.apartmentId);
  }

  onSearchClick() {
    alert(1);
    // const { navigationAction } = this.props.navigation;
    // navigationAction.push({ id: "FilmDetail", title: "Film Detail", oFilm: oData });
  }

  render() {
    const locale = "vn";
    const { dispatch, state } = this.props.navigation;
    const { listResult, isLoading, balance } = this.props.billListReducer;
    const { key, userName, position, phone, avatarUrl } = this.props;
    return (
      <Container style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container_outer}
          keyboardVerticalOffset={-350}
        >
          <Grid>
            <Col size={32} style={[styles.grid_col, styles.col_form]}>
              <HeaderForm
                onBack={() => dispatch.pop()}
                headerTitle={I18n.t("homeInfo", {
                  locale: locale ? locale : "vn"
                })}
              />
              <Content>
                <View style={styles.formContainer}>
                  <Thumbnail
                    style={styles.thumbnail_avatar}
                    source={{
                      uri: state.params.apartment.avatarUrl
                        ? state.params.apartment.avatarUrl
                        : "https://baomoi-photo-3-td.zadn.vn/w700_r1m/17/07/15/170/22759925/1_42393.jpg"
                    }}
                  />
                  <View>
                    <Item style={styles.item}>
                      <Label inlineLabel>
                        {I18n.t("homeOwner", {
                          locale: locale ? locale : "vn"
                        })}
                      </Label>
                      <H3>{state.params.apartment.ownerName}</H3>
                    </Item>

                    <Item style={styles.item}>
                      <Icon name="map-marker" style={styles.icon} />
                      <Text>{state.params.apartment.apartmentName}</Text>
                    </Item>
                    <Item style={styles.item}>
                      <Icon name="phone" style={styles.icon} />
                      <Text>{state.params.apartment.ownerPhone}</Text>
                    </Item>
                    <Item style={styles.item}>
                      <Label inlineLabel>
                        {I18n.t("remainMoney", {
                          locale: locale ? locale : "vn"
                        })}
                      </Label>
                      <Text style={styles.textRemainMoney}>
                        {balance + " VNĐ"}
                      </Text>
                    </Item>
                    <Item style={styles.item}>
                      <Label inlineLabel>
                        {I18n.t("remainRent", {
                          locale: locale ? locale : "vn"
                        })}
                      </Label>
                      <Text style={styles.textRemainMoney}>
                        {balance + " VNĐ"}
                      </Text>
                    </Item>
                  </View>
                  <Button
                    full
                    style={styles.buttonViewHistory}
                    onPress={() => dispatch.push({ id: "History" })}
                  >
                    <Text uppercase={false}>
                      {" "}
                      {I18n.t("viewHistory", {
                        locale: locale ? locale : "vn"
                      })}
                    </Text>
                  </Button>
                </View>
              </Content>
            </Col>
            <Col size={68} style={[styles.grid_col, styles.col_content]}>
              <HeaderContent
                onBack={() => dispatch.pop()}
                showUser={true}
                headerTitle={I18n.t("billList", {
                  locale: locale ? locale : "vn"
                })}
              />
              <Container style={styles.listResult_container}>
                <Loading isShow={isLoading} />
                <FlatList
                  style={styles.listResult}
                  data={listResult ? listResult : []}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderFlatListItem.bind(this)}
                  numColumns={1}
                />
              </Container>
            </Col>
          </Grid>
        </KeyboardAvoidingView>
      </Container>
    );
  }

  renderFlatListItem(dataItem) {
    const item = dataItem.item;
    const { dispatch } = this.props.navigation;
    const { balance, totalDebit } = this.props.billListReducer;
    return (
      <TouchableOpacity
        key={item.index}
        style={styles.item_container}
        onPress={() => {
          if (item.invoiceStatus == "INCOMPLETE") {
            dispatch.push({
              id: "BillDetail",
              bill: item,
              balance: balance,
              totalDebit: totalDebit
            });
          }
        }}
      >
        <Bill
          listInvoiceDetail={item.listInvoiceDetail}
          invoiceStatus={item.invoiceStatus}
          invoiceMonth={item.invoiceMonth}
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
    billListReducer: state.billListReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    billListAction: bindActionCreators(billListAction, dispatch)
  };
}
billList = reduxForm({
  form: "billlist"
  // enableReinitialize: true
})(billList);
billList = connect(mapStateToProps, mapToDispatch)(billList);
export default billList;
