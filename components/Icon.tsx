import { Feather } from "@expo/vector-icons";
import { StyleProp, ViewStyle } from "react-native";

interface IconProps {
  name: string;
  size: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}

const Icon = (props: IconProps) => {
  return (
    <Feather name={props.name as any} size={props.size} color={props.color} style={props.style} />
  );
};

export default Icon;
