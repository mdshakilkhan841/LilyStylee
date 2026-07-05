import { View, Text, Image } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import useWishListStore from "@/store/use_wishlist_store";
import useCartStore from "@/store/use_cart_store";
import { Button, TouchableRipple } from "react-native-paper";
import { Colors } from "@/constants/colors";
import toast from "@/utils/toast";

const WishListProductCard2 = React.memo(({ product, width }) => {
    const { addToCart } = useCartStore();
    const { removeFromWishList } = useWishListStore();

    const handleWishlist = () => {
        removeFromWishList(product.id);
        toast.success("Removed from Wishlist");
    };

    const handleAddToCart = () => {
        addToCart(product);
        removeFromWishList(product.id);
        toast.success("Moved to Bag");
    };

    const originalPrice =
        product?.price / (1 - product?.discountPercentage / 100);

    return (
        <View
            style={{
                width: width,
                backgroundColor: "#fff",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#f3f4f6",
                padding: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
            }}
        >
            <TouchableRipple
                rippleColor={Colors.ripple}
                onPress={() => {
                    router.push({
                        pathname: "/product_details",
                        params: { product: JSON.stringify(product) },
                    });
                }}
                style={{ borderRadius: 12, overflow: "hidden" }}
            >
                <View style={{ position: "relative" }}>
                    <Image
                        source={{ uri: product?.thumbnail }}
                        style={{
                            width: "100%",
                            height: 160,
                            resizeMode: "cover",
                            borderRadius: 12,
                        }}
                    />
                    
                    {/* Rating Badge */}
                    <View
                        style={{
                            position: "absolute",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 3,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                            borderRadius: 8,
                            bottom: 8,
                            left: 8,
                            backgroundColor: "rgba(255,255,255,0.9)",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 11,
                                fontWeight: "bold",
                                color: "#16a34a",
                            }}
                        >
                            {product?.rating}
                        </Text>
                        <Octicons
                            name="star-fill"
                            size={9}
                            color="#16a34a"
                        />
                    </View>

                    {/* Delete Icon */}
                    <TouchableRipple
                        rippleColor="rgba(239,68,68,0.2)"
                        borderless={true}
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(255,255,255,0.9)",
                            borderRadius: 20,
                            padding: 6,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 1,
                        }}
                        onPress={handleWishlist}
                    >
                        <Ionicons
                            name="close"
                            size={16}
                            color="#374151"
                        />
                    </TouchableRipple>
                </View>
            </TouchableRipple>

            <View style={{ marginTop: 8 }}>
                {/* Brand / Title */}
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#1f2937",
                    }}
                >
                    {product?.title}
                </Text>

                {/* Description */}
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 12,
                        color: "#6b7280",
                        marginTop: 2,
                    }}
                >
                    {product?.description}
                </Text>

                {/* Prices */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 4,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: Colors.primary,
                        }}
                    >
                        ${product?.price?.toFixed(2)}
                    </Text>
                    {product?.discountPercentage > 0 && (
                        <>
                            <Text
                                style={{
                                    fontSize: 11,
                                    textDecorationLine: "line-through",
                                    color: "#9ca3af",
                                }}
                            >
                                ${originalPrice?.toFixed(2)}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 10,
                                    fontWeight: "bold",
                                    color: Colors.success,
                                }}
                            >
                                {product?.discountPercentage?.toFixed()}% OFF
                            </Text>
                        </>
                    )}
                </View>

                {/* Shipping Info */}
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 11,
                        color: "#9ca3af",
                        marginTop: 2,
                    }}
                >
                    {product?.shippingInformation}
                </Text>

                {/* Move to Bag Button */}
                <Button
                    mode="contained"
                    buttonColor={Colors.primary}
                    textColor="#fff"
                    style={{
                        borderRadius: 24,
                        marginTop: 8,
                    }}
                    labelStyle={{
                        fontSize: 11,
                        fontWeight: "bold",
                        letterSpacing: 0.5,
                    }}
                    onPress={handleAddToCart}
                >
                    MOVE TO BAG
                </Button>
            </View>
        </View>
    );
});

WishListProductCard2.displayName = "WishListProductCard2";

export default WishListProductCard2;
