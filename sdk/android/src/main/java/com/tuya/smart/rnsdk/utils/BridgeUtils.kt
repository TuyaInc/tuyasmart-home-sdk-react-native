package com.tuya.smart.rnsdk.utils

import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap

object BridgeUtils {

    private const val GROUPLISTENER = "groupListener"
    private const val HARDWAREUPGRADELISTENER = "hardwareUpgradeListener"
    private const val DEVLISTENER = "devListener"
    private const val SUBDEVLISTENER = "subDevListener"
    private const val HOMESTATUS = "homeStatus"
    private const val HOMECHANGE = "homeChange"
    private const val SINGLETRANSFER = "SingleTransfer"

    fun groupListener(context: ReactContext, map: WritableMap, groupId: Long) {
        TuyaReactUtils.sendEvent(context, bindEventname(GROUPLISTENER, groupId), map)
    }

    fun hardwareUpgradeListener(context: ReactContext, map: WritableMap, devId: String?){
        TuyaReactUtils.sendEvent(context, bindEventname(HARDWAREUPGRADELISTENER, devId), map)
    }
    fun devListener(context: ReactContext, map: WritableMap, devId: String?){
        TuyaReactUtils.sendEvent(context, bindEventname(DEVLISTENER, devId), map)
    }
    fun subDevListener(context: ReactContext, map: WritableMap, devId: String?){
        TuyaReactUtils.sendEvent(context, bindEventname(SUBDEVLISTENER, devId), map)
    }
    fun singleTransferListener(context: ReactContext, map: WritableMap, devId: String?){
        TuyaReactUtils.sendEvent(context, bindEventname(SINGLETRANSFER, devId), map)
    }
    fun homeStatus(context: ReactContext, map: WritableMap, devId: String?){
        TuyaReactUtils.sendEvent(context, bindEventname(HOMESTATUS, devId), map)
    }

    fun homeChange(context: ReactContext, map: WritableMap, devId: String?){
        TuyaReactUtils.sendEvent(context, bindEventname(HOMECHANGE, devId), map)
    }

    private fun bindEventname(key: String, id: Any?): String {
        return key + "//" + id.toString()
    }

}
