import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

type TabType = 'posts' | 'reels' | 'tagged' | 'saved';

interface ProfileTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <View style={styles.tabsContainer}>
            <TouchableOpacity
                style={[styles.tabButton, activeTab === 'posts' && styles.activeTabButton]}
                onPress={() => onTabChange('posts')}
            >
                <Ionicons
                    name="grid-outline"
                    size={22}
                    color={activeTab === 'posts' ? Colors.primary : Colors.gray}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tabButton, activeTab === 'reels' && styles.activeTabButton]}
                onPress={() => onTabChange('reels')}
            >
                <MaterialCommunityIcons
                    name="play-box-outline"
                    size={22}
                    color={activeTab === 'reels' ? Colors.primary : Colors.gray}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tabButton, activeTab === 'tagged' && styles.activeTabButton]}
                onPress={() => onTabChange('tagged')}
            >
                <Ionicons
                    name="pricetag-outline"
                    size={22}
                    color={activeTab === 'tagged' ? Colors.primary : Colors.gray}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tabButton, activeTab === 'saved' && styles.activeTabButton]}
                onPress={() => onTabChange('saved')}
            >
                <Ionicons
                    name="bookmark-outline"
                    size={22}
                    color={activeTab === 'saved' ? Colors.primary : Colors.gray}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    activeTabButton: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.text,
    },
});