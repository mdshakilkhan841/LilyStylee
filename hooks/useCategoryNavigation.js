import { useCallback, useRef, useEffect } from "react";

const SCROLL_THRESHOLD_TOP = 50;
const SCROLL_THRESHOLD_OVERSCROLL = -20;
const SCROLL_VELOCITY_THRESHOLD = 5;
const DRAG_THRESHOLD = 45;
const TRANSITION_TIMEOUT = 450;

export const useCategoryNavigation = (
    categories,
    activeCategory,
    isTransitioning,
    loadedCategories,
    setSelectedCategory,
    setLoadedCategories,
    setIsTransitioning,
    sectionListRef,
) => {
    const lastScrollPositionRef = useRef(0);
    const lastLoadedCategoryRef = useRef(null);
    const touchStartY = useRef(0);
    const isAtTopRef = useRef(true);
    const transitionDirectionRef = useRef("next");

    // Sync refs to prevent stale closure traps
    const loadedCategoriesRef = useRef(loadedCategories);
    const categoriesRef = useRef(categories);
    const isTransitioningRef = useRef(isTransitioning);

    // Update refs when state changes
    useEffect(() => {
        loadedCategoriesRef.current = loadedCategories;
    }, [loadedCategories]);

    useEffect(() => {
        categoriesRef.current = categories;
    }, [categories]);

    useEffect(() => {
        isTransitioningRef.current = isTransitioning;
    }, [isTransitioning]);

    const loadPreviousCategory = useCallback(() => {
        const categoriesList = categoriesRef.current;
        const currentList = loadedCategoriesRef.current;
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

            if (lastLoadedCategoryRef.current !== prevCategory.slug) {
                lastLoadedCategoryRef.current = prevCategory.slug;
                transitionDirectionRef.current = "prev";
                setIsTransitioning(true);
                setLoadedCategories((prev) => [prevCategory.slug, ...prev]);
                setSelectedCategory(prevCategory.slug);

                setTimeout(() => {
                    setIsTransitioning(false);
                }, TRANSITION_TIMEOUT);
            }
        }
    }, [setSelectedCategory, setLoadedCategories, setIsTransitioning]);

    const handleScroll = useCallback(
        (event) => {
            const currentY = event.nativeEvent.contentOffset.y;

            isAtTopRef.current = currentY <= SCROLL_THRESHOLD_TOP;
            const isScrollingUp =
                currentY <
                lastScrollPositionRef.current - SCROLL_VELOCITY_THRESHOLD;

            // Load previous category when scrolling up at top
            if (
                isScrollingUp &&
                currentY <= SCROLL_THRESHOLD_TOP &&
                !isTransitioningRef.current
            ) {
                loadPreviousCategory();
            }

            // Overscroll backup method
            if (
                currentY < SCROLL_THRESHOLD_OVERSCROLL &&
                !isTransitioningRef.current
            ) {
                loadPreviousCategory();
            }

            lastScrollPositionRef.current = currentY;
        },
        [loadPreviousCategory],
    );

    const handleTouchStart = useCallback((event) => {
        touchStartY.current = event.nativeEvent.pageY;
    }, []);

    const handleTouchMove = useCallback(
        (event) => {
            if (isTransitioningRef.current) return;

            const currentY = event.nativeEvent.pageY;
            const dragDistance = currentY - touchStartY.current;

            if (isAtTopRef.current && dragDistance > DRAG_THRESHOLD) {
                loadPreviousCategory();
            }
        },
        [loadPreviousCategory],
    );

    const handleCategoryPress = useCallback(
        (slug) => {
            if (isTransitioningRef.current || slug === activeCategory) return;

            transitionDirectionRef.current = "next";
            lastLoadedCategoryRef.current = null;
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
        },
        [
            activeCategory,
            setSelectedCategory,
            setLoadedCategories,
            sectionListRef,
        ],
    );

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
    }, [setLoadedCategories]);

    return {
        handleScroll,
        handleTouchStart,
        handleTouchMove,
        handleCategoryPress,
        handleLoadMore,
        transitionDirectionRef,
        isAtTopRef,
    };
};
