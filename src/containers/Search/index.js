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
  H3
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
import ItemResult from "../../components/Item_result";
import * as searchAction from "../../store/actions/containers/search_action";
import Loading from "../../components/Loading";
class search extends Component {
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
    const { searchAction } = this.props;
    // searchAction.search();
  }

  onSearchClick() {
    alert(1);
    // const { navigationAction } = this.props.navigation;
    // navigationAction.push({ id: "FilmDetail", title: "Film Detail", oFilm: oData });
  }

  render() {
    const locale = "vn";
    const { dispatch } = this.props.navigation;
    const { listResult, isLoading } = this.props.searchReducer;
    const { searchAction, handleSubmit } = this.props;
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
                headerTitle={I18n.t("searchInfo", {
                  locale: locale ? locale : "vn"
                })}
              />
              <Content>
                <Form style={styles.formContainer}>
                  <Grid>
                    <Row style={styles.x3Row}>
                      <Col style={styles.icon_col}>
                        <Icon style={styles.icon} name="map-marker" />
                      </Col>
                      <Col style={styles.border}>
                        <Row style={[styles.border, styles.fieldForm]}>
                          <Field
                            name="buildingCode"
                            placeholder={I18n.t("building", {
                              locale: locale ? locale : "vi"
                            })}
                            component={InputField}
                          />
                        </Row>
                        <Row style={[styles.border, styles.fieldForm]}>
                          <Field
                            name="floorCode"
                            placeholder={I18n.t("floor", {
                              locale: locale ? locale : "vi"
                            })}
                            component={InputField}
                          />
                        </Row>
                        <Row style={[styles.border, styles.fieldForm]}>
                          <Field
                            name="aparmentName"
                            placeholder={I18n.t("apartmentNo", {
                              locale: locale ? locale : "vi"
                            })}
                            component={InputField}
                          />
                        </Row>
                      </Col>
                    </Row>
                    <Row style={styles.normalRow}>
                      <Col style={styles.icon_col}>
                        <Icon style={styles.icon} name="user-circle-o" />
                      </Col>
                      <Col style={[styles.border, styles.fieldForm]}>
                        <Field
                          name="fullName"
                          placeholder={I18n.t("homeName", {
                            locale: locale ? locale : "vi"
                          })}
                          component={InputField}
                        />
                      </Col>
                    </Row>
                    <Row style={styles.normalRow}>
                      <Col style={styles.icon_col}>
                        <Icon style={styles.icon} name="phone" />
                      </Col>
                      <Col style={[styles.border, styles.fieldForm]}>
                        <Field
                          name="phoneNumber"
                          placeholder={I18n.t("mobile", {
                            locale: locale ? locale : "vi"
                          })}
                          component={InputField}
                        />
                      </Col>
                    </Row>
                  </Grid>
                  <Button full disabled={isLoading} onPress={handleSubmit(searchAction.search)} style={{ marginLeft: 50, marginRight: 50 }}>
                    <Text>
                      {I18n.t("search", {
                        locale: locale ? locale : "vi"
                      })}
                    </Text>
                  </Button>
                </Form>
              </Content>
            </Col>
            <Col size={68} style={[styles.grid_col, styles.col_content]}>
              <HeaderContent
                onBack={() => dispatch.pop()}
                showUser={true}
                headerTitle={I18n.t("result", {
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
                  numColumns={2}
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
    const { listResult } = this.props.searchReducer;
    return (
      <TouchableOpacity
        key={item.index}
        style={listResult && listResult.length >= 2 ? styles.item_container_half:styles.item_container_full}
        onPress={() => dispatch.push({ id: "BillList", apartment: item })}
      >
        <ItemResult
          key={item.index}
          userName={item.ownerName}
          position={item.apartmentName}
          phone={item.ownerPhone}
          avatarUrl={item.avatarUrl}
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
    searchReducer: state.searchReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    searchAction: bindActionCreators(searchAction, dispatch)
  };
}
// export default reduxForm({
//   form: "search"
// })(connect(mapStateToProps, mapToDispatch)(search));



search = reduxForm({
  form: "search",
  // enableReinitialize: true
})(search);
search = connect(mapStateToProps, mapToDispatch)(search);
export default search;