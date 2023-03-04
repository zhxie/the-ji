import { MasonryFlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Poster, ViewStyles } from "../components";
import { Film } from "../models/types";
import { fetchFilmList } from "../utils/api";

const Page = () => {
  const [ready, setReady] = useState(false);
  const [films, setFilms] = useState<Film[]>();

  useEffect(() => {
    (async () => {
      const list = await fetchFilmList();
      if (list) {
        setFilms(list.films.sort((a, b) => b.last_review_date.localeCompare(a.last_review_date)));
        setReady(true);
      }
    })();
  }, []);
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
        {films && (
          <Animated.View style={[ViewStyles.f, { opacity: fade }]}>
            <MasonryFlashList
              data={films}
              numColumns={Math.ceil(Dimensions.get("window").width / 200)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Link href={{ pathname: "film", params: { id: item.id } }} asChild>
                  <TouchableOpacity>
                    <Poster uri={item.thumbnail} rating={item.rating} style={ViewStyles.p2} />
                  </TouchableOpacity>
                </Link>
              )}
              ListHeaderComponent={<SafeAreaView edges={["top", "left", "right"]} />}
              ListFooterComponent={<SafeAreaView edges={["bottom", "left", "right"]} />}
              estimatedItemSize={50}
            />
          </Animated.View>
        )}
      </View>
    </SafeAreaProvider>
  );
};

export default Page;
