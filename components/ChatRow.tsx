import { View, Text, TouchableHighlight, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { format } from 'date-fns'
import SwipeableRow from './SwiperableRow'

interface ChatRowProps {
    id: string
    from: string
    date: string
    img: string
    msg: string
    read: boolean
    unreadCount: number
}

const ChatRow = ({ id, from, date, img, msg, read, unreadCount }: ChatRowProps) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/`);
    };

    return (
        <SwipeableRow
            onDelete={() => console.log('Delete chat', id)}
            onArchive={() => console.log('Archive chat', id)}
        >
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={Colors.lightGray}
                onPress={handlePress}
            >
                <View style={styles.container}>
                    <Image
                        source={{ uri: img }}
                        style={styles.avatar}
                    />
                    <View style={styles.contentContainer}>
                        <View style={styles.topRow}>
                            <Text style={styles.name}>{from}</Text>
                            <Text style={styles.date}>
                                {format(new Date(date), 'MM/dd/yy')}
                            </Text>
                        </View>
                        <View style={styles.bottomRow}>
                            <Text
                                style={[
                                    styles.message,
                                    !read && styles.unreadMessage
                                ]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {msg}
                            </Text>
                            {unreadCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </SwipeableRow>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: Colors.gray,
    },
    message: {
        fontSize: 14,
        color: Colors.gray,
        flex: 1,
        marginRight: 8,
    },
    unreadMessage: {
        fontWeight: '500',
        color: '#000',
    },
    badge: {
        backgroundColor: Colors.primary,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    }
});

export default ChatRow