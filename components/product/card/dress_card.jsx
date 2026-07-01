import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import Octicons from "@expo/vector-icons/Octicons";
import ClippedView from "@/components/product/clipped_view";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 44) / 2; // Exact card width matching the 16px page padding and 12px gap

const DressCard = React.memo(({ product, isLiked, onWishlistToggle, onAddToCart }) => {
    return (
        <View style={styles.dressCardContainer}>
            <TouchableRipple
                borderless
                onPress={() => {}}
                style={styles.dressCard}
            >
                <View>
                    <View style={styles.dressImgWrapper}>
                        <Image
                            source={{ uri: product.thumbnail }}
                            style={styles.imageFill}
                            resizeMode="cover"
                        />
                        {product.discountPercentage > 0 && (
                            <View style={styles.dressDiscountBadge}>
                                <ClippedView
                                    text={`${product.discountPercentage}% OFF`}
                                />
                            </View>
                        )}
                        <TouchableRipple
                            borderless
                            rippleColor={Colors.ripple}
                            onPress={() => onWishlistToggle(product)}
                            style={styles.heartButton}
                        >
                            <MaterialCommunityIcons
                                name={isLiked ? "heart" : "heart-outline"}
                                size={18}
                                color={isLiked ? Colors.primary : "black"}
                            />
                        </TouchableRipple>
                        <View style={styles.ratingOverlay}>
                            <Octicons
                                name="star-fill"
                                size={9}
                                color="green"
                            />
                            <Text style={styles.ratingText}>{product.rating}</Text>
                        </View>
                    </View>
                    <View style={styles.dressCardDetails}>
                        <Text numberOfLines={1} style={styles.cardBrand}>
                            {product.brand}
                        </Text>
                        <Text numberOfLines={1} style={styles.cardTitle}>
                            {product.title}
                        </Text>
                        <Text numberOfLines={2} style={styles.dressDesc}>
                            {product.description}
                        </Text>
                        <View style={styles.cardPriceRow}>
                            <View style={styles.priceContainer}>
                                <Text style={styles.cardPrice}>
                                    ${product.price}
                                </Text>
                                {product.originalPrice > product.price && (
                                    <Text style={styles.cardOriginalPrice}>
                                        ${product.originalPrice}
                                    </Text>
                                )}
                            </View>
                            <TouchableRipple
                                borderless
                                rippleColor={Colors.ripple}
                                onPress={() => onAddToCart(product)}
                                style={styles.cartButton}
                            >
                                <View style={styles.cartButtonContent}>
                                    <Ionicons
                                        name="bag-handle"
                                        size={16}
                                        color={Colors.primary}
                                    />
                                    <Text style={styles.cartButtonText}>Buy</Text>
                                </View>
                            </TouchableRipple>
                        </View>
                    </View>
                </View>
            </TouchableRipple>
        </View>
    );
});

const styles = StyleSheet.create({
    dressCardContainer: {
        width: COLUMN_WIDTH,
        marginBottom: 12,
    },
    dressCard: {
        width: "100%",
        backgroundColor: "#f9fafb",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        overflow: "hidden",
    },
    dressImgWrapper: {
        position: "relative",
        width: "100%",
        height: 200,
        backgroundColor: "#f3f4f6",
    },
    imageFill: {
        width: "100%",
        height: "100%",
    },
    dressDiscountBadge: {
        position: "absolute",
        top: 8,
        left: 8,
    },
    heartButton: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 2,
    },
    ratingOverlay: {
        position: "absolute",
        bottom: 8,
        left: 8,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 4,
        gap: 2,
    },
    ratingText: {
        fontSize: 9,
        fontWeight: "bold",
        color: "#111827",
    },
    dressCardDetails: {
        padding: 10,
    },
    cardBrand: {
        fontSize: 9,
        fontWeight: "bold",
        color: "#db2777",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#1f2937",
        marginTop: 1,
    },
    dressDesc: {
        fontSize: 10,
        color: "#6b7280",
        marginTop: 2,
        lineHeight: 13,
    },
    cardPriceRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    cardPrice: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#111827",
    },
    cardOriginalPrice: {
        fontSize: 10,
        color: "#9ca3af",
        textDecorationLine: "line-through",
    },
    cartButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#db2777",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },
    cartButtonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
    },
    cartButtonText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#db2777",
    },
});

DressCard.displayName = "DressCard";

export default DressCard;
