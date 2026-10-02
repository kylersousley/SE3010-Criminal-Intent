import { ThemeContext } from "@/contexts/ThemeContext";
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useContext } from "react";
import { Button, Platform, View, StyleSheet } from "react-native";

type Props = {
  value: Date;
  mode: "date" | "time";
  onValueChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  displayIOS:
    | "default"
    | "calendar"
    | "spinner"
    | "clock"
    | "compact"
    | "inline";
  titleAndroid: string;
};

export default function MultiPlatformDatePicker({ value, mode, onValueChange, displayIOS, titleAndroid }: Props) {
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: value,
      mode: mode,
      maximumDate: new Date(),
      onValueChange: onValueChange
    });
  };
  const { theme, mainTextColor } = useContext(ThemeContext)

  return (
    <View style={styles.dateContainer}>
      {Platform.OS === "ios" ? (
        <DateTimePicker
          value={new Date(value)}
          mode={mode}
          display={displayIOS}
          themeVariant={theme === "#181818" ? "dark" : "light"}
          textColor={mainTextColor}
          style={styles.datePicker}
          maximumDate={new Date()}
          onValueChange={onValueChange}
        />
      ) : (
        <View style={styles.buttonWrapper}>
          <Button
            title={titleAndroid}
            color={theme}
            onPress={showDatePicker}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center'
  },
  datePicker: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  buttonWrapper: {
    width: '100%'
  }
})

