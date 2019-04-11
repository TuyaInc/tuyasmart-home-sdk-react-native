package com.tuya.smart.rnsdk.utils

import android.util.Log
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap

object BridgeUtils {

    private val GROUPLISTENER = "groupListener"
    private val HARDWAREUPGRADELISTENER = "hardwareUpgradeListener"
    private val DEVLISTENER = "devListener"
    private val SUBDEVLISTENER = "subDevListener"
    private val HOMESTATUS = "homeStatus"
    private val HOMECHANGE = "homeChange"
    private val SINGLETRANSFER = "SingleTransfer"

    fun groupListener(context: ReactContext, map: WritableMap, groupId: Long) {
        TuyaReactUtils.sendEvent(context, bindEventname(GROUPLISTENER, groupId), map)
    }

    fun hardwareUpgradeListener(context: ReactContext, map: WritableMap, devId: String){
        TuyaReactUtils.sendEvent(context, bindEventname(HARDWAREUPGRADELISTENER, devId), map)
    }
    fun devListener(context: ReactContext, map: WritableMap, devId: String){
        TuyaReactUtils.sendEvent(context, bindEventname(DEVLISTENER, devId), map)
    }
    fun subDevListener(context: ReactContext, map: WritableMap, devId: String){
        TuyaReactUtils.sendEvent(context, bindEventname(SUBDEVLISTENER, devId), map)
    }
    fun singleTransferListener(context: ReactContext, map: WritableMap, devId: String){
        TuyaReactUtils.sendEvent(context, bindEventname(SINGLETRANSFER, devId), map)
    }
    fun homeStatus(context: ReactContext, map: WritableMap, devId: String){
        TuyaReactUtils.sendEvent(context, bindEventname(HOMESTATUS, devId), map)
    }

    fun homeChange(context: ReactContext, map: WritableMap, homeId: Double){
        TuyaReactUtils.sendEvent(context, HOMECHANGE, map)
    }

    private fun bindEventname(key: String, id: Any): String {
        return key + "//" + id.toString()
    }

}
