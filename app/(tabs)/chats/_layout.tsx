import React from "react"
import Colors from "@/constants/Colors"
import { defaultStyles } from "@/constants/Styles"
import { Link, Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"

const Layout: React.FC = () => {
    const commonScreenOptions = {
        headerStyle: {
            backgroundColor: Colors.backgroundLight,
        },
        headerShadowVisible: false,
        headerTintColor: Colors.primary,
        contentStyle: {
            backgroundColor: Colors.backgroundLight,
        },
    };
    
    return (
        <SafeAreaProvider style={defaultStyles.safeArea}>
            <Stack screenOptions={commonScreenOptions}>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "COMMUNITY",
                        headerTitleAlign: "center",
                        headerLargeTitle: true
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    )
}

export default Layout