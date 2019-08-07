import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import LoginHomePage from '../pages/Login/LoginHomePage';
import RegisterPage from '../pages/Login/RegisterPage';
import LoginPage from '../pages/Login/LoginPage';
import LoginWithCodePage from '../pages/Login/LoginWithCodePage';

import CreateHomePage from '../pages/room/CreateHomePage';
import AddDevicePage from '../pages/device/AddDevicePage';
import sceneHomePage from '../pages/ScenePages/sceneHomePage';
import AddScenePage from '../pages/ScenePages/AddScenePage';
import AddActionPage from '../pages/ScenePages/AddActionPage';
import DevicesFunctionPage from '../pages/ScenePages/DevicesFunctionPage';
import ActionBoolPage from '../pages/ScenePages/ActionBoolPage';
import AddAutoPage from '../pages/ScenePages/AddAutoPage';
import ConditionListPage from '../pages/ScenePages/ConditionListPage';
import ConditionPage from '../pages/ScenePages/ConditionPage';
import CityListPage from '../pages/ScenePages/CityListPage';
import DeleteScenePage from '../pages/ScenePages/DeleteScenePage';
import DeviceDetailPage from '../pages/device/DeviceDetailPage';
import DeviceSettingPage from '../pages/device/DeviceSettingPage';
import SharePage from '../pages/share/SharePage';
import AddSharePage from '../pages/share/AddSharePage';
import GroupPage from '../pages/group/GroupPage';
import SchedulePage from '../pages/TimerPages/SchedulePage';
import TimerHomePage from '../pages/TimerPages/TimerHomePage';
import RoomSettingPage from '../pages/room/RoomSettingPage';
import AddRoomPage from '../pages/room/AddRoomPage';
import ResetPassWordPage from '../pages/Login/ResetPassWordPage';
import HomeListPage from '../pages/room/HomeListPage';
import TestApiPage from '../pages/home/TestApiPage';

import {getTestScreen} from '../pages/test/index'
const StackNavigatorConfig = {
  initialRouteName: 'WelcomePage',
  navigationOptions: () => ({
    header: null,
  }),
}

export const Pages =   {
  WelcomePage: {
    screen: WelcomePage,
  },
  HomeListPage: {
    screen: HomeListPage,
  },
  TestApiPage: {
    screen: TestApiPage,
  },
  HomePage: {
    screen: HomePage,
  },
  LoginHomePage: {
    screen: LoginHomePage,
  },
  LoginWithCodePage:{
     screen:LoginWithCodePage
  },
  RegisterPage: {
    screen: RegisterPage,
  },
  ResetPassWordPage: {
    screen: ResetPassWordPage,
  },
  LoginPage: {
    screen: LoginPage,
  },
  CreateHomePage: {
    screen: CreateHomePage,
  },
  AddDevicePage: {
    screen: AddDevicePage,
  },
  sceneHomePage: {
    screen: sceneHomePage,
  },
  AddScenePage: {
    screen: AddScenePage,
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
  ...getTestScreen()
}

const AppNavigator = createStackNavigator(Pages, StackNavigatorConfig)


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
export default AppNavigator
