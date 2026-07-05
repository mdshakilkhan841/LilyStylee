import { View } from "react-native";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Colors } from "@/constants/colors";

const baseColor = Colors.skeletonBase || "#f3f4f6";
const highlightColor = Colors.skeletonHighlight || "rgba(255, 255, 255, 0.6)";

// ==========================================
// SKELETON 1: Matches Version 1 (sharp border, primary color frame)
// ==========================================
export const WishListProductCardSkeleton1 = React.memo(({ width }) => {
    return (
        <View
            style={{
                width: width,
                backgroundColor: "#fff",
                paddingVertical: 6,
                paddingHorizontal: 6,
                borderWidth: 1.5,
                borderColor: Colors.primary,
            }}
        >
            {/* Image Placeholder */}
            <View
                style={{
                    width: "100%",
                    height: 180,
                    backgroundColor: "#f9fafb",
                    borderRadius: 12,
                    overflow: "hidden",
                }}
            >
                <Skeleton
                    width="100%"
                    height="100%"
                    borderRadius={12}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
            </View>

            {/* Details */}
            <View style={{ paddingHorizontal: 4 }}>
                <Skeleton
                    width="75%"
                    height={16}
                    borderRadius={4}
                    style={{ marginTop: 10 }}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
                <Skeleton
                    width="90%"
                    height={12}
                    borderRadius={4}
                    style={{ marginTop: 6 }}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
                
                {/* Price Row */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
                    <Skeleton
                        width="30%"
                        height={16}
                        borderRadius={4}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton
                        width="20%"
                        height={12}
                        borderRadius={4}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </View>
            </View>

            {/* Rectangular Button */}
            <Skeleton
                width="100%"
                height={36}
                borderRadius={8}
                style={{ marginTop: 12 }}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />
        </View>
    );
});

WishListProductCardSkeleton1.displayName = "WishListProductCardSkeleton1";

// ==========================================
// SKELETON 2: Matches Version 2 (rounded border, rounded button)
// ==========================================
export const WishListProductCardSkeleton2 = React.memo(({ width }) => {
    return (
        <View
            style={{
                width: width,
                backgroundColor: "#fff",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#f3f4f6",
                padding: 8,
            }}
        >
            {/* Image Placeholder */}
            <Skeleton
                width="100%"
                height={160}
                borderRadius={12}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />

            {/* Details */}
            <View style={{ marginTop: 8 }}>
                <Skeleton
                    width="70%"
                    height={15}
                    borderRadius={4}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
                <Skeleton
                    width="95%"
                    height={12}
                    borderRadius={4}
                    style={{ marginTop: 6 }}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />

                {/* Price Row */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
                    <Skeleton
                        width="35%"
                        height={16}
                        borderRadius={4}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton
                        width="20%"
                        height={12}
                        borderRadius={4}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </View>

                {/* Capsule Button */}
                <Skeleton
                    width="100%"
                    height={36}
                    borderRadius={24}
                    style={{ marginTop: 10 }}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
            </View>
        </View>
    );
});

WishListProductCardSkeleton2.displayName = "WishListProductCardSkeleton2";

// ==========================================
// SKELETON 3: Matches Version 3 (overflow hidden, integrated footer button)
// ==========================================
export const WishListProductCardSkeleton3 = React.memo(({ width }) => {
    return (
        <View
            style={{
                width: width,
                backgroundColor: "#fff",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#f3f4f6",
                overflow: "hidden",
            }}
        >
            {/* Image Placeholder */}
            <Skeleton
                width="100%"
                height={170}
                borderRadius={0}
                baseColor={baseColor}
                highlightColor={highlightColor}
            />

            {/* Details Wrapper */}
            <View style={{ padding: 16, paddingBottom: 12 }}>
                {/* Brand / Title & Rating Row */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Skeleton
                        width="60%"
                        height={14}
                        borderRadius={4}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton
                        width="15%"
                        height={12}
                        borderRadius={4}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </View>

                <Skeleton
                    width="85%"
                    height={11}
                    borderRadius={4}
                    style={{ marginTop: 6 }}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />

                {/* Price Row */}
                <Skeleton
                    width="35%"
                    height={15}
                    borderRadius={4}
                    style={{ marginTop: 8 }}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
            </View>

            {/* Divider and Footer Button */}
            <View
                style={{
                    borderTopWidth: 1,
                    borderColor: "#f3f4f6",
                    paddingVertical: 12,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Skeleton
                    width="50%"
                    height={12}
                    borderRadius={4}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                />
            </View>
        </View>
    );
});

WishListProductCardSkeleton3.displayName = "WishListProductCardSkeleton3";
