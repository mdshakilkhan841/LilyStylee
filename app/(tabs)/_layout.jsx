import { Tabs } from "expo-router";
import TabBar from "@/components/home/tab_bar";

export default function TabLayout() {
    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="category" />
            <Tabs.Screen name="lilys_choice" />
            <Tabs.Screen name="wishlist" />
            <Tabs.Screen name="cart" />
        </Tabs>
    );
}
