import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(home)" />
                <Stack.Screen name="lilysChoice" />
                <Stack.Screen name="wishlist" />
                <Stack.Screen name="(cart)" />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar
                style="auto"
                // backgroundColor="rgba(236, 72, 153, 0.25)"
            />
        </>
    );
}
