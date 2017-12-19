import UserInfo from '../containers/UserInfo';
import SimpleFrom from '../containers/SimpleForm'
import {
    addNavigationHelpers,
    StackNavigator,
} from 'react-navigation';

const stackNavigatorConfiguration = {
    initialRouteName: 'UserInfo'
}

export const RootNavigationContainer = StackNavigator({
    UserInfo: { screen: UserInfo },
    SimpleFrom:{
        screen:SimpleFrom,
        navigationOptions: {
            title:'Simple Form',
        } 
    }
}, stackNavigatorConfiguration)