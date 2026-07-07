import React, {
    forwardRef,
    useCallback,
    useMemo,
    useState,
    useImperativeHandle,
    useRef,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, {
    BottomSheetView,
    BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { TouchableRipple, Portal } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/colors";
import toast from "@/utils/toast";

const LocationBottomSheet = forwardRef(({ onSelectLocation }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const bottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ["45%"], []);

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
                    <Text style={styles.sheetTitle}>
                        Select Delivery Location
                    </Text>

                    {/* GPS Current Location Option */}
                    <TouchableRipple
                        borderless
                        onPress={() => {
                            onSelectLocation("Current location (GPS)");
                            toast.success("Location updated to GPS");
                            bottomSheetRef.current?.close();
                            setIsVisible(false);
                        }}
                        rippleColor={Colors.ripple}
                        style={styles.locationOption}
                    >
                        <View style={styles.optionContent}>
                            <MaterialCommunityIcons
                                name="crosshairs-gps"
                                size={22}
                                color={Colors.primary}
                            />
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionTitle}>
                                    Use Current Location
                                </Text>
                                <Text style={styles.optionSub}>
                                    Using GPS tracking
                                </Text>
                            </View>
                        </View>
                    </TouchableRipple>

                    {/* Saved Location 1: Home */}
                    <TouchableRipple
                        borderless
                        onPress={() => {
                            onSelectLocation("769008, Shakil Khan");
                            toast.success("Location updated to Home");
                            bottomSheetRef.current?.close();
                            setIsVisible(false);
                        }}
                        rippleColor={Colors.ripple}
                        style={styles.locationOption}
                    >
                        <View style={styles.optionContent}>
                            <MaterialCommunityIcons
                                name="home-outline"
                                size={22}
                                color={Colors.primary}
                            />
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionTitle}>Home</Text>
                                <Text style={styles.optionSub}>
                                    769008, Shakil Khan - Dhaka, BD
                                </Text>
                            </View>
                        </View>
                    </TouchableRipple>

                    {/* Saved Location 2: Office */}
                    <TouchableRipple
                        borderless
                        onPress={() => {
                            onSelectLocation("100012, Shakil Office");
                            toast.success("Location updated to Office");
                            bottomSheetRef.current?.close();
                            setIsVisible(false);
                        }}
                        rippleColor={Colors.ripple}
                        style={styles.locationOption}
                    >
                        <View style={styles.optionContent}>
                            <MaterialCommunityIcons
                                name="briefcase-outline"
                                size={22}
                                color={Colors.primary}
                            />
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionTitle}>Office</Text>
                                <Text style={styles.optionSub}>
                                    100012, Shakil Office - Gulshan, BD
                                </Text>
                            </View>
                        </View>
                    </TouchableRipple>
                </BottomSheetView>
            </BottomSheet>
        </Portal>
    );
});

LocationBottomSheet.displayName = "LocationBottomSheet";

const styles = StyleSheet.create({
    sheetContainer: {
        padding: 20,
        gap: 16,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: Colors.textDark || "#000000",
    },
    locationOption: {
        borderWidth: 1,
        borderColor: Colors.borderLight || "#e2e8f0",
        borderRadius: 8,
        padding: 14,
    },
    optionContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.textDark || "#000000",
    },
    optionSub: {
        fontSize: 12,
        color: "#64748b",
        marginTop: 2,
    },
});

export default LocationBottomSheet;
