import Colors from "@/constants/Colors";
import { isClerkAPIResponseError, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>();
    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(60);
    const [canResend, setCanResend] = useState<boolean>(false);
    const router = useRouter();
    const { signUp, setActive: setActiveSignUp } = useSignUp();
    const { signIn, setActive: setActiveSignIn } = useSignIn();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isSigningIn = signin === 'true';

    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    const formattedPhone = phone
        ? phone.replace(/(\+255)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')
        : '';

    // Handle countdown timer
    useEffect(() => {
        if (countdown > 0) {
            timerRef.current = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [countdown]);

    useEffect(() => {
        if (code.length === CELL_COUNT) {
            if (isSigningIn) {
                verifySignIn();
            } else {
                verifyCode();
            }
        }
    }, [code]);

    const handleSuccess = useCallback((message: string) => {
        Alert.alert(
            "Verification Successful",
            message,
            [
                {
                    text: "Continue",
                    onPress: () => router.push('/(tabs)/chats'),
                }
            ]
        );
    }, [router]);

    // Error handler for both signup and signin
    const handleError = useCallback((error: any, defaultMessage: string) => {
        console.error('Verification error:', JSON.stringify(error, null, 2));
        
        if (isClerkAPIResponseError(error)) {
            Alert.alert(
                "Verification Error",
                error.errors[0]?.message || defaultMessage,
                [{ text: "OK" }]
            );
            return;
        }
        
        Alert.alert(
            "Verification Failed",
            defaultMessage,
            [{ text: "OK" }]
        );
        
        setCode('');
    }, []);

    // Verify signup code
    const verifyCode = useCallback(async () => {
        if (!signUp) return;
        
        setLoading(true);
        try {
            const completeSignUp = await signUp.attemptPhoneNumberVerification({
                code,
            });

            if (completeSignUp.status !== 'complete') {
                Alert.alert(
                    "Verification Error",
                    "The verification code is incorrect. Please try again.",
                    [{ text: "OK" }]
                );
                setCode('');
                return;
            }

            await setActiveSignUp?.({ session: completeSignUp.createdSessionId });
            handleSuccess("Your phone number has been verified.");
        } catch (error) {
            handleError(error, 'Please check the code and try again.');
        } finally {
            setLoading(false);
        }
    }, [code, signUp, setActiveSignUp, handleSuccess, handleError]);

    // Verify signin code
    const verifySignIn = useCallback(async () => {
        if (!signIn) return;
        
        setLoading(true);
        try {
            await signIn.attemptFirstFactor({
                strategy: 'phone_code',
                code,
            });

            await setActiveSignIn?.({ session: signIn.createdSessionId });
            handleSuccess("You have successfully signed in.");
        } catch (error) {
            handleError(error, 'Please check the code and try again.');
        } finally {
            setLoading(false);
        }
    }, [code, signIn, setActiveSignIn, handleSuccess, handleError]);

    // Resend verification code
    const resendCode = useCallback(async () => {
        if (!canResend) return;
        
        setCountdown(60);
        setCanResend(false);
        setCode('');
        setLoading(true);
        
        try {
            if (isSigningIn) {
                await resendSignInCode();
            } else {
                await resendSignUpCode();
            }
        } catch (error) {
            console.error('Error resending code:', error);
            
            if (isClerkAPIResponseError(error)) {
                Alert.alert(
                    "Resend Error",
                    error.errors[0]?.message || 'An error occurred. Please try again.',
                    [{ text: "OK" }]
                );
            } else {
                Alert.alert(
                    "Failed to Resend",
                    "Please try again later.",
                    [{ text: "OK" }]
                );
            }
        } finally {
            setLoading(false);
        }
    }, [canResend, isSigningIn, phone]);

    // Resend sign in code
    const resendSignInCode = async () => {
        if (!signIn || !phone) return;
        
        const { supportedFirstFactors } = await signIn.create({
            identifier: phone,
        });

        const firstPhoneFactor = supportedFirstFactors!.find(
            (factor: any) => factor.strategy === 'phone_code'
        );

        if (!firstPhoneFactor) {
            throw new Error('Phone verification not supported');
        }

        const { phoneNumberId } = firstPhoneFactor as any;
        await signIn.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId,
        });
    };

    // Resend sign up code
    const resendSignUpCode = async () => {
        if (!signUp || !phone) return;
        
        const newSignUp = await signUp.create({
            phoneNumber: phone,
        });
        
        await newSignUp.preparePhoneNumberVerification();
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: formattedPhone,
                    headerTitleAlign: 'center',
                    headerBackTitle: 'Edit number',
                }}
            />

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.loadingText}>
                        {code.length === CELL_COUNT ? 'Verifying code...' : 'Sending code...'}
                    </Text>
                </View>
            )}

            <Text style={styles.legalText}>
                We have sent you an SMS with a code to the number above.
            </Text>
            <Text style={styles.legalText}>
                To complete your phone number verification, please enter the 6-digit code we sent to your phone.
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        key={index}
                        style={[
                            styles.cell,
                            isFocused && styles.focusCell,
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />

            <TouchableOpacity
                style={[
                    styles.button,
                    canResend ? styles.enabled : styles.disabled
                ]}
                onPress={resendCode}
                disabled={!canResend || loading}
                accessibilityLabel="Resend verification code"
                accessibilityRole="button"
                accessibilityState={{ disabled: !canResend || loading }}
            >
                <Text
                    style={[
                        styles.buttonText,
                        { color: canResend ? Colors.primary : Colors.gray }
                    ]}
                >
                    {canResend
                        ? "Didn't receive the code? Resend"
                        : `Resend code in ${countdown}s`}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        gap: 20
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: Colors.primary,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginTop: 20,
    },
    enabled: {
        opacity: 1,
    },
    disabled: {
        opacity: 0.7,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    legalText: {
        color: Colors.gray,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
    },
    codeFieldRoot: {
        marginTop: 20,
        width: 280,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 8,
    },
    cell: {
        width: 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    cellText: {
        color: "#000",
        fontSize: 36,
        textAlign: 'center',
        lineHeight: 40,
        fontWeight: '400',
    },
    focusCell: {
        paddingBottom: 4,
        borderColor: "#000",
        borderBottomWidth: 2,
    },
});