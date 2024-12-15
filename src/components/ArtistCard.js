import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ArtistCard = ({artist}) => {
  const lenghtText = (text, length) => {
    if (text.length > length) {
      return `${text.substring(0, length)}...`;
    }
    return text;
  };
  return (
    <TouchableOpacity>
      <View style={styles.artistContainer}>
        <Image
          source={{uri: artist?.data.visuals.avatarImage?.sources[1]?.url}}
          style={styles.artistImage}
        />
        <Text style={styles.artistName}>
          {' '}
          {lenghtText(artist.data.profile.name, 18)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({
  artistContainer: {
    margin: 10,
    width: 100,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistName: {
    color: 'white',
    marginTop: 7,
    textAlign: 'center',
  },
});
