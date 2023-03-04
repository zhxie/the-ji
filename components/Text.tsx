import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { TextStyles } from "./Styles";

interface TextProps extends RNTextProps {
  subtle?: boolean;
  bold?: boolean;
  underline?: boolean;
  center?: boolean;
}

const Text = (props: TextProps) => {
  const { center, style, ...rest } = props;

  return (
    <RNText
      style={[
        TextStyles.p,
        props.subtle ? TextStyles.subtle : TextStyles.main,
        props.bold && TextStyles.b,
        props.underline && TextStyles.u,
        center && TextStyles.c,
        style,
      ]}
      {...rest}
    />
  );
};

export default Text;
