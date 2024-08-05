import isEmpty from 'lodash/isEmpty';
import React, { useCallback } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity } from 'react-native';
import testIDs from '@/screens/Calendar/testIDs';
import type { AgendaItemData } from '@/types/schemas/agendaItemType';
import { hoursAndMinutes } from '@/helpers/utils/formatTime';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import alertAction from '@/helpers/utils/alertAction';
import { useTheme } from '@/theme';

const styles = StyleSheet.create({
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
	item: AgendaItemData;
	handleDelete: () => void;
	handleComplete: () => void;
}

function AgendaItem(props: ItemProps) {
	const { item, handleDelete, handleComplete } = props;
	const date = new Date(item.date);
	const { backgrounds, fonts, layout, gutters, borders } = useTheme();
	const itemPressed = useCallback(() => {
		Alert.alert('Coś');
	}, []);
	const startTime = hoursAndMinutes(date);
	const timeInMillis = date.getTime();
	const newTimeInMillis = timeInMillis + item.duration * 60000;
	const newDate = new Date(newTimeInMillis);
	const endTime = hoursAndMinutes(newDate);
	if (isEmpty(item))
		return (
			<View style={styles.emptyItem}>
				<Text style={styles.emptyItemText}>No Events Planned Today</Text>
			</View>
		);

	return (
		<TouchableOpacity
			onPress={itemPressed}
			style={[
				layout.row,
				gutters.padding_16,
				borders.gray100,
				borders.w_1,
				item.completed ? backgrounds.green400 : backgrounds.purple100,
			]}
			testID={testIDs.agenda.ITEM}
		>
			<View>
				<Text style={fonts.gray200}>{startTime}</Text>
				{startTime !== endTime && <Text style={fonts.gray200}>{endTime}</Text>}
			</View>
			<Text
				style={[
					fonts.gray200,
					fonts.size_16,
					fonts.bold,
					gutters.marginLeft_16,
				]}
			>
				{item.title}
			</Text>
			<View style={styles.itemButtonContainer}>
				{!item.completed && (
					<TouchableOpacity
						onPress={() => alertAction('complete', item.title, handleComplete)}
					>
						<MaterialCommunityIcons name="check" size={20} color="green" />
					</TouchableOpacity>
				)}
				<TouchableOpacity
					onPress={() => alertAction('delete', item.title, handleDelete)}
				>
					<MaterialCommunityIcons color="red" name="delete" size={20} />
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
}

export default React.memo(AgendaItem);
