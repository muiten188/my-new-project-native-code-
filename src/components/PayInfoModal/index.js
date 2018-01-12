import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  Button,
  Item,
  Footer,
  Left,
  Right,
  Content,
  H1,
  H3
} from "native-base";
import styles from "./styles";
import Modal from "react-native-modal";
import DatePicker from "../../components/DatePicker";
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payDate: this.formatDate(new Date())
    };
  }

  formatDate(date) {
    // var monthNames = [
    //   "January", "February", "March",
    //   "April", "May", "June", "July",
    //   "August", "September", "October",
    //   "November", "December"
    // ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + "-" + monthIndex + 1 + "-" + year;
  }

  render() {
    const { show, onClose, transactionCode, onOk } = this.props;
    return (
      <Modal isVisible={show} style={styles.modal}>
        <View style={styles.modalContainer}>
          <Content>
            <View style={styles.modalContent}>
              <H3 style={[styles.item_content, styles.textPadding]}>
                Thanh toán trong ngày
              </H3>
              <DatePicker
                date={this.state.payDate}
                mode="date"
                placeholder="Chọn ngày thanh toán"
                onDateChange={date => {
                  this.setState({ payDate: date });
                }}
              />
              <H1
                style={[
                  styles.item_content,
                  styles.codeText,
                  styles.textPadding
                ]}
              >
                {transactionCode}
              </H1>
              <Text style={[styles.item_content, styles.textSize]}>
                Thanh toán đã được thực hiện Cảm ơn sự hợp tác của quý khách
              </Text>
            </View>
          </Content>
          <Footer style={styles.Footer}>
            <Item style={styles.border_bottomNone}>
              {/* <Button
                onPress={onClose}
                style={[styles.buttonOk, styles.button_margin]}
              >
                <Text style={[styles.textSize, styles.textCancel]}>
                  Quay lại
                </Text>
              </Button> */}
              <Button onPress={onOk} style={styles.buttonCancel}>
                <Text style={[styles.textSize, styles.textOk]}>OK</Text>
              </Button>
            </Item>
          </Footer>
        </View>
      </Modal>
    );
  }
}
