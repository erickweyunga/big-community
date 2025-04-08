import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const SettingsLayout = () => {
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

    const cardPresentationOptions = {
        presentation: "card",
        headerBackTitleVisible: false,
    };

    return (
        <SafeAreaProvider style={defaultStyles.safeArea}>
            <Stack screenOptions={commonScreenOptions}>
                {/* Main settings screen */}
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Settings",
                        headerLargeTitle: true,
                        headerSearchBarOptions: {
                            placeholder: "Search settings...",
                            headerIconColor: Colors.primary,
                            tintColor: Colors.primary,
                            hintTextColor: Colors.gray,
                        }
                    }}
                />

                {/* <Stack.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        ...cardPresentationOptions,
                    }}
                />

                <Stack.Screen
                    name="privacy"
                    options={{
                        title: "Privacy",
                        ...cardPresentationOptions,
                    }}
                />

                <Stack.Screen
                    name="security"
                    options={{
                        title: "Security",
                        ...cardPresentationOptions,
                    }}
                />

                <Stack.Screen
                    name="data"
                    options={{
                        title: "Data & Storage",
                        ...cardPresentationOptions,
                    }}
                />

                <Stack.Screen
                    name="notifications"
                    options={{
                        title: "Notifications",
                        ...cardPresentationOptions,
                    }}
                />

                <Stack.Screen
                    name="appearance"
                    options={{
                        title: "Appearance",
                        ...cardPresentationOptions,
                    }}
                />

                <Stack.Screen
                    name="language"
                    options={{
                        title: "Language",
                        ...cardPresentationOptions,
                    }}
                />

                <Stack.Screen
                    name="help"
                    options={{
                        title: "Help & Support",
                        ...cardPresentationOptions,
                    }}
                />

                <Stack.Screen
                    name="about"
                    options={{
                        title: "About",
                        ...cardPresentationOptions,
                    }}
                /> */}
            </Stack>
        </SafeAreaProvider>
    );
};

export default SettingsLayout;