import { FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { Colors } from "@/constants/colors";
import useWishListStore from "@/store/use_wishlist_store";
import WishListProductCard, {
    WishListProductCard2,
    WishListProductCard3,
} from "@/components/product/card/wishlist/wishlist_product_card";
import { WishListProductCardSkeleton2 } from "@/components/skeleton/wishlist_product_card_skeletons";
import AddToBagButton from "@/components/product/add_to_bag_button";
import PageHeader from "@/components/page_header";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768 ? 3 : 2;
const itemWidth = (width - 32 - 12 * (itemNumber - 1)) / itemNumber;

// Static skeleton placeholders data
const skeletonData = Array.from({ length: 6 }).map((_, index) => ({
    id: `skeleton_${index}`,
    isSkeleton: true,
}));

export default function Wishlist() {
    const { wishList } = useWishListStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a brief initial loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Dynamic data choice based on loading state
    const data = loading ? skeletonData : wishList;

    const renderItem = ({ item }) => {
        if (item.isSkeleton) {
            return <WishListProductCardSkeleton2 width={itemWidth} />;
        }
        return (
            <WishListProductCard2
                product={item}
                width={itemWidth}
                AddToBagButton={AddToBagButton}
            />
        );
    };

    return (
        <SafeAreaView
            edges={[]}
            className="flex-1"
            style={{ backgroundColor: Colors.bgPrimary }}
        >
            <PageHeader title="WISHLIST" showCart showProfile />

            {/* Body */}
            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    gap: 12,
                }}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) =>
                    item.isSkeleton ? item.id : `${index}_${item.id.toString()}`
                }
                numColumns={itemNumber}
                columnWrapperStyle={styles.columnWrapperStyle}
                initialNumToRender={6}
                windowSize={5}
                removeClippedSubviews={true}
            />
        </SafeAreaView>
    );
}

const styles = {
    skeletonStyle: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    columnWrapperStyle: {
        gap: 12,
    },
};
