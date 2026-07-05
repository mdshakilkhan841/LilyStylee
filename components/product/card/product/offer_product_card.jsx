import { View, Text, Image } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import useWishListStore from "@/store/use_wishlist_store";
import { Colors } from "@/constants/colors";
import { TouchableRipple } from "react-native-paper";
import toast from "@/utils/toast";

const OfferProductCard = React.memo(({ product, width }) => {
    const { addToWishList, removeFromWishList, wishList } = useWishListStore();

    const inWishList = wishList.some((item) => item.id === product.id);

    const handleWishlist = () => {
        if (inWishList) {
            removeFromWishList(product.id);
            toast.success("Removed from Wishlist");
        } else {
            addToWishList(product);
            toast.success("Added to Wishlist");
        }
    };

    const originalPrice =
        product?.price / (1 - product?.discountPercentage / 100);

    return (
        <View
            style={{
                width: width,
                backgroundColor: Colors.bgPrimary,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: Colors.borderLight,
                overflow: "hidden",
                padding: 6,
            }}
        >
            <TouchableRipple
                borderless
                onPress={() => {
                    router.push({
                        pathname: "/product_details",
                        params: { product: JSON.stringify(product) },
                    });
                }}
                style={{ borderRadius: 8, overflow: "hidden" }}
            >
                <View
                    style={{ position: "relative", width: "100%", height: 140 }}
                >
                    <Image
                        source={{ uri: product?.thumbnail }}
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            borderRadius: 8,
                        }}
                    />

                    {/* Deal Discount Badge */}
                    {product?.discountPercentage > 0 && (
                        <View
                            style={{
                                position: "absolute",
                                top: 6,
                                left: 6,
                                backgroundColor: Colors.error,
                                paddingHorizontal: 6,
                                paddingVertical: 2,
                                borderRadius: 4,
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors.bgPrimary,
                                    fontSize: 9,
                                    fontWeight: "bold",
                                }}
                            >
                                {product?.discountPercentage?.toFixed()}% OFF
                            </Text>
                        </View>
                    )}

                    {/* Wishlist Heart Icon */}
                    <TouchableRipple
                        rippleColor={Colors.ripple}
                        borderless={true}
                        style={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            backgroundColor: "rgba(255,255,255,0.9)",
                            borderRadius: 16,
                            padding: 5,
                            shadowColor: Colors.iconPrimary,
                            shadowOpacity: 0.05,
                            shadowRadius: 2,
                            elevation: 1,
                        }}
                        onPress={handleWishlist}
                    >
                        <Ionicons
                            name={inWishList ? "heart" : "heart-outline"}
                            size={16}
                            color={Colors.primary}
                        />
                    </TouchableRipple>

                    {/* Rating Tag */}
                    <View
                        style={{
                            position: "absolute",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 2,
                            paddingHorizontal: 5,
                            paddingVertical: 1.5,
                            borderRadius: 6,
                            bottom: 6,
                            left: 6,
                            backgroundColor: "rgba(255,255,255,0.9)",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: "bold",
                                color: Colors.success,
                            }}
                        >
                            {product?.rating}
                        </Text>
                        <Octicons name="star-fill" size={8} color={Colors.success} />
                    </View>
                </View>
            </TouchableRipple>

            {/* Content Details */}
            <View style={{ marginTop: 6, paddingHorizontal: 2 }}>
                {/* Brand */}
                {product?.brand && (
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: Colors.textMuted,
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                        }}
                    >
                        {product.brand}
                    </Text>
                )}

                {/* Title */}
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: Colors.textDark,
                        marginTop: 1,
                    }}
                >
                    {product?.title}
                </Text>

                {/* Prices Row */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 3,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: "bold",
                            color: Colors.primary,
                        }}
                    >
                        ${product?.price?.toFixed(2)}
                    </Text>
                    {product?.discountPercentage > 0 && (
                        <Text
                            style={{
                                fontSize: 10,
                                textDecorationLine: "line-through",
                                color: Colors.textMuted,
                            }}
                        >
                            ${originalPrice?.toFixed(2)}
                        </Text>
                    )}
                </View>

                {/* Delivery / Stock Highlights */}
                <View
                    style={{
                        marginTop: 2,
                        flexDirection: "row",
                        alignItems: "flex-start",
                        gap: 4,
                    }}
                >
                    <Octicons
                        name="clock"
                        size={10}
                        color={Colors.warning}
                        style={{ marginTop: 2 }}
                    />
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 10,
                            fontWeight: "600",
                            color: Colors.warning,
                            flex: 1,
                        }}
                    >
                        {product?.stock < 10
                            ? `Only ${product.stock} Left!`
                            : product?.shippingInformation || "Limited Offer"}
                    </Text>
                </View>
            </View>
        </View>
    );
});

OfferProductCard.displayName = "OfferProductCard";

export default OfferProductCard;
