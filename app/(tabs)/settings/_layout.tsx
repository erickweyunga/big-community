import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const SettingsLayout = () => {
    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.backgroundLight,
                    },
                    headerShadowVisible: false,
                    contentStyle: {
                        backgroundColor: Colors.backgroundLight,
                    },
                    animation: Platform.OS === "ios" ? "default" : "fade_from_bottom",
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Settings",
                        headerLargeTitle: true,
                    }}
                />

                <Stack.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        presentation: "card",
                    }}
                />

                <Stack.Screen
                    name="privacy"
                    options={{
                        title: "Privacy",
                        presentation: "card",
                    }}
                />

                <Stack.Screen
                    name="security"
                    options={{
                        title: "Security",
                        presentation: "card",
                    }}
                />

                <Stack.Screen
                    name="notifications"
                    options={{
                        title: "Notifications",
                        presentation: "card",
                    }}
                />

                <Stack.Screen
                    name="appearance"
                    options={{
                        title: "Appearance",
                        presentation: "card",
                    }}
                />

                <Stack.Screen
                    name="help"
                    options={{
                        title: "Help & Support",
                        presentation: "card",
                    }}
                />

                <Stack.Screen
                    name="about"
                    options={{
                        title: "About",
                        presentation: "card",
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    );
};

export default SettingsLayout;