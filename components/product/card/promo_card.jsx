import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import ClippedView from "@/components/product/clipped_view";
import { Colors } from "@/constants/colors";

const PromoCard = React.memo(({ promo, onPress }) => {
    return (
        <TouchableRipple
            borderless
            onPress={onPress}
            style={styles.promoCard}
        >
            <View style={styles.promoRowLayout}>
                <Image source={{ uri: promo.image }} style={styles.promoImg} />
                <View style={styles.promoDetails}>
                    <View style={styles.promoBadgeWrapper}>
                        <ClippedView text={`${promo.discount}% OFF`} />
                    </View>
                    <Text numberOfLines={1} style={styles.promoTitle}>
                        {promo.title}
                    </Text>
                    <Text numberOfLines={2} style={styles.promoItems}>
                        {promo.items}
                    </Text>
                    <View style={styles.promoPriceRow}>
                        <Text style={styles.promoPrice}>${promo.price}</Text>
                        <Text style={styles.promoOriginalPrice}>
                            ${promo.originalPrice}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableRipple>
    );
});

const styles = StyleSheet.create({
    promoCard: {
        width: 280,
        height: 124,
        backgroundColor: Colors.bgPrimary,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        overflow: "hidden",
    },
    promoRowLayout: {
        flexDirection: "row",
        height: "100%",
        width: "100%",
    },
    promoImg: {
        width: 100,
        height: "100%",
    },
    promoDetails: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
    },
    promoBadgeWrapper: {
        alignSelf: "flex-start",
        marginBottom: 4,
    },
    promoTitle: {
        fontSize: 13,
        fontWeight: "bold",
        color: Colors.textDark,
    },
    promoItems: {
        fontSize: 10,
        color: Colors.textMuted,
        marginTop: 2,
        lineHeight: 13,
    },
    promoPriceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    promoPrice: {
        fontSize: 13,
        fontWeight: "bold",
        color: Colors.primary,
    },
    promoOriginalPrice: {
        fontSize: 10,
        textDecorationLine: "line-through",
        color: Colors.borderDark,
        marginLeft: 6,
    },
});

PromoCard.displayName = "PromoCard";

export default PromoCard;
