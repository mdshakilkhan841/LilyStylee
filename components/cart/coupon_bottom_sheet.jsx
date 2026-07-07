import React, {
    forwardRef,
    useCallback,
    useMemo,
    useState,
    useImperativeHandle,
    useRef,
} from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { TouchableRipple, Portal, Button } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/colors";
import toast from "@/utils/toast";

const PRESET_COUPONS = [
    {
        code: "LILY50",
        description: "Get 50% OFF on your order!",
        minSubtotal: 0,
    },
    {
        code: "FASHION20",
        description: "Get 20% OFF on your order!",
        minSubtotal: 0,
    },
    {
        code: "LILYSTYLEE",
        description: "Get Flat $10 OFF on orders above $50.",
        minSubtotal: 50,
    },
];

const CouponBottomSheet = forwardRef(({ onApplyCoupon, subtotal }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [customCode, setCustomCode] = useState("");
    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ["50%", "70%"], []);

    useImperativeHandle(ref, () => ({
        expand: () => {
            setIsVisible(true);
            setTimeout(() => {
                bottomSheetRef.current?.snapToIndex(0);
            }, 50);
        },
        close: () => {
            bottomSheetRef.current?.close();
            setIsVisible(false);
        },
    }));

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
            />
        ),
        [],
    );

    const handleApplyCustom = () => {
        const cleanedCode = customCode.trim().toUpperCase();
        if (!cleanedCode) {
            toast.warning("Please enter a coupon code");
            return;
        }

        const coupon = PRESET_COUPONS.find((c) => c.code === cleanedCode);
        if (!coupon) {
            toast.danger("Invalid coupon code");
            return;
        }

        if (coupon.minSubtotal > 0 && subtotal < coupon.minSubtotal) {
            toast.warning(
                `Coupon valid for orders above $${coupon.minSubtotal} only`,
            );
            return;
        }

        onApplyCoupon({ code: coupon.code });
        toast.success(`Coupon '${coupon.code}' applied!`);
        ref.current?.close();
    };

    const handleSelectPreset = (coupon) => {
        if (coupon.minSubtotal > 0 && subtotal < coupon.minSubtotal) {
            toast.warning(
                `Coupon valid for orders above $${coupon.minSubtotal} only`,
            );
            return;
        }
        onApplyCoupon({ code: coupon.code });
        toast.success(`Coupon '${coupon.code}' applied!`);
        ref.current?.close();
    };

    if (!isVisible) return null;

    return (
        <Portal>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enableDynamicSizing={false}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}
                onClose={() => setIsVisible(false)}
            >
                {/* Fixed Header Portion */}
                <View style={styles.headerContainer}>
                    <Text style={styles.sheetTitle}>Apply Coupon</Text>

                    {/* Custom Coupon Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Enter coupon code (e.g. LILY50)"
                            value={customCode}
                            onChangeText={setCustomCode}
                            autoCapitalize="characters"
                            style={styles.textInput}
                        />
                        <Button
                            mode="contained"
                            buttonColor={Colors.primary}
                            onPress={handleApplyCustom}
                            style={styles.applyButton}
                            labelStyle={styles.applyButtonLabel}
                        >
                            APPLY
                        </Button>
                    </View>

                    <Text style={styles.sectionHeader}>Available Offers</Text>
                </View>

                {/* Scrollable Coupon List Portion */}
                <BottomSheetFlatList
                    data={PRESET_COUPONS}
                    keyExtractor={(item, index) => `${item.code}-${index}`}
                    style={{ flex: 1, paddingHorizontal: 16 }}
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableRipple
                            borderless
                            onPress={() => handleSelectPreset(item)}
                            rippleColor={Colors.ripple}
                            style={styles.couponCard}
                        >
                            <View style={styles.couponCardContent}>
                                <View style={styles.iconContainer}>
                                    <MaterialCommunityIcons
                                        name="ticket-percent-outline"
                                        size={20}
                                        color={Colors.primary}
                                    />
                                </View>
                                <View style={styles.couponInfo}>
                                    <Text style={styles.couponCodeText}>
                                        {item.code.replace(
                                            /_DUPLICATE_\d+/g,
                                            "",
                                        )}
                                    </Text>
                                    <Text style={styles.couponDescription}>
                                        {item.description}
                                    </Text>
                                    <Text style={styles.couponExpiry}>
                                        {item.minSubtotal > 0
                                            ? `Orders above $${item.minSubtotal} • Current: $${subtotal.toFixed(2)}`
                                            : "No minimum order limit"}
                                    </Text>
                                </View>
                                <Text style={styles.applyText}>APPLY</Text>
                            </View>
                        </TouchableRipple>
                    )}
                />
            </BottomSheet>
        </Portal>
    );
});

CouponBottomSheet.displayName = "CouponBottomSheet";

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 8,
        gap: 10,
    },
    scrollContainer: {
        paddingBottom: 30,
        gap: 10,
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 0,
        color: Colors.textDark || "#000000",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.borderLight || "#cbd5e1",
        borderRadius: 8,
        backgroundColor: "#f8fafc",
        paddingRight: 6,
    },
    textInput: {
        flex: 1,
        height: 44,
        paddingHorizontal: 12,
        fontSize: 13,
        color: "#0f172a",
    },
    applyButton: {
        borderRadius: 6,
    },
    applyButtonLabel: {
        fontSize: 11,
        fontWeight: "bold",
        marginHorizontal: 10,
    },
    sectionHeader: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#475569",
        marginTop: 4,
    },
    couponCard: {
        borderWidth: 1,
        borderColor: Colors.primary,
        borderStyle: "dashed",
        borderRadius: 8,
        backgroundColor: "#fffdfd",
        overflow: "hidden",
    },
    couponCardContent: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.primaryLight || "#fce7f3",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    couponInfo: {
        flex: 1,
        gap: 1,
    },
    couponCodeText: {
        fontSize: 13,
        fontWeight: "bold",
        color: Colors.primary,
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },
    couponDescription: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1e293b",
    },
    couponExpiry: {
        fontSize: 10.5,
        color: "#64748b",
        marginTop: 1,
    },
    applyText: {
        fontSize: 11.5,
        fontWeight: "bold",
        color: Colors.primary,
        marginLeft: 10,
    },
});

export default CouponBottomSheet;
