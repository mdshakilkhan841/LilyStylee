import { View } from "react-native";
import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Colors } from "../../constants/Colors";

const SidebarCategorySkeleton = () => {
    const baseColor = Colors.skeletonBase;
    const highlightColor = Colors.skeletonHighlight;
    const items = Array.from({ length: 12 });

    return (
        <View style={{ flex: 1 }}>
            {items.map((_, index) => (
                <View
                    key={index}
                    style={{
                        paddingVertical: 21,
                        paddingHorizontal: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.borderLight,
                    }}
                >
                    <Skeleton
                        width="75%"
                        height={12}
                        borderRadius={4}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </View>
            ))}
        </View>
    );
};

SidebarCategorySkeleton.displayName = "SidebarCategorySkeleton";
export default SidebarCategorySkeleton;
