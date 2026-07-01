import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";
import { Colors } from "@/constants/colors";

const FragranceCardSkeleton = () => {
    const baseColor = Colors.skeletonBase;
    const highlightColor = Colors.skeletonHighlight;

    return (
        <View style={styles.cardContainerMargin}>
            <View style={styles.fragranceCard}>
                {/* Image Placeholder */}
                <Skeleton
                    width="100%"
                    height={150}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />

                <View style={styles.cardDetails}>
                    {/* Brand Placeholder */}
                    <Skeleton
                        width="50%"
                        height={10}
                        borderRadius={4}
                        style={{ marginBottom: 6 }}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    {/* Title Placeholder */}
                    <Skeleton
                        width="80%"
                        height={14}
                        borderRadius={4}
                        style={{ marginBottom: 12 }}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    {/* Price & Buy Button Placeholder Row */}
                    <View style={styles.cardPriceRow}>
                        <View style={styles.priceContainer}>
                            <Skeleton
                                width={35}
                                height={14}
                                borderRadius={4}
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                            <Skeleton
                                width={30}
                                height={11}
                                borderRadius={4}
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                        </View>
                        {/* Square Button Placeholder */}
                        <Skeleton
                            width={42}
                            height={26}
                            borderRadius={4}
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
    cardContainerMargin: {
        width: 150,
    },
    fragranceCard: {
        width: "100%",
        backgroundColor: Colors.bgPrimary,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        overflow: "hidden",
    },
    cardDetails: {
        padding: 10,
    },
    cardPriceRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 4,
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
});

FragranceCardSkeleton.displayName = "FragranceCardSkeleton";

export default FragranceCardSkeleton;
