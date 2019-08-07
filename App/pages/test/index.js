import TestTuyaActivatorApiPage from './TestTuyaActivatorApiPage'
import TestTuyaCoreApiPage from './TestTuyaCoreApiPage'
import TestTuyaFeedbackApiPage from './TestTuyaFeedbackApiPage'
import TestUserApiPage from './TestUserApiPage'
import TuyaDeviceApiPage from './TuyaDeviceApiPage'
import TuyaHomeApiPage from './TuyaHomeApiPage'
import TestTuyaGatewayApi from './TestTuyaGatewayApi'
import TestTuyaHomeDataManagerApi from './TestTuyaHomeDataManagerApi'
import TestTuyaHomeMemberApi from './TestTuyaHomeMemberApi'
import TestMessageApiPage from './TestMessageApiPage'
import TestOTAApiPage from './TestOTAApiPage'
import TestTuyaRoomApiPage from './TestTuyaRoomApiPage'
import TestTuyaTimerApiPage from './TestTuyaTimerApiPage'
import TuyaSingleTransferApiPage from './TuyaSingleTransferApiPage'
import TestTuyaShareApiPage from './TestTuyaShareApiPage'
import TestSceneApiPage from './TestSceneApiPage'
const LIST = [{
    name: 'TestTuyaActivatorApiPage',
    screen: TestTuyaActivatorApiPage
}, {
    name: 'TestTuyaCoreApiPage',
    screen: TestTuyaCoreApiPage
}, {
    name: 'TestTuyaFeedbackApiPage',
    screen: TestTuyaFeedbackApiPage
}, {
    name: 'TestUserApiPage',
    screen: TestUserApiPage
}, {
    name: 'TuyaDeviceApiPage',
    screen: TuyaDeviceApiPage
}, {
    name: 'TuyaHomeApiPage',
    screen: TuyaHomeApiPage
}, {
    name: 'TestTuyaGatewayApi',
    screen: TestTuyaGatewayApi
}, {
    name: 'TestTuyaHomeDataManagerApi',
    screen: TestTuyaHomeDataManagerApi
},{
    name: 'TestTuyaHomeMemberApi',
    screen: TestTuyaHomeMemberApi
},{
    name: 'TestMessageApiPage',
    screen: TestMessageApiPage
},
{
    name: 'TestOTAApiPage',
    screen: TestOTAApiPage
},
{
    name: 'TestTuyaRoomApiPage',
    screen: TestTuyaRoomApiPage
},
{
    name: 'TestTuyaTimerApiPage',
    screen: TestTuyaTimerApiPage
},
{
    name: 'TuyaSingleTransferApiPage',
    screen: TuyaSingleTransferApiPage
},
{
    name: 'TestTuyaShareApiPage',
    screen: TestTuyaShareApiPage
},
{
    name: 'TestSceneApiPage',
    screen: TestSceneApiPage
}
]

const getTestScreen = function () {
    const l ={}
    LIST.forEach(e => {
        l[e.name]={
            screen:e.screen
        }
    })
    return l
}




module.exports = {
    getTestScreen,
    LIST,
}