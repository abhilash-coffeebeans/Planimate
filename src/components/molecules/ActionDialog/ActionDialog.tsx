import { ActivityIndicator } from 'react-native';
import { UseMutationResult } from '@tanstack/react-query';
import { MutationVariables } from '@/types/variables';
import { useStorage } from '@/storage/StorageContext';
import { useEffect } from 'react';
import Dialog from 'react-native-dialog';
import { useNetInfo } from '@react-native-community/netinfo';

type Props = {
	mutation: () => UseMutationResult<void, Error, MutationVariables>;
	actionName: string;
	id?: string;
	agendaDataId?: number;
	action: () => void;
	name: string;
	visible: boolean;
	onCancel: () => void;
	offlineAction: (id?: string, agendaDataId?: number) => void;
};
function ActionDialog({
	mutation,
	actionName,
	id = undefined,
	action,
	agendaDataId = undefined,
	name,
	visible,
	onCancel,
	offlineAction,
}: Props) {
	const { mutate, isSuccess, isPending } = mutation();
	const storage = useStorage();
	const { isConnected } = useNetInfo();
	useEffect(() => {
		if (isSuccess) action();
	}, [isSuccess]);
	const handlePress = () => {
		const token = storage.getString('token');
		if (token && id && isConnected) {
			if (agendaDataId) mutate({ id, agendaDataId, token });
			else mutate({ id, token });
		} else {
			action();
			offlineAction(id, agendaDataId);
		}
	};

	return (
		<Dialog.Container visible={visible}>
			<Dialog.Title>Confirmation</Dialog.Title>
			<Dialog.Description>{`Are you sure you want to ${actionName} ${name}`}</Dialog.Description>
			{isPending && <ActivityIndicator size="large" />}
			<Dialog.Button label="Cancel" onPress={onCancel} />
			<Dialog.Button label="OK" onPress={handlePress} />
		</Dialog.Container>
	);
}

export default ActionDialog;
