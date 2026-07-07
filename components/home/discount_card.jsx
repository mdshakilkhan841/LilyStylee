import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "@/constants/colors";
import * as Clipboard from "expo-clipboard";
import toast from "@/utils/toast";
import { TouchableRipple } from "react-native-paper";

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

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync("LILYSTYLEE");
        // toast.success("Code LILYSTYLEE copied!");
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
                    HURRY TIMES&apos;S TICKING
                </Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 16,
                    borderWidth: 1.2,
                    borderColor: Colors.primary,
                    borderStyle: "dashed",
                    borderRadius: 50,
                    backgroundColor: Colors.bgPrimary,
                }}
            >
                <TouchableRipple
                    borderless
                    onPress={copyToClipboard}
                    rippleColor={Colors.ripple}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50%",
                        paddingHorizontal: 6,
                        paddingVertical: 10,
                        borderTopLeftRadius: 50,
                        borderBottomLeftRadius: 50,
                    }}
                >
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: Colors.info,
                            }}
                        >
                            EXTRA 10% OFF
                        </Text>
                        <Text
                            style={{
                                fontSize: 11,
                                color: Colors.textMuted,
                                marginTop: 2,
                            }}
                        >
                            Use Code :{" "}
                            <Text
                                style={{
                                    fontWeight: "700",
                                    color: Colors.textDark,
                                }}
                            >
                                LILYSTYLEE
                            </Text>
                        </Text>
                    </View>
                </TouchableRipple>

                {/* Full-Height Centered Vertical Divider */}
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: "50%",
                        width: 1.2,
                        backgroundColor: "transparent",
                        borderLeftWidth: 1.2,
                        borderLeftColor: Colors.primary,
                        borderStyle: "dashed",
                    }}
                />

                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50%",
                        paddingHorizontal: 8,
                        paddingVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 11,
                            fontWeight: "bold",
                            textAlign: "center",
                            color: Colors.info,
                            lineHeight: 14,
                        }}
                    >
                        GET FREE SHIPPING ON ALL ORDERS{" "}
                        <FontAwesome6
                            name="bag-shopping"
                            size={12}
                            color={Colors.info}
                        />
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default DiscountCard;
