import { View, Text, KeyboardAvoidingView, Platform, Linking, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useCallback, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaskInput from 'react-native-mask-input';

// Format: +255 xxx xxx xxx
// Tanzania phone numbers should have exactly 9 digits after the country code
const TANZANIA_MASK = ['+', '2', '5', '5', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/];

const Page: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [validationError, setValidationError] = useState<string | null>(null);
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();

    // Memoized functions to prevent recreating on each render
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

        if (digits.length !== 9) {
            setValidationError(`Phone number must be exactly 9 digits`);
            return false;
        }

        setValidationError(null);
        return true;
    }, [processPhoneInput]);

    const handlePhoneNumberChange = useCallback((unmaskedValue: string): void => {
        validatePhone(unmaskedValue);
    }, [validatePhone]);

    const sendOtp = useCallback(async (): Promise<void> => {
        const unmaskedNumber = phoneNumber.replace(/\D/g, '');

        if (validatePhone(unmaskedNumber)) {
            const processedNumber = processPhoneInput(unmaskedNumber);
            console.log('Sending OTP to valid number:', processedNumber);

            const fullInternationalNumber = `+255${processedNumber}`;
            console.log('Full international format:', fullInternationalNumber);

            // Add your API call or navigation here
            // router.push('/verification');
        } else {
            Alert.alert('Invalid Phone Number', validationError || 'Please enter a valid Tanzanian phone number');
            setLoading(false);
        }
    }, [phoneNumber, validatePhone, validationError, processPhoneInput]);

    const isButtonEnabled = useMemo((): boolean => {
        return phoneNumber.length > 0 && validationError === null;
    }, [phoneNumber, validationError]);

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

    const buttonStyle = useMemo(() => [
        styles.button,
        isButtonEnabled ? styles.enabled : styles.disabled,
        { marginBottom: bottom }
    ], [isButtonEnabled, bottom]);

    const handleContinuePress = useCallback((): void => {
        if (isButtonEnabled) {
            setLoading(true);
            sendOtp();
        } else if (validationError) {
            Alert.alert('Invalid Phone Number', validationError);
        } else {
            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
        }
    }, [isButtonEnabled, sendOtp, validationError]);

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <View style={styles.container}>
                <Text style={styles.description}>
                    BigCommunity will send you a text with a code to verify your phone number.
                    Message and data rates may apply.
                </Text>

                <View style={styles.list}>
                    <View style={styles.listItem}>
                        <Text style={styles.listItemText}>Tanzania</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.phoneInputContainer}>
                        <MaskInput
                            value={phoneNumber}
                            onChangeText={(masked, unmasked) => {
                                setPhoneNumber(masked);
                                handlePhoneNumberChange(unmasked);
                            }}
                            mask={TANZANIA_MASK}
                            placeholder="+255 phone number"
                            style={styles.phoneInput}
                            autoFocus
                            placeholderTextColor={Colors.gray}
                            keyboardType="numeric"
                        />
                    </View>
                    {validationError ? (
                        <Text style={styles.errorText}>{validationError}</Text>
                    ) : null}
                </View>

                <Text style={styles.description}>
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
                        {loading ? 'Processing...' : 'Continue'}
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
        backgroundColor: "#fff",
        padding: 20,
        gap: 20,
    },
    description: {
        fontSize: 16,
        color: Colors.gray,
        textAlign: 'center',
        lineHeight: 22,
    },
    list: {
        backgroundColor: '#f0f0f0',
        width: '100%',
        padding: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.lightGray,
        borderRadius: 5,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        marginBottom: 10,
    },
    listItemText: {
        fontSize: 18,
        color: Colors.primary,
        fontWeight: '500',
    },
    phoneInputContainer: {
        paddingVertical: 0,
    },
    phoneInput: {
        fontSize: 18,
        color: '#000',
        width: '100%',
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
});

export default Page;