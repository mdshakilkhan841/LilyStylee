import { FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import useWishListStore from "@/store/use_wishlist_store";
import {
    WishListProductCard,
    WishListProductCard2,
    WishListProductCard3,
} from "@/components/product/card/wishlist/wishlist_product_card";
import AddToBagButton from "@/components/product/add_to_bag_button";
import PageHeader from "@/components/page_header";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768 ? 3 : 2;
const itemWidth = (width - 32 - 12 * (itemNumber - 1)) / itemNumber;

export default function Wishlist() {
    const { wishList } = useWishListStore();

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
                data={wishList}
                renderItem={({ item }) => (
                    <WishListProductCard2
                        product={item}
                        width={itemWidth}
                        AddToBagButton={AddToBagButton}
                    />
                )}
                keyExtractor={(item, index) => `${index}_${item.id.toString()}`}
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
