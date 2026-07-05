import { View, FlatList, Dimensions } from "react-native";
import useWishListStore from "@/store/use_wishlist_store";
import WishListProductCard from "@/components/product/wishlist_product_card";
import AddToBagButton from "@/components/product/add_to_bag_button";
import PageHeader from "@/components/page_header";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768 ? 3 : 2;

export default function Wishlist() {
    const { wishList } = useWishListStore();

    return (
        <View className="flex-1 bg-white">
            <PageHeader title="WISHLIST" showCart showProfile />
            {/* Body */}
            <FlatList
                contentContainerStyle={{
                    paddingVertical: 12,
                }}
                data={wishList}
                renderItem={({ item }) => (
                    <WishListProductCard
                        product={item}
                        width={width / itemNumber - 18}
                        AddToBagButton={AddToBagButton}
                    />
                )}
                keyExtractor={(item, index) => `${index}_${item.id.toString()}`}
                numColumns={itemNumber}
                columnWrapperStyle={styles.columnWrapperStyle}
                // onEndReached={handleLoadMore}
                // onEndReachedThreshold={0.5}
                initialNumToRender={6}
                windowSize={5}
                removeClippedSubviews={true}
                // ListFooterComponent={
                //     loading && products.length > 0 ? (
                //         <View style={styles.skeletonStyle}>
                //             {Array.from({ length: 6 }).map((_, idx) => (
                //                 <ProductCardSkeleton
                //                     key={idx}
                //                     width={width / itemNumber - 18}
                //                 />
                //             ))}
                //         </View>
                //     ) : null
                // }
            />
        </View>
    );
}

const styles = {
    skeletonStyle: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    columnWrapperStyle: {
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
};
