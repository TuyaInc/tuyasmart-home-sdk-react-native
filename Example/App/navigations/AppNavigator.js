import { StackNavigator, StackActions, NavigationActions } from 'react-navigation';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import LoginHomePage from '../pages/Login/LoginHomePage';
import RegisterPage from '../pages/Login/RegisterPage';
import LoginPage from '../pages/Login/LoginPage';
import CreateHomePage from '../pages/CreateHomePage';
import CreateHomeListPage from '../pages/CreateHomeListPage';
import ConfigPage from '../pages/configPages/ConfigPage';
import sceneHomePage from '../pages/ScenePages/sceneHomePage';
import AddScenePage from '../pages/ScenePages/AddScenePage';
import SceneActionPage from '../pages/ScenePages/SceneActionPage';
import AddActionPage from '../pages/ScenePages/AddActionPage';
import DevicesFunctionPage from '../pages/ScenePages/DevicesFunctionPage';
import ActionBoolPage from '../pages/ScenePages/ActionBoolPage';
import AddAutoPage from '../pages/ScenePages/AddAutoPage';
import ConditionListPage from '../pages/ScenePages/ConditionListPage';
import ConditionPage from '../pages/ScenePages/ConditionPage';
import CityListPage from '../pages/ScenePages/CityListPage';
import DeleteScenePage from '../pages/ScenePages/DeleteScenePage';
import DeviceDetailPage from '../pages/DeviceDetailPage';
import DeviceSettingPage from '../pages/DeviceSettingPage';
import SharePage from '../pages/share/SharePage';
import AddSharePage from '../pages/share/AddSharePage';
import GroupPage from '../pages/group/GroupPage';
import SchedulePage from '../pages/TimerPages/SchedulePage';
import TimerHomePage from '../pages/TimerPages/TimerHomePage';
import RoomSettingPage from '../pages/room/RoomSettingPage';
import AddRoomPage from '../pages/room/AddRoomPage';
import TestPage from '../pages/TestPage';
import TestGroupPage from '../pages/TestGroupPage';
import TestScenePage from '../pages/TestScenePage';
import TestFeedBackPage from '../pages/TestFeedBackPage';
import TestMessagePage from '../pages/TestMessagePage';

export default (AppNavigator = StackNavigator(
  {
    WelcomePage: {
      screen: WelcomePage,
    },
    HomePage: {
      screen: HomePage,
    },
    LoginHomePage: {
      screen: LoginHomePage,
    },
    RegisterPage: {
      screen: RegisterPage,
    },
    LoginPage: {
      screen: LoginPage,
    },
    CreateHomePage: {
      screen: CreateHomePage,
    },
    CreateHomeListPage: {
      screen: CreateHomeListPage,
    },
    ConfigPage: {
      screen: ConfigPage,
    },
    sceneHomePage: {
      screen: sceneHomePage,
    },
    AddScenePage: {
      screen: AddScenePage,
    },
    SceneActionPage: {
      screen: SceneActionPage,
    },
    AddActionPage: {
      screen: AddActionPage,
    },
    DevicesFunctionPage: {
      screen: DevicesFunctionPage,
    },
    ActionBoolPage: {
      screen: ActionBoolPage,
    },
    AddAutoPage: {
      screen: AddAutoPage,
    },
    ConditionListPage: {
      screen: ConditionListPage,
    },
    ConditionPage: {
      screen: ConditionPage,
    },
    CityListPage: {
      screen: CityListPage,
    },
    DeleteScenePage: {
      screen: DeleteScenePage,
    },
    DeviceDetailPage: {
      screen: DeviceDetailPage,
    },
    DeviceSettingPage: {
      screen: DeviceSettingPage,
    },
    SharePage: {
      screen: SharePage,
    },
    AddSharePage: {
      screen: AddSharePage,
    },
    GroupPage: {
      screen: GroupPage,
    },
    TimerHomePage: {
      screen: TimerHomePage,
    },
    SchedulePage: {
      screen: SchedulePage,
    },
    RoomSettingPage: {
      screen: RoomSettingPage,
    },
    AddRoomPage: {
      screen: AddRoomPage,
    },
    TestPage: {
      screen: TestPage,
    },
    TestGroupPage: {
      screen: TestGroupPage,
    },
    TestScenePage: {
      screen: TestScenePage,
    },
    TestFeedBackPage: {
      screen: TestFeedBackPage,
    },
    TestMessagePage: {
      screen: TestMessagePage,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
));

export function resetAction(name) {
  return StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: name })],
  });
}

export function resetActionWithParams(name, params) {
  return StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: name, params })],
  });
}
