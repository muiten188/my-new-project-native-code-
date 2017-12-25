import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  View,
  KeyboardAvoidingView,
  AsyncStorage,
  TextInput
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
  H1,
  H2,
  H3
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
import * as helper from "../../helper";

class userInfo extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      username: '',
      fullName: '',
      phoneNumber: '',
      birthDay: '',
      email: '',
      avatar: '',
      identification: ''
    };

    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    try {
      const user = {};
      const hadUser = AsyncStorage.getItem("@user")
        .then(value => {
          alert(value);
          user = JSON.parse(value);
          this.setState({
            username: user.username,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            birthDay: user.birthDay,
            email: user.email,
            avatar: user.avatar,
            identification: user.identification
          });
        })
        .done();
    } catch (error) {
      alert(error);
      // Error retrieving data
    }
  }

  onSearchClick() {
    const { dispatch } = this.props.navigation;
    dispatch.push({ id: "Search" });
  }

  render() {
    const locale = "vn";
    const { state } = this;
    return (
      <Container style={styles.container}>
        <Header
          headerTitle={I18n.t("userinfo", {
            locale: locale ? locale : "vn"
          })}
          showSearch={true}
          onSearch={this.onSearchClick.bind(this)}
        />
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container_info_outer}
          keyboardVerticalOffset={-100}
        >
          <View style={styles.container_info_inter}>
            <Item style={[styles.itemAvatar, styles.item_margin]}>
              <Thumbnail
                style={styles.thumbnail_avatar}
                source={{
                  uri:
                    "http://www.chupdep.com/wp-content/uploads/2015/08/xu_huong_hoc_anh_chan_dung_cua_gioi_tre__4.jpg"
                }}
              />
              <Button
                style={styles.button_edit}
                onPress={() => this.setState({ isEdit: true })}
                transparent
              >
                <Icon size={27} name="edit" />
              </Button>
            </Item>
            <Item style={[styles.item_margin, styles.borderBottomNone]}>
              <H3>{state.fullName}</H3>
            </Item>
            <Item style={[styles.item_margin, styles.borderBottomNone]}>
              <H3>{"CMTND: " + state.identification}</H3>
            </Item>
            <Form initialValues={{ email: "buidinhbach123@gmail.com" }}>
              <Field
                name="birthday"
                disabled={!this.state.isEdit}
                style={styles.infoField}
                placeholder={I18n.t("birthday", {
                  locale: locale ? locale : "vi"
                })}
                component={DateField}
                icon="calendar"
              />
              <Field
                name="email"
                disabled={!this.state.isEdit}
                style={styles.infoField}
                placeholder={I18n.t("mobile", {
                  locale: locale ? locale : "vi"
                })}
                type="text"
                component={InputField}
                icon="volume-control-phone"
              />
              <Field
                name="email"
                disabled={!this.state.isEdit}
                style={styles.infoField}
                placeholder={I18n.t("email", {
                  locale: locale ? locale : "vi"
                })}
                component={InputField}
                icon="comment"
              />
              <Field
                name="username"
                disabled={!this.state.isEdit}
                style={styles.infoField}
                placeholder={I18n.t("user", {
                  locale: locale ? locale : "vi"
                })}
                component={InputField}
                icon="user-o"
              />
              <Item
                style={[styles.borderBottomNone, styles.itemButton_changepw]}
              >
                <Button
                  full
                  style={styles.button_changepassword}
                  onPress={() => alert("Đổi mật khẩu")}
                >
                  <Text>
                    {I18n.t("changePassword", {
                      locale: locale ? locale : "vi"
                    })}
                  </Text>
                </Button>
              </Item>
            </Form>
          </View>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    // initialValues: { email: "0001" }
  };
}
function mapToDispatch(dispatch) {
  return {
    //navigationAction: bindActionCreators(navigationAction, dispatch),
  };
}
userInfo = connect(mapStateToProps, mapToDispatch)(userInfo);

export default reduxForm({
  form: "userInfo"
})(userInfo);
