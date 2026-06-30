import React from "react";
import { View, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { Skeleton } from "@/components/ui/Skeleton";

const ITEM_HEIGHT = 56;

const CategorySidebarItem = React.memo(
    ({ item, isActive, onPress }) => {
        if (item.isSkeleton) {
            return (
                <View
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
                        baseColor={Colors.skeletonBase}
                        highlightColor={Colors.skeletonHighlight}
                    />
                </View>
            );
        }

        return (
            <TouchableRipple
                rippleColor={Colors.ripple}
                style={{
                    backgroundColor: isActive
                        ? Colors.bgPrimary
                        : "transparent",
                    borderLeftWidth: 3.5,
                    borderLeftColor: isActive ? Colors.primary : "transparent",
                    paddingVertical: 18,
                    paddingHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.borderLight,
                }}
                onPress={() => onPress(item.slug)}
            >
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: isActive ? "bold" : "500",
                        color: isActive ? Colors.primary : Colors.textDark,
                        textAlign: "center",
                    }}
                >
                    {item.name}
                </Text>
            </TouchableRipple>
        );
    },
    (prevProps, nextProps) =>
        prevProps.isActive === nextProps.isActive &&
        prevProps.item.slug === nextProps.item.slug,
);

CategorySidebarItem.displayName = "CategorySidebarItem";

export { CategorySidebarItem, ITEM_HEIGHT };
