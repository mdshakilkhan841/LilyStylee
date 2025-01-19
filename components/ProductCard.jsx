import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import mens from "@/assets/images/mens.jpg";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProductCard = () => {
    return (
        <View className="w-[185px]">
            <View className="w-full h-52">
                <Image source={mens} className="w-full h-full rounded-md" />
                <View className="absolute flex flex-row items-center justify-center px-1 rounded-full py-0.5 bottom-2 left-2 bg-white/80">
                    <View className="flex flex-row items-center gap-1 px-2 border-r border-slate-600">
                        <Text className="text-xs font-bold text-center text-black">
                            3.9
                        </Text>
                        <FontAwesome name="star" size={9} color="#db2777" />
                    </View>
                    <Text className="px-2 text-xs font-bold text-center text-black">
                        3.5k
                    </Text>
                </View>
            </View>
            {/* Title/Brand */}
            <View className="flex-row flex-wrap items-center justify-between w-full gap-1">
                <Text numberOfLines={1} className="font-bold w-[80%]">
                    Women Printed Kurta
                </Text>
                <TouchableOpacity activeOpacity={0.8} className="p-1">
                    <Feather name="heart" size={18} color="#db2777" />
                </TouchableOpacity>
            </View>
            {/* Description */}
            <Text numberOfLines={1} className="text-xs">
                Neque porro quisquam est qui dolorem ipsum quia
            </Text>
            {/* Price */}
            <View className="flex-row flex-wrap items-center w-full gap-1 py-0.5">
                <Text numberOfLines={1} className="">
                    ৳1000
                </Text>
                <Text numberOfLines={1} className="font-bold">
                    ৳800
                </Text>
                <Text numberOfLines={1} className="font-bold text-orange-600">
                    {72}% OFF
                </Text>
            </View>
            {/* Delivery time */}
            <Text numberOfLines={1} className="text-xs">
                Delivery in 2-3 days
            </Text>
            {/* Add to cart */}
        </View>
    );
};

export default ProductCard;
