import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";

function MapScreen() {
  return(
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  )
}

function ReportScreen() {
  return(
    <View style={styles.container}>
      <Text>Test2</Text>
    </View>
  )
}

function HistoryScreen() {
  return(
    <View style={styles.container}>
      <Text>Test3</Text>
    </View>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" options={{ headerShown: false }} component={MapScreen} />
      <Tab.Screen name="report" options={{ headerShown: false }} component={ReportScreen} />
      <Tab.Screen name="history" options={{ headerShown: false }} component={HistoryScreen} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
