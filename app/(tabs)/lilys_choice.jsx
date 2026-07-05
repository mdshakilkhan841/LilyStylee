import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import PageHeader from "@/components/page_header";
import { Colors } from "@/constants/colors";
import { TouchableRipple } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import toast from "@/utils/toast";
import useWishListStore from "@/store/use_wishlist_store";
import useCartStore from "@/store/use_cart_store";

// Import custom cards from the card folder
import PromoCard from "@/components/product/card/promo/promo_card";
import FragranceCard from "@/components/product/card/fragrance/fragrance_card";
import CosmeticCard from "@/components/product/card/cosmetic/cosmetic_card";
import DressCard from "@/components/product/card/dress/dress_card";

// Import skeletons
import PromoCardSkeleton from "@/components/skeleton/promo_card_skeleton";
import FragranceCardSkeleton from "@/components/skeleton/fragrance_card_skeleton";
import CosmeticCardSkeleton from "@/components/skeleton/cosmetic_card_skeleton";
import DressCardSkeleton from "@/components/skeleton/dress_card_skeleton";
import { SafeAreaView } from "react-native-safe-area-context";

// Curated Influencer database
const MOCK_PROFILE = {
    name: "Lily Rose",
    handle: "@lily_rose_curator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    bio: "Fashion Stylist & Curator. Handpicking luxury fragrance matches, beauty accents, and signature edits.",
    followers: "125K",
    likes: "480K",
};

const MOCK_PROMOS = [
    {
        id: "promo_1",
        title: "Summer Glow Bundle",
        items: "Velvet Lipstick + Dior Blush + Jo Malone Citrus",
        originalPrice: 185,
        price: 140,
        discount: 24,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: "promo_2",
        title: "Signature Evening Set",
        items: "Satin Dress + Tom Ford Night Orchid Perfume",
        originalPrice: 330,
        price: 260,
        discount: 21,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&auto=format&fit=crop",
    },
];

const MOCK_FRAGRANCES = [
    {
        id: "lily_frag_1",
        title: "Bloom Rose - Intense",
        brand: "Chanel Curations",
        price: 110,
        originalPrice: 135,
        rating: 4.9,
        thumbnail:
            "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=300&auto=format&fit=crop",
        description: "Signature floral notes blended with rich sandalwood.",
    },
    {
        id: "lily_frag_2",
        title: "Night Orchid - Oud",
        brand: "Tom Ford Curations",
        price: 145,
        originalPrice: 180,
        rating: 4.8,
        thumbnail:
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=300&auto=format&fit=crop",
        description: "Warm, spicy amber fragrance for elegant evenings.",
    },
    {
        id: "lily_frag_3",
        title: "Citrus Breeze",
        brand: "Jo Malone Curations",
        price: 95,
        originalPrice: 115,
        rating: 4.7,
        thumbnail:
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300&auto=format&fit=crop",
        description: "Fresh vetiver combined with notes of bright lime.",
    },
];

const MOCK_COSMETICS = [
    {
        id: "lily_cos_1",
        title: "Velvet Lipstick",
        brand: "YSL Beauty",
        price: 42,
        originalPrice: 50,
        rating: 4.8,
        thumbnail:
            "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=300&auto=format&fit=crop",
        description: "Highly pigmented matte velvet finish.",
    },
    {
        id: "lily_cos_2",
        title: "Glow Blush",
        brand: "Dior Beauty",
        price: 48,
        originalPrice: 60,
        rating: 4.9,
        thumbnail:
            "https://images.unsplash.com/photo-1631730359575-38e4755d772b?q=80&w=300&auto=format&fit=crop",
        description: "Radiant, natural skin-enhancing glow.",
    },
    {
        id: "lily_cos_3",
        title: "Eyeliner Pen",
        brand: "Lancôme Paris",
        price: 32,
        originalPrice: 40,
        rating: 4.6,
        thumbnail:
            "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=300&auto=format&fit=crop",
        description: "Waterproof, precision liquid liner.",
    },
    {
        id: "lily_cos_4",
        title: "Luminous Silk",
        brand: "Armani Beauty",
        price: 65,
        originalPrice: 80,
        rating: 4.9,
        thumbnail:
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=300&auto=format&fit=crop",
        description: "Lightweight, medium coverage foundation.",
    },
];

const MOCK_DRESSES = [
    {
        id: "lily_dress_1",
        title: "Satin Evening Gown",
        brand: "Curated Dresses",
        price: 185,
        originalPrice: 231,
        discountPercentage: 20,
        rating: 4.9,
        thumbnail:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300&auto=format&fit=crop",
        description: "Cowl-neck evening gown in emerald green.",
    },
    {
        id: "lily_dress_2",
        title: "Linen Slip Dress",
        brand: "Curated Dresses",
        price: 98,
        originalPrice: 98,
        discountPercentage: 0,
        rating: 4.7,
        thumbnail:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300&auto=format&fit=crop",
        description: "Lightweight summer slip dress of organic linen.",
    },
    {
        id: "lily_dress_3",
        title: "Oversized Trench Coat",
        brand: "Curated Dresses",
        price: 240,
        originalPrice: 282,
        discountPercentage: 15,
        rating: 4.8,
        thumbnail:
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&auto=format&fit=crop",
        description: "Classic loose fit trench coat in sand.",
    },
    {
        id: "lily_dress_4",
        title: "Blush Blazer Set",
        brand: "Curated Dresses",
        price: 165,
        originalPrice: 183,
        discountPercentage: 10,
        rating: 4.8,
        thumbnail:
            "https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?q=80&w=300&auto=format&fit=crop",
        description: "Modern linen blazer with high-waist shorts.",
    },
];

