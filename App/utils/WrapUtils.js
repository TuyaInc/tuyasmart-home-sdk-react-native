import { Platform } from 'react-native'
export const wrapScene = function (item) {
    const data = {
        devId: item.entityId,
        devName: item.entityName,
        dpId: parseInt(item.executorProperty.dpId),
        dpName: item.executorProperty.dpName,
        value: item.executorProperty.value,
        task: {
            dpId: parseInt(item.executorProperty.dpId),
            value: item.executorProperty.value
        }
    }
    return data
}