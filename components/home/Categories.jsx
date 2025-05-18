import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { useCategoryStore } from "../../store/useCategoryStore";
import { ActivityIndicator } from "react-native-paper";

const Categories = () => {
    const { categories, loading, fetchCategories } = useCategoryStore();
    const categoryImages = [
        require("@/assets/images/beauty.jpg"),
        require("@/assets/images/fashion.jpg"),
        require("@/assets/images/kids.jpg"),
        require("@/assets/images/mens.jpg"),
        require("@/assets/images/womans.jpg"),
        require("@/assets/images/kids.jpg"),
        require("@/assets/images/mens.jpg"),
        require("@/assets/images/womans.jpg"),
    ];

    useEffect(() => {
        if (categories.length === 0) fetchCategories();
    }, []);

    if (loading && categories.length === 0)
        return <ActivityIndicator style={{ margin: 16 }} />;
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
                            source={
                                categoryImages[index % categoryImages.length]
                            }
                            className="w-full h-full rounded-full"
                        />
                        <Octicons
                            name="check-circle-fill"
                            size={16}
                            color="#db2777"
                            className="absolute p-0.5 bg-slate-50 rounded-full -right-1 bottom-0"
                        />
                    </View>
                    <Text className="w-20 text-center" numberOfLines={1}>
                        {category.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Categories;
