import Colors from "@/constants/Colors"
import { defaultStyles } from "@/constants/Styles"
import { Ionicons } from "@expo/vector-icons"
import { Stack } from "expo-router"
import { GestureResponderEvent, Platform, TouchableOpacity } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

const Layout = () => {
    // Common screen options
    const commonScreenOptions = {
        headerStyle: {
            backgroundColor: Colors.backgroundLight,
        },
        headerShadowVisible: false,
        headerTintColor: Colors.primary,
        contentStyle: {
            backgroundColor: Colors.backgroundLight,
        },
        animation: Platform.OS === "ios" ? "default" : "fade_from_bottom",
    };

    return (
        <SafeAreaProvider style={defaultStyles.safeArea}>
            <Stack screenOptions={commonScreenOptions}>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "BigCommunity",
                        headerLargeTitle: true,
                        headerBlurEffect: "regular",
                        headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: "600",
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                style={defaultStyles.p2}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="person-outline" size={24} color={Colors.primary} />
                            </TouchableOpacity>
                        )
                    }}
                />

                <Stack.Screen
                    name="chat"
                    options={{
                        title: "Chat",
                        presentation: "card",
                        headerBackTitleVisible: false,
                        headerLeft: (props: { onPress: ((event: GestureResponderEvent) => void) | undefined }) => (
                            <TouchableOpacity
                                style={defaultStyles.p2}
                                activeOpacity={0.7}
                                onPress={props.onPress}
                            >
                                <Ionicons name="chevron-back" size={24} color={Colors.primary} />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    )
}

export default Layout