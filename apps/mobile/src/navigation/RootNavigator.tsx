import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { AdDetailsScreen } from '../screens/AdDetailsScreen';
import { CreateAdScreen } from '../screens/CreateAdScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const RootNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Create" component={CreateAdScreen} />
    <Tab.Screen name="Ad" component={AdDetailsScreen} options={{ tabBarItemStyle: { display: 'none' }, tabBarButton: () => null }} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
