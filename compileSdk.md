# example


##1. react-native init demo --version 0.59



##2. copy sdk

####  compile android in your project

android/setting.gradle
```
include ':tuya-react-sdk'
project(':tuya-react-sdk').projectDir = new File(rootProject.projectDir, '../sdk/android')
```

android/app/build.gradle
```
android{
    ...
      packagingOptions {
        pickFirst 'lib/x86/libc++_shared.so'
        pickFirst 'lib/x86_64/libjsc.so'
        pickFirst 'lib/arm64-v8a/libjsc.so'
        pickFirst 'lib/arm64-v8a/libc++_shared.so'
        pickFirst 'lib/x86_64/libc++_shared.so'
        pickFirst 'lib/armeabi-v7a/libc++_shared.so'
    }
    ....
}

repositories {
    flatDir {
        dirs "$rootDir/../sdk/android/libs"
    }
}

dependencies {
    ...
    implementation project(':tuya-react-sdk')
    ...
}
```

android/app/src/main/java/com/....../MainApplication.java

```
import com.tuya.smart.rnsdk.TuyaReactPackage;


 @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          ...
            new TuyaReactPackage(),
          ...
      );
 }

```

run android

####  compile ios in your project


1. Drag the files in [TuyaRNSDK](https://github.com/TuyaInc/tuyasmart-home-sdk-react-native/tree/master/ios/TuyaRnDemo/TuyaRNSDK) to your project.

2.  cd ios && pod init

3.  vim pods
```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

source 'https://github.com/CocoaPods/Specs.git'  # 官方库

target 'xxx' do

  pod 'TuyaSmartHomeKit', '2.12.46'

  pod 'React', :path => '../node_modules/react-native/', :subspecs => [
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
    
    pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'

    pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
    pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
    pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'



end

```

4. cd ios && pod install

5. run ios

