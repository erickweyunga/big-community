import { Tabs } from "expo-router";
import { FontAwesome, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";

const Layout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: Colors.backgroundLight,
                    },
                    tabBarActiveTintColor: Colors.primary,
                    tabBarActiveBackgroundColor: Colors.backgroundLight,
                    tabBarInactiveBackgroundColor: Colors.backgroundLight,
                    headerStyle: {
                        backgroundColor: Colors.backgroundLight,
                    },
                    headerShadowVisible: false,
                }}
            >
                <Tabs.Screen name="updates" options={{
                    title: "Updates",
                    tabBarIcon: ({ size, color }: { size: number; color: string; }) => (
                        <MaterialIcons name="update" size={size} color={color} />
                    ),
                }} />
                <Tabs.Screen name="space" options={{
                    title: "Spaces",
                    tabBarIcon: ({ size, color }: { size: number; color: string; }) => (
                        <FontAwesome6 name="microphone-lines" size={size} color={color} />
                    ),
                }} />
                <Tabs.Screen name="chats" options={{
                    title: "Chats",
                    headerShown: false,
                    tabBarIcon: ({ size, color }: { size: number; color: string; }) => (
                        <Ionicons name="chatbubbles-outline" size={size} color={color} />
                    ),
                }} />
                <Tabs.Screen name="communities" options={{
                    title: "Communities",
                    tabBarIcon: ({ size, color }: { size: number; color: string; }) => (
                        <MaterialIcons name="people-outline" size={size} color={color} />
                    ),
                }} />
                <Tabs.Screen name="settings" options={{
                    title: "Settings",
                    headerShown: false,
                    tabBarIcon: ({ size, color }: { size: number; color: string; }) => (
                        <Ionicons name="cog-outline" size={size} color={color} />
                    ),
                }} />
            </Tabs>
        </GestureHandlerRootView>
    );
}

export default Layout;