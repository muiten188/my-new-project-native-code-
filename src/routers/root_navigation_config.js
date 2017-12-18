import Home from '../containers/Home';
import SimpleFrom from '../containers/SimpleForm'
import Expo from "expo";
import {
    addNavigationHelpers,
    StackNavigator,
} from 'react-navigation';

const stackNavigatorConfiguration = {
    initialRouteName: 'SimpleFrom',
    cardStyle: {
        paddingTop: Expo.Constants.statusBarHeight//just android
    }
}

export const RootNavigationContainer = StackNavigator({
    Home: { screen: Home },
    SimpleFrom:{
        screen:SimpleFrom,
        navigationOptions: {
            title:'Simple Form',
        } 
    }
}, stackNavigatorConfiguration)