import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { PanGestureHandler, GestureHandlerStateChangeEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

const SWIPE_THRESHOLD = -120;

interface SwipeableRowProps {
  children: React.ReactNode;
  onDelete?: () => void;
  onArchive?: () => void;
}

const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, onDelete, onArchive }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  
  const onGestureEvent = Animated.event<PanGestureHandlerEventPayload>(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: GestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === 4) {
      const dragX = event.nativeEvent.translationX as number;
      
      if (dragX < SWIPE_THRESHOLD) {
        Animated.timing(translateX, {
          toValue: -120,
          duration: 200,
          useNativeDriver: true
        }).start();
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true
        }).start();
      }
    }
  };

  const reset = (): void => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true
    }).start();
  };

  const limitedTranslateX = translateX.interpolate({
    inputRange: [-100, 0],
    outputRange: [-120, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={styles.actionsContainer}>
        {onArchive && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.archiveButton]} 
            onPress={() => {
              onArchive();
              reset();
            }}
          >
            <Text style={styles.actionText}>Archive</Text>
          </TouchableOpacity>
        )}
        
        {onDelete && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]} 
            onPress={() => {
              onDelete();
              reset();
            }}
          >
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View 
          style={[
            styles.rowContent, 
            { transform: [{ translateX: limitedTranslateX }] }
          ]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  rowContent: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 2,
  },
  actionsContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 1,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: '100%',
  },
  archiveButton: {
    backgroundColor: '#4a98f7',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  }
});

export default SwipeableRow;