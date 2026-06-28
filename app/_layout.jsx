import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(home)" />
            </Stack>
            <StatusBar
                style="auto"
                // backgroundColor="rgba(236, 72, 153, 0.25)"
            />
        </>
    );
}
