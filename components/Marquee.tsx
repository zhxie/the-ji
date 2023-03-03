import { StyleProp, TextStyle } from "react-native";
import TextTicker from "react-native-text-ticker";
import { TextStyles } from "./Styles";

interface MarqueeProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const Marquee = (props: MarqueeProps) => {
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
