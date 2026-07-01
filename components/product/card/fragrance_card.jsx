import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import Octicons from "@expo/vector-icons/Octicons";

const FragranceCard = React.memo(({ product, isLiked, onWishlistToggle, onAddToCart }) => {
    return (
        <View style={styles.cardContainerMargin}>
            <TouchableRipple
                borderless
                onPress={() => {}}
                style={styles.fragranceCard}
            >
                <View>
                    <View style={styles.fragranceImgWrapper}>
                        <Image
                            source={{ uri: product.thumbnail }}
                            style={styles.imageFill}
                            resizeMode="cover"
                        />
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
                    <View style={styles.cardDetails}>
                        <Text numberOfLines={1} style={styles.cardBrand}>
                            {product.brand}
                        </Text>
                        <Text numberOfLines={1} style={styles.cardTitle}>
                            {product.title}
                        </Text>
                        <View style={styles.cardPriceRow}>
                            <View style={styles.priceContainer}>
                                <Text style={styles.cardPrice}>
                                    ${product.price}
                                </Text>
                                <Text style={styles.cardOriginalPrice}>
                                    ${product.originalPrice}
                                </Text>
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
    cardContainerMargin: {
        width: 150,
    },
    fragranceCard: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#f3f4f6",
        overflow: "hidden",
    },
    fragranceImgWrapper: {
        position: "relative",
        width: "100%",
        height: 150,
        backgroundColor: "#f3f4f6",
    },
    imageFill: {
        width: "100%",
        height: "100%",
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
    cardDetails: {
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

FragranceCard.displayName = "FragranceCard";

export default FragranceCard;
