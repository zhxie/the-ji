import { Platform, StyleProp, TextStyle } from "react-native";
import TextTicker from "react-native-text-ticker";
import { TextStyles } from "./Styles";
import Text from "./Text";

interface MarqueeProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const Marquee = (props: MarqueeProps) => {
  if (Platform.OS === "web") {
    return (
      <Text numberOfLines={1} style={[TextStyles.p, props.style]}>
        {props.children}
      </Text>
    );
  }

  return (
    <TextTicker
      animationType="scroll"
      repeatSpacer={20}
      easing={(value) => value}
      marqueeDelay={1000}
      style={[TextStyles.p, props.style]}
    >
      {props.children}
    </TextTicker>
  );
};

export default Marquee;
