import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '@screens/Home';
import { StatusBar } from 'react-native';
import Search from '@screens/Search';
import Favorites from '@screens/Favorites';
import Profile from '@screens/Profile';
import Product from '@screens/Product';

type RootStackParamList = {
  HomeTabs: undefined;
  Product: undefined;
};

type HomeTabsParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabsParamList>();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <NavigationContainer>
        <RootStackScreens />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const RootStackScreens: React.FC = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="HomeTabs" component={HomeTabs} />
    <RootStack.Screen name="Product" component={Product} />
  </RootStack.Navigator>
);

const HomeTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color }) => {
          return <TabIcon name={route.name} focused={focused} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#C7C6CC',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

interface TabIconProps {
  name: keyof HomeTabsParamList; 
  focused: boolean;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, color }) => {
  const iconName = getIconName(name, focused);
  return <Ionicons name={iconName} size={22} color={color} />;
};

const getIconName = (name: keyof HomeTabsParamList, focused: boolean) => {
  switch (name) {
    case 'Home':
      return focused ? 'md-home-sharp' : 'md-home-outline';
    case 'Search':
      return focused ? 'md-search' : 'md-search-outline';
    case 'Favorites':
      return focused ? 'ios-heart' : 'ios-heart-outline';
    case 'Profile':
      return focused ? 'person-circle' : 'person-circle-outline';
    default:
      return 'help-sharp';
  }
};

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    position: 'absolute',
  },
});

export default App;