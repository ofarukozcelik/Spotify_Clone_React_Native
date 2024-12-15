import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Error = ({albumsError}) => {
  return (
    <View>
      <Text>{albumsError.message}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({});
