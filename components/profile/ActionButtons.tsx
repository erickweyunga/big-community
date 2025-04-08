import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface ActionButtonsProps {
    isOwnProfile: boolean;
    isFollowing: boolean;
    onFollowPress: () => void;
    onMessagePress: () => void;
    onEditProfilePress: () => void;
    onShareProfilePress: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    isOwnProfile,
    isFollowing,
    onFollowPress,
    onMessagePress,
    onEditProfilePress,
    onShareProfilePress
}) => {
    return (
        <View style={styles.actionContainer}>
            {!isOwnProfile ? (
                <>
                    <TouchableOpacity
                        style={[styles.followButton, isFollowing && styles.followingButton]}
                        onPress={onFollowPress}
                    >
                        <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                            {isFollowing ? 'Following' : 'Follow'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.messageButton} onPress={onMessagePress}>
                        <Text style={styles.messageButtonText}>Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.moreButton}>
                        <Ionicons name="chevron-down" size={18} color={Colors.text} />
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity style={styles.editProfileButton} onPress={onEditProfilePress}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shareProfileButton} onPress={onShareProfilePress}>
                        <Text style={styles.shareProfileText}>Share Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.moreButton}>
                        <Ionicons name="person-add-outline" size={18} color={Colors.text} />
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    followButton: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
        marginRight: 8,
    },
    followingButton: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    followButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    followingButtonText: {
        color: Colors.text,
    },
    messageButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        marginRight: 8,
    },
    messageButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    moreButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    editProfileButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        marginRight: 8,
    },
    editProfileText: {
        fontWeight: '600',
        fontSize: 14,
    },
    shareProfileButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        marginRight: 8,
    },
    shareProfileText: {
        fontWeight: '600',
        fontSize: 14,
    },
});