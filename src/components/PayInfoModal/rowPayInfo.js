import React, { Component, PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Text, TouchableOpacity, View, FlatList, Alert, Dimensions } from "react-native";
import {
    Button,
    Item,
    Footer,
    Left,
    Right,
    Content,
    Label,
    H1,
    H3
} from "native-base";
import styles from "./styles";
import { formatDate } from "../../helper";
import I18n from "../../i18n/i18n";

import Loading from "../../components/Loading";
const wd_width = Dimensions.get('window').width;
const wd_height = Dimensions.get('window').height;
class RowPayInfo extends PureComponent {
    constructor(props) {
        super(props);
        Number.prototype.format = function (n, x) {
            var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
            return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }
    componentWillUnmount() {

    }

    render() {
        const { item, index } = this.props;

        return (
            <View style={{ width: wd_width * 0.9, minHeight: 50, flexDirection: 'row' }}>
                <View style={[styles.center, { width: 60, borderWidth: 0.25, borderColor: '#cecece' }]}>
                    <Label>{index}</Label>
                </View>
                <View style={[styles.center, { flex: 1, borderWidth: 0.25, borderColor: '#cecece' }]}>
                    <Label>{item.apartmentName}</Label>
                </View>
                <View style={[styles.center, { flex: 1, borderWidth: 0.25, borderColor: '#cecece' }]}>
                    <Label>{item.cash ? item.cash.format() : 0}</Label>
                </View>
                <View style={[styles.center, { flex: 1, borderWidth: 0.25, borderColor: '#cecece' }]}>
                    <Label>{item.pos ? item.pos.format() : 0}</Label>
                </View>
                <View style={[styles.center, { flex: 1, borderWidth: 0.25, borderColor: '#cecece' }]}>
                    <Label>{item.reportPaymentId}</Label>
                </View>
                <View style={[styles.center, { flex: 1, borderWidth: 0.25, borderColor: '#cecece' }]}>
                    <Label>{item.paymentDate ? formatDate(new Date(item.paymentDate)) : "-"}</Label>
                </View>
            </View>
        );
    }
}
export default RowPayInfo;
