import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useMemo,
} from "react";
import { View, Text, SectionList, FlatList, Dimensions } from "react-native";
import { useCategories } from "@/hooks/useCategories";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import CategoryProductCard from "@/components/product/CategoryProductCard";
import CategoryProductCardSkeleton from "@/components/skeleton/CategoryProductCardSkeleton";
import SidebarCategorySkeleton from "@/components/skeleton/SidebarCategorySkeleton";
import PageHeader from "../../components/PageHeader";
import { Colors } from "../../constants/Colors";
import { TouchableRipple } from "react-native-paper";

const { width } = Dimensions.get("window");
const sidebarWidth = width * 0.28;
const rightPaneWidth = width - sidebarWidth;
const numColumns = 2;
// 12px horizontal padding (24px total) and 8px gap between columns
const itemWidth = (rightPaneWidth - 24 - 8) / numColumns;

export default function CategoryScreen() {
    const { data: categories = [], isLoading: isCategoriesLoading } =
        useCategories();
    const sidebarRef = useRef(null);
    const sectionListRef = useRef(null);
    const lastScrollPositionRef = useRef(0);
    const lastLoadedCategoryRef = useRef(null);
    const touchStartY = useRef(0);
    const isAtTopRef = useRef(true);
    const transitionDirectionRef = useRef("next");

    const [selectedCategory, setSelectedCategory] = useState("");
    const [loadedCategories, setLoadedCategories] = useState([]);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Sync state refs to prevent stale closure traps in scroll/gesture callbacks
    const loadedCategoriesRef = useRef([]);
    const categoriesRef = useRef([]);
    const isTransitioningRef = useRef(false);

    useEffect(() => {
        loadedCategoriesRef.current = loadedCategories;
    }, [loadedCategories]);

    useEffect(() => {
        categoriesRef.current = categories;
    }, [categories]);

    useEffect(() => {
        isTransitioningRef.current = isTransitioning;
    }, [isTransitioning]);

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

    // Fetch products for all loaded categories using useQueries
    const categoryQueries = useQueries({
        queries: activeCategoriesList.map((slug) => ({
            queryKey: ["categoryProductsList", slug],
            queryFn: async () => {
                const baseUrl =
                    process.env.EXPO_PUBLIC_API_URL || "https://dummyjson.com";
                const res = await axios.get(
                    `${baseUrl}/products/category/${slug}?limit=20`,
                );
                return { slug, products: res.data.products };
            },
            staleTime: 5 * 60 * 1000,
        })),
    });

    const serializedQueries = JSON.stringify(
        categoryQueries.map((q) => ({
            slug: q.data?.slug,
            length: q.data?.products?.length || 0,
            isLoading: q.isLoading,
        })),
    );

    const isAnyProductsLoading = categoryQueries.some((q) => q.isLoading);

    const currentCategoryIndex = useMemo(() => {
        return categories.findIndex((cat) => cat.slug === activeCategory);
    }, [categories, activeCategory]);

    // Sync sidebar scroll with active category
    useEffect(() => {
        if (categories.length > 0 && currentCategoryIndex !== -1) {
            const itemHeight = 56;
            sidebarRef.current?.scrollToOffset({
                offset: Math.max(0, currentCategoryIndex * itemHeight - 120),
                animated: true,
            });
        }
    }, [currentCategoryIndex, categories]);

    const groupIntoRows = (items, cols) => {
        const rows = [];
        for (let i = 0; i < items.length; i += cols) {
            rows.push(items.slice(i, i + cols));
        }
        return rows;
    };

    // Format data for SectionList
    const sections = useMemo(() => {
        return activeCategoriesList.map((slug) => {
            const cat = categories.find((c) => c.slug === slug);
            const query = categoryQueries.find((q) => q.data?.slug === slug);
            const isLoading = query ? query.isLoading : true;
            const prods = query?.data?.products || [];
            const rows = isLoading
                ? [{ isSkeletonPlaceholder: true }]
                : groupIntoRows(prods, numColumns);
            return {
                title: cat?.name || slug,
                slug: slug,
                data: rows,
            };
        });
    }, [activeCategoriesList, categories, serializedQueries]); // eslint-disable-line react-hooks/exhaustive-deps

    // Automatically adjust scroll position after loading previous category
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
    }, [sections, isAnyProductsLoading]);

    const handleCategoryPress = useCallback((slug) => {
        transitionDirectionRef.current = "next";
        lastLoadedCategoryRef.current = null; // Reset for next scroll operation
        setSelectedCategory(slug);
        setLoadedCategories([slug]);
        requestAnimationFrame(() => {
            sectionListRef.current?.scrollToLocation({
                sectionIndex: 0,
                itemIndex: 0,
                animated: false,
                viewPosition: 0,
            });
        });
    }, []);

    const handleLoadMore = useCallback(() => {
        const categoriesList = categoriesRef.current;
        if (categoriesList.length === 0) return;
        const currentList =
            loadedCategoriesRef.current.length > 0
                ? loadedCategoriesRef.current
                : [categoriesList[0].slug];
        const lastLoadedSlug = currentList[currentList.length - 1];
        const lastIndex = categoriesList.findIndex(
            (c) => c.slug === lastLoadedSlug,
        );
        if (lastIndex !== -1 && lastIndex < categoriesList.length - 1) {
            const nextCategory = categoriesList[lastIndex + 1];
            setLoadedCategories((prev) => [...prev, nextCategory.slug]);
        }
    }, []);

    const handleScroll = useCallback((event) => {
        const currentY = event.nativeEvent.contentOffset.y;

        // Check if near top (within 50 points)
        isAtTopRef.current = currentY <= 50;

        // Detect upward scrolling
        const isScrollingUp = currentY < lastScrollPositionRef.current - 5;

        // Load previous category when at top and scrolling up
        if (isScrollingUp && currentY <= 50 && !isTransitioningRef.current) {
            const currentList = loadedCategoriesRef.current;
            const categoriesList = categoriesRef.current;
            const firstLoadedSlug =
                currentList.length > 0
                    ? currentList[0]
                    : categoriesList.length > 0
                      ? categoriesList[0].slug
                      : "";
            const firstIndex = categoriesList.findIndex(
                (c) => c.slug === firstLoadedSlug,
            );

            // Only load if there's a previous category and we haven't already loaded it
            if (firstIndex > 0) {
                const prevCategory = categoriesList[firstIndex - 1];

                // Prevent loading same category twice
                if (lastLoadedCategoryRef.current !== prevCategory.slug) {
                    lastLoadedCategoryRef.current = prevCategory.slug;
                    transitionDirectionRef.current = "prev";
                    setIsTransitioning(true);
                    setLoadedCategories((prev) => [prevCategory.slug, ...prev]);
                    setSelectedCategory(prevCategory.slug);
                    setTimeout(() => {
                        setIsTransitioning(false);
                    }, 450);
                }
            }
        }

        // Overscroll/pull down past top threshold (backup method)
        if (currentY < -20 && !isTransitioningRef.current) {
            const currentList = loadedCategoriesRef.current;
            const categoriesList = categoriesRef.current;
            const firstLoadedSlug =
                currentList.length > 0
                    ? currentList[0]
                    : categoriesList.length > 0
                      ? categoriesList[0].slug
                      : "";
            const firstIndex = categoriesList.findIndex(
                (c) => c.slug === firstLoadedSlug,
            );
            if (firstIndex > 0) {
                const prevCategory = categoriesList[firstIndex - 1];

                // Prevent loading same category twice
                if (lastLoadedCategoryRef.current !== prevCategory.slug) {
                    lastLoadedCategoryRef.current = prevCategory.slug;
                    transitionDirectionRef.current = "prev";
                    setIsTransitioning(true);
                    setLoadedCategories((prev) => [prevCategory.slug, ...prev]);
                    setSelectedCategory(prevCategory.slug);
                    setTimeout(() => {
                        setIsTransitioning(false);
                    }, 450);
                }
            }
        }

        lastScrollPositionRef.current = currentY;
    }, []);

    const handleTouchStart = useCallback((event) => {
        touchStartY.current = event.nativeEvent.pageY;
    }, []);

    const handleTouchMove = useCallback((event) => {
        if (isTransitioningRef.current) return;
        const currentY = event.nativeEvent.pageY;
        const dragDistance = currentY - touchStartY.current;

        // If list is near top and user drag-scrolls down (dragDistance > 45)
        if (isAtTopRef.current && dragDistance > 45) {
            const currentList = loadedCategoriesRef.current;
            const categoriesList = categoriesRef.current;
            const firstLoadedSlug =
                currentList.length > 0
                    ? currentList[0]
                    : categoriesList.length > 0
                      ? categoriesList[0].slug
                      : "";
            const firstIndex = categoriesList.findIndex(
                (c) => c.slug === firstLoadedSlug,
            );
            if (firstIndex > 0) {
                const prevCategory = categoriesList[firstIndex - 1];
                transitionDirectionRef.current = "prev";
                setIsTransitioning(true);
                setLoadedCategories((prev) => [prevCategory.slug, ...prev]);
                setSelectedCategory(prevCategory.slug);
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 450);
            }
        }
    }, []);

    const onViewableItemsChanged = useMemo(() => {
        return ({ viewableItems }) => {
            if (viewableItems.length > 0) {
                const firstVisibleItem = viewableItems[0];
                if (firstVisibleItem.section && firstVisibleItem.section.slug) {
                    const slug = firstVisibleItem.section.slug;
                    setSelectedCategory((prev) => {
                        if (prev !== slug) {
                            return slug;
                        }
                        return prev;
                    });
                }
            }
        };
    }, []);

    const viewabilityConfig = useMemo(() => {
        return {
            itemVisiblePercentThreshold: 10,
        };
    }, []);

    const renderSidebarItem = useCallback(
        ({ item }) => {
            const isActive = item.slug === activeCategory;

            return (
                <TouchableRipple
                    rippleColor={Colors.ripple}
                    style={{
                        backgroundColor: isActive
                            ? Colors.bgPrimary
                            : "transparent",
                        borderLeftWidth: 3.5,
                        borderLeftColor: isActive
                            ? Colors.primary
                            : "transparent",
                        paddingVertical: 18,
                        paddingHorizontal: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.borderLight,
                    }}
                    onPress={() => handleCategoryPress(item.slug)}
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
        [activeCategory, handleCategoryPress],
    );

    const renderSectionItem = useCallback(({ item }) => {
        if (item.isSkeletonPlaceholder) {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 16,
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
                    marginBottom: 16,
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
                {item.length < numColumns && (
                    <View style={{ width: itemWidth }} />
                )}
            </View>
        );
    }, []);

    const renderSectionHeader = useCallback(
        ({ section: { title } }) => (
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
        ),
        [],
    );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bgPrimary }}>
            <PageHeader title="CATEGORIES" showBack={false} />

            <View style={{ flex: 1, flexDirection: "row" }}>
                {/* Left Sidebar Menu */}
                <View
                    style={{
                        width: sidebarWidth,
                        backgroundColor: Colors.cardBg,
                        borderRightWidth: 1,
                        borderRightColor: Colors.borderLight,
                    }}
                >
                    {isCategoriesLoading ? (
                        <SidebarCategorySkeleton />
                    ) : (
                        <FlatList
                            ref={sidebarRef}
                            data={categories}
                            renderItem={renderSidebarItem}
                            keyExtractor={(item) => item.slug}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>

                {/* Right Products Pane */}
                <View
                    style={{ flex: 1, paddingHorizontal: 12 }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <SectionList
                        ref={sectionListRef}
                        sections={sections}
                        renderItem={renderSectionItem}
                        renderSectionHeader={renderSectionHeader}
                        keyExtractor={(item, index) =>
                            Array.isArray(item)
                                ? item.map((p) => p?.id).join("-")
                                : index.toString()
                        }
                        stickySectionHeadersEnabled={true}
                        showsVerticalScrollIndicator={false}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.4}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
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
        </View>
    );
}
