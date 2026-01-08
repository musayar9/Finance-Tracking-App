import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS } from "../utils/theme";

const screenWidth = Dimensions.get("window").width - 40;

export default function ChartComponent({ data = [], days = 7 }) {
  return (
    <LineChart
      data={{
        labels: Array.from({ length: data.length }, (_, i) => ""),
        datasets: [{ data }],
      }}
      width={screenWidth}
      height={150}
      yAxisLabel="$"
      withDots={false}
      withShadow={true}
      withInnerLines={false}
      chartConfig={{
        backgroundGradientFrom: COLORS.background,
        backgroundGradientTo: COLORS.background,
        color: (opacity = 1) => `rgba(0,122,255,${opacity})`,
        propsForBackgroundLines: { stroke: "transparent" },
      }}
      bezier
      style={{ borderRadius: 12 }}
    />
  );
}
