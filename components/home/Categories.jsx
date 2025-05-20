import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { useCategoryStore } from "../../store/useCategoryStore";
import CategoriesSkeleton from "../skeleton/CategoriesSkeleton";

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

    if (loading || categories.length === 0)
        return (
            <View
                style={{
                    flexDirection: "row",
                    gap: 12,
                    padding: 12,
                }}
            >
                {Array.from({ length: 22 }).map((_, idx) => (
                    <CategoriesSkeleton key={idx} />
                ))}
            </View>
        );

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            style={{ alignItems: "center", gap: 6, marginRight: 6 }}
        >
            <View
                style={{
                    width: 64,
                    height: 64,
                    padding: 2,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#db2777",
                    borderRadius: 999,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    source={categoryImages[index % categoryImages.length]}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 999,
                    }}
                />
                <Octicons
                    name="check-circle-fill"
                    size={16}
                    color="#db2777"
                    style={{
                        position: "absolute",
                        right: -8,
                        bottom: 0,
                        backgroundColor: "#f1f5f9",
                        borderRadius: 999,
                        padding: 2,
                    }}
                />
            </View>
            <Text style={{ width: 80, textAlign: "center" }} numberOfLines={1}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            horizontal
            data={categories}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
                paddingHorizontal: 12,
                paddingVertical: 12,
            }}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default Categories;
