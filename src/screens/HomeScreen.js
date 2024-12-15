import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../components/Loader';
import me from '../assets/images/me.png';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {ArtistContext} from '../context/ArtistContext';
import ArtistCard from '../components/ArtistCard';
import AlbumCard from '../components/AlbumCard';
import {AlbumContext} from '../context/AlbumContext';
import Error from '../components/Error';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const {artists, loading, error} = useContext(ArtistContext);
  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
  } = useContext(AlbumContext);
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#17153B', '#2E236C']} style={{flex: 1}}>
      {albumsLoading ? (
        <Loader />
      ) : albumsError ? (
        <Error error={albumsError} />
      ) : (
        <ScrollView
          style={{marginTop: 50}}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image source={me} style={styles.headerImage} />
              <Text style={styles.headerText}> Ömer Faruk Özçelik</Text>
            </View>
            <FontAwesome6 name="bolt-lightning" color="white" size={24} />
          </View>

          <View style={styles.tabButtons}>
            <Pressable style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Music</Text>
            </Pressable>
            <Pressable style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Podcast & Shows</Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={() => navigation.navigate('Songs')}
              style={styles.likedSongs}>
              <LinearGradient
                colors={['#C8ACD6', '#11035E']}
                style={{borderRadius: 30}}>
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="heart" color="white" size={24} />
                </Pressable>
              </LinearGradient>
              <Text style={styles.likedSongsText}>Songs</Text>
            </Pressable>
            <Pressable style={styles.likedSongs}>
              <LinearGradient
                colors={['#C8ACD6', '#11035E']}
                style={{borderRadius: 30}}>
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo name="moon" color="white" size={24} />
                </Pressable>
              </LinearGradient>
              <Text style={styles.likedSongsText}>Rock & Roll</Text>
            </Pressable>
            <Pressable style={styles.likedSongs}>
              <LinearGradient
                colors={['#C8ACD6', '#11035E']}
                style={{borderRadius: 30}}>
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="star" color="white" size={24} />
                </Pressable>
              </LinearGradient>
              <Text style={styles.likedSongsText}>Cazz</Text>
            </Pressable>
            <Text style={styles.sectionTitle}> Your Top Artists</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {artists
                ?.slice()
                .reverse()
                .map((artist, index) => (
                  <ArtistCard key={index} artist={artist} />
                ))}
            </ScrollView>

            <Text style={styles.sectionTitle}> Popüler Albums</Text>
            <ScrollView horizontal>
              {albums
                ?.slice()
                .reverse()
                .map((album, index) => (
                  <AlbumCard key={index} album={album} />
                ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerImage: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },
  tabButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
    marginHorizontal: 78,
  },
  tabButton: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 30,
    marginRight: 20,
  },
  tabButtonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  likedSongs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    borderRadius: 30,
    marginTop: 15,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#F1F1F1',
  },
  likedSongsText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 15,
  },
});
