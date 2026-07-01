import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";
import { Colors } from "@/constants/colors";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 44) / 2; // Matching exact COLUMN_WIDTH of DressCard

const DressCardSkeleton = () => {
    const baseColor = Colors.skeletonBase;
    const highlightColor = Colors.skeletonHighlight;

    return (
        <View style={styles.dressCardContainer}>
            <View style={styles.dressCard}>
                {/* Image Placeholder */}
                <Skeleton
                    width="100%"
                    height={200}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />

                <View style={styles.dressCardDetails}>
                    {/* Brand Placeholder */}
                    <Skeleton
                        width="40%"
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
                        style={{ marginBottom: 6 }}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    {/* Description lines */}
                    <Skeleton
                        width="100%"
                        height={10}
                        borderRadius={4}
                        style={{ marginBottom: 4 }}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton
                        width="90%"
                        height={10}
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
    dressCardContainer: {
        width: COLUMN_WIDTH,
        marginBottom: 12,
    },
    dressCard: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#f3f4f6",
        overflow: "hidden",
    },
    dressCardDetails: {
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

DressCardSkeleton.displayName = "DressCardSkeleton";

export default DressCardSkeleton;
