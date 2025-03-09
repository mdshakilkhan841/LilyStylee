import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";

const Categories = () => {
    const categories = [
        {
            name: "Beauty",
            image: require("@/assets/images/beauty.jpg"),
        },
        {
            name: "Fashion",
            image: require("@/assets/images/fashion.jpg"),
        },
        {
            name: "Kids",
            image: require("@/assets/images/kids.jpg"),
        },
        {
            name: "Mens",
            image: require("@/assets/images/mens.jpg"),
        },
        {
            name: "Womens",
            image: require("@/assets/images/womans.jpg"),
        },
        {
            name: "Kids",
            image: require("@/assets/images/kids.jpg"),
        },
        {
            name: "Mens",
            image: require("@/assets/images/mens.jpg"),
        },
        {
            name: "Womens",
            image: require("@/assets/images/womans.jpg"),
        },
    ];
    return (
        <ScrollView
            horizontal
            contentContainerStyle={{
                gap: 15,
                paddingHorizontal: 16,
                paddingVertical: 12,
            }}
            showsHorizontalScrollIndicator={false}
        >
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.6}
                    className="flex items-center gap-2"
                >
                    <View className="w-16 h-16 p-0.5 bg-white border border-pink-600 rounded-full">
                        <Image
                            source={category.image}
                            className="w-full h-full rounded-full"
                        />
                        <Octicons
                            name="check-circle-fill"
                            size={16}
                            color="#db2777"
                            className="absolute p-0.5 bg-slate-50 rounded-full -right-1 bottom-0"
                        />
                    </View>
                    <Text className="">{category.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Categories;
