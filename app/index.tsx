import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Platform, StatusBar } from 'react-native';
import React, { useCallback } from 'react';
import Colors from '@/constants/Colors';
import WelcomeImage from '@/assets/images/welcome.png';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Page: React.FC = () => {
    const openPrivacyPolicy = useCallback((): void => {
        Linking.openURL('https://example.com/privacy-policy');
    }, []);

    const openTermsOfService = useCallback((): void => {
        Linking.openURL('https://example.com/terms-of-service');
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={WelcomeImage}
                            style={styles.image}
                            resizeMode="contain"
                            accessibilityLabel="Welcome to BigCommunity"
                        />
                    </View>

                    <Text style={styles.title}>
                        Welcome to BigCommunity
                    </Text>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            <Text>
                                Read our{" "}
                            </Text>
                            <Text style={styles.link} onPress={openPrivacyPolicy}>
                                Privacy Policy
                            </Text>
                            <Text>
                                .{' '}Tap "Agree and Continue" to accept the{' '}
                            </Text>
                            <Text style={styles.link} onPress={openTermsOfService}>
                                Terms of Service
                            </Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Link href="/otp" replace asChild>
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.7}
                            accessibilityRole="button"
                            accessibilityLabel="Agree and Continue"
                            accessibilityHint="Proceeds to phone number verification"
                        >
                            <Text style={styles.buttonText}>
                                Agree & Continue
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    image: {
        width: '100%',
        height: 300,
        marginVertical: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 16,
        color: '#000',
        textAlign: 'center',
    },
    descriptionContainer: {
        marginVertical: 24,
        paddingHorizontal: 16,
    },
    link: {
        color: Colors.primary,
        fontWeight: '500',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        color: Colors.gray,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 32,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.primary,
        borderRadius: 12,
        ...Platform.select({
            ios: {
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default Page;