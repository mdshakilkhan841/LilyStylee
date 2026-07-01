import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/colors";

const CosmeticCard = React.memo(({ product, isLiked, onWishlistToggle }) => {
    return (
        <View style={styles.cosmeticCard}>
            <View style={styles.cosmeticCircle}>
                <Image
                    source={{ uri: product.thumbnail }}
                    style={styles.imageFill}
                    resizeMode="cover"
                />
            </View>
            <Text numberOfLines={1} style={styles.cosmeticTitle}>
                {product.title}
            </Text>
            <Text numberOfLines={1} style={styles.cosmeticBrand}>
                {product.brand}
            </Text>
            <View style={styles.cosmeticBuyRow}>
                <View style={styles.cosmeticPriceContainer}>
                    <Text style={styles.cosmeticPrice}>${product.price}</Text>
                    <Text style={styles.cosmeticOriginalPrice}>
                        ${product.originalPrice}
                    </Text>
                </View>
                <TouchableRipple
                    borderless
                    rippleColor={Colors.ripple}
                    onPress={() => onWishlistToggle(product)}
                    style={styles.cosmeticHeartBtn}
                >
                    <MaterialCommunityIcons
                        name={isLiked ? "heart" : "heart-outline"}
                        size={13}
                        color={Colors.primary}
                    />
                </TouchableRipple>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    cosmeticCard: {
        width: 100,
        alignItems: "center",
    },
    cosmeticCircle: {
        position: "relative",
        width: 86,
        height: 86,
        borderRadius: 43,
        backgroundColor: Colors.primaryBg,
        borderWidth: 1,
        borderColor: Colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    imageFill: {
        width: "100%",
        height: "100%",
    },
    cosmeticTitle: {
        fontSize: 11,
        fontWeight: "bold",
        color: Colors.textDark,
        marginTop: 8,
        textAlign: "center",
        width: "100%",
        paddingHorizontal: 2,
    },
    cosmeticBrand: {
        fontSize: 9,
        color: Colors.textMuted,
        marginTop: 1,
    },
    cosmeticBuyRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 6,
    },
    cosmeticPriceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    cosmeticPrice: {
        fontSize: 11,
        fontWeight: "bold",
        color: Colors.textDark,
    },
    cosmeticOriginalPrice: {
        fontSize: 9,
        color: Colors.borderDark,
        textDecorationLine: "line-through",
    },
    cosmeticHeartBtn: {
        width: 26,
        height: 26,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
});

CosmeticCard.displayName = "CosmeticCard";

export default CosmeticCard;
