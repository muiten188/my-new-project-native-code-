import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {View,TouchableOpacity,UIManager,findNodeHandle,AsyncStorage} from 'react-native';
import {Button,Text} from 'native-base'
import Icon from 'react-native-vector-icons/EvilIcons';
import * as loginAction from '../../authen/actions/login_action';
const ICON_SIZE = 24;

class user extends React.Component {
  handleShowPopupError = () => {
    // show error here
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
  }

  handleMenuPress = () => {
    const { actions, onPress,loginAction } = this.props;

    UIManager.showPopupMenu(
      findNodeHandle(this.refs.menu),
      [this.state.fullName,...actions],
      this.handleShowPopupError,
      loginAction.logout,
    );
  };

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    try {
      const user = {};
      const hadUser = AsyncStorage.getItem("@user")
        .then(value => {
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

  render() {
    const {state} =this;
    return (
      <View>
        { this.props.children }
        <Button transparent onPress={this.handleMenuPress} style={{alignSelf:'center',backgroundColor:'transparent',paddingLeft:15,paddingRight:15}}>
          <Icon
            name="user"
            size={ICON_SIZE}
            color='white'
            ref="menu"
          />
          <Text>{this.state.fullName}</Text>
        </Button>
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    //loginReducer: state.loginReducer,
  };
}
function mapToDispatch(dispatch) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch)
  };
}


user = connect(
  mapStateToProps,
  mapToDispatch
)(user)
export default user;