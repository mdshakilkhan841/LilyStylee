import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";

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
            image: require("@/assets/images/womens.jpg"),
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
            image: require("@/assets/images/womens.jpg"),
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
                    <Image
                        source={category.image}
                        className="w-16 h-16 rounded-full"
                    />
                    {/* <View className="w-16 h-16 bg-red-300 rounded-full"></View> */}
                    <Text className="">{category.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Categories;
