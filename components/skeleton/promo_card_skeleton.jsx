import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";
import { Colors } from "@/constants/colors";

const PromoCardSkeleton = () => {
    const baseColor = Colors.skeletonBase;
    const highlightColor = Colors.skeletonHighlight;

    return (
        <View style={styles.promoCard}>
            <View style={styles.promoRowLayout}>
                {/* Image Placeholder */}
                <Skeleton
                    width={100}
                    height="100%"
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
                <View style={styles.promoDetails}>
                    {/* Discount Tag Placeholder */}
                    <Skeleton
                        width={60}
                        height={16}
                        borderRadius={4}
                        style={{ marginBottom: 8 }}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    {/* Title Placeholder */}
                    <Skeleton
                        width="80%"
                        height={14}
                        borderRadius={4}
                        style={{ marginBottom: 6 }}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    {/* Description Line Placeholder */}
                    <Skeleton
                        width="90%"
                        height={10}
                        borderRadius={4}
                        style={{ marginBottom: 12 }}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    {/* Price Row Placeholder */}
                    <View style={styles.promoPriceRow}>
                        <Skeleton
                            width={40}
                            height={14}
                            borderRadius={4}
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                        <Skeleton
                            width={35}
                            height={12}
                            borderRadius={4}
                            style={{ marginLeft: 6 }}
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    promoCard: {
        width: 280,
        height: 124,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#f3f4f6",
        overflow: "hidden",
    },
    promoRowLayout: {
        flexDirection: "row",
        height: "100%",
        width: "100%",
    },
    promoDetails: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
    },
    promoPriceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
});

PromoCardSkeleton.displayName = "PromoCardSkeleton";

export default PromoCardSkeleton;
