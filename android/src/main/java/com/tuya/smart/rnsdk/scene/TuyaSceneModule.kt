package com.tuya.smart.rnsdk.scene

import android.text.TextUtils
import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.home.sdk.api.ITuyaHomeScene
import com.tuya.smart.home.sdk.bean.scene.PlaceFacadeBean
import com.tuya.smart.home.sdk.bean.scene.SceneBean
import com.tuya.smart.home.sdk.bean.scene.SceneCondition
import com.tuya.smart.home.sdk.bean.scene.SceneTask
import com.tuya.smart.home.sdk.bean.scene.condition.ConditionListBean
import com.tuya.smart.home.sdk.bean.scene.condition.rule.EnumRule
import com.tuya.smart.home.sdk.bean.scene.condition.rule.Rule
import com.tuya.smart.home.sdk.bean.scene.condition.rule.ValueRule
import com.tuya.smart.home.sdk.bean.scene.dev.TaskListBean
import com.tuya.smart.home.sdk.callback.ITuyaResultCallback
import com.tuya.smart.rnsdk.utils.Constant
import com.tuya.smart.rnsdk.utils.Constant.BACKGROUND
import com.tuya.smart.rnsdk.utils.Constant.CITYID
import com.tuya.smart.rnsdk.utils.Constant.CONDITIONS
import com.tuya.smart.rnsdk.utils.Constant.COUNTRYCODE
import com.tuya.smart.rnsdk.utils.Constant.DEVID
import com.tuya.smart.rnsdk.utils.Constant.DISPLAY
import com.tuya.smart.rnsdk.utils.Constant.DPID
import com.tuya.smart.rnsdk.utils.Constant.HOMEID
import com.tuya.smart.rnsdk.utils.Constant.ID
import com.tuya.smart.rnsdk.utils.Constant.LAT
import com.tuya.smart.rnsdk.utils.Constant.LON
import com.tuya.smart.rnsdk.utils.Constant.MATCHTYPE
import com.tuya.smart.rnsdk.utils.Constant.NAME
import com.tuya.smart.rnsdk.utils.Constant.RANGE
import com.tuya.smart.rnsdk.utils.Constant.RULE
import com.tuya.smart.rnsdk.utils.Constant.RULES
import com.tuya.smart.rnsdk.utils.Constant.SCENEID
import com.tuya.smart.rnsdk.utils.Constant.SCENEIDS
import com.tuya.smart.rnsdk.utils.Constant.SHOWFAHRENHEIT
import com.tuya.smart.rnsdk.utils.Constant.STICKYONTOP
import com.tuya.smart.rnsdk.utils.Constant.TASK
import com.tuya.smart.rnsdk.utils.Constant.TASKS
import com.tuya.smart.rnsdk.utils.Constant.TYPE
import com.tuya.smart.rnsdk.utils.Constant.VALUE
import com.tuya.smart.rnsdk.utils.JsonUtils
import com.tuya.smart.rnsdk.utils.ReactParamsCheck
import com.tuya.smart.rnsdk.utils.TuyaReactUtils
import com.tuya.smart.sdk.api.IRequestCallback
import com.tuya.smart.sdk.api.ITuyaDataCallback
import com.tuya.smart.sdk.bean.DeviceBean
import java.util.*
import java.util.stream.Stream


class TuyaSceneModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaSceneModule"
    }

    @ReactMethod
    fun getSceneList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getSceneList(params.getDouble(HOMEID).toLong(), object : ITuyaResultCallback<List<SceneBean>> {
                override fun onSuccess(var1: List<SceneBean>) {
                    promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1!!)))
                }

                override fun onError(var1: String, var2: String) {
                    promise.reject(var1, var2)
                }
            })
        }
    }


    @ReactMethod
    fun getConditionList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(SHOWFAHRENHEIT), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getConditionList(params.getBoolean(SHOWFAHRENHEIT), object : ITuyaResultCallback<List<ConditionListBean>> {
                override fun onSuccess(p0: List<ConditionListBean>) {
                    promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(p0!!)))
                }

                override fun onError(var1: String, var2: String) {
                    promise.reject(var1, var2)
                }
            })
        }
    }

    @ReactMethod
    fun getConditionDevList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getConditionDevList(params.getDouble(HOMEID).toLong(), object : ITuyaResultCallback<List<DeviceBean>> {
                override fun onSuccess(p0: List<DeviceBean>) {
                    promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(p0!!)))
                }

                override fun onError(var1: String, var2: String) {
                    promise.reject(var1, var2)
                }
            })
        }
    }

    @ReactMethod
    fun getDeviceConditionOperationList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getDeviceConditionOperationList(params.getString(DEVID), object : ITuyaResultCallback<List<TaskListBean>> {
                override fun onSuccess(p0: List<TaskListBean>) {
                    promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(p0!!)))
                }

                override fun onError(var1: String, var2: String) {
                    promise.reject(var1, var2)
                }
            })
        }
    }

    @ReactMethod
    fun getCityListByCountryCode(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(COUNTRYCODE), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getCityListByCountryCode(params.getString(COUNTRYCODE), object : ITuyaResultCallback<List<PlaceFacadeBean>> {
                override fun onSuccess(p0: List<PlaceFacadeBean>) {
                    promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(p0!!)))
                }

                override fun onError(var1: String, var2: String) {
                    promise.reject(var1, var2)
                }
            })
        }
    }

    @ReactMethod
    fun getCityByCityIndex(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(CITYID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getCityByCityIndex(params.getDouble(CITYID).toLong(), object : ITuyaResultCallback<PlaceFacadeBean> {
                override fun onSuccess(p0: PlaceFacadeBean) {
                    promise.resolve(TuyaReactUtils.parseToWritableMap(p0!!))
                }

                override fun onError(var1: String, var2: String) {
                    promise.reject(var1, var2)
                }
            })
        }
    }

    @ReactMethod
    fun getCityByLatLng(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(LON, LAT), params)) {
            TuyaHomeSdk.getSceneManagerInstance()
                    .getCityByLatLng(params.getString(LON), params.getString(LAT), object : ITuyaResultCallback<PlaceFacadeBean> {
                        override fun onSuccess(p0: PlaceFacadeBean) {
                            promise.resolve(TuyaReactUtils.parseToWritableMap(p0!!))
                        }

                        override fun onError(var1: String, var2: String) {
                            promise.reject(var1, var2)
                        }
                    })
        }
    }

    @ReactMethod
    fun createDpTask(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID, TASK), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(createTask(params.getString(DEVID), params.getMap(TASK))))
        }
    }

    @ReactMethod
    fun getTaskDevList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID), params)) {
            promise.resolve(TuyaHomeSdk.getSceneManagerInstance().getTaskDevList(params.getDouble(HOMEID).toLong(),
                    object : ITuyaResultCallback<List<DeviceBean>> {
                        override fun onSuccess(var1: List<DeviceBean>) {
                            promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1!!)))
                        }

                        override fun onError(var1: String, var2: String) {
                            promise.reject(var1, var2)
                        }
                    }))
        }
    }

    @ReactMethod
    fun getDeviceTaskOperationList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            promise.resolve(TuyaHomeSdk.getSceneManagerInstance().getDeviceTaskOperationList(params.getString(DEVID),
                    object : ITuyaResultCallback<List<TaskListBean>> {
                        override fun onSuccess(var1: List<TaskListBean>) {
                            promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1!!)))
                        }

                        override fun onError(var1: String, var2: String) {
                            promise.reject(var1, var2)
                        }
                    }))
        }
    }

    @ReactMethod
    fun modifyWeatherScene(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ID, HOMEID, LON, LAT, TYPE, RULE), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getSceneList(params.getDouble(HOMEID).toLong(),
                    object : ITuyaResultCallback<List<SceneBean>> {
                        override fun onSuccess(p0: List<SceneBean>) {
                            for (item in p0) {
                                if (item.id.equals(params.getString(ID))) {
                                    if (params.hasKey(NAME)) {
                                        item.name = params.getString(NAME)
                                    }
                                    if (params.hasKey(TASKS)) {
                                        item.actions = createTasks(params)
                                    }
                                    if (params.hasKey(CONDITIONS)) {
                                        TuyaHomeSdk.getSceneManagerInstance().getCityByLatLng(
                                                params.getString(LON), //经度
                                                params.getString(LAT), //纬度
                                                object : ITuyaResultCallback<PlaceFacadeBean> {
                                                    override fun onSuccess(placeFacadeBean: PlaceFacadeBean) {
                                                        val weatherCondition = SceneCondition.createWeatherCondition(
                                                                placeFacadeBean, //城市
                                                                params.getString(TYPE), //类别
                                                                getRule(params.getMap(RULE))            //规则
                                                        )
                                                        item.conditions = Arrays.asList(weatherCondition)
                                                        getScene(item.id)?.modifyScene(
                                                                item, //修改后的场景数据类
                                                                object : ITuyaResultCallback<SceneBean> {
                                                                    override fun onSuccess(sceneBean: SceneBean) {
                                                                        promise.resolve(TuyaReactUtils.parseToWritableMap(sceneBean))
                                                                    }

                                                                    override fun onError(errorCode: String, errorMessage: String) {
                                                                        promise.reject(errorCode, errorMessage)
                                                                    }
                                                                })
                                                    }

                                                    override fun onError(p0: String?, p1: String?) {
                                                        promise.reject(p0, p1)
                                                    }
                                                })
                                        return
                                    }
                                    getScene(item.id)?.modifyScene(
                                            item, //修改后的场景数据类
                                            object : ITuyaResultCallback<SceneBean> {
                                                override fun onSuccess(sceneBean: SceneBean) {
                                                    promise.resolve(TuyaReactUtils.parseToWritableMap(sceneBean))
                                                }

                                                override fun onError(errorCode: String, errorMessage: String) {
                                                    promise.reject(errorCode, errorMessage)
                                                }
                                            })
                                    return
                                }
                            }
                            promise.reject("-1", "no find SceneBean")
                        }

                        override fun onError(code: String?, error: String?) {
                            promise.reject(code, error)
                        }
                    }
            )
        }
    }


    @ReactMethod
    fun modifyTimerScene(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ID, HOMEID, RULE), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getSceneList(params.getDouble(HOMEID).toLong(),
                    object : ITuyaResultCallback<List<SceneBean>> {
                        override fun onSuccess(p0: List<SceneBean>) {
                            for (item in p0) {
                                if (item.id.equals(params.getString(ID))) {
                                    if (params.hasKey(NAME)) {
                                        item.name = params.getString(NAME)
                                    }
                                    if (params.hasKey(TASKS)) {
                                        item.actions = createTasks(params)
                                    }
                                    if (params.hasKey(CONDITIONS)) {
                                        item.conditions = Arrays.asList(SceneCondition.createTimerCondition(
                                                params.getMap(CONDITIONS).getString(DISPLAY),
                                                params.getMap(CONDITIONS).getString(NAME),
                                                params.getMap(CONDITIONS).getString(TYPE),
                                                getRule(params.getMap(RULE)))
                                        )
                                    }
                                    getScene(item.id)?.modifyScene(
                                            item, //修改后的场景数据类
                                            object : ITuyaResultCallback<SceneBean> {
                                                override fun onSuccess(sceneBean: SceneBean) {
                                                    promise.resolve(TuyaReactUtils.parseToWritableMap(sceneBean))
                                                }

                                                override fun onError(errorCode: String, errorMessage: String) {
                                                    promise.reject(errorCode, errorMessage)
                                                }
                                            })
                                    return
                                }
                            }
                            promise.reject("-1", "no find SceneBean")
                        }

                        override fun onError(code: String?, error: String?) {
                            promise.reject(code, error)
                        }
                    }
            )
        }
    }

    @ReactMethod
    fun modifyDevCondition(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ID, HOMEID, RULE,DISPLAY, TASKS, NAME, TYPE), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getSceneList(params.getDouble(HOMEID).toLong(),
                    object : ITuyaResultCallback<List<SceneBean>> {
                        override fun onSuccess(p0: List<SceneBean>) {
                            for (item in p0) {
                                if (item.id.equals(params.getString(ID))) {
                                    if (params.hasKey(NAME)) {
                                        item.name = params.getString(NAME)
                                    }
                                    if (params.hasKey(TASKS)) {
                                        item.actions = createTasks(params)
                                    }
                                    if (params.hasKey(CONDITIONS)) {
                                        item.conditions = Arrays.asList(SceneCondition.createTimerCondition(
                                                params.getString(DISPLAY),
                                                params.getString(NAME),
                                                params.getString(TYPE),
                                                getRule(params.getMap(RULE)))
                                        )
                                    }
                                    getScene(item.id)?.modifyScene(
                                            item, //修改后的场景数据类
                                            object : ITuyaResultCallback<SceneBean> {
                                                override fun onSuccess(sceneBean: SceneBean) {
                                                    promise.resolve(TuyaReactUtils.parseToWritableMap(sceneBean))
                                                }

                                                override fun onError(errorCode: String, errorMessage: String) {
                                                    promise.reject(errorCode, errorMessage)
                                                }
                                            })
                                    return
                                }
                            }
                            promise.reject("-1", "no find SceneBean")
                        }

                        override fun onError(code: String?, error: String?) {
                            promise.reject(code, error)
                        }
                    }
            )
        }
    }

    //    暂不支持多任务一起
    @ReactMethod
    fun createWeatherCondition(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID, LON,LAT,TASKS, RULE, BACKGROUND, MATCHTYPE), params)) {
            var tasks = createTasks(params)
            TuyaHomeSdk.getSceneManagerInstance().getCityByLatLng(
                    params.getString(LON), //经度
                    params.getString(LAT), //纬度
                    object : ITuyaResultCallback<PlaceFacadeBean> {
                        override fun onSuccess(placeFacadeBean: PlaceFacadeBean) {
                            val weatherCondition = SceneCondition.createWeatherCondition(
                                    placeFacadeBean, //城市
                                    params.getString(TYPE), //类别
                                    getRule(params.getMap(RULE))            //规则
                            )
                            var mathType = SceneBean.MATCH_TYPE_AND
                            if (params.getString(MATCHTYPE).equals("MATCH_TYPE_OR")) {
                                mathType = SceneBean.MATCH_TYPE_OR
                            } else if (params.getString(MATCHTYPE).equals("MATCH_TYPE_BY_EXPR")) {
                                mathType = SceneBean.MATCH_TYPE_BY_EXPR
                            }
                            var b = false
                            if (params.hasKey(STICKYONTOP)&&params.getBoolean(STICKYONTOP)) {
                                b = true
                            }
                            TuyaHomeSdk.getSceneManagerInstance().createScene(
                                    params.getDouble(HOMEID).toLong(),
                                    params.getString(NAME), //场景名称
                                    b,
                                    params.getString(BACKGROUND),
                                    Arrays.asList(weatherCondition),
                                    tasks, //任务
                                    mathType,
                                    object : ITuyaResultCallback<SceneBean> {
                                        override fun onSuccess(sceneBean: SceneBean) {
                                            promise.resolve(TuyaReactUtils.parseToWritableMap(sceneBean))
                                        }

                                        override fun onError(errorCode: String, errorMessage: String) {
                                            promise.reject(errorCode, errorMessage)
                                        }
                                    })
                        }

                        override fun onError(errorCode: String, errorMessage: String) {
                            promise.reject(errorCode, errorMessage)
                        }
                    })
        }
    }


    //    暂不支持多任务一起
    @ReactMethod
    fun createDevCondition(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID,TASKS,DEVID,DPID, RULES, BACKGROUND, MATCHTYPE), params)) {
            var tasks = createTasks(params)
            var rules =ArrayList<Rule>()
            var i = 0
            while (i < params.getArray(RULES).size()) {
                rules.add(getRule(params.getArray(RULES).getMap(i)))
                i++
            }
           var condition= SceneCondition.createDevCondition(TuyaHomeSdk.getDataInstance().getDeviceBean(DEVID),
                    params.getString(DPID),
                    rules)

            var b = false
            if (params.hasKey(STICKYONTOP)&&params.getBoolean(STICKYONTOP)) {
                b = true
            }
            var mathType = SceneBean.MATCH_TYPE_AND
            if (params.getString(MATCHTYPE).equals("MATCH_TYPE_OR")) {
                mathType = SceneBean.MATCH_TYPE_OR
            } else if (params.getString(MATCHTYPE).equals("MATCH_TYPE_BY_EXPR")) {
                mathType = SceneBean.MATCH_TYPE_BY_EXPR
            }
            TuyaHomeSdk.getSceneManagerInstance().createScene(
                    params.getDouble(HOMEID).toLong(),
                    params.getString(NAME), //场景名称
                    b,
                    params.getString(BACKGROUND),
                    Arrays.asList(condition),
                    tasks, //任务
                    mathType,
                    object : ITuyaResultCallback<SceneBean> {
                        override fun onSuccess(sceneBean: SceneBean) {
                            promise.resolve(TuyaReactUtils.parseToWritableMap(sceneBean))
                        }

                        override fun onError(errorCode: String, errorMessage: String) {
                            promise.reject(errorCode, errorMessage)
                        }
                    })
        }
    }

    //    暂不支持多任务一起
    @ReactMethod
    fun createTimerCondition(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID, NAME, TASKS, RULE, BACKGROUND, MATCHTYPE, DISPLAY, TYPE), params)) {
            var tasks = createTasks(params)
            val timerCondition = SceneCondition.createTimerCondition(
                    params.getString(DISPLAY),
                    params.getString(NAME),
                    params.getString(TYPE),
                    getRule(params.getMap(RULE))
            )
            var mathType = SceneBean.MATCH_TYPE_AND
            if (params.getString(MATCHTYPE).equals("MATCH_TYPE_OR")) {
                mathType = SceneBean.MATCH_TYPE_OR
            } else if (params.getString(MATCHTYPE).equals("MATCH_TYPE_BY_EXPR")) {
                mathType = SceneBean.MATCH_TYPE_BY_EXPR
            }
            var b = false
            if (params.hasKey(STICKYONTOP)&&params.getBoolean(STICKYONTOP)) {
                b = true
            }
            TuyaHomeSdk.getSceneManagerInstance().createScene(
                    params.getDouble(HOMEID).toLong(),
                    params.getString(NAME), //场景名称
                    b,
                    params.getString(BACKGROUND),
                    Arrays.asList(timerCondition),
                    tasks, //任务
                    mathType,
                    object : ITuyaResultCallback<SceneBean> {
                        override fun onSuccess(sceneBean: SceneBean) {
                            promise.resolve(TuyaReactUtils.parseToWritableMap(sceneBean))
                        }

                        override fun onError(errorCode: String, errorMessage: String) {
                            promise.reject(errorCode, errorMessage)
                        }
                    })

        }
    }

    @ReactMethod
    fun executeScene(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(SCENEID), params)) {
            getScene(params.getString(SCENEID))?.executeScene(Constant.getIResultCallback(promise))
        }
    }

    @ReactMethod
    fun deleteScene(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(SCENEID), params)) {
            getScene(params.getString(SCENEID))?.deleteScene(Constant.getIResultCallback(promise))
        }
    }

    @ReactMethod
    fun enableScene(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(SCENEID), params)) {
            getScene(params.getString(SCENEID))?.enableScene(params.getString(SCENEID), Constant.getIResultCallback(promise))
        }
    }

    @ReactMethod
    fun disableScene(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(SCENEID), params)) {
            getScene(params.getString(SCENEID))?.disableScene(params.getString(SCENEID), Constant.getIResultCallback(promise))
        }
    }


    @ReactMethod
    fun sortSceneList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID, SCENEIDS), params)) {
            var list = java.util.ArrayList<String>()
            var length = params.getArray(Constant.SCENEIDS).size()
            for (index in 0..length) {
                list.add(params.getArray(Constant.SCENEIDS).getString(index))
            }
            TuyaHomeSdk.getSceneManagerInstance().sortSceneList(
                    params.getDouble(HOMEID).toLong(), //家庭列表
                    list, //场景id列表
                    Constant.getIResultCallback(promise))
        }
    }


    @ReactMethod
    fun onDestroy(params: ReadableMap) {
        TuyaHomeSdk.getSceneManagerInstance().onDestroy();
        if (ReactParamsCheck.checkParams(arrayOf(SCENEID), params)) {
            getScene(params.getString(SCENEID))?.onDestroy()
        }
    }


    fun createTask(devids: String, tasks: ReadableMap): SceneTask {
        return TuyaHomeSdk.getSceneManagerInstance().createDpTask(devids, TuyaReactUtils.parseToMap(tasks))
    }

    fun createTasks(params: ReadableMap): ArrayList<SceneTask> {
        var array = params.getArray(TASKS)
        var tasks = ArrayList<SceneTask>()
        var i = 0
        while (i < array.size()) {
            tasks.add(createTask(array.getMap(i).getString(DEVID), array.getMap(i).getMap(TASK)))
            i++
        }
        return tasks
    }

    fun getRule(params: ReadableMap): Rule{
        var enumRule: Rule
        if (params.getString(TYPE).equals("temp")) {
            enumRule = ValueRule.newInstance(
                    "temp", //类别
                    params.getString(RANGE), //运算规则(">", "==", "<")
                    params.getInt(VALUE)      //临界值
            )
        } else {
            enumRule = EnumRule.newInstance(
                    params.getString(TYPE),
                    params.getString(VALUE)
            )
        }
        return enumRule
    }

    fun getScene(scendId: String): ITuyaHomeScene? {
        return TuyaHomeSdk.newSceneInstance(scendId);
    }
}
