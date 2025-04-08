// ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { User } from '@/types';

// Import components
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ActionButtons } from '@/components/profile/ActionButtons';
import { StoryHighlights } from '@/components/profile/StoryHighlights';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { PostGrid } from '@/components/profile/PostGrid';
import { Collections } from '@/components/profile/Collections';
import { EmptyTabContent } from '@/components/profile/EmptyTabContent';

// Mock data imports
import users from '@/assets/data/users.json';
import { defaultStyles } from '@/constants/Styles';

// Mock post data
const MOCK_POSTS = [
  { id: '1', imageUrl: 'https://i.pravatar.cc/300?u=post1', likes: 245, comments: 32 },
  { id: '2', imageUrl: 'https://i.pravatar.cc/300?u=post2', likes: 178, comments: 24 },
  { id: '3', imageUrl: 'https://i.pravatar.cc/300?u=post3', likes: 392, comments: 47 },
  { id: '4', imageUrl: 'https://i.pravatar.cc/300?u=post4', likes: 143, comments: 18 },
  { id: '5', imageUrl: 'https://i.pravatar.cc/300?u=post5', likes: 267, comments: 36 },
  { id: '6', imageUrl: 'https://i.pravatar.cc/300?u=post6', likes: 208, comments: 29 },
  { id: '7', imageUrl: 'https://i.pravatar.cc/300?u=post7', likes: 184, comments: 22 },
  { id: '8', imageUrl: 'https://i.pravatar.cc/300?u=post8', likes: 301, comments: 41 },
  { id: '9', imageUrl: 'https://i.pravatar.cc/300?u=post9', likes: 163, comments: 27 },
];

// Mock stories highlights data
const STORY_HIGHLIGHTS = [
  { id: '1', title: 'Travel', imageUrl: 'https://i.pravatar.cc/150?u=story1' },
  { id: '2', title: 'Food', imageUrl: 'https://i.pravatar.cc/150?u=story2' },
  { id: '3', title: 'Work', imageUrl: 'https://i.pravatar.cc/150?u=story3' },
  { id: '4', title: 'Friends', imageUrl: 'https://i.pravatar.cc/150?u=story4' },
  { id: '5', title: 'Family', imageUrl: 'https://i.pravatar.cc/150?u=story5' },
];

// Mock collections data
const COLLECTIONS = [
  { id: '1', title: 'Best Photos', count: 12, coverUrl: 'https://i.pravatar.cc/150?u=collection1' },
  { id: '2', title: 'Inspiration', count: 28, coverUrl: 'https://i.pravatar.cc/150?u=collection2' },
  { id: '3', title: 'Recipe Ideas', count: 15, coverUrl: 'https://i.pravatar.cc/150?u=collection3' },
];

type TabType = 'posts' | 'reels' | 'tagged' | 'saved';

export default function ProfileScreen() {
  const { user_id } = useLocalSearchParams<{ user_id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Load user data
    const loadUser = async () => {
      try {
        setLoading(true);
        if (user_id) {
          const foundUser = users.find(u => u.id === user_id) || users[0];
          setUser(foundUser as User);
          setIsOwnProfile(user_id === 'current-user-id');
          setIsFollowing(Math.random() > 0.5);
        } else {
          setUser(users[0]);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [user_id]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  }

  const handlePostPress = (postId: string) => {
    console.log('Post pressed:', postId);
  };

  const handleStoryPress = (storyId: string) => {
    console.log('Story pressed:', storyId);
  };

  const handleCollectionPress = (collectionId: string) => {
    console.log('Collection pressed:', collectionId);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>User not found</Text>;
  }

  return (
    <View style={defaultStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <Link href="../" asChild>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>{user.username}</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name='ellipsis-horizontal' size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <ProfileHeader
          followers={user.followers}
          following={user.following}
          posts={user.posts}
          user={user}
        />

        <ActionButtons
          isFollowing={isFollowing}
          onEditProfilePress={() => console.log('Edit Profile')}
          onFollowPress={handleFollowToggle}
          onMessagePress={() => console.log('Message')}
          onShareProfilePress={() => console.log('Share Profile')}
          isOwnProfile={isOwnProfile}
        />

        <StoryHighlights 
          onStoryPress={handleStoryPress}
          stories={STORY_HIGHLIGHTS}
          key={STORY_HIGHLIGHTS.map(story => story.id).join('-')}
        />

        {isOwnProfile && (
          <StoryHighlights stories={STORY_HIGHLIGHTS} onStoryPress={handleStoryPress} />
        )}

        <View style={[defaultStyles.block, { paddingBottom: 0 }]}>
          <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />
          {activeTab === 'posts' && (
            <PostGrid posts={MOCK_POSTS} onPostPress={handlePostPress} numColumns={2} />
          )}
          {activeTab === 'reels' && <EmptyTabContent
            icon='videocam-outline'
            message='No Reels yet'
            title='No Reels yet'
            iconSize={50}
          />}
          {activeTab === 'tagged' && <EmptyTabContent
            icon='pricetag-outline'
            message='No Tagged Posts yet'
            title='No Tagged Posts yet'
            iconSize={50}
          />}
          {activeTab === 'saved' && <EmptyTabContent
            icon='bookmark-outline'
            message='No Saved Posts yet'
            title='No Saved Posts yet'
            iconSize={50}
          />}
        </View>

        <View style={[defaultStyles.block, { paddingBottom: 0 }]}>
          {activeTab === 'posts' && (
            <Collections
              collections={COLLECTIONS}
              onCollectionPress={handleCollectionPress}
              onSeeAllPress={() => console.log('See all collections')}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
  },
})