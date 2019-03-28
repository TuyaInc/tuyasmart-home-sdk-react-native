package com.tuya.smart.rnsdk.push

import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.rnsdk.utils.Constant
import com.tuya.smart.rnsdk.utils.ReactParamsCheck

class TuyaPushModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaPushModule"
    }

    /* Push涂鸦云注册 */
    @ReactMethod
    fun registerDevice(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.ALIASID, Constant.PUSHPROVIDER), params)) {
            TuyaHomeSdk.getPushInstance().registerDevice(params.getString(Constant.ALIASID),params.getString(Constant.PUSHPROVIDER),Constant.getIResultCallback(promise))
        }
    }


    /* 手机密码登录 */
    @ReactMethod
    fun onDestroy() {
        TuyaHomeSdk.getPushInstance().onDestroy()
    }
}