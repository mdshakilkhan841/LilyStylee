import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="wishlist" options={{ headerShown: true }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar
                style="auto"
                backgroundColor="rgba(236, 72, 153, 0.25)"
            />
        </>
    );
}
