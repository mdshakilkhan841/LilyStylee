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
import { TouchableRipple, Portal, Button } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/colors";
import toast from "@/utils/toast";

const SAVED_LOCATIONS = [
    {
        id: "home",
        title: "Home",
        value: "Shakil Khan, 769008",
        subtext: "769008, Shakil Khan - Dhaka, BD",
        icon: "home-outline",
    },
    {
        id: "office",
        title: "Office",
        value: "Shakil Office, 100012",
        subtext: "100012, Shakil Office - Gulshan, BD",
        icon: "briefcase-outline",
    },
];

const LocationBottomSheet = forwardRef(
    ({ onSelectLocation, selectedLocation }, ref) => {
        const [isVisible, setIsVisible] = useState(false);
        const bottomSheetRef = useRef(null);

        const snapPoints = useMemo(() => ["56%"], []);

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

        // Helper check function to match formats like "769008, Shakil Khan" and "Shakil Khan, 769008"
        const isSelected = (value) => {
            if (!selectedLocation) return false;
            const normalizedSelected = selectedLocation
                .replace(/\s+/g, "")
                .toLowerCase();
            const normalizedValue = value.replace(/\s+/g, "").toLowerCase();

            // Also check reverse format if comma-separated
            if (value.includes(",")) {
                const parts = value.split(",");
                const reversedValue = `${parts[1].trim()}, ${parts[0].trim()}`;
                const normalizedReversed = reversedValue
                    .replace(/\s+/g, "")
                    .toLowerCase();
                return (
                    normalizedSelected === normalizedValue ||
                    normalizedSelected === normalizedReversed
                );
            }

            return normalizedSelected === normalizedValue;
        };

        const isGpsSelected = selectedLocation === "Current location (GPS)";

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
                                onSelectLocation?.("Current location (GPS)");
                                toast.success("Location updated to GPS");
                                bottomSheetRef.current?.close();
                                setIsVisible(false);
                            }}
                            rippleColor={Colors.ripple}
                            style={
                                isGpsSelected
                                    ? styles.locationOptionActive
                                    : styles.locationOption
                            }
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
                                {isGpsSelected && (
                                    <MaterialCommunityIcons
                                        name="check-circle"
                                        size={20}
                                        color={Colors.primary}
                                    />
                                )}
                            </View>
                        </TouchableRipple>

                        {/* Dynamic Mapped Saved Locations */}
                        {SAVED_LOCATIONS.map((loc) => {
                            const active = isSelected(loc.value);
                            return (
                                <TouchableRipple
                                    key={loc.id}
                                    borderless
                                    onPress={() => {
                                        onSelectLocation?.(loc.value);
                                        toast.success(
                                            `Location updated to ${loc.title}`,
                                        );
                                        bottomSheetRef.current?.close();
                                        setIsVisible(false);
                                    }}
                                    rippleColor={Colors.ripple}
                                    style={
                                        active
                                            ? styles.locationOptionActive
                                            : styles.locationOption
                                    }
                                >
                                    <View style={styles.optionContent}>
                                        <MaterialCommunityIcons
                                            name={loc.icon}
                                            size={22}
                                            color={Colors.primary}
                                        />
                                        <View
                                            style={styles.optionTextContainer}
                                        >
                                            <Text style={styles.optionTitle}>
                                                {loc.title}
                                            </Text>
                                            <Text style={styles.optionSub}>
                                                {loc.subtext}
                                            </Text>
                                        </View>
                                        {active && (
                                            <MaterialCommunityIcons
                                                name="check-circle"
                                                size={20}
                                                color={Colors.primary}
                                            />
                                        )}
                                    </View>
                                </TouchableRipple>
                            );
                        })}

                        {/* Add New Address Button */}
                        <Button
                            mode="outlined"
                            icon="plus"
                            textColor={Colors.primary}
                            style={styles.addButton}
                            labelStyle={styles.addButtonLabel}
                            onPress={() => {
                                toast.success(
                                    "Add Address screen coming soon!",
                                );
                            }}
                        >
                            ADD NEW ADDRESS
                        </Button>
                    </BottomSheetView>
                </BottomSheet>
            </Portal>
        );
    },
);

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
    locationOptionActive: {
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 14,
        backgroundColor: "#fff0f6",
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
    addButton: {
        marginTop: 6,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 8,
    },
    addButtonLabel: {
        fontSize: 12,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
});

export default LocationBottomSheet;
