import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const DiscountCard = () => {
    const [timeLeft, setTimeLeft] = useState(3600 * 2); // 1 hour in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return {
            hours: hours < 10 ? `0${hours}` : hours,
            minutes: minutes < 10 ? `0${minutes}` : minutes,
            seconds:
                remainingSeconds < 10
                    ? `0${remainingSeconds}`
                    : remainingSeconds,
        };
    };

    const { hours, minutes, seconds } = formatTime(timeLeft);

    return (
        <View className="gap-2 my-2">
            <View className="flex-row items-center justify-between px-4 py-1.5 bg-pink-50">
                <Text className="w-1/3 font-bold text-center text-pink-600">
                    ENDS IN
                </Text>
                <View className="flex-row items-center justify-center flex-1 w-1/3">
                    <View className="px-3 bg-pink-600 border-r border-white rounded-l-md">
                        <Text className="text-[14px] font-bold text-center text-white">
                            {hours}
                        </Text>
                        <Text className="text-xs text-center text-white">
                            hrs
                        </Text>
                    </View>
                    <View className="px-3 bg-pink-600 border-r border-white">
                        <Text className="text-[14px] font-bold text-center text-white">
                            {minutes}
                        </Text>
                        <Text className="text-xs text-center text-white">
                            min
                        </Text>
                    </View>
                    <View className="px-3 bg-pink-600 rounded-r-md">
                        <Text className="text-[14px] font-bold text-center text-white">
                            {seconds}
                        </Text>
                        <Text className="text-xs text-center text-white">
                            sec
                        </Text>
                    </View>
                </View>
                <Text className="w-1/3 font-bold text-center text-pink-600">
                    HURRY TIMES'S TICKING
                </Text>
            </View>

            <View className="flex-row items-center justify-center flex-1 mx-4 border border-pink-600 border-dashed divide-x-2 divide-pink-600 divide-dashed">
                <View className="items-center justify-center flex-1 w-1/2 p-1 border-r border-pink-600 border-dashed">
                    <Text className="text-xl font-bold text-blue-800">
                        EXTRA 10% OFF
                    </Text>
                    <Text className="text-sm">
                        Use Code :{" "}
                        <Text className="font-semibold">LILYSTYLEE</Text>
                    </Text>
                </View>
                <View className="items-center justify-center flex-1 w-1/2 p-1">
                    <Text className="text-sm font-bold text-center text-blue-800 ">
                        GET FREE SHOPPING ON ALL ORDERS{" "}
                        <FontAwesome6
                            name="bag-shopping"
                            size={18}
                            color="#1e40af"
                        />
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default DiscountCard;
