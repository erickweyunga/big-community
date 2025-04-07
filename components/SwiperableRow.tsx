import { View, Text, Animated, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import React, { useRef } from 'react';
import {
    PanGestureHandler,
    State,
    GestureHandlerRootView
} from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const ACTION_WIDTH = 70;

interface SwipeableRowProps {
    children: React.ReactNode;
    onDelete?: () => void;
    onArchive?: () => void;
}

const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, onDelete, onArchive }) => {
    const totalActionsWidth = (onArchive ? ACTION_WIDTH : 0) + (onDelete ? ACTION_WIDTH : 0);

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

            const dragThreshold = -totalActionsWidth * 0.5;

            const shouldOpen =
                !isOpen.current && (dragX < dragThreshold || dragVelocity < -500) ||
                isOpen.current && dragX > -totalActionsWidth * 0.75;

            if (shouldOpen) {
                isOpen.current = true;
                Animated.spring(translateX, {
                    toValue: -totalActionsWidth * direction,
                    useNativeDriver: true,
                    bounciness: 0,
                    speed: 20
                }).start();
            } else {
                isOpen.current = false;
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                    bounciness: 0,
                    speed: 20
                }).start();
            }
        }
    };

    // Close the row
    const closeRow = () => {
        isOpen.current = false;
        Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
            speed: 20
        }).start();
    };

    // Transform for the content
    const trans = translateX.interpolate({
        inputRange: [-totalActionsWidth * 2, 0, 1],
        outputRange: [-totalActionsWidth, 0, 0],
        extrapolate: 'clamp',
    });

    // Layout for the actions - absolutely positioned and right aligned
    const renderActions = () => {
        const actions = [];
        let rightOffset = 0;

        if (onArchive) {
            actions.push(
                <Animated.View
                    key="archive"
                    style={[
                        styles.actionButton,
                        styles.archiveButton,
                        { right: rightOffset }
                    ]}
                >
                    <TouchableOpacity
                        style={[defaultStyles.center, styles.actionButtonInner]}
                        onPress={() => {
                            if (onArchive) onArchive();
                            closeRow();
                        }}
                    >
                        <Text style={styles.actionText}>Archive</Text>
                    </TouchableOpacity>
                </Animated.View>
            );
            rightOffset += ACTION_WIDTH;
        }

        return actions;
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
    actionText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    }
});

export default SwipeableRow;