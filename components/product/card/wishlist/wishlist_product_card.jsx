import { View, Text, Image } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import ClippedView from "@/components/product/clipped_view";
import { router } from "expo-router";
import useWishListStore from "@/store/use_wishlist_store";
import useCartStore from "@/store/use_cart_store";
import { Button, TouchableRipple } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import toast from "@/utils/toast";

// ==========================================
// VERSION 1: Rectangular with colored borders and full-width gradient button
// ==========================================
export const WishListProductCard = React.memo(({ product, width }) => {
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
        <TouchableRipple
            rippleColor={Colors.ripple}
            onPress={() => {
                router.push({
                    pathname: "/product_details",
                    params: { product: JSON.stringify(product) },
                });
            }}
            style={{
                width: width,
                backgroundColor: "#fff",
                paddingVertical: 6,
                borderWidth: 1.5,
                borderColor: Colors.primary,
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
            }}
        >
            <View>
                <View style={{ paddingHorizontal: 6 }}>
                    <View
                        style={{
                            width: "100%",
                            height: 180,
                            overflow: "hidden",
                            backgroundColor: "#f9fafb",
                        }}
                    >
                        <Image
                            source={{ uri: product?.thumbnail }}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "contain",
                                borderRadius: 12,
                            }}
                        />
                        <View
                            style={{
                                position: "absolute",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingHorizontal: 8,
                                borderRadius: 12,
                                paddingVertical: 2,
                                bottom: 8,
                                left: 8,
                                backgroundColor: "rgba(255,255,255,0.85)",
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 3,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: "bold",
                                        color: "#16a34a",
                                    }}
                                >
                                    {product?.rating}
                                </Text>
                                <Octicons
                                    name="star-fill"
                                    size={10}
                                    color="#16a34a"
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    color: "#334155",
                                    marginLeft: 8,
                                    borderLeftWidth: 1,
                                    borderLeftColor: "#64748b",
                                    paddingLeft: 8,
                                }}
                            >
                                {product?.reviews?.length}
                            </Text>
                        </View>
                        <TouchableRipple
                            rippleColor={Colors.ripple}
                            borderless={true}
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                backgroundColor: "#fff",
                                borderRadius: 16,
                                padding: 2,
                                shadowColor: Colors.primary,
                                shadowOpacity: 0.15,
                                shadowRadius: 4,
                            }}
                            onPress={handleWishlist}
                        >
                            <View style={{ padding: 2 }}>
                                <Ionicons
                                    name="close-sharp"
                                    size={22}
                                    color={Colors.primary}
                                />
                            </View>
                        </TouchableRipple>
                    </View>
                    {/* Title/Brand */}
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            marginTop: 8,
                            color: "#1e293b",
                        }}
                    >
                        {product?.title}
                    </Text>
                    {/* Description */}
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 12,
                            color: "#64748b",
                            marginBottom: 2,
                        }}
                    >
                        {product?.description}
                    </Text>
                    {/* Price */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 6,
                            marginVertical: 2,
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 12,
                                textDecorationLine: "line-through",
                                color: "#a1a1aa",
                            }}
                        >
                            ${originalPrice?.toFixed(2)}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: Colors.primary,
                            }}
                        >
                            ${product?.price?.toFixed()}
                        </Text>
                        {product?.discountPercentage?.toFixed() > 0 && (
                            <ClippedView
                                text={`${product?.discountPercentage?.toFixed()}% OFF`}
                            />
                        )}
                    </View>
                </View>
                <LinearGradient
                    colors={["rgba(234,88,12,0.6)", Colors.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        marginTop: 8,
                    }}
                >
                    <Button
                        mode="contained"
                        buttonColor="transparent"
                        textColor="#fff"
                        labelStyle={{
                            fontSize: 13,
                            fontWeight: "bold",
                            letterSpacing: 1,
                        }}
                        style={{
                            borderRadius: 8,
                            backgroundColor: "transparent",
                            elevation: 0,
                        }}
                        onPress={handleAddToCart}
                    >
                        MOVE TO BAG
                    </Button>
                </LinearGradient>
            </View>
        </TouchableRipple>
    );
});

WishListProductCard.displayName = "WishListProductCard";

// ==========================================
// VERSION 2: Rounded cards, subtle border, transparent overlay elements
// ==========================================
export const WishListProductCard2 = React.memo(({ product, width }) => {
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
                padding: 8,
            }}
        >
            <TouchableRipple
                borderless
                // rippleColor={Colors.ripple}
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
                        <Octicons name="star-fill" size={9} color="#16a34a" />
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
                        <Ionicons name="close" size={16} color="#374151" />
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

                {/* Move to Bag Button */}
                <Button
                    mode="contained"
                    buttonColor={Colors.primary}
                    textColor="#fff"
                    icon={({ size, color }) => (
                        <Fontisto
                            name="shopping-bag-1"
                            size={20}
                            color={color}
                        />
                    )}
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

// ==========================================
// VERSION 3: Borderless outline card, padded text details, full-width button
// ==========================================
export const WishListProductCard3 = React.memo(({ product, width }) => {
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
                        <Ionicons name="close" size={16} color="#374151" />
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
                        <Fontisto
                            name="shopping-bag-1"
                            size={20}
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

// Default export is version 1 for backward compatibility
export default WishListProductCard;
