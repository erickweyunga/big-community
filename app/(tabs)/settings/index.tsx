import BoxedIcon from '@/components/BoxedIcon';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

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
        <View style={defaultStyles.block}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
                data={data}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={defaultStyles.item}
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
                        <View style={styles.itemContent}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            {item.description && (
                                <Text style={styles.itemDescription}>{item.description}</Text>
                            )}
                        </View>
                        <Ionicons name='chevron-forward' size={20} color={Colors.gray} style={styles.chevron} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior='automatic'
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {renderSection('Account', accountSettings)}
                {renderSection('Preferences', preferencesSettings)}
                {renderSection('Support', supportSettings)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
        paddingTop: 10
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '600',
        marginHorizontal: 16,
        marginBottom: 8,
        color: Colors.gray
    },
    itemContent: {
        flex: 1,
        marginLeft: 12
    },
    itemTitle: {
        fontSize: 16,
        color: '#000'
    },
    itemDescription: {
        fontSize: 13,
        color: Colors.gray,
        marginTop: 2
    },
    chevron: {
        position: 'absolute',
        right: 10
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