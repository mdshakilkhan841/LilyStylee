import { View, Text, Platform, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";

const index = () => {
    const [timeLeft, setTimeLeft] = useState(3600 * 24 * 7); // 7 days in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600); // Corrected hours calculation
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return {
            days: days < 10 ? `0${days}` : days,
            hours: hours < 10 ? `0${hours}` : hours,
            minutes: minutes < 10 ? `0${minutes}` : minutes,
            seconds:
                remainingSeconds < 10
                    ? `0${remainingSeconds}`
                    : remainingSeconds,
        };
    };

    const { days, hours, minutes, seconds } = formatTime(timeLeft);
    return (
        <>
            <Appbar.Header
                statusBarHeight={Platform.OS === "ios" ? 30 : 15}
                safeAreaInsets={{ top: 15 }}
                style={{ backgroundColor: "white" }}
            >
                <Appbar.BackAction
                    onPress={() => {
                        router.back();
                    }}
                />
                <Appbar.Content
                    title="SHOPPING BAG"
                    titleStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
                <Appbar.Action icon="heart-outline" onPress={() => {}} />
            </Appbar.Header>
            <SafeAreaView className="flex-1">
                <ScrollView contentContainerStyle={{ gap: 12 }}>
                    <View className="px-4 py-2 bg-white">
                        <Text>Indicator</Text>
                    </View>

                    <View className="flex-row flex-wrap items-center justify-center px-4 py-1.5 bg-white">
                        <Text className="px-2 text-sm font-bold text-center text-black">
                            Sale Ends in
                        </Text>

                        <Text className="px-1.5 py-0.5 font-bold text-center text-orange-600 bg-orange-100 rounded-lg text-sm">
                            {days}
                        </Text>
                        <Text className="text-sm text-center text-black">
                            {" "}
                            Days :{"  "}
                        </Text>

                        <Text className="px-1.5 py-0.5 font-bold text-center text-orange-600 bg-orange-100 rounded-lg text-sm">
                            {hours}
                        </Text>
                        <Text className="text-sm text-center text-black">
                            {" "}
                            Hrs :{"  "}
                        </Text>

                        <Text className="px-1.5 py-0.5 font-bold text-center text-orange-600 bg-orange-100 rounded-lg text-sm">
                            {minutes}
                        </Text>
                        <Text className="text-sm text-center text-black">
                            {" "}
                            Min
                        </Text>
                        {/* <Text className="px-1.5 py-0.5 font-bold text-center text-orange-600 bg-orange-100 rounded-lg text-sm">
                                {seconds}
                            </Text>
                            <Text className="text-sm text-center text-black">
                                {" "}
                                Sec
                            </Text> */}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default index;
