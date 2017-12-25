import React from 'react';
import {View,TouchableOpacity,UIManager,findNodeHandle,AsyncStorage} from 'react-native';
import {Button,Text} from 'native-base'
import Icon from 'react-native-vector-icons/EvilIcons';

const ICON_SIZE = 24;

export default class extends React.Component {
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
    const { actions, onPress } = this.props;

    UIManager.showPopupMenu(
      findNodeHandle(this.refs.menu),
      [this.state.fullName,...actions],
      this.handleShowPopupError,
      onPress,
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

// PopupMenu.propTypes = {
//   actions: React.PropTypes.array.isRequired,
//   onPress: React.PropTypes.func.isRequired,
//   children: React.PropTypes.object.isRequired,
// };