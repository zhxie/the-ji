import { StyleSheet } from "react-native";

const Color = {
  background: "black",
  mask: "#0000007f",
  text: "white",
  subtle: "#ffffff7f",
};

const TextStyles = StyleSheet.create({
  main: {
    color: Color.text,
  },
  subtle: {
    color: "gray",
  },
  p: {
    fontSize: 14,
    fontWeight: "normal",
    color: Color.text,
  },
  b: {
    fontWeight: "bold",
  },
  u: {
    textDecorationLine: "underline",
  },
  c: {
    textAlign: "center",
  },
  h1: {
    fontSize: 36,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 24,
  },
  rating: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dimension: {
    fontSize: 20,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footnote: {
    fontSize: 16,
  },
});

const ViewStyles = StyleSheet.create({
  bg: {
    backgroundColor: Color.background,
  },
  mask: {
    backgroundColor: Color.mask,
  },
  f: {
    flex: 1,
  },
  h: {
    flexDirection: "row",
  },
  v: {
    flexDirection: "column",
  },
  c: {
    alignItems: "center",
    justifyContent: "center",
  },
  j: {
    justifyContent: "space-between",
  },
  s1: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
  },
  s2: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  mr1: {
    marginRight: 4,
  },
  mr2: {
    marginRight: 8,
  },
  mr4: {
    marginRight: 16,
  },
  mb1: {
    marginBottom: 4,
  },
  mb2: {
    marginBottom: 8,
  },
  mb4: {
    marginBottom: 16,
  },
  p1: {
    padding: 4,
  },
  p2: {
    padding: 8,
  },
  p4: {
    padding: 16,
  },
  px1: {
    paddingHorizontal: 4,
  },
  px2: {
    paddingHorizontal: 8,
  },
  px4: {
    paddingHorizontal: 16,
  },
  py1: {
    paddingVertical: 4,
  },
  py2: {
    paddingVertical: 8,
  },
  py4: {
    paddingVertical: 16,
  },
  r1: {
    borderRadius: 4,
  },
  r2: {
    borderRadius: 8,
  },
});

export { Color, TextStyles, ViewStyles };
