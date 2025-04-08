import { View, Text, Animated, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import React, { useRef } from 'react';
import {
    PanGestureHandler,
    State,
    GestureHandlerRootView
} from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const ACTION_WIDTH = 100;

interface SwipeableRowProps {
    children: React.ReactNode;
    onDelete?: () => void;
    onArchive?: () => void;
}

const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, onDelete, onArchive }) => {
    const totalActionsWidth = ACTION_WIDTH * 2;

    const translateX = useRef(new Animated.Value(0)).current;
    const rowHeight = useRef(new Animated.Value(0)).current;

    const isOpen = useRef(false);

    const direction = I18nManager.isRTL ? -1 : 1;

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = ({ nativeEvent }: any) => {
        if (nativeEvent.oldState === State.ACTIVE) {
            const dragX = nativeEvent.translationX * direction;
            const dragVelocity = nativeEvent.velocityX * direction;

            if (isOpen.current) {
                if (dragX > totalActionsWidth * 0.25 || dragVelocity > 500) {
                    closeRow();
                } else {
                    openRow();
                }
            } else {
                const dragThreshold = -totalActionsWidth * 0.5;

                if (dragX < dragThreshold || dragVelocity < -500) {
                    openRow();
                } else {
                    closeRow();
                }
            }
        }
    };

    const openRow = () => {
        isOpen.current = true;
        Animated.spring(translateX, {
            toValue: -totalActionsWidth * direction,
            useNativeDriver: true,
            bounciness: 0,
            speed: 20
        }).start();
    };

    const closeRow = () => {
        isOpen.current = false;
        Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
            speed: 20
        }).start();
    };

    const trans = translateX.interpolate({
        inputRange: [-totalActionsWidth * 1, 0, 1],
        outputRange: [-totalActionsWidth, 0, 1],
        extrapolate: 'clamp',
    });

    const renderActions = () => {
        return (
            <>
                <Animated.View
                    style={[
                        styles.actionButton,
                        styles.archiveButton,
                        { right: 0 }
                    ]}
                >
                    <TouchableOpacity
                        style={[defaultStyles.center, styles.actionButtonInner]}
                        onPress={() => {
                            if (onArchive) onArchive();
                            closeRow();
                        }}
                    >
                        <Ionicons name="archive" size={22} color="white" style={defaultStyles.p1} />
                        <Text style={styles.actionText}>Archive</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.actionButton,
                        styles.deleteButton,
                        { right: ACTION_WIDTH }
                    ]}
                >
                    <TouchableOpacity
                        style={[defaultStyles.center, styles.actionButtonInner]}
                        onPress={() => {
                            if (onDelete) onDelete();
                            closeRow();
                        }}
                    >
                        <Ionicons name="trash" size={22} color="white" style={defaultStyles.p1} />
                        <Text style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                </Animated.View>
            </>
        );
    };

    return (
        <GestureHandlerRootView style={defaultStyles.container}>
            <Animated.View
                style={styles.container}
                onLayout={({ nativeEvent }) => {
                    rowHeight.setValue(nativeEvent.layout.height);
                }}
            >
                <View style={styles.actionsContainer}>
                    {renderActions()}
                </View>

                <PanGestureHandler
                    activeOffsetX={[-10, 10]}
                    failOffsetY={[-10, 10]}
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View
                        style={[
                            styles.rowContent,
                            {
                                transform: [{ translateX: trans }],
                            }
                        ]}
                    >
                        {children}
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    rowContent: {
        width: '100%',
        backgroundColor: Colors.background,
    },
    actionsContainer: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    },
    actionButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: ACTION_WIDTH,
    },
    actionButtonInner: {
        flex: 1,
    },
    archiveButton: {
        backgroundColor: Colors.primary,
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12,
        marginTop: 2,
    }
});

export default SwipeableRow;