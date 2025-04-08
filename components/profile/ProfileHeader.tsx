import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { User } from '@/types';

interface ProfileHeaderProps {
    user: User;
    followers: number;
    following: number;
    posts: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, followers, following, posts }) => {
    return (
        <View style={styles.profileHeader}>
            <View style={styles.profileTopRow}>
                <Image
                    source={{ uri: user.img }}
                    style={styles.profileImage}
                />

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{posts.toLocaleString()}</Text>
                        <Text style={styles.statLabel}>Posts</Text>
                    </View>

                    <TouchableOpacity style={styles.statItem}>
                        <Text style={styles.statNumber}>{followers.toLocaleString()}</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.statItem}>
                        <Text style={styles.statNumber}>{following.toLocaleString()}</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.nameContainer}>
                <Text style={styles.name}>
                    {user.name}
                    {user.verified && (
                        <MaterialIcons name="verified" size={16} color={Colors.primary} style={{ marginLeft: 4 }} />
                    )}
                </Text>
                <Text style={styles.occupation}>{user.occupation}</Text>
                <Text style={styles.bio}>{user.bio}</Text>

                {user.links?.website && (
                    <TouchableOpacity style={styles.websiteLink}>
                        <Ionicons name="link-outline" size={14} color={Colors.primary} />
                        <Text style={styles.websiteText}>{user.links.website.replace(/^https?:\/\//, '')}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileHeader: {
        padding: 16,
    },
    profileTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.gray,
        marginTop: 2,
    },
    nameContainer: {
        marginTop: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
    },
    occupation: {
        fontSize: 14,
        color: Colors.gray,
        marginTop: 2,
    },
    bio: {
        fontSize: 14,
        color: Colors.text,
        marginTop: 6,
        lineHeight: 19,
    },
    websiteLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    websiteText: {
        fontSize: 14,
        color: Colors.primary,
        marginLeft: 4,
        fontWeight: '500',
    },
});