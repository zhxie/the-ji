import { Image } from "expo-image";
import { StyleProp, View, ViewStyle } from "react-native";
import Badge from "./Badge";
import { ViewStyles } from "./Styles";

interface PosterProps {
  uri: string;
  rating: number;
  style?: StyleProp<ViewStyle>;
}

const Poster = (props: PosterProps) => {
  return (
    <View style={[{ overflow: "hidden" }, props.style]}>
      <Image
        source={{ uri: props.uri }}
        transition={300}
        style={[ViewStyles.r2, { aspectRatio: 2 / 3 }]}
        recyclingKey={props.uri}
      />
      <Badge
        title={props.rating.toFixed(1)}
        style={{ position: "absolute", right: 16, bottom: 16 }}
      />
    </View>
  );
};

export default Poster;
