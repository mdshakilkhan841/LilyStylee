import { View, Text, Image } from "react-native";
import React from "react";
import superPrice from "@/assets/images/super-price-twenty.png";

const SpecialOfferSection = () => {
    return (
        <View className="flex-row items-center justify-center gap-3 my-4 py-0.5 bg-pink-50">
            <Image source={superPrice} className="w-16 h-16" />
            <View>
                <Text className="font-bold">
                    Special Offers UP TO 20% OFF 😱
                </Text>
                <Text numberOfLines={2} className="text-xs">
                    {` We make sure you get the offer\n you need at best prices`}
                </Text>
            </View>
        </View>
    );
};

export default SpecialOfferSection;
