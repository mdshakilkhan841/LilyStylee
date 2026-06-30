import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import useWishListStore from "../../store/useWishListStore";
import useCartStore from "../../store/useCartStore";
import { Colors } from "../../constants/Colors";

const CategoryProductCard = React.memo(({ product, width }) => {
    const addToWishList = useWishListStore((state) => state.addToWishList);
    const removeFromWishList = useWishListStore((state) => state.removeFromWishList);
    const inWishList = useWishListStore((state) => state.wishList.some((item) => item.id === product.id));
    const addToCart = useCartStore((state) => state.addToCart);

    const handleWishlist = () => {
        if (inWishList) {
            removeFromWishList(product.id);
        } else {
            addToWishList(product);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    const originalPrice = product?.price / (1 - product?.discountPercentage / 100);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                router.push({
                    pathname: "/productDetails",
                    params: { product: JSON.stringify(product) },
                });
            }}
            style={{
                width: width,
                backgroundColor: Colors.cardBg,
                borderRadius: 8,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: Colors.borderLight,
                padding: 6,
            }}
        >
            {/* Image Section */}
            <View style={{ width: "100%", height: 120, position: "relative", backgroundColor: Colors.bgPrimary, borderRadius: 6, overflow: "hidden" }}>
                <Image
                    source={{ uri: product?.thumbnail }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                    fadeDuration={0}
                />
                
                {/* Wishlist Heart Icon floating top-right */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleWishlist}
                    style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Octicons
                        name={inWishList ? "heart-fill" : "heart"}
                        size={13}
                        color={Colors.primary}
                    />
                </TouchableOpacity>

                {/* Rating Badge floating bottom-left */}
                {product?.rating && (
                    <View
                        style={{
                            position: "absolute",
                            bottom: 6,
                            left: 6,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                            borderRadius: 4,
                            gap: 2,
                        }}
                    >
                        <Text style={{ fontSize: 9, fontWeight: "bold", color: Colors.textDark }}>
                            {product.rating.toFixed(1)}
                        </Text>
                        <Octicons name="star-fill" size={8} color="#eab308" />
                    </View>
                )}
            </View>

            {/* Info Section */}
            <View style={{ marginTop: 6, paddingHorizontal: 2 }}>
                {/* Title */}
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: Colors.textDark,
                    }}
                >
                    {product?.title}
                </Text>

                {/* Brand */}
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 10,
                        color: Colors.textMuted,
                        marginTop: 1,
                    }}
                >
                    {product?.brand || "Brand"}
                </Text>

                {/* Price and Add button Container */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 4,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 3 }}>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: Colors.textDark }}>
                                ${product?.price?.toFixed()}
                            </Text>
                            {product?.discountPercentage > 0 && (
                                <Text style={{ fontSize: 9, color: Colors.textMuted, textDecorationLine: "line-through" }}>
                                    ${originalPrice?.toFixed(0)}
                                </Text>
                            )}
                        </View>
                        {product?.discountPercentage > 0 && (
                            <Text style={{ fontSize: 8, fontWeight: "bold", color: Colors.primary }}>
                                {product.discountPercentage.toFixed(0)}% OFF
                            </Text>
                        )}
                    </View>

                    {/* Small round Add-to-bag button */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleAddToCart}
                        style={{
                            backgroundColor: Colors.primary,
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MaterialCommunityIcons name="plus" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
});

CategoryProductCard.displayName = "CategoryProductCard";

export default CategoryProductCard;
