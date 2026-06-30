import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useCategories } from "@/hooks/useCategories";
import CategoriesSkeleton from "@/components/skeleton/CategoriesSkeleton";
import { Colors } from "../../constants/Colors";
import PageHeader from "../../components/PageHeader";

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
                backgroundColor: Colors.cardBg,
                borderRadius: 12,
                padding: 12,
                borderWidth: 1,
                borderColor: Colors.borderLight,
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
                        backgroundColor: Colors.bgPrimary,
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
                        color: Colors.textDark,
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
            <PageHeader title="CATEGORIES" showBack={false} />

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
