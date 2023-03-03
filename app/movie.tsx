import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, ScrollView, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Badge, HStack, Marquee, TextStyles, VStack, ViewStyles } from "../components";
import { MovieDetail } from "../models/types";
import { fetchMovie } from "../utils/api";

export default function ModalScreen() {
  const { id } = useSearchParams();

  const [ready, setReady] = useState(false);
  const [movie, setMovie] = useState<MovieDetail>();

  useEffect(() => {
    (async () => {
      const movie = await fetchMovie(parseInt(id));
      if (movie) {
        setMovie(movie);
        setReady(true);
      }
    })();
  }, [id]);
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (ready) {
      Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [ready]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={[ViewStyles.bg, ViewStyles.f]}>
        {movie && (
          <Animated.View style={[ViewStyles.f, { opacity: fade }]}>
            <Image source={{ uri: movie.image }} transition={300} style={ViewStyles.f} />
            <BlurView
              intensity={100}
              tint="dark"
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <ScrollView contentInsetAdjustmentBehavior="automatic">
                <SafeAreaView>
                  <VStack style={ViewStyles.p4}>
                    <HStack center justify>
                      <HStack flex style={ViewStyles.mr2}>
                        <Marquee style={TextStyles.title}>{movie.title}</Marquee>
                      </HStack>
                      <Badge title={movie.rating.toFixed(1)} textStyle={TextStyles.rating} />
                    </HStack>
                  </VStack>
                </SafeAreaView>
              </ScrollView>
            </BlurView>
          </Animated.View>
        )}
      </View>
    </SafeAreaProvider>
  );
}
