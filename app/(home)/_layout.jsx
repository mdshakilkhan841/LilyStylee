import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="user" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="productDetails" />
        </Stack>
    );
}
