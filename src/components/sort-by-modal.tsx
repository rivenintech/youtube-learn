import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

export default function SortByModal({
  options,
  defaultOption,
  onConfirm,
}: {
  options: { label: string; value: string }[];
  defaultOption: string;
  onConfirm: (option: string) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((opt) => opt.value === defaultOption) || options[0]
  );

  const handleConfirm = () => {
    setModalVisible(false);
    onConfirm(selectedOption.value);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}>
            <ThemedText fontWeight="semibold" style={styles.title}>
              Sort records by:
            </ThemedText>

            <View style={styles.optionsContainer}>
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  style={styles.optionRow}
                  onPress={() => {
                    setSelectedOption(option);
                  }}
                >
                  <View style={styles.radioOuter}>
                    {selectedOption.value === option.value && <View style={styles.radioInner} />}
                  </View>
                  <ThemedText style={styles.optionLabel}>{option.label}</ThemedText>
                </Pressable>
              ))}
            </View>

            <Pressable onPress={handleConfirm} style={styles.confirmButton}>
              <ThemedText fontWeight="semibold" style={styles.confirmText}>
                Confirm
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)} style={styles.sortByButton}>
        <ThemedText style={styles.sortByText}>
          Sort by: <ThemedText fontWeight="semibold">{selectedOption.label}</ThemedText>
        </ThemedText>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  modalContainer: {
    backgroundColor: "#8D99AE",
    borderRadius: 24,
    padding: 32,
    width: 320,
    height: 400,
  },
  title: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 24,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#2B2D42",
  },
  optionLabel: {
    fontSize: 14,
    lineHeight: 18,
    color: "#FFFFFF",
  },
  confirmButton: {
    backgroundColor: "#2B2D42",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: "auto",
  },
  confirmText: {
    fontSize: 14,
    lineHeight: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
  sortByButton: {
    marginLeft: "auto",
    marginBottom: 12,
  },
  sortByText: {
    fontSize: 12,
    lineHeight: 24,
  },
});
