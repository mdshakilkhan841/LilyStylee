import React, { forwardRef, useCallback, useMemo, useState, useImperativeHandle, useRef } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { TouchableRipple, Portal, Button } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/colors";
import toast from "@/utils/toast";

const CouponBottomSheet = forwardRef(({ onApplyCoupon, subtotal }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [customCode, setCustomCode] = useState("");
    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ["60%"], []);

    useImperativeHandle(ref, () => ({
        expand: () => setIsVisible(true),
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

        if (cleanedCode === "LILYSTYLEE") {
            if (subtotal < 50) {
                toast.warning("Coupon valid for orders above $50 only");
                return;
            }
            onApplyCoupon({ code: "LILYSTYLEE" });
            toast.success("Coupon 'LILYSTYLEE' applied!");
            ref.current?.close();
        } else if (cleanedCode === "LILY50") {
            onApplyCoupon({ code: "LILY50" });
            toast.success("Coupon 'LILY50' applied!");
            ref.current?.close();
        } else if (cleanedCode === "FASHION20") {
            onApplyCoupon({ code: "FASHION20" });
            toast.success("Coupon 'FASHION20' applied!");
            ref.current?.close();
        } else {
            toast.danger("Invalid coupon code");
        }
    };

    const handleSelectPreset = (code) => {
        if (code === "LILYSTYLEE" && subtotal < 50) {
            toast.warning("Coupon valid for orders above $50 only");
            return;
        }
        onApplyCoupon({ code });
        toast.success(`Coupon '${code}' applied!`);
        ref.current?.close();
    };

    if (!isVisible) return null;

    return (
        <Portal>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}
                onClose={() => setIsVisible(false)}
            >
                <BottomSheetView style={styles.sheetContainer}>
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

                    {/* Preset Coupon 1: LILY50 */}
                    <TouchableRipple
                        onPress={() => handleSelectPreset("LILY50")}
                        rippleColor={Colors.ripple}
                        style={styles.couponCard}
                    >
                        <View style={styles.couponCardContent}>
                            <View style={styles.couponInfo}>
                                <View style={styles.couponCodeBadge}>
                                    <Text style={styles.couponCodeText}>LILY50</Text>
                                </View>
                                <Text style={styles.couponDescription}>
                                    Get 50% OFF on your order!
                                </Text>
                                <Text style={styles.couponExpiry}>No minimum order value</Text>
                            </View>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={22}
                                color={Colors.primary}
                            />
                        </View>
                    </TouchableRipple>

                    {/* Preset Coupon 2: FASHION20 */}
                    <TouchableRipple
                        onPress={() => handleSelectPreset("FASHION20")}
                        rippleColor={Colors.ripple}
                        style={styles.couponCard}
                    >
                        <View style={styles.couponCardContent}>
                            <View style={styles.couponInfo}>
                                <View style={styles.couponCodeBadge}>
                                    <Text style={styles.couponCodeText}>FASHION20</Text>
                                </View>
                                <Text style={styles.couponDescription}>
                                    Get 20% OFF on your order!
                                </Text>
                                <Text style={styles.couponExpiry}>No minimum order value</Text>
                            </View>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={22}
                                color={Colors.primary}
                            />
                        </View>
                    </TouchableRipple>

                    {/* Preset Coupon 3: LILYSTYLEE */}
                    <TouchableRipple
                        onPress={() => handleSelectPreset("LILYSTYLEE")}
                        rippleColor={Colors.ripple}
                        style={styles.couponCard}
                    >
                        <View style={styles.couponCardContent}>
                            <View style={styles.couponInfo}>
                                <View style={styles.couponCodeBadge}>
                                    <Text style={styles.couponCodeText}>LILYSTYLEE</Text>
                                </View>
                                <Text style={styles.couponDescription}>
                                    Get Flat $10 OFF on orders above $50.
                                </Text>
                                <Text style={styles.couponExpiry}>
                                    Minimum order value: $50 • Current order: ${subtotal.toFixed(2)}
                                </Text>
                            </View>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={22}
                                color={Colors.primary}
                            />
                        </View>
                    </TouchableRipple>
                </BottomSheetView>
            </BottomSheet>
        </Portal>
    );
});

CouponBottomSheet.displayName = "CouponBottomSheet";

const styles = StyleSheet.create({
    sheetContainer: {
        padding: 20,
        gap: 16,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
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
        height: 48,
        paddingHorizontal: 16,
        fontSize: 14,
        color: "#0f172a",
    },
    applyButton: {
        borderRadius: 6,
    },
    applyButtonLabel: {
        fontSize: 12,
        fontWeight: "bold",
        marginHorizontal: 12,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#475569",
        marginTop: 8,
    },
    couponCard: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        padding: 14,
        backgroundColor: "#ffffff",
    },
    couponCardContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "between",
        gap: 12,
    },
    couponInfo: {
        flex: 1,
        gap: 4,
    },
    couponCodeBadge: {
        alignSelf: "flex-start",
        backgroundColor: Colors.primaryLight || "#fce7f3",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    couponCodeText: {
        fontSize: 12,
        fontWeight: "bold",
        color: Colors.primary,
    },
    couponDescription: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1e293b",
    },
    couponExpiry: {
        fontSize: 11,
        color: "#64748b",
    },
});

export default CouponBottomSheet;
