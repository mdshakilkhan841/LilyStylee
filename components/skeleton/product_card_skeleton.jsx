import { View, Dimensions } from "react-native";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Colors } from "@/constants/colors";

const ProductCardSkeleton = ({ width, cartButton = true }) => {
    const skeletonWidth = width || Dimensions.get("window").width / 2;
    const baseColor = Colors.skeletonBase;
    const highlightColor = Colors.skeletonHighlight;

    return (
        <View
            style={{
                width: skeletonWidth,
                borderRadius: 8,
                backgroundColor: "#fff",
                padding: 8,
                overflow: "hidden",
            }}
        >
            {/* Image skeleton */}
            <Skeleton
                width="100%"
                height={155}
                borderRadius={8}
                style={{ marginBottom: 8 }}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />
            
            {/* Title skeleton */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 6,
                }}
            >
                <Skeleton
                    width="70%"
                    height={18}
                    borderRadius={4}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
                <Skeleton
                    width="20%"
                    height={18}
                    borderRadius={4}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
            </View>

            {/* Description skeleton */}
            <Skeleton
                width="100%"
                height={12}
                borderRadius={4}
                style={{ marginBottom: 6 }}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />
            <Skeleton
                width="90%"
                height={12}
                borderRadius={4}
                style={{ marginBottom: 6 }}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />

            {/* Price skeleton */}
            <Skeleton
                width="50%"
                height={16}
                borderRadius={4}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />

            {/* Button skeleton */}
            {cartButton && (
                <Skeleton
                    width="100%"
                    height={28}
                    borderRadius={6}
                    style={{ marginTop: 8 }}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
            )}
        </View>
    );
};

export default ProductCardSkeleton;
