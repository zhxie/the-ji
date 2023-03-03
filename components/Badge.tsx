import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Center } from "./Stack";
import { ViewStyles } from "./Styles";
import Text from "./Text";

interface BadgeProps {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

const Badge = (props: BadgeProps) => {
  return (
    <Center
      style={[
        ViewStyles.p2,
        ViewStyles.r2,
        {
          backgroundColor: "#0000007f",
        },
        props.style,
      ]}
    >
      <Text bold style={props.textStyle}>
        {props.title}
      </Text>
    </Center>
  );
};

export default Badge;
