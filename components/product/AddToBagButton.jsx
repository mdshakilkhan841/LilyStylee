import { Button } from "react-native-paper";

const AddToBagButton = () => {
    return (
        <Button
            mode="contained"
            buttonColor="transparent"
            textColor="#db2777"
            labelStyle={{
                fontSize: 13,
                fontWeight: 700,
                marginVertical: 5,
            }}
            style={{
                borderRadius: 6,
                borderWidth: 1,
                borderColor: "#db2777",
                marginTop: 8,
            }}
            onPress={() => {}}
        >
            ADD TO BAG
        </Button>
    );
};

export default AddToBagButton;
