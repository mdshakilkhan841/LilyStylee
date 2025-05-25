import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import ClippedView from "./ClippedView";
import { router } from "expo-router";
import useWishListStore from "../../store/useWishListStore";
import useCartStore from "../../store/useCartStore";
import { Button } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";

const WishListProductCard = React.memo(({ product, width }) => {
    const { addToCart } = useCartStore();
    const { addToWishList, removeFromWishList, isInWishList } =
        useWishListStore();
    const inWishList = isInWishList(product.id);

    const handleWishlist = () => {
        if (inWishList) {
            removeFromWishList(product.id);
        } else {
            addToWishList(product);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        removeFromWishList(product.id);
    };

    const originalPrice =
        product?.price / (1 - product?.discountPercentage / 100);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                router.push({
                    pathname: "productDetails",
                    params: { product: JSON.stringify(product) },
                });
            }}
            style={{
                width: width,
                backgroundColor: "#fff",
                // borderRadius: 2,
                paddingVertical: 6,
                borderWidth: 1.5,
                borderColor: "#db2777",
                shadowColor: "#db2777",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
            }}
        >
            <View style={{ paddingHorizontal: 6 }}>
                <View
                    style={{
                        width: "100%",
                        height: 180,
                        // borderRadius: 12,
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
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "#fff",
                            borderRadius: 16,
                            padding: 2,
                            shadowColor: "#db2777",
                            shadowOpacity: 0.15,
                            shadowRadius: 4,
                        }}
                        onPress={handleWishlist}
                    >
                        <Ionicons
                            name="close-sharp"
                            size={22}
                            color="#db2777"
                        />
                    </TouchableOpacity>
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
                            color: "#db2777",
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
                {/* Delivery time */}
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 12,
                        color: "#334155",
                        marginBottom: 4,
                    }}
                >
                    {product?.shippingInformation}
                </Text>
            </View>
            {/* Add to cart */}
            {/* <Button
                mode="contained"
                buttonColor="#db2777"
                textColor="#fff"
                labelStyle={{
                    fontSize: 13,
                    fontWeight: "bold",
                    letterSpacing: 1,
                }}
                style={{
                    borderRadius: 0,
                    marginTop: 8,
                    backgroundColor: "#db2777",
                    elevation: 0,
                }}
                onPress={handleAddToCart}
            >
                MOVE TO BAG
            </Button> */}
            <LinearGradient
                colors={["rgba(234,88,12,0.6)", "#db2777"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    // borderRadius: 8,
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
        </TouchableOpacity>
    );
});

export default WishListProductCard;
