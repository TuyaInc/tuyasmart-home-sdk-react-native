package com.tuya.smart.rnsdk.utils

import com.facebook.react.bridge.ReadableMap

object ReactParamsCheck {
    /**
     *  接口输入参数check
     */
    fun checkParams(keys: Array<String>, params: ReadableMap): Boolean {
        for (key in keys) {
            if (!params.hasKey(key)) {
                throw  IllegalArgumentException("need ${key}")
            }
        }
        return true
    }
}