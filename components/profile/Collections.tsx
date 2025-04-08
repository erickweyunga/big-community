import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Colors from '@/constants/Colors';

interface Collection {
    id: string;
    title: string;
    count: number;
    coverUrl: string;
}

interface CollectionsProps {
    collections: Collection[];
    onCollectionPress: (collectionId: string) => void;
    onSeeAllPress: () => void;
}

export const Collections: React.FC<CollectionsProps> = ({
    collections,
    onCollectionPress,
    onSeeAllPress
}) => {
    const renderCollection = ({ item }: { item: Collection }) => (
        <TouchableOpacity
            style={styles.collectionItem}
            onPress={() => onCollectionPress(item.id)}
        >
            <Image source={{ uri: item.coverUrl }} style={styles.collectionCover} />
            <View style={styles.collectionOverlay}>
                <Text style={styles.collectionTitle}>{item.title}</Text>
                <Text style={styles.collectionCount}>{item.count} items</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.collectionsContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>All Collections</Text>
                <TouchableOpacity onPress={onSeeAllPress}>
                    <Text style={styles.sectionAction}>See All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={collections}
                renderItem={renderCollection}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.collectionsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    collectionsContainer: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    sectionAction: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: '500',
    },
    collectionsList: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    collectionItem: {
        width: 160,
        height: 200,
        marginRight: 12,
        borderRadius: 8,
        overflow: 'hidden',
    },
    collectionCover: {
        width: '100%',
        height: '100%',
    },
    collectionOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
    },
    collectionTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    collectionCount: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 2,
    },
});