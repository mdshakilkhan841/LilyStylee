import { View, ScrollView } from "react-native";
import PageHeader from "@/components/page_header";

export default function LilysChoice() {
    return (
        <View className="flex-1">
            <PageHeader title="LILY'S CHOICE" showBack={false} showProfile />
            {/* Body */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                // contentContainerStyle={{
                //     paddingBottom: 8,
                // }}
            ></ScrollView>
        </View>
    );
}
