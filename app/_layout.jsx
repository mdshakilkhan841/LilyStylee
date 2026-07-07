import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootSiblingParent } from "react-native-root-siblings";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
                <QueryClientProvider client={queryClient}>
                    <RootSiblingParent>
                        <BottomSheetModalProvider>
                            <Stack screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="index" />
                                <Stack.Screen name="(tabs)" />
                                <Stack.Screen name="(home)" />
                            </Stack>
                            <StatusBar style="auto" />
                        </BottomSheetModalProvider>
                    </RootSiblingParent>
                </QueryClientProvider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
