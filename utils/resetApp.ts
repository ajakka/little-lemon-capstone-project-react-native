import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetDatabase } from '../database';

export default async function resetApp() {
	try {
		await AsyncStorage.clear();
		await resetDatabase();
		alert('App Async Storage & DB Reset. Please restart the app.');
	} catch (e) {
		alert('Error resetting DB and AsyncStorage...');
	}
}
