import { View, Text, TouchableHighlight, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { format } from 'date-fns'
import { defaultStyles } from '@/constants/Styles'
import SwipeableRow from './SwiperableRow'

interface ChatRowProps {
    id: string
    from: string
    date: string
    img: string
    msg: string
    read: boolean
    unreadCount: number,
    phoneNumber?: string
}

const ChatRow = ({ id, from, date, img, msg, read, unreadCount, phoneNumber }: ChatRowProps) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/chat/${id}`);
    };

    const handleProfilePress = () => {
        router.push(`/(modals)/profile?user_name=${from}&phone_number=${phoneNumber}`);
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
                <View style={[defaultStyles.item, styles.container]}>
                    <TouchableOpacity
                        style={styles.avatarContainer}
                        activeOpacity={0.7}
                        onPress={handleProfilePress}
                        accessibilityLabel={`View ${from}'s profile`}
                        accessibilityRole="button"
                    >
                        <Image
                            source={{ uri: img }}
                            style={defaultStyles.avatar}
                        />
                    </TouchableOpacity>
                    <View style={styles.contentContainer}>
                        <View style={defaultStyles.rowBetween}>
                            <Text style={defaultStyles.subtitle}>{from}</Text>
                            <Text style={[defaultStyles.caption, styles.date]}>
                                {format(new Date(date), 'MM/dd/yy')}
                            </Text>
                        </View>
                        <View style={defaultStyles.rowBetween}>
                            <Text
                                style={[
                                    defaultStyles.body,
                                    !read && styles.unreadMessage,
                                    styles.message
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
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: Colors.background,
    },
    avatarContainer: {
        marginRight: 12,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    date: {
        marginLeft: 8,
    },
    message: {
        marginTop: 4,
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