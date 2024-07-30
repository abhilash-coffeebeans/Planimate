import isEmpty from 'lodash/isEmpty';
import React, { useCallback } from 'react';
import {
	StyleSheet,
	Alert,
	View,
	Text,
	TouchableOpacity,
	Button,
} from 'react-native';
import testIDs from '@/screens/Calendar/testIDs';
import alertDelete from '@/helpers/utils/alertDelete';

const styles = StyleSheet.create({
	item: {
		padding: 20,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: 'lightgrey',
		flexDirection: 'row',
	},
	itemHourText: {
		color: 'black',
	},
	itemDurationText: {
		color: 'grey',
		fontSize: 12,
		marginTop: 4,
		marginLeft: 4,
	},
	itemTitleText: {
		color: 'black',
		marginLeft: 16,
		fontWeight: 'bold',
		fontSize: 16,
	},
	itemButtonContainer: {
		flex: 1,
		alignItems: 'flex-end',
	},
	emptyItem: {
		paddingLeft: 20,
		height: 52,
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'lightgrey',
	},
	emptyItemText: {
		color: 'lightgrey',
		fontSize: 14,
	},
});

interface ItemProps {
	item: any;
	handleDelete: () => void;
}

function AgendaItem(props: ItemProps) {
	const { item, handleDelete } = props;

	const buttonPressed = useCallback(() => {
		alertDelete(item.title, handleDelete);
	}, []);

	const itemPressed = useCallback(() => {
		Alert.alert('Coś');
	}, []);

	if (isEmpty(item)) {
		return (
			<View style={styles.emptyItem}>
				<Text style={styles.emptyItemText}>No Events Planned Today</Text>
			</View>
		);
	}

	return (
		<TouchableOpacity
			onPress={itemPressed}
			style={styles.item}
			testID={testIDs.agenda.ITEM}
		>
			<View>
				<Text style={styles.itemHourText}>{item.hour}</Text>
				<Text style={styles.itemDurationText}>{item.duration}</Text>
			</View>
			<Text style={styles.itemTitleText}>{item.title}</Text>
			<View style={styles.itemButtonContainer}>
				<Button color="grey" title="X" onPress={buttonPressed} />
			</View>
		</TouchableOpacity>
	);
}

export default React.memo(AgendaItem);