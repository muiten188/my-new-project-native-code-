import React, { Component } from 'react'
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text
} from 'native-base'
import styles from './styles'
import User from '../User'
export default class extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <Header style={styles.header}>
                <Left style={styles.itemHeader}>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body style={styles.itemHeader}>
                    <Title>Header</Title>
                </Body>
                <Right style={styles.itemHeader}>
                        <User
                            actions={['item1','item2', 'LogOut']}
                            onPress={(e,i) => console.log(i)} 
                        />
                </Right>
            </Header>
        )
    }
}