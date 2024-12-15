import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import {useProgress} from 'react-native-track-player';
import {AntDesign} from 'react-native-vector-icons/AntDesign';
import {Entypo} from 'react-native-vector-icons/Entypo';
import {Ionicons} from 'react-native-vector-icons/Ionicons';

const ModalComponent = ({modalVisable, setModalVisible, track, onStop}) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const progress = useProgress();

  const handlePlay = async track => {
    const trackData = {
      id: track.track.key,
      url: track.track.hub.actions.find(action => action.type === 'uri').uri,
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = seconds => {
    // toplam saniyeyi dakikaya çevir
    const mins = Math.floor(seconds / 60);
    // toplam saniye sayısından geriye kalan saniyeyi hesapla
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ' '}${secs}`;
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      //müzik oynatılıyorsa durdur
      await TrackPlayer.pause();
    } else {
      //müzik duruyorsa oynat
      await TrackPlayer.play();
    }
    //isplaying değerini oynatma ve durdurma butonu na basıldığında tam tersi değerine çevir
    setIsPlaying(!isPlaying);
  };

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CABABILITY_STOP,
          TrackPlayer.CABABILITY_SKIP_TO_NEXT,
          TrackPlayer.CABABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CABABILITY_SEEK_TO,
        ],
      });
    } catch (error) {
      console.log('Error setting up player: ', error);
    }
  };

  // müziği 10 sn geri al
  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };
  // müziği 10 sn ileri al
  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  };
  useEffect(() => {
    setupPlayer();
  }, []);
  useEffect(() => {
    if (!modalVisable) {
      onStop(); // Modal kapatıldığında seçili track'i temizle
    }
  }, [modalVisable]);

  return (
    <Modal
      isVisible={modalVisable}
      onBackdropPress={() => setModalVisible(false)}
      swipeDirection="down"
      onSwipeComplete={() => setModalVisible(false)}
      style={{margin: 0}}>
      <View
        style={{
          backgroundColor: '#1aa55e',
          width: '100%',
          height: '100%',
          paddingTop: 80,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <AntDesign name="down" size={26} color="white" />
          </TouchableOpacity>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
            songs
          </Text>
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>
        <View style={{padding: 10, marginTop: 20}}>
          <Image
            source={{uri: selectedTrack?.images.coverart}}
            style={{
              width: '100%',
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View style={{padding: 5}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: 'black',
                paddingBottom: 5,
              }}>
              {' '}
              {selectedTrack?.title}{' '}
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              {' '}
              {selectedTrack?.subtitle}{' '}
            </Text>
          </View>
          <AntDesign
            name="heart"
            size={28}
            color="white"
            style={{padding: 15}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <View
            style={{
              width: '100%',
              marginTop: 10,
              height: 3,
              backgroundColor: 'black',
              borderRadius: 5,
            }}>
            <View
              style={[
                styles.progressbar,
                {width: `${(progress.position / progress.duration) * 100}%`},
              ]}
            />
            <View
              style={{
                position: 'absolute',
                top: -5,
                width: 10,
                height: 10,
                backgroundColor: 'white',
                borderRadius: 5,
                left: `${(progress.position / progress.duration) * 100}%`,
              }}></View>

            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 15}}>
                {' '}
                {formatTime(progress.position)}{' '}
              </Text>
              <Text style={{color: 'white', fontSize: 15}}>
                {' '}
                {formatTime(progress.duration)}{' '}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 18,
                alignItems: 'center',
              }}>
              <Pressable onPress={seekBackward}>
                <Entypo
                  name="controller-fast-backward"
                  size={30}
                  color="white"
                />
              </Pressable>

              <Pressable>
                <Ionicons name="play-skip-back" size={30} color="white" />
              </Pressable>

              <Pressable onPress={togglePlayback}>
                {isPlaying ? (
                  <AntDesign
                    name="pausecircle"
                    size={26}
                    color="black"
                    style={{zIndex: 10}}
                  />
                ) : (
                  <Entypo name="controller-play" size={26} color="white" />
                )}
              </Pressable>

              <Pressable>
                <Ionicons name="play-skip-forward" size={30} color="white" />
              </Pressable>

              <Pressable onPress={seekForward}>
                <Entypo
                  name="controller-fast-forward"
                  size={30}
                  color="white"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalComponent;

const styles = StyleSheet.create({
  progressbar: {
    height: '100%',
    backgroundColor: 'white',
  },
});
