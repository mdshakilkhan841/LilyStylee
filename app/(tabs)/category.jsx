import React, {
    useState,
    useRef,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import { View, Text, SectionList, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCategories } from "@/hooks/use_categories";

import {
    CategorySidebarItem,
    ITEM_HEIGHT,
} from "@/components/category/category_sidebar_item";
import ProductRow from "@/components/category/product_row";
import PageHeader from "@/components/page_header";
import { Colors } from "@/constants/colors";
import { Skeleton } from "@/components/ui/skeleton";

import { useCategoryNavigation } from "@/hooks/use_category_navigation";
import { useProductSections } from "@/hooks/use_product_sections";
import { useCategoryTabProducts } from "@/hooks/use_category_products";

// Constants
const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.28;
const RIGHT_PANE_WIDTH = width - SIDEBAR_WIDTH;
const NUM_COLUMNS = 2;
const ITEM_WIDTH = (RIGHT_PANE_WIDTH - 24 - 8) / NUM_COLUMNS;

const SCROLL_CONFIG = {
    onEndReachedThreshold: 0.4,
    scrollEventThrottle: 16,
    itemVisiblePercentThreshold: 10,
};

export default function CategoryScreen() {
    const { data: categories = [], isLoading: isCategoriesLoading } =
        useCategories();

    const sidebarRef = useRef(null);
    const sectionListRef = useRef(null);

    // State management
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loadedCategories, setLoadedCategories] = useState([]);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Navigation hooks
    const {
        handleScroll,
        handleTouchStart,
        handleTouchMove,
        handleCategoryPress,
        handleLoadMore,
        transitionDirectionRef,
    } = useCategoryNavigation(
        categories,
        selectedCategory || (categories.length > 0 ? categories[0].slug : ""),
        isTransitioning,
        loadedCategories,
        setSelectedCategory,
        setLoadedCategories,
        setIsTransitioning,
        sectionListRef,
    );

    const activeCategory =
        selectedCategory || (categories.length > 0 ? categories[0].slug : "");

    const activeCategoriesList = useMemo(() => {
        const list =
            loadedCategories.length > 0
                ? loadedCategories
                : categories.length > 0
                  ? [categories[0].slug]
                  : [];
        return Array.from(new Set(list));
    }, [loadedCategories, categories]);

    // Fetch products for all loaded categories
    const categoryQueries = useCategoryTabProducts(activeCategoriesList);

    // Format sections and get loading state
    const { sections, isAnyProductsLoading } = useProductSections(
        activeCategoriesList,
        categories,
        categoryQueries,
        NUM_COLUMNS,
    );

    const currentCategoryIndex = useMemo(() => {
        return categories.findIndex((cat) => cat.slug === activeCategory);
    }, [categories, activeCategory]);

    // Sync sidebar scroll with active category
    useEffect(() => {
        if (categories.length > 0 && currentCategoryIndex !== -1) {
            sidebarRef.current?.scrollToOffset({
                offset: Math.max(0, currentCategoryIndex * ITEM_HEIGHT - 120),
                animated: true,
            });
        }
    }, [currentCategoryIndex, categories]);

    // Auto-scroll when loading previous category
    useEffect(() => {
        if (!isAnyProductsLoading && sections.length > 1) {
            if (transitionDirectionRef.current === "prev") {
                requestAnimationFrame(() => {
                    sectionListRef.current?.scrollToLocation({
                        sectionIndex: 1,
                        itemIndex: 0,
                        animated: false,
                        viewPosition: 0,
                    });
                });
                transitionDirectionRef.current = "next";
            }
        }
    }, [sections, isAnyProductsLoading, transitionDirectionRef]);

    // Prepare sidebar data
    const sidebarData = useMemo(() => {
        if (isCategoriesLoading) {
            return Array.from({ length: 15 }).map((_, i) => ({
                isSkeleton: true,
                id: `skeleton-${i}`,
            }));
        }
        return categories;
    }, [isCategoriesLoading, categories]);

    // Render callbacks
    const renderSidebarItem = useCallback(
        ({ item }) => (
            <CategorySidebarItem
                item={item}
                isActive={item.slug === activeCategory}
                onPress={handleCategoryPress}
            />
        ),
        [activeCategory, handleCategoryPress],
    );

    const renderProductItem = useCallback(
        ({ item }) => <ProductRow item={item} itemWidth={ITEM_WIDTH} />,
        [],
    );

    const renderSectionHeader = useCallback(({ section: { title } }) => {
        if (title === "Loading") {
            return (
                <View
                    style={{
                        backgroundColor: Colors.bgPrimary,
                        paddingVertical: 12,
                    }}
                >
                    <Skeleton
                        width={120}
                        height={16}
                        borderRadius={4}
                        baseColor={Colors.skeletonBase}
                        highlightColor={Colors.skeletonHighlight}
                    />
                </View>
            );
        }
        return (
            <View
                style={{
                    backgroundColor: Colors.bgPrimary,
                    paddingVertical: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: Colors.textDark,
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                    }}
                >
                    {title} Products
                </Text>
            </View>
        );
    }, []);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const firstVisibleItem = viewableItems[0];
            if (firstVisibleItem.section?.slug) {
                setSelectedCategory((prev) => {
                    if (prev !== firstVisibleItem.section.slug) {
                        return firstVisibleItem.section.slug;
                    }
                    return prev;
                });
            }
        }
    }, []);

    const viewabilityConfig = useMemo(
        () => ({
            itemVisiblePercentThreshold:
                SCROLL_CONFIG.itemVisiblePercentThreshold,
        }),
        [],
    );

    return (
        <SafeAreaView
            edges={[]}
            className="flex-1"
            style={{ backgroundColor: Colors.bgPrimary }}
        >
            <PageHeader
                title="CATEGORIES"
                showBack={false}
                showCart
                showProfile
            />

            <View style={{ flex: 1, flexDirection: "row" }}>
                {/* Left Sidebar */}
                <View
                    style={{
                        width: SIDEBAR_WIDTH,
                        backgroundColor: Colors.cardBg,
                        borderRightWidth: 1,
                        borderRightColor: Colors.borderLight,
                    }}
                >
                    <FlatList
                        ref={sidebarRef}
                        data={sidebarData}
                        renderItem={renderSidebarItem}
                        keyExtractor={(item) =>
                            item.isSkeleton ? item.id : item.slug
                        }
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={!isCategoriesLoading}
                    />
                </View>

                {/* Right Products Pane */}
                <View
                    style={{ flex: 1, paddingHorizontal: 12, paddingBottom: 4 }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <SectionList
                        ref={sectionListRef}
                        sections={sections}
                        renderItem={renderProductItem}
                        renderSectionHeader={renderSectionHeader}
                        keyExtractor={(item, index) =>
                            Array.isArray(item)
                                ? item.map((p) => p?.id).join("-")
                                : index.toString()
                        }
                        stickySectionHeadersEnabled={true}
                        showsVerticalScrollIndicator={false}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={
                            SCROLL_CONFIG.onEndReachedThreshold
                        }
                        onScroll={handleScroll}
                        scrollEventThrottle={SCROLL_CONFIG.scrollEventThrottle}
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        onScrollToIndexFailed={() => {}}
                        removeClippedSubviews={true}
                        initialNumToRender={4}
                        maxToRenderPerBatch={6}
                        windowSize={5}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
