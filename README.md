# tuyasmart-home-sdk-react-native

![](https://img.shields.io/github/license/TuyaInc/tuyasmart-home-sdk-react-native.svg)

## Feature Overview

Tuya Smart APP SDK provides the interface package for the communication with hardware and Tuya Cloud to accelerate the application development process, including the following features:

Hardware functions (network configuration, control, status reporting, regular tasks, groups, firmware upgrades, sharing)
Account system (phone number, email registration, login, password reset and other general account functions)
Tuya Cloud HTTP API interface package

## Getting started
* （This has not been updated yet. Please refer to the following method）

`$ npm install tuyasmart-home-sdk --save`

`$ react-native link tuyasmart-home-sdk`

## Examples

See the demo in https://github.com/TuyaInc/tuyasmart-home-sdk-react-native/tree/master/Example before using.

## Doc

Refer to Details: [Tuya Smart Doc: tuyasmart-home-sdk-react-native](https://tuyakae.gitbook.io/tuyasmart-home-sdk-react-native)

## USE AndroidRNSDK
###  1. click this `https://github.com/TuyaInc/tuyasmart-home-sdk-react-native/tree/master/Example/android`

![cmd-markdown1](pic/android1.png)

Put this module into your own android （just copy code）

###  2. in your app build.gradle add implementation

```
dependencies {
    ……
    implementation project(':tuyasmart-sdk-react-native')
    ……
}
```

###  3. in your app MainApplication ,you should initSDK 

You can choose one of the following two ways to go initSDK

* the first one

```

Appkey and appSecret are configured in the AndroidManifest.xml file, and corresponding permissions are also configured

<meta-data
android:name="TUYA_SMART_APPKEY"
android:value="Appkey" />
<meta-data
android:name="TUYA_SMART_SECRET"
android:value="AppSecret" />

TuyaCoreModule.Companion.initTuyaSDKWithoutOptions()
```

* the second one

```
TuyaCoreModule.Companion.initTuyaSDk("xxxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxxx",this);

```

* how to use

```

@Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // Fill in appkey and appsecret of the application below
   // TuyaCoreModule.Companion.initTuyaSDKWithoutOptions();
  //TuyaCoreModule.Companion.initTuyaSDk("xxxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxxx",this);
  //TuyaCoreModule.setSDKDebug(true) //if you have some problem ,You can grab the log for us
  }


```

