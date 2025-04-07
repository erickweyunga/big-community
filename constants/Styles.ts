import { StyleSheet, Platform, Dimensions } from "react-native";
import Colors from "./Colors";

const { width, height } = Dimensions.get("window");

export const defaultStyles = StyleSheet.create({
  // Container and screen styles
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight || "#f8f8f8",
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundLight || "#f8f8f8",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Block components
  block: {
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.background || "#fff",
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },

  // Item components
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  itemActive: {
    backgroundColor: Colors.lightGray + "20", // 20% opacity
  },

  // Dividers and separators
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightGray,
    marginLeft: 50,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightGray,
    marginVertical: 8,
  },
  fullWidthSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightGray,
    width: "100%",
  },

  // Text styles
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginHorizontal: 16,
    marginVertical: 8,
    color: Colors.gray,
  },
  body: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    color: Colors.gray,
  },
  error: {
    fontSize: 13,
    color: Colors.error || "#ff3b30",
  },
  success: {
    fontSize: 13,
    color: Colors.success || "#34c759",
  },

  // Input styles
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  inputError: {
    borderColor: Colors.error || "#ff3b30",
  },

  // Search styles
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40,
  },

  // Button styles
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutlineText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonSmall: {
    padding: 10,
    borderRadius: 8,
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  buttonDisabled: {
    backgroundColor: Colors.gray + "80", // 50% opacity
  },

  // Card styles
  card: {
    backgroundColor: Colors.background || "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardFooter: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Avatar and image styles
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  // Icon styles
  icon: {
    width: 24,
    height: 24,
  },
  iconSmall: {
    width: 18,
    height: 18,
  },
  iconLarge: {
    width: 32,
    height: 32,
  },

  // Badge styles
  badge: {
    backgroundColor: Colors.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Spacing - all directions
  m1: { margin: 4 },
  m2: { margin: 8 },
  m3: { margin: 12 },
  m4: { margin: 16 },
  m5: { margin: 24 },

  // Spacing - vertical
  mt1: { marginTop: 4 },
  mt2: { marginTop: 8 },
  mt3: { marginTop: 12 },
  mt4: { marginTop: 16 },
  mt5: { marginTop: 24 },
  mb1: { marginBottom: 4 },
  mb2: { marginBottom: 8 },
  mb3: { marginBottom: 12 },
  mb4: { marginBottom: 16 },
  mb5: { marginBottom: 24 },
  my1: { marginVertical: 4 },
  my2: { marginVertical: 8 },
  my3: { marginVertical: 12 },
  my4: { marginVertical: 16 },
  my5: { marginVertical: 24 },

  // Spacing - horizontal
  ml1: { marginLeft: 4 },
  ml2: { marginLeft: 8 },
  ml3: { marginLeft: 12 },
  ml4: { marginLeft: 16 },
  ml5: { marginLeft: 24 },
  mr1: { marginRight: 4 },
  mr2: { marginRight: 8 },
  mr3: { marginRight: 12 },
  mr4: { marginRight: 16 },
  mr5: { marginRight: 24 },
  mx1: { marginHorizontal: 4 },
  mx2: { marginHorizontal: 8 },
  mx3: { marginHorizontal: 12 },
  mx4: { marginHorizontal: 16 },
  mx5: { marginHorizontal: 24 },

  // Padding - all directions
  p1: { padding: 4 },
  p2: { padding: 8 },
  p3: { padding: 12 },
  p4: { padding: 16 },
  p5: { padding: 24 },

  // Padding - vertical and horizontal
  py1: { paddingVertical: 4 },
  py2: { paddingVertical: 8 },
  py3: { paddingVertical: 12 },
  py4: { paddingVertical: 16 },
  py5: { paddingVertical: 24 },
  px1: { paddingHorizontal: 4 },
  px2: { paddingHorizontal: 8 },
  px3: { paddingHorizontal: 12 },
  px4: { paddingHorizontal: 16 },
  px5: { paddingHorizontal: 24 },

  // Padding - specific directions
  pt1: { paddingTop: 4 },
  pt2: { paddingTop: 8 },
  pt3: { paddingTop: 12 },
  pt4: { paddingTop: 16 },
  pt5: { paddingTop: 24 },
  pb1: { paddingBottom: 4 },
  pb2: { paddingBottom: 8 },
  pb3: { paddingBottom: 12 },
  pb4: { paddingBottom: 16 },
  pb5: { paddingBottom: 24 },
  pl1: { paddingLeft: 4 },
  pl2: { paddingLeft: 8 },
  pl3: { paddingLeft: 12 },
  pl4: { paddingLeft: 16 },
  pl5: { paddingLeft: 24 },
  pr1: { paddingRight: 4 },
  pr2: { paddingRight: 8 },
  pr3: { paddingRight: 12 },
  pr4: { paddingRight: 16 },
  pr5: { paddingRight: 24 },

  // Layout helpers
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowAround: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  rowEvenly: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  wrap: {
    flexWrap: "wrap",
  },
  flex1: {
    flex: 1,
  },

  // Form elements
  formGroup: {
    marginBottom: 16,
  },
  errorText: {
    color: Colors.error || "#ff3b30",
    fontSize: 13,
    marginTop: 4,
  },

  // Swipeable row styles
  swipeableContainer: {
    width: "100%",
  },
  swipeableContent: {
    width: "100%",
    backgroundColor: Colors.background || "#fff",
  },
  swipeableActions: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
  },
  swipeableAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
  },
  swipeableActionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  // List styles
  listItemContainer: {
    backgroundColor: Colors.background || "#fff",
  },
  listItemContent: {
    flex: 1,
    marginLeft: 12,
  },

  // Screen specific styles
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGray,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  // Tab/navigation styles
  tabBar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.background || "#fff",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
});