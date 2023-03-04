import { Stack } from "expo-router";
import { Color } from "../components";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "The JI",
          headerShown: false,
          contentStyle: {
            backgroundColor: Color.background,
          },
        }}
      />
      <Stack.Screen
        name="film"
        options={{
          title: "The JI",
          headerShown: false,
          contentStyle: {
            backgroundColor: Color.background,
          },
        }}
      />
    </Stack>
  );
}
