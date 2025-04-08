import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface EmptyTabContentProps {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    title: string;
    message: string;
    iconSize?: number;
}

export const EmptyTabContent: React.FC<EmptyTabContentProps> = ({
    icon,
    title,
    message,
    iconSize = 50
}) => {
    return (
        <View style={styles.emptyTabContainer}>
            <Ionicons name={icon} size={iconSize} color="#ccc" />
            <Text style={styles.emptyTabTitle}>{title}</Text>
            <Text style={styles.emptyTabText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyTabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    emptyTabTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyTabText: {
        fontSize: 14,
        color: Colors.gray,
        textAlign: 'center',
    },
});