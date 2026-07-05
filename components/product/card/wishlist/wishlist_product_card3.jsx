import { View, Text, Image } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import useWishListStore from "@/store/use_wishlist_store";
import useCartStore from "@/store/use_cart_store";
import { TouchableRipple } from "react-native-paper";
import { Colors } from "@/constants/colors";
import toast from "@/utils/toast";

const WishListProductCard3 = React.memo(({ product, width }) => {
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
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#f3f4f6",
                overflow: "hidden",
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
            >
                <View style={{ position: "relative" }}>
                    <Image
                        source={{ uri: product?.thumbnail }}
                        style={{
                            width: "100%",
                            height: 170,
                            resizeMode: "cover",
                        }}
                    />

                    {/* Sale Badge */}
                    {product?.discountPercentage > 0 && (
                        <View
                            style={{
                                position: "absolute",
                                top: 8,
                                left: 8,
                                backgroundColor: "#000000",
                                paddingHorizontal: 8,
                                paddingVertical: 3,
                                borderRadius: 4,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#ffffff",
                                    fontSize: 9,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                }}
                            >
                                {product?.discountPercentage?.toFixed()}% OFF
                            </Text>
                        </View>
                    )}

                    {/* Dismiss Button */}
                    <TouchableRipple
                        rippleColor="rgba(239,68,68,0.2)"
                        borderless={true}
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(255,255,255,0.9)",
                            borderRadius: 16,
                            padding: 6,
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

            <View style={{ padding: 16, paddingBottom: 12 }}>
                {/* Brand / Title & Rating */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 13,
                            fontWeight: "700",
                            color: "#111827",
                            flex: 1,
                            marginRight: 4,
                        }}
                    >
                        {product?.title}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Octicons name="star-fill" size={9} color="#eab308" />
                        <Text
                            style={{
                                fontSize: 11,
                                fontWeight: "600",
                                color: "#4b5563",
                            }}
                        >
                            {product?.rating?.toFixed(1)}
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 11,
                        color: "#6b7280",
                        marginTop: 2,
                    }}
                >
                    {product?.description}
                </Text>

                {/* Price Row */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "baseline",
                        gap: 6,
                        marginTop: 6,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "800",
                            color: "#111827",
                        }}
                    >
                        ${product?.price?.toFixed(2)}
                    </Text>
                    {product?.discountPercentage > 0 && (
                        <Text
                            style={{
                                fontSize: 11,
                                textDecorationLine: "line-through",
                                color: "#9ca3af",
                            }}
                        >
                            ${originalPrice?.toFixed(2)}
                        </Text>
                    )}
                </View>
            </View>

            {/* Full-width bottom button area flush with borders */}
            <View
                style={{
                    borderTopWidth: 1,
                    borderColor: "#f3f4f6",
                }}
            >
                <TouchableRipple
                    onPress={handleAddToCart}
                    style={{ paddingVertical: 12 }}
                    rippleColor="rgba(219,39,119,0.1)"
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                        }}
                    >
                        <MaterialCommunityIcons
                            name="shopping-outline"
                            size={14}
                            color={Colors.primary}
                        />
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: "700",
                                color: Colors.primary,
                                letterSpacing: 0.5,
                            }}
                        >
                            MOVE TO BAG
                        </Text>
                    </View>
                </TouchableRipple>
            </View>
        </View>
    );
});

WishListProductCard3.displayName = "WishListProductCard3";

export default WishListProductCard3;
