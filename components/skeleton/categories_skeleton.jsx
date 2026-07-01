import { View } from "react-native";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Colors } from "@/constants/colors";

const CategoriesSkeleton = () => {
    return (
        <View
            style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                borderWidth: 1,
                borderColor: Colors.primary,
                backgroundColor: Colors.skeletonGrayBase,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Skeleton
                width="94%"
                height="94%"
                borderRadius={32}
                baseColor={Colors.skeletonGrayBase}
                highlightColor={Colors.skeletonGrayHighlight}
            />
        </View>
    );
};

export default CategoriesSkeleton;
