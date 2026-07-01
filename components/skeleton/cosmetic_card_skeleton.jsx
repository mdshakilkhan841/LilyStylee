import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";
import { Colors } from "@/constants/colors";

const CosmeticCardSkeleton = () => {
    const baseColor = Colors.skeletonBase;
    const highlightColor = Colors.skeletonHighlight;

    return (
        <View style={styles.cosmeticCard}>
            {/* Circle image placeholder */}
            <Skeleton
                width={86}
                height={86}
                borderRadius={43}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />
            {/* Title Placeholder */}
            <Skeleton
                width="80%"
                height={11}
                borderRadius={4}
                style={{ marginTop: 10, alignSelf: "center" }}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />
            {/* Brand Placeholder */}
            <Skeleton
                width="50%"
                height={9}
                borderRadius={4}
                style={{ marginTop: 4, alignSelf: "center" }}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />
            {/* Price & Heart Button Row */}
            <View style={styles.cosmeticBuyRow}>
                <View style={styles.cosmeticPriceContainer}>
                    <Skeleton
                        width={25}
                        height={11}
                        borderRadius={4}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton
                        width={22}
                        height={9}
                        borderRadius={4}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </View>
                {/* Square Wishlist Icon Placeholder */}
                <Skeleton
                    width={26}
                    height={26}
                    borderRadius={4}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cosmeticCard: {
        width: 100,
        alignItems: "center",
    },
    cosmeticBuyRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 8,
    },
    cosmeticPriceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
});

CosmeticCardSkeleton.displayName = "CosmeticCardSkeleton";

export default CosmeticCardSkeleton;
