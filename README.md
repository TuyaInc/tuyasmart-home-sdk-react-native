# tuyasmart-home-sdk-react-native

![](https://img.shields.io/github/license/TuyaInc/tuyasmart-home-sdk-react-native.svg)

## Feature Overview

Tuya Smart APP SDK provides the interface package for the communication with hardware and Tuya Cloud to accelerate the application development process, including the following features:

Hardware functions (network configuration, control, status reporting, regular tasks, groups, firmware upgrades, sharing)
Account system (phone number, email registration, login, password reset and other general account functions)
Tuya Cloud HTTP API interface package



## Examples

See the demo in https://github.com/TuyaInc/tuyasmart-home-sdk-react-native
## Doc

Refer to Details: [Tuya Smart Doc: tuyasmart-home-sdk-react-native](https://tuyakae.gitbook.io/tuyasmart-home-sdk-react-native)



## How to use - iOS
 
#### 1. Add the dependencies in the Podfile:
``` ruby
 platform :ios, '8.0'
 target 'Your_Project_Name' do
    pod "TuyaSmartHomeKit"
    pod 'React', :path => 'path/to/node_modules/react-native/', :subspecs => [
        'Core',
        'CxxBridge',
        'ART',
        'RCTActionSheet',
        'RCTAnimation',
        'RCTGeolocation',
        'RCTImage',
        'RCTNetwork',
        'RCTPushNotification',
        'RCTSettings',
        'RCTText',
        'RCTImage',
        'RCTVibration',
        'RCTWebSocket',
        'RCTLinkingIOS',
        'DevSupport'
    ]
    
    pod 'yoga', :path => 'path/to/node_modules/react-native/ReactCommon/yoga'
    pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
    pod 'glog', :podspec => 'path/to/node_modules/react-native/third-party-podspecs/glog.podspec'
    pod 'Folly', :podspec => 'path/to/node_modules/react-native/third-party-podspecs/Folly.podspec'
    end
```
#### 2. Drag the files in [TuyaRNSDK](https://github.com/TuyaInc/tuyasmart-home-sdk-react-native/) to your project.
#### 3. put the secure image into the root path of your project and configure your AppKey and AppSecret in AppDelegate.m like this(refer to [SDK doc](https://tuyainc.github.io/tuyasmart_home_ios_sdk_doc/en/)):

```

```
#### 2. compile sdk/android in your project
#### 3. put the secure image into the root path of your project and configure your AppKey and AppSecret in AppDelegate.m like this(refer to [SDK doc](https://tuyainc.github.io/tuyasmart_home_android_sdk_doc/en/)):


```
dependencies {
    ……
     implementation project(':tuya-react-sdk')
    ……
}

setting.gradle

include ':tuya-react-sdk'
project(':tuya-react-sdk').projectDir = new File(rootProject.projectDir, '../sdk/android')
```

###  3.TIPS

* in App/constant File

```
const appKey=""
const appSecret=""

//login Account
const countryCode=""
const userName=""
const password=""


There are many constants that are applied to App to fill in before it starts.
```

### 4.**At present, the project is still in the process of perfection, and there are still some problems.**