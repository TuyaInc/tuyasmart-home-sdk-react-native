package com.tuya.smart.rnsdk


import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.tuya.smart.rnsdk.activator.TuyaActivatorModule
import com.tuya.smart.rnsdk.core.TuyaCoreModule
import com.tuya.smart.rnsdk.device.TuyaDeviceModule
import com.tuya.smart.rnsdk.device.TuyaGatewayModule
import com.tuya.smart.rnsdk.device.TuyaOTAModule
import com.tuya.smart.rnsdk.device.TuyaSingleTransferModule
import com.tuya.smart.rnsdk.feedback.TuyaFeedBackModule
import com.tuya.smart.rnsdk.group.TuyaGroupModule
import com.tuya.smart.rnsdk.home.TuyaHomeDataManagerModule
import com.tuya.smart.rnsdk.home.TuyaHomeManagerModule
import com.tuya.smart.rnsdk.home.TuyaHomeModule
import com.tuya.smart.rnsdk.home.TuyaRoomModule
import com.tuya.smart.rnsdk.message.TuyaMessageModule
import com.tuya.smart.rnsdk.push.TuyaPushModule
import com.tuya.smart.rnsdk.scene.TuyaSceneModule
import com.tuya.smart.rnsdk.share.TuyaShareModule
import com.tuya.smart.rnsdk.timer.TuyaTimerModule
import com.tuya.smart.rnsdk.user.TuyaUserModule

import java.util.*

class TuyaReactPackage : ReactPackage {
    override fun createJSModules(): MutableList<Class<out JavaScriptModule>> {
        return Collections.emptyList();
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule>? {
        val module: ArrayList<NativeModule> = ArrayList()
        module.add(TuyaActivatorModule(reactContext))
        module.add(TuyaCoreModule(reactContext))
        module.add(TuyaDeviceModule(reactContext))
        module.add(TuyaGatewayModule(reactContext))
        module.add(TuyaOTAModule(reactContext))
        module.add(TuyaSingleTransferModule(reactContext))
        module.add(TuyaFeedBackModule(reactContext))
        module.add(TuyaGroupModule(reactContext))
        module.add(TuyaHomeDataManagerModule(reactContext))
        module.add(TuyaHomeManagerModule(reactContext))
        module.add(TuyaHomeModule(reactContext))
        module.add(TuyaRoomModule(reactContext))
        module.add(TuyaMessageModule(reactContext))
        module.add(TuyaPushModule(reactContext))
        module.add(TuyaShareModule(reactContext))
        module.add(TuyaTimerModule(reactContext))
        module.add(TuyaUserModule(reactContext))
        module.add(TuyaSceneModule(reactContext))
        return module
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        val managers = ArrayList<ViewManager<*, *>>()
        return managers
    }
}
