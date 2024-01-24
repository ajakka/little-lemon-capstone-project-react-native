import React from 'react';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppContext from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkMenuTableAndPopulateData, selectAllMenu } from '../database';

import Header from '../components/Header/Header';
import Avatar from '../components/Avatar/Avatar';

import OnboardingScreen from '../screens/Onboarding';
import HomeScreen from '../screens/Home';
import SplashScreen from '../screens/Splash';
import ProfileScreen from '../screens/Profile';

const Stack = createNativeStackNavigator();

/**
 * The Navigation component handles the navigation logic of the app.
 * It uses the React Navigation library to create a stack navigator.
 * It also manages the loading of custom fonts and the initial loading
 * state based on user data and menu items from AsyncStorage.
 */
export default function Navigation() {
	const { globalState, setOnboardingCompleted, updateUser } = React.useContext(AppContext);

	const { isOnboardingCompleted } = globalState;
	const [isLoading, setIsLoading] = React.useState(true);
	const [fontLoaded] = Font.useFonts({
		Markazi: require('../assets/fonts/MarkaziText-Regular.ttf'),
		Karla: require('../assets/fonts/Karla-Regular.ttf'),
	});

	React.useEffect(() => {
		async function loadApp() {
			if (!fontLoaded) return;
			try {
				const user = await AsyncStorage.getItem('user');
				if (user) {
					updateUser(JSON.parse(user));
					setOnboardingCompleted(true);
					const existingMenuItems = await selectAllMenu();
					setIsLoading(existingMenuItems.length === 0);
					if (!existingMenuItems.length) {
						await checkMenuTableAndPopulateData();
					}
				} else {
					setIsLoading(false);
				}
			} catch (error) {
				console.error('Error loading app:', error);
				setIsLoading(false);
			}
		}

		loadApp();
	}, [fontLoaded]);

	function screenOptions(screenName, navigation) {
		return {
			headerTitle: props => <Header {...props} />,
			headerRight:
				screenName === 'Home'
					? () => <Avatar onPress={() => navigation.navigate('Profile')} onlyAvatar={true} />
					: undefined,
		};
	}

	if (isLoading) {
		return <SplashScreen />;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{isOnboardingCompleted ? (
					<>
						<Stack.Screen
							name="Home"
							component={HomeScreen}
							options={props => screenOptions('Home', props.navigation)}
						/>
						<Stack.Screen
							name="Profile"
							component={ProfileScreen}
							options={props => screenOptions('Profile', props.navigation)}
						/>
					</>
				) : (
					<Stack.Screen
						name="Onboarding"
						component={OnboardingScreen}
						options={props => screenOptions('Onboarding', props.navigation)}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
