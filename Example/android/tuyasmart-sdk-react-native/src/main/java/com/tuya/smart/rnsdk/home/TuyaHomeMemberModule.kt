package com.tuya.smart.rnsdk.home

import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.home.sdk.bean.MemberBean
import com.tuya.smart.home.sdk.callback.ITuyaGetMemberListCallback
import com.tuya.smart.home.sdk.callback.ITuyaMemberResultCallback
import com.tuya.smart.rnsdk.utils.Constant
import com.tuya.smart.rnsdk.utils.JsonUtils
import com.tuya.smart.rnsdk.utils.ReactParamsCheck
import com.tuya.smart.rnsdk.utils.TuyaReactUtils

class TuyaHomeMemberModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaHomeMemberModule"
    }
    /* 添加成员 */
    @ReactMethod
    fun addMember(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.HOMEID, Constant.COUNTRYCODE, Constant.USERACCOUNT, Constant.NAME, Constant.ADMIN), params)) {
            TuyaHomeSdk.getMemberInstance().addMember(
                    params.getDouble(Constant.HOMEID).toLong(),
                    params.getString(Constant.COUNTRYCODE),
                    params.getString(Constant.USERACCOUNT),
                    params.getString(Constant.NAME),
                    params.getBoolean(Constant.ADMIN),
                    object : ITuyaMemberResultCallback {
                        override fun onSuccess(var1: MemberBean){
                            promise.resolve(TuyaReactUtils.parseToWritableMap(var1))
                        }

                        override fun onError(var1: String, var2: String){
                            promise.reject(var1,var2)
                        }
                    }
            )
        }
    }
    /* 移除Home下面的成员 */
    @ReactMethod
    fun removeMember(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.MEMBERID),params)) {
            TuyaHomeSdk.getMemberInstance().removeMember(params.getDouble(Constant.MEMBERID).toLong(), Constant.getIResultCallback(promise))
        }
    }
    /* 更新成员备注名和权限 */
    @ReactMethod
    fun updateMember(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.MEMBERID, Constant.NAME, Constant.ADMIN),params)) {
            TuyaHomeSdk.getMemberInstance().updateMember(params.getDouble(Constant.MEMBERID).toLong(),params.getString(Constant.NAME),params.getBoolean(Constant.ADMIN), Constant.getIResultCallback(promise))
        }
    }

    /* 查询Home下面的成员列表 */
    @ReactMethod
    fun queryMemberList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.HOMEID),params)) {
            TuyaHomeSdk.getMemberInstance().queryMemberList(params.getDouble(Constant.HOMEID).toLong(),object : ITuyaGetMemberListCallback {
                override fun onSuccess(var1: List<MemberBean>){
                    promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1)))
                }

                override fun onError(var1: String, var2: String){
                    promise.reject(var1,var2)
                }
            })
        }
    }
}