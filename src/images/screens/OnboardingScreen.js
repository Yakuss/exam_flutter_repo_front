
/* hethi */
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Dimensions, Image, Text, View, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get('window');
const COLORS = { primary: '#282534', white: '#fff' };

const slides = [
  {
    id: '1',
    image: require('../../images/image1.png'),
    title: 'PDF reader',
    subtitle: 'Welcome to MY BOOK, your go-to PDF reader for a seamless reading experience. Dive into the world of digital documents with ease'
  },
  {
    id: '2',
    image: require('../../images/image2.png'),
    title: 'Biometric authentication',
    subtitle: 'Your privacy matters. Enjoy secure document handling with password protection and encryption. Your PDFs are in safe hands'
  },
  {
    id: '3',
    image: require('../../images/image3.png'),
    title: 'Add Your Customized Books',
    subtitle: 'Craft your perfect reading list with our PDF Reader, where customization meets convenience.'
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image source={item.image} style={{ height: '73%', width, resizeMode: 'contain' }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset?.x || 0;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View style={{ height: height * 0.25, justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex === slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity style={[styles.btn]} onPress={() => navigation.navigate('AuthOption')}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.btn, { backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.white,height:60 }]} onPress={skip}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: COLORS.white }}>SKIP</Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity style={[styles.btn,{height:60}]} onPress={goNextSlide}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>NEXT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>

      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width: width }}>
            <Slide item={item} />
          </View>
        )}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
    maxWidth: '80%',
    textAlign: 'center',
    lineHeight: 23,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 15,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OnboardingScreen;
