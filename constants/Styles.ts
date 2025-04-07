import { StyleSheet, Platform } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight || "#f8f8f8",
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundLight || "#f8f8f8",
  },
  
  // Block components
  block: {
    marginVertical: 10,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  
  // Item components
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
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
  
  // Card styles
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
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
  
  // Spacing
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
  mx1: { marginHorizontal: 4 },
  mx2: { marginHorizontal: 8 },
  mx3: { marginHorizontal: 12 },
  mx4: { marginHorizontal: 16 },
  mx5: { marginHorizontal: 24 },
  my1: { marginVertical: 4 },
  my2: { marginVertical: 8 },
  my3: { marginVertical: 12 },
  my4: { marginVertical: 16 },
  my5: { marginVertical: 24 },
  p1: { padding: 4 },
  p2: { padding: 8 },
  p3: { padding: 12 },
  p4: { padding: 16 },
  p5: { padding: 24 },
  
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
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Form elements
  formGroup: {
    marginBottom: 16,
  },
  errorText: {
    color: Colors.error || "#ff3b30",
    fontSize: 13,
    marginTop: 4,
  }
});