import React from "react";
import { View } from "react-native";
import CategoryProductCard from "@/components/product/category_product_card";
import CategoryProductCardSkeleton from "@/components/skeleton/category_product_card_skeleton";

const NUM_COLUMNS = 2;

const ProductRow = React.memo(
    ({ item, itemWidth }) => {
        if (item.isSkeletonPlaceholder) {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 8,
                    }}
                >
                    <View style={{ width: itemWidth }}>
                        <CategoryProductCardSkeleton width={itemWidth} />
                    </View>
                    <View style={{ width: itemWidth }}>
                        <CategoryProductCardSkeleton width={itemWidth} />
                    </View>
                </View>
            );
        }

        // item is an array representing a row of 2 columns
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                }}
            >
                {item.map((product) => (
                    <View key={product.id} style={{ width: itemWidth }}>
                        <CategoryProductCard
                            product={product}
                            width={itemWidth}
                        />
                    </View>
                ))}
                {item.length < NUM_COLUMNS && (
                    <View style={{ width: itemWidth }} />
                )}
            </View>
        );
    },
    (prevProps, nextProps) => {
        // Memoize: only re-render if itemWidth changes or item array changes
        if (prevProps.itemWidth !== nextProps.itemWidth) return false;
        if (prevProps.item.length !== nextProps.item.length) return false;
        return true;
    },
);

ProductRow.displayName = "ProductRow";

export default ProductRow;
