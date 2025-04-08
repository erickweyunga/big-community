import BoxedIcon from '@/components/BoxedIcon';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SettingsItem {
    id: string;
    title: string;
    description?: string;
    icon: string;
    iconType: 'ionicon' | 'material';
    color?: string;
}

const Page = () => {
    const { signOut } = useAuth();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleItemPress = (id: string) => {
        if (id === 'signout') {
            Alert.alert(
                'Sign Out',
                'Are you sure you want to sign out?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Sign Out',
                        style: 'destructive',
                        onPress: () => signOut(),
                    },
                ]
            );
        } else {
            router.push(`/`);
        }
    };

    const renderSection = (title: string, data: SettingsItem[]) => (
        <View style={[defaultStyles.mb3]}>
            <Text style={[defaultStyles.sectionTitle]}>{title}</Text>
            <FlatList
                data={data}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[defaultStyles.item, defaultStyles.px1, defaultStyles.py4]}
                        activeOpacity={0.7}
                        onPress={() => handleItemPress(item.id)}
                    >
                        <BoxedIcon
                            icon={
                                item.iconType === 'ionicon' ? (
                                    <Ionicons name={item.icon as any} size={22} color={item.color || Colors.primary} />
                                ) : (
                                    <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color || Colors.primary} />
                                )
                            }
                        />
                        <View style={defaultStyles.flex1}>
                            <Text
                                style={[
                                    defaultStyles.subtitle,
                                    item.id === 'signout' && { color: Colors.error || '#FF3B30' }
                                ]}
                            >
                                {item.title}
                            </Text>
                            {item.description && (
                                <Text style={[defaultStyles.caption, defaultStyles.mt1]}>
                                    {item.description}
                                </Text>
                            )}
                        </View>
                        <Ionicons name='chevron-forward' size={20} color={Colors.gray} />
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );

    return (
        <View style={defaultStyles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior='automatic'
                contentContainerStyle={[
                    defaultStyles.contentContainer,
                    defaultStyles.px3,
                    { paddingBottom: Math.max(insets.bottom, 16) }
                ]}
            >
                {renderSection('Account', accountSettings)}
                {renderSection('Preferences', preferencesSettings)}
                {renderSection('Support', supportSettings)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    listContent: {
        backgroundColor: Colors.background,
        borderRadius: 12,
        overflow: 'hidden',
    }
});

const accountSettings: SettingsItem[] = [
    {
        id: 'profile',
        title: 'Profile',
        description: 'Manage your personal information',
        icon: 'person',
        iconType: 'ionicon',
    },
    {
        id: 'privacy',
        title: 'Privacy',
        description: 'Control who can see your information',
        icon: 'shield-checkmark',
        iconType: 'ionicon',
    },
    {
        id: 'security',
        title: 'Security',
        description: 'Password and authentication methods',
        icon: 'lock-closed',
        iconType: 'ionicon',
    },
    {
        id: 'data',
        title: 'Data & Storage',
        description: 'Manage your data and media storage',
        icon: 'server',
        iconType: 'material',
    },
];

const preferencesSettings: SettingsItem[] = [
    {
        id: 'notifications',
        title: 'Notifications',
        description: 'Customize your notification preferences',
        icon: 'notifications',
        iconType: 'ionicon',
    },
    {
        id: 'appearance',
        title: 'Appearance',
        description: 'Theme settings and display options',
        icon: 'color-palette',
        iconType: 'ionicon',
    },
    {
        id: 'language',
        title: 'Language',
        description: 'Change the app language',
        icon: 'language',
        iconType: 'material',
    },
];

const supportSettings: SettingsItem[] = [
    {
        id: 'help',
        title: 'Help & Support',
        description: 'Get help and contact support',
        icon: 'help-circle',
        iconType: 'ionicon',
    },
    {
        id: 'about',
        title: 'About',
        description: 'App version and information',
        icon: 'information-circle',
        iconType: 'ionicon',
    },
    {
        id: 'signout',
        title: 'Sign Out',
        icon: 'log-out',
        iconType: 'ionicon',
        color: '#FF3B30',
    },
];

export default Page;