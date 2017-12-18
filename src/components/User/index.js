import React from 'react';
import {View,TouchableOpacity,UIManager,findNodeHandle} from 'react-native';
import {Button,Text} from 'native-base'
import Icon from 'react-native-vector-icons/EvilIcons';

const ICON_SIZE = 24;

export default class extends React.Component {
  handleShowPopupError = () => {
    // show error here
  };

  handleMenuPress = () => {
    const { actions, onPress } = this.props;

    UIManager.showPopupMenu(
      findNodeHandle(this.refs.menu),
      actions,
      this.handleShowPopupError,
      onPress,
    );
  };

  render() {
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
          <Text>User</Text>
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