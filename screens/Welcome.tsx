import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/HOC/CustomButton';
import AppContext from '../context/AppContext';

export default function WelcomeScreen({ navigation }) {
	const {
		globalState: { user },
	} = React.useContext(AppContext);

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Welcome, {user?.firstName && user.firstName}</Text>
			<CustomButton onPress={() => navigation.navigate('Profile')} text={'Navigate to Profile'} />
		</SafeAreaView>
	);
}
