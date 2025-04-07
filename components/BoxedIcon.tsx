import { View, Text } from "react-native";

interface BoxedIconProps {
    icon: JSX.Element;
    backgroundColor?: string;
}

export default function BoxedIcon(
    { icon, backgroundColor = "#f0f0f0" }: BoxedIconProps
) {
    return (
        <View style={{ backgroundColor, padding: 4, borderRadius: 6}}>
            {icon}
        </View>
    );
}