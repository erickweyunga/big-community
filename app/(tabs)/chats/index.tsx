import Colors from '@/constants/Colors';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import chats from '../../../assets/data/chats.json';
import { defaultStyles } from '@/constants/Styles';
import ChatRow from '@/components/ChatRow';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    placeholder
}) => {
    return (
        <View style={styles.searchBarContainer}>
            <View style={styles.searchInputWrapper}>
                <Ionicons
                    name="search"
                    size={20}
                    color={Colors.gray}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.gray}
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                />
                {value.length > 0 && (
                    <TouchableOpacity
                        onPress={() => onChangeText('')}
                        style={styles.clearButton}
                    >
                        <Ionicons
                            name="close-circle"
                            size={20}
                            color={Colors.gray}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const Page = () => {
    const [search, setSearch] = useState('');
    const [filteredChats, setFilteredChats] = useState(chats);
    const insets = useSafeAreaInsets();

    const updateSearch = useCallback((text: string): void => {
        setSearch(text);

        if (text) {
            const filtered = chats.filter(
                chat =>
                    chat.from.toLowerCase().includes(text.toLowerCase()) ||
                    chat.msg.toLowerCase().includes(text.toLowerCase()) ||
                    chat.phoneNumber?.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredChats(filtered);
        } else {
            setFilteredChats(chats);
        }
    }, []);

    return (
        <View style={defaultStyles.container}>
            <View style={styles.searchWrapper}>
                <SearchBar
                    value={search}
                    onChangeText={updateSearch}
                    placeholder="Search messages"
                />
            </View>

            <FlatList
                data={filteredChats}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => (
                    <View style={defaultStyles.separator} />
                )}
                renderItem={({ item }) => (
                    <ChatRow {...item} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    defaultStyles.contentContainer,
                    { paddingBottom: Math.max(insets.bottom, 16) }
                ]}
                style={defaultStyles.flex1}
                initialNumToRender={10}
                removeClippedSubviews={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchWrapper: {
        zIndex: 1,
        backgroundColor: Colors.backgroundLight,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.divider,
    },
    searchBarContainer: {
        width: '100%',
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#000',
    },
    clearButton: {
        padding: 4,
    }
});

export default Page;