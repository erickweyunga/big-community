import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import Colors from '@/constants/Colors';
import WelcomeImage from '@/assets/images/welcome.png';
import { Link } from 'expo-router';

const Welcome_Image: string = Image.resolveAssetSource(WelcomeImage).uri;

const Page: React.FC = () => {
    const openPrivacyPolicy = useCallback((): void => {
        Linking.openURL('https://example.com/privacy-policy');
    }, []);

    const openTermsOfService = useCallback((): void => {
        Linking.openURL('https://example.com/terms-of-service');
    }, []);

    const imageSource = useMemo(() => ({ uri: Welcome_Image }), []);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={imageSource}
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

            <View style={styles.buttonContainer}>
                <Link href="/otp" replace asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            Agree & Continue
                        </Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
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
    },
    buttonText: {
        fontSize: 18,
        color: Colors.primary,
        fontWeight: 'bold',
    }
});

export default Page;