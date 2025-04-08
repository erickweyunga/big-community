import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { FontAwesome, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const { width } = Dimensions.get('window');

interface TabBarProps {
    state: {
        index: number;
        routes: Array<{
            key: string;
            name: string;
        }>;
    };
}

const CustomTabBar = ({ state }: TabBarProps) => {
    const router = useRouter();
    const slideAnim = useRef(new Animated.Value(0)).current;

    const tabs = [
        {
            name: 'updates',
            title: 'Updates',
            icon: (color: string, size: number) => <MaterialIcons name="update" size={size} color={color} />
        },
        {
            name: 'space',
            title: 'Spaces',
            icon: (color: string, size: number) => <FontAwesome6 name="microphone-lines" size={size} color={color} />
        },
        {
            name: 'chats',
            title: 'Chats',
            icon: (color: string, size: number) => <Ionicons name="chatbubbles-outline" size={size} color={color} />
        },
        {
            name: 'communities',
            title: 'Communities',
            icon: (color: string, size: number) => <MaterialIcons name="people-outline" size={size} color={color} />
        },
        {
            name: 'settings',
            title: 'Settings',
            icon: (color: string, size: number) => <Ionicons name="cog-outline" size={size} color={color} />
        },
    ];

    return (
        <View style={styles.container}>

            {/* Tab buttons */}
            {tabs.map((tab, index) => {
                const isActive = state.index === index;
                const color = isActive ? Colors.primary : 'gray';

                return (
                    <TouchableOpacity
                        key={tab.name}
                        style={styles.tab}
                        onPress={() => router.replace(`/(tabs)/${tab.name}` as any)}
                        activeOpacity={0.7}
                    >
                        {tab.icon(color, 24)}
                        <Animated.Text
                            style={[
                                styles.label,
                                {
                                    color,
                                    opacity: isActive ? 1 : 0.7,
                                    fontWeight: isActive ? '600' : '400'
                                }
                            ]}
                        >
                            {tab.title}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: Colors.backgroundLight,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
        position: 'relative'
    },
    slider: {
        position: 'absolute',
        top: 0,
        height: 3,
        backgroundColor: Colors.primary,
        borderRadius: 2
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8
    },
    label: {
        fontSize: 12,
        marginTop: 4
    }
});

export default CustomTabBar;