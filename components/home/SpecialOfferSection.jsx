import { View, Text, Image } from "react-native";
import React from "react";

const SpecialOfferSection = () => {
    return (
        <View className="">
            <Image className="w-14 h-14" />
            <Text className="text-sm font-bold text-center">
                Special Offers
            </Text>
            <View className="flex-row flex-wrap items-center justify-between w-full gap-1">
                <Text numberOfLines={1} className="text-xs">
                    Get 10% off on all orders
                </Text>
                <Text numberOfLines={1} className="text-xs">
                    $10 off
                </Text>
            </View>
        </View>
    );
};

export default SpecialOfferSection;
