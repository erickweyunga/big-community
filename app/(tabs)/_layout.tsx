import React from 'react';
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Colors from "@/constants/Colors";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";

// Define icon props type
type IconProps = {
    color: string;
    size: number;
};

const Layout: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundLight }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Tabs
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: Colors.backgroundLight,
                        },
                        headerShadowVisible: false,
                        headerShown: true,
                        tabBarActiveTintColor: Colors.primary,
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: {
                            backgroundColor: Colors.backgroundLight,
                            borderTopWidth: 1,
                            borderTopColor: 'rgba(0,0,0,0.1)',
                            height: 60,
                        },
                        tabBarLabelStyle: {
                            fontSize: 12,
                            marginTop: 4,
                            marginBottom: 4,
                        },
                    }}
                >
                    <Tabs.Screen
                        name="chats"
                        options={{
                            title: "Chats",
                            headerShown: false,
                            tabBarIcon: ({ color, size }: IconProps) => (
                                <Ionicons name="chatbubbles-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="communities"
                        options={{
                            title: "Communities",
                            tabBarIcon: ({ color, size }: IconProps) => (
                                <MaterialIcons name="people-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="space"
                        options={{
                            title: "Spaces",
                            tabBarIcon: ({ color, size }: IconProps) => (
                                <FontAwesome6 name="microphone-lines" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="settings"
                        options={{
                            title: "Settings",
                            headerShown: false,
                            tabBarIcon: ({ color, size }: IconProps) => (
                                <Ionicons name="cog-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="updates"
                        options={{
                            title: "Updates",
                            tabBarIcon: ({ color, size }: IconProps) => (
                                <MaterialIcons name="update" size={size} color={color} />
                            ),
                        }}
                    />
                </Tabs>
            </GestureHandlerRootView>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.backgroundLight}
                translucent={false}
                animated={true}
            />
        </SafeAreaView>
    );
};

export default Layout;