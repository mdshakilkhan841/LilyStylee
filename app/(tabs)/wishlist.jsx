import { View, FlatList, Dimensions } from "react-native";
import { Appbar, Badge, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import useCartStore from "../../store/useCartStore";
import useWishListStore from "../../store/useWishListStore";
import WishListProductCard from "../../components/product/WishListProductCard";
import AddToBagButton from "@/components/product/AddToBagButton";
import { Colors } from "../../constants/Colors";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768 ? 3 : 2;

export default function Wishlist() {
    const { cart } = useCartStore();
    const { wishList } = useWishListStore();

    return (
        <View className="flex-1 bg-white">
            <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.BackAction
                    rippleColor={Colors.ripple}
                    onPress={() => {
                        router.back();
                    }}
                />
                <Appbar.Content
                    title="WISHLIST"
                    titleStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
                <TouchableRipple
                    borderless={true}
                    rippleColor={Colors.ripple}
                    style={{
                        borderRadius: 100,
                        padding: 14,
                        marginRight: 8,
                    }}
                    onPress={() => {
                        router.push("/cart");
                    }}
                >
                    <>
                        <Feather name="shopping-bag" size={22} color="black" />
                        {cart.length > 0 && (
                            <Badge
                                style={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    backgroundColor: Colors.primary,
                                }}
                            >
                                {cart.length}
                            </Badge>
                        )}
                    </>
                </TouchableRipple>
            </Appbar.Header>
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
