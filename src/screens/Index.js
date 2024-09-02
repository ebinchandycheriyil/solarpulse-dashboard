import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';

const mockData = [
  { time: '00:00', voltage: 12, current: 5, power: 60, boardPower: 40, batteryPercentage: 80 },
  { time: '04:00', voltage: 12.5, current: 5.5, power: 68.75, boardPower: 45, batteryPercentage: 85 },
  { time: '08:00', voltage: 13, current: 6, power: 78, boardPower: 50, batteryPercentage: 90 },
  { time: '12:00', voltage: 13.5, current: 6.5, power: 87.75, boardPower: 55, batteryPercentage: 95 },
  { time: '16:00', voltage: 13, current: 6, power: 78, boardPower: 50, batteryPercentage: 90 },
  { time: '20:00', voltage: 12.5, current: 5.5, power: 68.75, boardPower: 45, batteryPercentage: 85 },
];

const MetricCard = ({ title, value, unit }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}{unit}</Text>
  </View>
);

const Index = () => {
  const chartData = {
    labels: mockData.map(d => d.time),
    datasets: [
      {
        data: mockData.map(d => d.voltage),
        color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Solar Power Dashboard</Text>
        <View style={styles.cardContainer}>
          <MetricCard title="Voltage" value={mockData[mockData.length - 1].voltage} unit="V" />
          <MetricCard title="Current" value={mockData[mockData.length - 1].current} unit="A" />
          <MetricCard title="Power" value={mockData[mockData.length - 1].power} unit="W" />
          <MetricCard title="Board Power" value={mockData[mockData.length - 1].boardPower} unit="W" />
          <MetricCard title="Battery" value={mockData[mockData.length - 1].batteryPercentage} unit="%" />
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Voltage Over Time</Text>
          <LineChart
            data={chartData}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Index;