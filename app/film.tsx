import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Badge,
  Color,
  HStack,
  Icon,
  Marquee,
  Text,
  TextStyles,
  VStack,
  ViewStyles,
} from "../components";
import { FilmDetail } from "../models/types";
import { fetchFilm } from "../utils/api";

const Dimensions = [
  { name: "First Impression", key: "firstImpression" },
  { name: "Overall Feeling", key: "overallFeeling" },
  { name: "Story", key: "story" },
  { name: "Character", key: "character" },
  { name: "Director", key: "director" },
  { name: "Performance", key: "performance" },
  { name: "Visual", key: "visual" },
  { name: "Art", key: "art" },
  { name: "Editing", key: "editing" },
  { name: "Sound", key: "sound" },
  { name: "Music", key: "music" },
];

export default function ModalScreen() {
  const { id } = useSearchParams();

  const [ready, setReady] = useState(false);
  const [film, setFilm] = useState<FilmDetail>();
  const [review, setReview] = useState(0);

  useEffect(() => {
    (async () => {
      const film = await fetchFilm(parseInt(id));
      if (film) {
        setFilm(film);
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

  const onReviewPress = () => {
    if (review === (film?.reviews.length ?? 0) - 1) {
      setReview(0);
    } else {
      setReview(review + 1);
    }
  };

  const onTmdbPress = () => {
    WebBrowser.openBrowserAsync(`https://www.themoviedb.org/movie/${film?.tmdb ?? 0}`);
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={[ViewStyles.bg, ViewStyles.f]}>
        {film && (
          <Animated.View style={[ViewStyles.f, { opacity: fade }]}>
            <Image source={{ uri: film.image }} transition={300} style={ViewStyles.f} />
            <BlurView
              intensity={100}
              tint="dark"
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <SafeAreaView style={ViewStyles.f}>
                <VStack flex justify style={ViewStyles.p4}>
                  <VStack style={ViewStyles.mb1}>
                    <HStack center justify style={ViewStyles.mb1}>
                      <HStack flex style={ViewStyles.mr2}>
                        <Marquee style={TextStyles.h1}>{film.title}</Marquee>
                      </HStack>
                      <Badge title={film.rating.toFixed(1)} textStyle={TextStyles.rating} />
                    </HStack>
                    <HStack center>
                      <Badge
                        title={film.language.toUpperCase()}
                        style={[ViewStyles.py1, ViewStyles.mr2]}
                      />
                      <HStack flex>
                        <Marquee>
                          <Text style={TextStyles.h2}>
                            {film.original_title}{" "}
                            <Text subtle style={TextStyles.h2}>
                              {!!film.release_date && `(${film.release_date.substring(0, 4)})`}
                            </Text>
                          </Text>
                        </Marquee>
                      </HStack>
                    </HStack>
                  </VStack>
                  <VStack>
                    <HStack justify style={ViewStyles.mb2}>
                      <TouchableOpacity disabled={film.reviews.length <= 1} onPress={onReviewPress}>
                        <Text bold>
                          {film.reviews.length <= 1 ? "REVIEW" : `REVIEW ${review + 1}`}
                        </Text>
                      </TouchableOpacity>
                      <Text bold>{film.reviews[review].review_date}</Text>
                    </HStack>
                    <VStack
                      style={[
                        ViewStyles.px2,
                        ViewStyles.py1,
                        ViewStyles.r2,
                        ViewStyles.mask,
                        !!film.tmdb && ViewStyles.mb2,
                      ]}
                    >
                      {Dimensions.map((dimension, i, dimensions) => (
                        <HStack
                          key={dimension.key}
                          center
                          justify
                          style={[
                            ViewStyles.px1,
                            ViewStyles.py2,
                            i !== dimensions.length - 1 && {
                              borderBottomColor: "#ffffff1f",
                              borderBottomWidth: 1,
                            },
                          ]}
                        >
                          <Text style={TextStyles.dimension}>{dimension.name}</Text>
                          <Text style={TextStyles.score}>
                            {film.reviews[review].scores[dimension.key] || "N/A"}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                    {!!film.tmdb && (
                      <HStack justify>
                        <HStack flex />
                        <TouchableOpacity onPress={onTmdbPress}>
                          <HStack center>
                            <Text bold style={ViewStyles.mr1}>
                              SEE MORE ON TMDB
                            </Text>
                            <Icon name="arrow-right" size={14} color={Color.text} />
                          </HStack>
                        </TouchableOpacity>
                      </HStack>
                    )}
                  </VStack>
                </VStack>
              </SafeAreaView>
            </BlurView>
          </Animated.View>
        )}
      </View>
    </SafeAreaProvider>
  );
}
