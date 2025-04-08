import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Colors from '@/constants/Colors';

interface Story {
    id: string;
    title: string;
    imageUrl: string;
}

interface StoryHighlightsProps {
    stories: Story[];
    onStoryPress: (storyId: string) => void;
}

export const StoryHighlights: React.FC<StoryHighlightsProps> = ({ stories, onStoryPress }) => {
    const renderStoryHighlight = ({ item }: { item: Story }) => (
        <TouchableOpacity
            style={styles.storyHighlight}
            onPress={() => onStoryPress(item.id)}
        >
            <View style={styles.storyImageContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.storyImage} />
            </View>
            <Text style={styles.storyTitle} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.highlightsSection}>
            <FlatList
                data={stories}
                renderItem={renderStoryHighlight}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.highlightsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    highlightsSection: {
        marginBottom: 12,
    },
    highlightsList: {
        paddingHorizontal: 16,
    },
    storyHighlight: {
        alignItems: 'center',
        marginRight: 16,
        width: 72,
    },
    storyImageContainer: {
        width: 62,
        height: 62,
        borderRadius: 31,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    storyImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    storyTitle: {
        fontSize: 12,
        color: Colors.gray,
        textAlign: 'center',
    },
});