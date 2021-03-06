'use strict';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import palette from '../style/palette';

class SCStore extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text numberOfLines={1}>
          <Text style={styles.name}>Name:</Text> {this.props.storeInfo.name}
        </Text>
        <Text numberOfLines={1}>
          <Text style={styles.name}>Type:</Text> {this.props.storeInfo.type}
        </Text>
        <Text numberOfLines={1}>
          <Text style={styles.name}>Service:</Text> {this.props.storeInfo.service}
        </Text>
        <Text numberOfLines={0}>
          <Text style={styles.name}>ID:</Text> {this.props.storeInfo.storeId}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 10,
    backgroundColor: '#fff'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  name: {
    fontWeight: 'bold'
  }
});

SCStore.propTypes = {
  storeInfo: PropTypes.object.isRequired
};

export default SCStore;