import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { SafeAreaView, Platform, View } from "react-native";
import CustomTabBar from "@/components/BottomBar";

const Layout = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundLight }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Tabs
                    screenOptions={{
                        // Content area styling
                        headerStyle: {
                            backgroundColor: Colors.backgroundLight,
                        },
                        headerShadowVisible: false,
                        headerShown: true,

                        // Tab bar styling (hidden because we're using a custom one)
                        tabBarStyle: {
                            display: 'none' // Hide the default tab bar
                        },

                        // Transition animations for screen content
                        animation: Platform.OS === 'ios' ? 'default' : 'fade',
                        ...Platform.select({
                            ios: {
                                presentation: 'card',
                            },
                            android: {
                                presentation: 'transparentModal',
                            },
                        }),
                    }}
                    // Use our custom tab bar component
                    tabBar={(props) => <CustomTabBar {...props} />}
                >
                    <Tabs.Screen
                        name="updates"
                        options={{
                            title: "Updates",
                        }}
                    />
                    <Tabs.Screen
                        name="space"
                        options={{
                            title: "Spaces",
                        }}
                    />
                    <Tabs.Screen
                        name="chats"
                        options={{
                            title: "Chats",
                            headerShown: false,
                        }}
                    />
                    <Tabs.Screen
                        name="communities"
                        options={{
                            title: "Communities",
                        }}
                    />
                    <Tabs.Screen
                        name="settings"
                        options={{
                            title: "Settings",
                            headerShown: false,
                        }}
                    />
                </Tabs>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};

export default Layout;