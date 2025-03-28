import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function CartLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false, title: "SHOPPING BAG" }}
            />
        </Stack>
    );
}
