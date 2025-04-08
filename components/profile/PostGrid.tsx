// PostGrid.tsx
import React, { useCallback } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Post {
    id: string;
    imageUrl: string;
    likes: number;
    comments: number;
}

interface PostGridProps {
    posts: Post[];
    onPostPress: (postId: string) => void;
    spacing?: number;
    numColumns?: number;
}

export const PostGrid: React.FC<PostGridProps> = ({
    posts,
    onPostPress,
    spacing = 2,
    numColumns = 2
}) => {
    const { width } = useWindowDimensions();

    // Calculate post dimensions to ensure they scale properly on different devices
    const POST_WIDTH = (width - (spacing * (numColumns - 1))) / numColumns;

    const renderPostItem = useCallback(({ item, index }: { item: Post, index: number }) => {
        // Calculate margins to create the grid with just white line spacing
        const isLastInRow = (index + 1) % numColumns === 0;

        return (
            <TouchableOpacity
                style={[
                    styles.postItem,
                    {
                        width: POST_WIDTH,
                        height: POST_WIDTH,
                        marginRight: isLastInRow ? 0 : spacing
                    }
                ]}
                onPress={() => onPostPress(item.id)}
            >
                <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
                <View style={styles.postOverlay}>
                    <View style={styles.postStat}>
                        <Ionicons name="heart" size={14} color="white" />
                        <Text style={styles.postStatText}>{item.likes}</Text>
                    </View>
                    <View style={styles.postStat}>
                        <Ionicons name="chatbubble" size={14} color="white" />
                        <Text style={styles.postStatText}>{item.comments}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [POST_WIDTH, numColumns, spacing, onPostPress]);

    return (
        <FlatList
            data={posts}
            renderItem={renderPostItem}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            scrollEnabled={false}
            contentContainerStyle={styles.postsGrid}
        />
    );
};

const styles = StyleSheet.create({
    postsGrid: {
        flexGrow: 1,
        paddingTop: 2,
    },
    postItem: {
        marginBottom: 2,
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
    postOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 6,
        justifyContent: 'space-around',
    },
    postStat: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postStatText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 4,
        fontWeight: '500',
    },
});