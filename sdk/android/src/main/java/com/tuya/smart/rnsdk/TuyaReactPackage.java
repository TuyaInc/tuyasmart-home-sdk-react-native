package com.tuya.smart.rnsdk;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.tuya.smart.rnsdk.activator.TuyaActivatorModule;
import com.tuya.smart.rnsdk.core.TuyaCoreModule;
import com.tuya.smart.rnsdk.device.TuyaDeviceModule;
import com.tuya.smart.rnsdk.device.TuyaGatewayModule;
import com.tuya.smart.rnsdk.device.TuyaOTAModule;
import com.tuya.smart.rnsdk.device.TuyaSingleTransferModule;
import com.tuya.smart.rnsdk.feedback.TuyaFeedBackModule;
import com.tuya.smart.rnsdk.group.TuyaGroupModule;
import com.tuya.smart.rnsdk.home.TuyaHomeDataManagerModule;
import com.tuya.smart.rnsdk.home.TuyaHomeManagerModule;
import com.tuya.smart.rnsdk.home.TuyaHomeMemberModule;
import com.tuya.smart.rnsdk.home.TuyaHomeModule;
import com.tuya.smart.rnsdk.home.TuyaRoomModule;
import com.tuya.smart.rnsdk.message.TuyaMessageModule;
import com.tuya.smart.rnsdk.push.TuyaPushModule;
import com.tuya.smart.rnsdk.scene.TuyaSceneModule;
import com.tuya.smart.rnsdk.share.TuyaShareModule;
import com.tuya.smart.rnsdk.timer.TuyaTimerModule;
import com.tuya.smart.rnsdk.user.TuyaUserModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;

public class TuyaReactPackage implements ReactPackage {
    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        ArrayList<NativeModule> list = new ArrayList();
        list.add(new TuyaActivatorModule(reactContext));
        list.add(new TuyaCoreModule(reactContext));
        list.add(new TuyaDeviceModule(reactContext));
        list.add(new TuyaGatewayModule(reactContext));
        list.add(new TuyaOTAModule(reactContext));
        list.add(new TuyaSingleTransferModule(reactContext));
        list.add(new TuyaFeedBackModule(reactContext));
        list.add(new TuyaGroupModule(reactContext));
        list.add(new TuyaHomeDataManagerModule(reactContext));
        list.add(new TuyaHomeManagerModule(reactContext));
        list.add(new TuyaHomeMemberModule(reactContext));
        list.add(new TuyaHomeModule(reactContext));
        list.add(new TuyaRoomModule(reactContext));
        list.add(new TuyaMessageModule(reactContext));
        list.add(new TuyaPushModule(reactContext));
        list.add(new TuyaShareModule(reactContext));
        list.add(new TuyaTimerModule(reactContext));
        list.add(new TuyaUserModule(reactContext));
        list.add(new TuyaSceneModule(reactContext));
        return list;
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        return Collections.EMPTY_LIST;
    }
}
