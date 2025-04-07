import { View, Text, KeyboardAvoidingView, Platform, Linking, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native'
import React, { useState, useCallback, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';

const Page: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();
    const { isLoaded, signUp, setActive } = useSignUp()
    const { signIn } = useSignIn();

    const openPrivacyPolicy = useCallback((): void => {
        Linking.openURL('https://example.com/privacy-policy');
    }, []);

    const openTermsOfService = useCallback((): void => {
        Linking.openURL('https://example.com/terms-of-service');
    }, []);

    const processPhoneInput = useCallback((input: string): string => {
        let digits = input.replace(/\D/g, '');

        if (digits.startsWith('255')) {
            digits = digits.substring(3);
        }

        if (digits.startsWith('0')) {
            digits = digits.substring(1);
        }

        return digits;
    }, []);

    const validatePhone = useCallback((rawInput: string): boolean => {
        const digits = processPhoneInput(rawInput);
        const isValid = /^\d{9}$/.test(digits);
        return isValid;
    }, [processPhoneInput]);

    const handlePhoneNumberChange = useCallback((text: string): void => {
        const digitsOnly = text.replace(/\D/g, '');
        const processedDigits = processPhoneInput(digitsOnly);

        const formattedDigits = processedDigits.slice(0, 9);

        setPhoneNumber(formattedDigits);
    }, [processPhoneInput]);

    const sendOtp = useCallback(async (): Promise<void> => {
        if (!isLoaded) return;

        if (phoneNumber.length === 0) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
            return;
        }

        if (validatePhone(phoneNumber)) {
            const fullInternationalNumber = `+255${phoneNumber}`;

            try {
                await signUp.create({
                    phoneNumber: fullInternationalNumber,
                })
                await signUp.preparePhoneNumberVerification({ strategy: 'phone_code' });
                router.push(`/verify/${fullInternationalNumber}`);
            } catch (error) {
                if (isClerkAPIResponseError(error)) {
                    if (error.errors[0].code === "form_identifier_exists") {
                        console.log('Phone number already exists, signing in...');
                        await trySignIn()
                    } else {
                        setLoading(false);
                        Alert.alert('Error', error.errors[0].message || 'An error occurred. Please try again.');
                    }
                }
            }
        } else {
            Alert.alert('Invalid Phone Number', 'Please enter a valid 9-digit Tanzania phone number');
            setLoading(false);
        }
    }, [phoneNumber, validatePhone, router]);

    const trySignIn = useCallback(async () => {
        const { supportedFirstFactors } = await signIn!.create({
            identifier: phoneNumber,
        });

        if (!supportedFirstFactors) {
            Alert.alert('Error', 'No supported first factors found. Please try again.');
            return;
        }

        const firstPhoneFactor = supportedFirstFactors!.find(factor => factor.strategy === 'phone_code');

        if (firstPhoneFactor && 'phoneNumberId' in firstPhoneFactor) {
            const { phoneNumberId } = firstPhoneFactor;
            await signIn!.prepareFirstFactor({
                strategy: 'phone_code',
                phoneNumberId,
            });

            router.push(`/verify/${phoneNumber}?signIn=true`);
            setLoading(false);
        } else {
            Alert.alert('Error', 'No phone number found. Please try again.');
            setLoading(false);
        }

    }, [signIn, phoneNumber, router]);

    const isButtonEnabled = useMemo((): boolean => {
        return phoneNumber.length > 0;
    }, [phoneNumber]);

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

    const buttonStyle = useMemo(() => [
        styles.button,
        isButtonEnabled ? styles.enabled : styles.disabled,
        { marginBottom: bottom }
    ], [isButtonEnabled, bottom]);

    const handleContinuePress = useCallback(async () => {
        if (isButtonEnabled) {
            setLoading(true);
            await sendOtp().finally(() => {
                // Loading is handled in sendOtp with setTimeout
            });
        } else {
            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
        }
    }, [isButtonEnabled, sendOtp]);

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <View style={[StyleSheet.absoluteFill, styles.container]}>
                {loading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                        <Text style={{ fontSize: 18, margin: 10 }}>
                            Sending verification code...
                        </Text>
                    </View>
                )}
                <Text style={styles.description}>
                    BigCommunity will send you a text with a code to verify your phone number.
                </Text>

                <View style={styles.list}>
                    <View style={styles.listItem}>
                        <Text style={styles.listItemText}>Tanzania</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.phoneInputContainer}>
                        <View style={styles.prefixContainer}>
                            <Text style={styles.prefixText}>+255</Text>
                        </View>
                        <TextInput
                            value={phoneNumber}
                            onChangeText={handlePhoneNumberChange}
                            placeholder="7XX XXX XXX"
                            style={styles.phoneInput}
                            autoFocus
                            placeholderTextColor={Colors.gray}
                            keyboardType="numeric"
                            maxLength={9}
                        />
                    </View>
                </View>

                <Text style={{ ...styles.description }}>
                    <Text>
                        You should be{" "}
                    </Text>
                    <Text style={styles.link} onPress={openPrivacyPolicy}>
                        at least 14 years old
                    </Text>
                    {" to register. Learn more about our "}
                    <Text style={styles.link} onPress={openTermsOfService}>
                        Way of workings
                    </Text>
                </Text>

                <View style={styles.flex} />

                <TouchableOpacity
                    style={buttonStyle}
                    disabled={!isButtonEnabled}
                    onPress={handleContinuePress}
                >
                    <Text style={styles.buttonText}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        gap: 20,
        backgroundColor: '#fff',
    },
    description: {
        fontSize: 14,
        color: Colors.gray,
        textAlign: 'center',
        lineHeight: 22,
    },
    list: {
        // backgroundColor: Colors.backeground,
        width: '100%',
        padding: 12,
        borderRadius: 10
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        marginBottom: 4,
    },
    listItemText: {
        fontSize: 18,
        color: Colors.primary,
        fontWeight: '500',
    },
    phoneInputContainer: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    prefixContainer: {
        marginRight: 8,
    },
    prefixText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '400',
    },
    phoneInput: {
        fontSize: 18,
        color: '#000',
        flex: 1,
    },
    link: {
        color: Colors.primary,
        fontWeight: '500',
    },
    button: {
        width: '100%',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
    },
    enabled: {
        backgroundColor: Colors.primary,
    },
    disabled: {
        backgroundColor: Colors.gray,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    separator: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.gray,
        opacity: 0.5,
        marginVertical: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 2,
        marginBottom: 2,
    },
    loading: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fff',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Page;