export default function LilysChoice() {
    const { addToCart } = useCartStore();
    const { addToWishList, removeFromWishList, wishList } = useWishListStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleWishlistToggle = useCallback(
        (product) => {
            const inWishlist = wishList.some((item) => item.id === product.id);
            if (inWishlist) {
                removeFromWishList(product.id);
                toast.success("Removed from Wishlist");
            } else {
                addToWishList(product);
                // toast.success("Added to Wishlist");
                toast.success("Added to Wishlist");
            }
        },
        [wishList, addToWishList, removeFromWishList],
    );

    const handleAddToCart = useCallback(
        (product) => {
            addToCart(product);
            toast.success("Added to Bag");
        },
        [addToCart],
    );

    return (
        // <View style={styles.container}>
        <SafeAreaView
            edges={[]}
            className="flex-1"
            style={{ backgroundColor: Colors.bgPrimary }}
        >
            <PageHeader
                title="LILY'S CHOICE"
                showBack={false}
                showCart
                showProfile
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* 1. Influencer Header Section */}
                <View style={styles.profileHeader}>
                    <View style={styles.profileRow}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={{ uri: MOCK_PROFILE.avatar }}
                                style={styles.avatar}
                            />
                            <View style={styles.verifiedBadge}>
                                <MaterialCommunityIcons
                                    name="check-decagram"
                                    size={12}
                                    color="white"
                                />
                            </View>
                        </View>
                        <View style={styles.profileTextWrapper}>
                            <Text style={styles.profileName}>
                                {MOCK_PROFILE.name}
                            </Text>
                            <Text style={styles.profileHandle}>
                                {MOCK_PROFILE.handle}
                            </Text>
                            <View style={styles.statsRow}>
                                <View style={styles.statGroup}>
                                    <Text style={styles.statNumber}>
                                        {MOCK_PROFILE.followers}
                                    </Text>
                                    <Text style={styles.statLabel}>
                                        followers
                                    </Text>
                                </View>
                                <View style={styles.statGroup}>
                                    <Text style={styles.statNumber}>
                                        {MOCK_PROFILE.likes}
                                    </Text>
                                    <Text style={styles.statLabel}>likes</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.bioText}>{MOCK_PROFILE.bio}</Text>
                </View>

                {/* 2. PROMO Section (Horizontal Scroll) */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Exclusive Promo Bundles
                            </Text>
                            <Text style={styles.sectionSubtitle}>
                                Specially priced fashion packages
                            </Text>
                        </View>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalListPadding}
                    >
                        {isLoading
                            ? Array.from({ length: 2 }).map((_, idx) => (
                                  <PromoCardSkeleton key={idx} />
                              ))
                            : MOCK_PROMOS.map((promo) => (
                                  <PromoCard
                                      key={promo.id}
                                      promo={promo}
                                      onPress={() =>
                                          toast.success(
                                              `Purchasing ${promo.title}...`,
                                          )
                                      }
                                  />
                              ))}
                    </ScrollView>
                </View>

                {/* 3. FRAGRANCES Section (Horizontal Scroll) */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Curated Fragrances
                            </Text>
                            <Text style={styles.sectionSubtitle}>
                                Luxury scent signatures chosen by Lily
                            </Text>
                        </View>
                        <TouchableRipple
                            borderless
                            onPress={() => {}}
                            style={styles.viewAllBtn}
                        >
                            <View style={styles.viewAllRow}>
                                <Text style={styles.viewAllText}>View All</Text>
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={13}
                                    color="#db2777"
                                />
                            </View>
                        </TouchableRipple>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalListPadding}
                    >
                        {isLoading
                            ? Array.from({ length: 3 }).map((_, idx) => (
                                  <FragranceCardSkeleton key={idx} />
                              ))
                            : MOCK_FRAGRANCES.map((product) => {
                                  const isLiked = wishList.some(
                                      (i) => i.id === product.id,
                                  );
                                  return (
                                      <FragranceCard
                                          key={product.id}
                                          product={product}
                                          isLiked={isLiked}
                                          onWishlistToggle={
                                              handleWishlistToggle
                                          }
                                          onAddToCart={handleAddToCart}
                                      />
                                  );
                              })}
                    </ScrollView>
                </View>

                {/* 4. AD Section (Mock player) */}
                <View style={styles.adSection}>
                    <TouchableRipple
                        borderless
                        onPress={() =>
                            toast.info("Lookbook video is loading...")
                        }
                        style={styles.adCard}
                    >
                        <View style={styles.adRelative}>
                            <Image
                                source={{
                                    uri: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop",
                                }}
                                style={styles.adImg}
                                resizeMode="cover"
                            />
                            <View style={styles.adPlayOverlay}>
                                <View style={styles.playCircle}>
                                    <FontAwesome6
                                        name="play"
                                        size={16}
                                        color="#db2777"
                                        style={{ marginLeft: 3 }}
                                    />
                                </View>
                            </View>
                            <View style={styles.adTextOverlay}>
                                <View style={styles.adBadge}>
                                    <MaterialCommunityIcons
                                        name="video"
                                        size={11}
                                        color="white"
                                    />
                                    <Text style={styles.adBadgeText}>
                                        EXCLUSIVE LOOKBOOK
                                    </Text>
                                </View>
                                <Text style={styles.adMainTitle}>
                                    {"Styling Lily's Pick: Summer Glow Edition"}
                                </Text>
                            </View>
                        </View>
                    </TouchableRipple>
                </View>

                {/* 5. COSMETICS Section (Horizontal Circles) */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Must-Have Cosmetics
                            </Text>
                            <Text style={styles.sectionSubtitle}>
                                Handpicked beauty & glow essentials
                            </Text>
                        </View>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalListPadding}
                    >
                        {isLoading
                            ? Array.from({ length: 4 }).map((_, idx) => (
                                  <CosmeticCardSkeleton key={idx} />
                              ))
                            : MOCK_COSMETICS.map((product) => {
                                  const isLiked = wishList.some(
                                      (i) => i.id === product.id,
                                  );
                                  return (
                                      <CosmeticCard
                                          key={product.id}
                                          product={product}
                                          isLiked={isLiked}
                                          onWishlistToggle={
                                              handleWishlistToggle
                                          }
                                      />
                                  );
                              })}
                    </ScrollView>
                </View>

                {/* 6. DRESS Edit Section (Vertical Grid) */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                The Dress Edit
                            </Text>
                            <Text style={styles.sectionSubtitle}>
                                Curated summer outfit combinations
                            </Text>
                        </View>
                    </View>

                    <View style={styles.dressGrid}>
                        {isLoading
                            ? Array.from({ length: 4 }).map((_, idx) => (
                                  <DressCardSkeleton key={idx} />
                              ))
                            : MOCK_DRESSES.map((product) => {
                                  const isLiked = wishList.some(
                                      (i) => i.id === product.id,
                                  );
                                  return (
                                      <DressCard
                                          key={product.id}
                                          product={product}
                                          isLiked={isLiked}
                                          onWishlistToggle={
                                              handleWishlistToggle
                                          }
                                          onAddToCart={handleAddToCart}
                                      />
                                  );
                              })}
                    </View>
                </View>
            </ScrollView>

            {/* </View> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    scrollContent: {},
    profileHeader: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: "rgba(251, 207, 232, 0.15)",
        borderBottomWidth: 1,
        borderBottomColor: "#fce7f3",
    },
    profileRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarWrapper: {
        position: "relative",
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: "#db2777",
    },
    verifiedBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#db2777",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1.5,
        borderColor: "white",
    },
    profileTextWrapper: {
        marginLeft: 16,
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
    },
    profileHandle: {
        fontSize: 13,
        color: "#db2777",
        fontWeight: "600",
        marginTop: 2,
    },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    statGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 16,
    },
    statNumber: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#111827",
    },
    statLabel: {
        fontSize: 11,
        color: "#6b7280",
        marginLeft: 3,
    },
    bioText: {
        fontSize: 13,
        color: "#4b5563",
        lineHeight: 18,
        marginTop: 12,
    },
    sectionContainer: {
        paddingVertical: 16,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111827",
        letterSpacing: -0.3,
    },
    sectionSubtitle: {
        fontSize: 11,
        color: "#db2777",
        fontWeight: "600",
        marginTop: 1,
    },
    viewAllBtn: {
        borderRadius: 12,
    },
    viewAllRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: "rgba(251, 207, 232, 0.25)",
        borderRadius: 8,
    },
    viewAllText: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#db2777",
        marginRight: 2,
    },
    horizontalListPadding: {
        paddingHorizontal: 16,
        gap: 12,
    },
    adSection: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    adCard: {
        borderRadius: 12,
        overflow: "hidden",
    },
    adRelative: {
        position: "relative",
        width: "100%",
        height: 150,
        backgroundColor: "#111827",
    },
    adImg: {
        width: "100%",
        height: "100%",
        opacity: 0.75,
    },
    adPlayOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
    },
    playCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    adTextOverlay: {
        position: "absolute",
        bottom: 12,
        left: 12,
    },
    adBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#db2777",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: "flex-start",
        gap: 3,
    },
    adBadgeText: {
        fontSize: 8,
        fontWeight: "bold",
        color: "white",
        letterSpacing: 0.5,
    },
    adMainTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 4,
    },
    dressGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
});
