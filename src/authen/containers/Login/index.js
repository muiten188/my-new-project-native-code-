import React, { Component,AsyncStorage } from "react";
import { TouchableOpacity, Image, View} from "react-native";
import {
  Container,
  Spinner,
  Text,
  Button,
  Header,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Thumbnail,
  Picker,
  Left,
  Right
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import theme from "../../../themes/default/styles";
import * as loginAction from "../../actions/login_action";
import I18n from "../../../i18n/i18n";
import { Field, reduxForm } from "redux-form";
import { InputField } from "../../../components/Element/Form";


const validate = values => {
  const error = {};
  error.username = '';
  error.password = '';
  var username = values.username;
  var password = values.password;
  if (values.username === undefined) {
    username = '';
  }
  if (values.password === undefined) {
    password = '';
  }
  if (username.length==0 || username == '') {
    error.username = 'empty';
  }
  if (password.length==0 || password == '') {
    error.password = 'empty';
  }
  return error;
};

class login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    
    this.state = {
      languageSelect: "vn",
      selected1: "key1",
      results: {
        items: []
      }
    };
    I18n.defaultLocale = "vi";
    I18n.locale = "vi";
    I18n.currentLocale();
    
  }

  onValueChange(value) {
    this.setState({
      languageSelect: value
    });
  }

  render() {
    const { loginAction,handleSubmit, submitting, setToast } = this.props;  
    const locale='vn';
    debugger;
    return (
      <View style={{ flex: 1 }}>
        {/* background */}
        <Image
          source={require("../../../resources/assets/splash.png")}
          style={styles.backgroundImage}
        />
        {/* ngôn ngữ */}
        <Grid style={styles.language_container}>
          <Col style={styles.col_language}>
            {this.state.languageSelect == "en" ? (
              <Thumbnail
                small
                source={require("../../../resources/assets/us_flag.svg")}
              />
            ) : (
              <Thumbnail
                small
                source={require("../../../resources/assets/vn_flag.svg")}
              />
            )}
          </Col>
          <Col>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.languageSelect}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="Tiếng việt" value="vn" />
              <Item label="English" value="en" />
            </Picker>
          </Col>
        </Grid>
        {/* form login */}
        <View style={styles.screen}>
          <View style={styles.loginform}>
            <Container style={styles.container_login}>
              <View style={styles.content_login}>
                <View>
                  {/* <Thumbnail square large source={require("../../../resources/assets/splash.png")} /> */}
                  <View style={styles.app_icon}>
                    <Thumbnail
                      square
                      large
                      source={{
                        uri:
                          "https://3.bp.blogspot.com/-9FS5zPnrtrQ/WdjintM17tI/AAAAAAAAHuc/qnzExAUr9O036AxE35tky5Bm-1BmB-qYgCLcBGAs/s320/y-nghia-icon-facebook-zalo.png"
                      }}
                    />
                  </View>
                  <Form style={styles.form}>
                    <Item regular style={styles.item}>
                      <Icon active name="person" />
                      <Field
                        name="username"
                        placeholder={I18n.t("account", {
                          locale: locale
                            ? locale
                            : "vi"
                        })}
                        component={InputField}
                      />
                      
                      
                    </Item>
                    <Item regular style={styles.item}>
                      <Icon active name="lock" />
                      <Field
                        name="password"
                        placeholder={I18n.t("password", {
                          locale: locale
                            ? locale
                            : "vi"
                        })}
                        secureTextEntry={true}
                        component={InputField}
                      />
                    </Item>
                    <Button
                      full
                      style={{ marginTop: 20 }}
                      onPress={handleSubmit(loginAction.login)}
                    >
                      <Text>
                        {I18n.t("login", {
                          locale: this.state.languageSelect
                            ? this.state.languageSelect
                            : "vi"
                        })}
                      </Text>
                    </Button>
                    <Button transparent dark full>
                      <Text uppercase={false} x>
                        {I18n.t("forgotPassword", {
                          locale: this.state.languageSelect
                            ? this.state.languageSelect
                            : "vi"
                        })}
                      </Text>
                    </Button>
                  </Form>
                  <Grid>
                    <Col style={styles.col_footer}>
                      <Text style={[styles.text_footer, { textAlign: "left" }]}>
                        Hotline: 0243 333 888
                      </Text>
                    </Col>
                    <Col style={styles.col_footer}>
                      <Text
                        style={[styles.text_footer, { textAlign: "right" }]}
                      >
                        www.hapulico.com
                      </Text>
                    </Col>
                  </Grid>
                </View>
              </View>
            </Container>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loginReducer: state.loginReducer
  };
}
function mapToDispatch(dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}

// export default connect(mapStateToProps, mapToDispatch)(login);
// @connect(state=>({  
//   loginRequest: commonSelectors.getRequest(state, 'login'),  
// }), {...commonActions, ...authActions})
// @reduxForm({ form: 'LoginForm', validate})

export default reduxForm({
  form: 'LoginForm',
  validate
})(connect(mapStateToProps, mapToDispatch)(login))

