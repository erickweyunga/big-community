import Colors from '@/constants/Colors';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import chats from '../../../assets/data/chats.json';
import { defaultStyles } from '@/constants/Styles';
import ChatRow from '@/components/ChatRow';

const Page = () => {
    const [search, setSearch] = useState('');
    const [filteredChats, setFilteredChats] = useState(chats);

    const updateSearch = useCallback((text: string): void => {
        setSearch(text);

        // Filter the chats based on search text
        if (text) {
            const filtered = chats.filter(
                chat =>
                    chat.from.toLowerCase().includes(text.toLowerCase()) ||
                    chat.msg.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredChats(filtered);
        } else {
            setFilteredChats(chats);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.searchWrapper}>
                <SearchBar
                    platform="default"
                    containerStyle={styles.searchContainer}
                    inputContainerStyle={styles.searchInputContainer}
                    leftIconContainerStyle={styles.searchIconContainer}
                    rightIconContainerStyle={styles.searchIconContainer}
                    searchIcon={{ name: 'search', color: Colors.primary }}
                    clearIcon={{ name: 'clear', color: Colors.primary }}
                    inputStyle={styles.searchInput}
                    placeholderTextColor={Colors.gray}
                    placeholder="Search messages"
                    onChangeText={updateSearch}
                    value={search}
                    cancelButtonProps={{ color: Colors.primary }}
                    round
                />
            </View>

            <FlatList
                data={filteredChats}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={[defaultStyles.separator, styles.separator]} />}
                renderItem={({ item }) => (
                    <ChatRow {...item} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                style={styles.flatList}
                initialNumToRender={10}
                removeClippedSubviews={true}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    searchWrapper: {
        zIndex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    searchContainer: {
        backgroundColor: Colors.backgroundLight,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 5,
    },
    searchInputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40,
    },
    searchIconContainer: {
        backgroundColor: 'white',
    },
    searchInput: {
        color: '#000',
        fontSize: 16,
    },
    separator: {
        marginLeft: 74,
    },
    listContent: {
        paddingBottom: 20,
    },
    flatList: {
        flex: 1,
    }
});

export default Page;