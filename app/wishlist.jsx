import { View, Text, ScrollView, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Badge, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import useCartStore from "../store/useCartStore";
import useWishListStore from "../store/useWishListStore";
import WishListProductCard from "../components/product/WishListProductCard";
import AddToBagButton from "@/components/product/AddToBagButton";

const width = Dimensions.get("window").width;
const itemNumber = width >= 768 ? 3 : 2;

const wishlist = () => {
    const { cart } = useCartStore();
    const { wishList } = useWishListStore();

    return (
        <SafeAreaView edges={["bottom"]} className="flex-1">
            <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.BackAction
                    rippleColor="rgba(236, 72, 153, 0.15)"
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
                    rippleColor="rgba(236, 72, 153, 0.15)"
                    style={{
                        borderRadius: 100,
                        padding: 14,
                        marginRight: 8,
                    }}
                    onPress={() => {
                        router.push("(cart)");
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
                                    backgroundColor: "#db2777",
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
        </SafeAreaView>
    );
};

export default wishlist;

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
