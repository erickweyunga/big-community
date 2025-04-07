import Colors from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { Stack } from "expo-router"
import { TouchableOpacity } from "react-native"

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "BigCommunity",
                    headerLargeTitle: true,
                    headerBlurEffect: "regular",
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontSize: 20,
                    },
                    headerStyle: {
                        backgroundColor: Colors.backgroundLight,
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity>
                                <Ionicons name="person-outline" size={24} color={Colors.primary} />
                            </TouchableOpacity>
                        )
                    }
                }}
            />

            <Stack.Screen
                name="chat"
                options={{
                    title: "Chat",
                    presentation: "card",
                    headerStyle: {
                        backgroundColor: Colors.backgroundLight,
                    },
                    headerTintColor: Colors.primary,
                }}
            />
        </Stack>
    )
}

export default Layout