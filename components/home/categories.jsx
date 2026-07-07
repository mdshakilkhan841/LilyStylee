import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { useCategories } from "@/hooks/use_categories";
import CategoriesSkeleton from "@/components/skeleton/categories_skeleton";
import { Colors } from "@/constants/colors";
import { TouchableRipple } from "react-native-paper";

const Categories = () => {
    const { data: categories = [], isLoading } = useCategories();
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

    if (isLoading || categories.length === 0)
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
        <View key={index} style={{ alignItems: "center", gap: 4 }}>
            <View style={{ width: 64, height: 64 }}>
                <TouchableRipple
                    borderless={true}
                    rippleColor={Colors.ripple}
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        overflow: "hidden",
                    }}
                    onPress={() => {}}
                >
                    <View
                        style={{
                            width: 64,
                            height: 64,
                            padding: 2,
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: Colors.primary,
                            borderRadius: 32,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={
                                categoryImages[index % categoryImages.length]
                            }
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 32,
                            }}
                        />
                    </View>
                </TouchableRipple>
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
            <Text
                style={{ width: 64, textAlign: "center", fontSize: 10 }}
                numberOfLines={1}
            >
                {item.name}
            </Text>
        </View>
    );

    return (
        <FlatList
            horizontal
            data={categories}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 12,
                paddingTop: 12,
                gap: 12,
            }}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default Categories;
