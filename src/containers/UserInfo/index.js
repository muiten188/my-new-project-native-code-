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
import * as userInfoAction from "../../store/actions/containers/userInfo_action";
import * as AppConfig from "../../config/app_config";
const resolveAssetSource = require("resolveAssetSource");
const userAvar = require("../../resources/assets/user.jpg");
const blockAction = false;
class userInfo extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      username: "",
      fullName: "",
      phoneNumber: "",
      birthDay: "",
      email: "",
      avatar: "",
      identification: ""
    };

    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
  }
  componentDidMount() {
    setTimeout(() => {
      this.getUser();
    }, 0);
  }

  getUser() {
    try {
      const user = {};
      const { userInfoAction } = this.props;
      const hadUser = AsyncStorage.getItem("@user")
        .then(value => {
          // alert(value);
          user = JSON.parse(value);
          if (user) {
            userInfoAction._getUser(user);
          }
        })
        .done();
    } catch (error) {
      alert(error);
      // Error retrieving data
    }
  }
  onSearchClick() {
    const { dispatch } = this.props.navigation;
    if (!blockAction) {
      blockAction = true;
      dispatch.reset("Search");
      setTimeout(() => {
        blockAction = false;
      }, 800);
    }
  }
  /**
   *
   *
   * @returns
   * @memberof userInfo
   */
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
            <Content>
              <Item
                style={[
                  styles.itemAvatar,
                  styles.item_margin,
                  styles.borderBottomNone
                ]}
              >
                <Thumbnail
                  style={styles.thumbnail_avatar}
                  source={
                    this.props.user.avatar
                      ? {
                          uri: `${AppConfig.API_HOST}${this.props.user.avatar}`
                        }
                      : userAvar
                  }
                  ref={thumbnail => {
                    this.thumbnail = thumbnail;
                  }}
                  onError={e => {
                    this.thumbnail.setNativeProps({
                      src: [resolveAssetSource(userAvar)]
                    });
                  }}
                />
                <Button
                  style={styles.button_edit}
                  onPress={() => this.setState({ isEdit: true })}
                  transparent
                >
                  {/* <Icon size={27} name="edit" /> */}
                </Button>
              </Item>
              <Item
                style={[
                  styles.item_margin,
                  styles.borderBottomNone,
                  styles.center
                ]}
              >
                <H3 style={styles.textPadding}>{this.props.user.fullName}</H3>
              </Item>
              <Item
                style={[
                  styles.item_margin,
                  styles.borderBottomNone,
                  styles.center
                ]}
              >
                <H3 style={styles.textPadding}>
                  {"CMTND: "}
                  {this.props.user.identification
                    ? this.props.user.identification
                    : ""}
                </H3>
              </Item>
              <Form>
                <Field
                  name="birthday"
                  // disabled={!this.state.isEdit}
                  style={styles.infoField}
                  placeholder={I18n.t("birthday", {
                    locale: locale ? locale : "vi"
                  })}
                  component={DateField}
                  icon="calendar"
                />
                <Field
                  name="phoneNumber"
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
            </Content>
          </View>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    initialValues: state.userInfoReducer.user,
    user: state.userInfoReducer.user
  };
}
function mapToDispatch(dispatch) {
  return {
    userInfoAction: bindActionCreators(userInfoAction, dispatch)
  };
}

userInfo = reduxForm({
  form: "userInfo",
  enableReinitialize: true
})(userInfo);
userInfo = connect(mapStateToProps, mapToDispatch)(userInfo);
export default userInfo;
