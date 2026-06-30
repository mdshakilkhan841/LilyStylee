import { View } from "react-native";
import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Colors } from "../../constants/Colors";

const CategoryProductCardSkeleton = React.memo(({ width }) => {
    const baseColor = Colors.skeletonBase;
    const highlightColor = Colors.skeletonHighlight;

    return (
        <View
            style={{
                width: width,
                backgroundColor: Colors.cardBg,
                borderRadius: 8,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: Colors.borderLight,
                padding: 6,
            }}
        >
            {/* Image section skeleton */}
            <Skeleton
                width="100%"
                height={120}
                borderRadius={6}
                style={{ marginBottom: 6 }}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />

            {/* Brand text skeleton */}
            <Skeleton
                width="60%"
                height={10}
                borderRadius={3}
                style={{ marginBottom: 4, marginTop: 2 }}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />

            {/* Title text skeleton */}
            <Skeleton
                width="85%"
                height={13}
                borderRadius={4}
                style={{ marginBottom: 6 }}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />

            {/* Price and Cart Button row skeleton */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                <View style={{ gap: 4, flex: 1 }}>
                    <Skeleton
                        width="80%"
                        height={14}
                        borderRadius={4}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton
                        width="50%"
                        height={9}
                        borderRadius={3}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </View>
                {/* Small round add button skeleton */}
                <Skeleton
                    width={26}
                    height={26}
                    borderRadius={13}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
            </View>
        </View>
    );
});

CategoryProductCardSkeleton.displayName = "CategoryProductCardSkeleton";

export default CategoryProductCardSkeleton;
