import { View } from "react-native";
import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Colors } from "../../constants/Colors";

const CategoriesSkeleton = () => {
    return (
        <View
            style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                borderWidth: 1,
                borderColor: Colors.primary,
                backgroundColor: "#f3f3f3",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Skeleton
                width="94%"
                height="94%"
                borderRadius={32}
                baseColor="#f3f3f3"
                highlightColor={Colors.primaryLight}
            />
        </View>
    );
};

export default CategoriesSkeleton;
