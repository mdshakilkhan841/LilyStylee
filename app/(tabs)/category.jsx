import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { Appbar, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";
import { useCategories } from "@/hooks/useCategories";
import CategoriesSkeleton from "@/components/skeleton/CategoriesSkeleton";
import { Colors } from "../../constants/Colors";

const { width } = Dimensions.get("window");
const numColumns = 3;
const itemWidth = (width - 48) / numColumns; // px-4 padding on both sides, 16px total gaps

export default function CategoryScreen() {
    const { data: categories = [], isLoading } = useCategories();

    const categoryImages = [
        require("@/assets/images/beauty.jpg"),
        require("@/assets/images/fashion.jpg"),
        require("@/assets/images/kids.jpg"),
        require("@/assets/images/mens.jpg"),
        require("@/assets/images/womans.jpg"),
    ];

    const renderItem = ({ item, index }) => (
        <TouchableRipple
            borderless
            rippleColor={Colors.ripple}
            style={{
                width: itemWidth,
                margin: 8,
                alignItems: "center",
                backgroundColor: "#f9fafb",
                borderRadius: 12,
                padding: 12,
                borderWidth: 1,
                borderColor: "#f3f4f6",
            }}
            onPress={() => {
                // Future categories routing
            }}
        >
            <View style={{ alignItems: "center", gap: 8 }}>
                <View
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: 36,
                        overflow: "hidden",
                        borderWidth: 2,
                        borderColor: Colors.primary,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={categoryImages[index % categoryImages.length]}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </View>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#1f2937",
                        textAlign: "center",
                    }}
                    numberOfLines={2}
                >
                    {item.name}
                </Text>
            </View>
        </TouchableRipple>
    );

    return (
        <View className="flex-1 bg-white">
            <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.BackAction
                    rippleColor={Colors.ripple}
                    onPress={() => router.back()}
                />
                <Appbar.Content
                    title="CATEGORIES"
                    titleStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
            </Appbar.Header>

            {isLoading || categories.length === 0 ? (
                <View className="flex-1 flex-row flex-wrap p-4 gap-4 justify-center">
                    {Array.from({ length: 9 }).map((_, idx) => (
                        <View
                            key={idx}
                            style={{ width: itemWidth, alignItems: "center" }}
                        >
                            <CategoriesSkeleton />
                        </View>
                    ))}
                </View>
            ) : (
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={numColumns}
                    contentContainerStyle={{
                        paddingHorizontal: 8,
                        paddingVertical: 12,
                    }}
                />
            )}
        </View>
    );
}
