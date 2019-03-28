package com.tuya.smart.rnsdk.scene

import android.text.TextUtils
import android.util.Log
import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.home.sdk.api.ITuyaHomeScene
import com.tuya.smart.home.sdk.bean.scene.PlaceFacadeBean
import com.tuya.smart.home.sdk.bean.scene.SceneBean
import com.tuya.smart.home.sdk.bean.scene.SceneCondition
import com.tuya.smart.home.sdk.bean.scene.SceneTask
import com.tuya.smart.home.sdk.bean.scene.condition.ConditionListBean
import com.tuya.smart.home.sdk.bean.scene.condition.rule.*
import com.tuya.smart.home.sdk.bean.scene.dev.TaskListBean
import com.tuya.smart.home.sdk.callback.ITuyaResultCallback
import com.tuya.smart.rnsdk.utils.Constant
import com.tuya.smart.rnsdk.utils.Constant.BACKGROUND
import com.tuya.smart.rnsdk.utils.Constant.CITYID
import com.tuya.smart.rnsdk.utils.Constant.CITYIDS
import com.tuya.smart.rnsdk.utils.Constant.CONDITIONLISTS
import com.tuya.smart.rnsdk.utils.Constant.CONDITIONS
import com.tuya.smart.rnsdk.utils.Constant.COUNTRYCODE
import com.tuya.smart.rnsdk.utils.Constant.DEVID
import com.tuya.smart.rnsdk.utils.Constant.DEVIDS
import com.tuya.smart.rnsdk.utils.Constant.DISPLAY
import com.tuya.smart.rnsdk.utils.Constant.DPID
import com.tuya.smart.rnsdk.utils.Constant.DPVALUE
import com.tuya.smart.rnsdk.utils.Constant.ENTITY_TYPE
import com.tuya.smart.rnsdk.utils.Constant.ENTITY_TYPE_DEVICE
import com.tuya.smart.rnsdk.utils.Constant.ENTITY_TYPE_WEATHER
import com.tuya.smart.rnsdk.utils.Constant.HOMEID
import com.tuya.smart.rnsdk.utils.Constant.ID
import com.tuya.smart.rnsdk.utils.Constant.LAT
import com.tuya.smart.rnsdk.utils.Constant.LON
import com.tuya.smart.rnsdk.utils.Constant.MATCHTYPE
import com.tuya.smart.rnsdk.utils.Constant.NAME
import com.tuya.smart.rnsdk.utils.Constant.OPERATOR
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
import org.eclipse.paho.client.mqttv3.logging.LoggerFactory
import java.util.*
import java.util.stream.Stream
import kotlin.collections.ArrayList
import kotlin.collections.HashMap


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
//        if (ReactParamsCheck.checkParams(arrayOf(DEVID, TASK), params)) {
//            promise.resolve(TuyaReactUtils.parseToWritableMap(createTask(params.getString(DEVID), params.getMap(TASK))))
//        }
    }

    @ReactMethod
    fun getTaskDevList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getTaskDevList(params.getDouble(HOMEID).toLong(),
                    object : ITuyaResultCallback<List<DeviceBean>> {
                        override fun onSuccess(var1: List<DeviceBean>) {
                            promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1!!)))
                        }

                        override fun onError(var1: String, var2: String) {
                            promise.reject(var1, var2)
                        }
                    })
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


    @ReactMethod  //创建场景 不带条件的那种 对应tuya场景的功能 没有条件 支持多任务
    fun createScene(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID, NAME, STICKYONTOP, TASKS, DEVIDS, BACKGROUND, MATCHTYPE), params)) {
            var tasks = createTasks(params)
            var b = false
            if (params.hasKey(STICKYONTOP) && params.getBoolean(STICKYONTOP)) {
                b = true
            }
            var mathType = SceneBean.MATCH_TYPE_AND
            if (params.getString(MATCHTYPE).equals("MATCH_TYPE_OR")) {
                mathType = SceneBean.MATCH_TYPE_OR
            } else if (params.getString(MATCHTYPE).equals("MATCH_TYPE_BY_EXPR")) {
                mathType = SceneBean.MATCH_TYPE_BY_EXPR
            }
            TuyaHomeSdk.getSceneManagerInstance().createScene(
                    params.getDouble(HOMEID).toLong(),//家庭id
                    params.getString(NAME), //场景名称
                    b,//是否显示首页
                    null,//背景 params.getString(BACKGROUND)
                    null,//conditions 条件 场景就不要条件了 自动化要
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

    @ReactMethod  //修改已创建的场景 切勿创新的创景进来  //将创建的值都穿进来
    fun modifyScene(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(SCENEID, HOMEID, DEVIDS, TASKS, NAME, STICKYONTOP, MATCHTYPE), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getSceneList(params.getDouble(HOMEID).toLong(),
                    object : ITuyaResultCallback<List<SceneBean>> {
                        override fun onSuccess(p0: List<SceneBean>) {
                            for (item in p0) {
                                if (item.id.equals(params.getString(SCENEID))) {
                                    if (params.hasKey(NAME)) {
                                        item.name = params.getString(NAME)
                                    }
                                    if (params.hasKey(TASKS)) {
                                        var tasks = createTasks(params)
                                        item.actions = tasks
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

    @ReactMethod  //创建自动化场景 带条件的 这边只有天气条件
    fun createAutoScene(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID, NAME, STICKYONTOP, TASKS, DEVIDS, BACKGROUND, MATCHTYPE, CONDITIONLISTS), params)) {
            var tasks = createTasks(params)
            var b = false
            if (params.hasKey(STICKYONTOP) && params.getBoolean(STICKYONTOP)) {
                b = true
            }
            var mathType = SceneBean.MATCH_TYPE_AND
            if (params.getString(MATCHTYPE).equals("MATCH_TYPE_OR")) {
                mathType = SceneBean.MATCH_TYPE_OR
            } else if (params.getString(MATCHTYPE).equals("MATCH_TYPE_BY_EXPR")) {
                mathType = SceneBean.MATCH_TYPE_BY_EXPR
            }
            var conditionLists = params.getArray(CONDITIONLISTS)
            var placebeanList = ArrayList<PlaceFacadeBean>();
            var k = 0
            var sceneConditionList = ArrayList<SceneCondition>()
            while (k < conditionLists.size()) {
                val condition = conditionLists.getMap(k)
                // 自动化条件创建方式有三个方法 四种类型 首先根据方法来排除 然后根据type来对weather排除
                if (condition.getInt(ENTITY_TYPE) == ENTITY_TYPE_WEATHER) {
                    val placeBean = condition.getMap("placeBean")
                    val placeFacadeBean = PlaceFacadeBean();
                    placeFacadeBean.area = placeBean.getString("area")
                    placeFacadeBean.city = placeBean.getString("city")
                    placeFacadeBean.isChoose = placeBean.getBoolean("choose")
                    placeFacadeBean.province = placeBean.getString("province")
                    placeFacadeBean.cityId = placeBean.getString("cityId").toLong();
                    placebeanList.add(placeFacadeBean)
                    if (condition.getString(TYPE) == "temp") {
                        val weatherCondition = SceneCondition.createWeatherCondition(
                                placeFacadeBean, //城市
                                conditionLists.getMap(k).getString(TYPE), //类别
                                getTempRule(condition.getString(TYPE), condition.getString(RANGE), condition.getString(RULE))            //规则
                        )
                        sceneConditionList.add(weatherCondition)
                    } else {
                        val weatherCondition = SceneCondition.createWeatherCondition(
                                placeFacadeBean, //城市
                                conditionLists.getMap(k).getString(TYPE), //类别
                                getEnumRule(condition.getString(TYPE), condition.getString(RULE))            //规则
                        )
                        sceneConditionList.add(weatherCondition)
                    }
                } else if (condition.getInt(ENTITY_TYPE) == ENTITY_TYPE_DEVICE) { //创建设备
                    var rules = ArrayList<Rule>()
                    rules.add(getRules(condition))
                    val devCondition = SceneCondition.createDevCondition(TuyaHomeSdk.getDataInstance().getDeviceBean(condition.getString(DEVID)),
                            condition.getString(DPID),
                            rules)
                    sceneConditionList.add(devCondition)
                } else { //创建定时
                    /**
                     *
                     * @param timeZoneId 时区，格式例如"Asia/Shanghai"
                     * @param loops 7位字符串，每一位表示星期几，第一位表示星期日，第二位表示星期一，
                     * 依次类推，表示在哪些天启用定时。0表示未选中，1表示选中.格式例如只选中星期一
                     * 星期二："0110000"。如果都未选中，则表示定时只执行一次，格式："0000000"
                     * @param time 时间，24小时制。格式例如"08:00",如果用户使用12小时制，需要
                     * 开发者将之转换为24小时制上传
                     * @param date 日期，格式例如"20180310"
                     * @return
                     */
                    //      TimerRule timerRule = TimerRule.newInstance("Asia/Shanghai","0111110","16:00","20180310")
                    var timeRule = TimerRule.newInstance(condition.getString("loop"), condition.getString("time"), condition.getString("date"))
                    val timerCondition = SceneCondition.createTimerCondition(
                            condition.getString(DISPLAY),
                            condition.getString(NAME),
                            condition.getString(TYPE),
                            timeRule
                    )
                    sceneConditionList.add(timerCondition)
                }

                k++
            }
            TuyaHomeSdk.getSceneManagerInstance().createScene(
                    params.getDouble(HOMEID).toLong(),//家庭id
                    params.getString(NAME), //场景名称
                    b,//是否显示首页
                    null,//背景 params.getString(BACKGROUND)
                    sceneConditionList,//conditions 条件 场景就不要条件了 自动化要
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

    fun getRules(params: ReadableMap): Rule {
        var rule: Rule
        if (params.getString(TYPE).equals("bool")) {
            rule = BoolRule.newInstance(
                    "dp" + params.getString(DPID),
                    params.getBoolean(RULE)
            )
        } else if (params.getString(TYPE).equals("enum")) {
            rule = EnumRule.newInstance(
                    params.getString(DPID),
                    params.getString(RULE)

            )
        } else {
            rule = ValueRule.newInstance(
                    params.getString(DPID),
                    params.getString(OPERATOR),
                    params.getInt(RULE)
            )
        }
        return rule;
    }

    @ReactMethod
    fun modifyAutoScene(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(SCENEID, HOMEID, DEVIDS, TASKS, NAME, STICKYONTOP, MATCHTYPE, CONDITIONLISTS), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getSceneList(params.getDouble(HOMEID).toLong(),
                    object : ITuyaResultCallback<List<SceneBean>> {
                        override fun onSuccess(p0: List<SceneBean>) {
                            for (item in p0) {
                                if (item.id.equals(params.getString(SCENEID))) {
                                    if (params.hasKey(NAME)) {
                                        item.name = params.getString(NAME)
                                    }
                                    if (params.hasKey(TASKS)) {
                                        var tasks = createTasks(params)
                                        item.actions = tasks
                                    }
                                    if (params.hasKey(BACKGROUND)) {
                                        item.background = params.getString(BACKGROUND)
                                    }
                                    var conditionLists = params.getArray(CONDITIONLISTS)
                                    var placebeanList = ArrayList<PlaceFacadeBean>();
                                    var k = 0
                                    var sceneConditionList = ArrayList<SceneCondition>()
                                    while (k < conditionLists.size()) {
                                        val condition = conditionLists.getMap(k)
                                        var placeBean = conditionLists.getMap(k).getMap("placeBean")
                                        var placeFacadeBean = PlaceFacadeBean();
                                        placeFacadeBean.area = placeBean.getString("area")
                                        placeFacadeBean.city = placeBean.getString("city")
                                        placeFacadeBean.isChoose = placeBean.getBoolean("choose")
                                        placeFacadeBean.province = placeBean.getString("province")
                                        placeFacadeBean.cityId = placeBean.getString("cityId").toLong();
                                        placebeanList.add(placeFacadeBean)
                                        // 自动化条件创建方式有三个方法 四种类型 首先根据方法来排除 然后根据type来对weather排除
                                        if (condition.getInt(ENTITY_TYPE) == ENTITY_TYPE_WEATHER) {
                                            if (condition.getString(TYPE) == "temp") {
                                                val weatherCondition = SceneCondition.createWeatherCondition(
                                                        placeFacadeBean, //城市
                                                        conditionLists.getMap(k).getString(TYPE), //类别
                                                        getTempRule(condition.getString(TYPE), condition.getString(RANGE), condition.getString(RULE))            //规则
                                                )
                                                sceneConditionList.add(weatherCondition)
                                            } else {
                                                val weatherCondition = SceneCondition.createWeatherCondition(
                                                        placeFacadeBean, //城市
                                                        conditionLists.getMap(k).getString(TYPE), //类别
                                                        getEnumRule(condition.getString(TYPE), condition.getString(RULE))            //规则
                                                )
                                                sceneConditionList.add(weatherCondition)
                                            }
                                        } else if (condition.getInt(ENTITY_TYPE) == ENTITY_TYPE_DEVICE) { //创建设备
                                            var rules = ArrayList<Rule>()
                                            rules.add(getRules(condition))
                                            val devCondition = SceneCondition.createDevCondition(TuyaHomeSdk.getDataInstance().getDeviceBean(condition.getString(DEVID)),
                                                    condition.getString(DPID),
                                                    rules)
                                            sceneConditionList.add(devCondition)
                                        } else { //创建定时
                                            //      TimerRule timerRule = TimerRule.newInstance("Asia/Shanghai","0111110","16:00","20180310")
                                            var timeRule = TimerRule.newInstance(condition.getString("loop"), condition.getString("time"), condition.getString("date"))
                                            val timerCondition = SceneCondition.createTimerCondition(
                                                    condition.getString(DISPLAY),
                                                    condition.getString(NAME),
                                                    condition.getString(TYPE),
                                                    timeRule
                                            )
                                            sceneConditionList.add(timerCondition)
                                        }
                                        k++
                                    }
                                    item.conditions = sceneConditionList
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
                            promise.reject("-1", "no find the SceneBean")
                        }

                        override fun onError(code: String?, error: String?) {
                            promise.reject(code, error)
                        }
                    }
            )
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

    /**
     * 场景排序
     * @param homeId 家庭id
     * @param sceneIds 手动场景或自动化场景已排序好的的id列表
     * @param callback    回调
     */

    @ReactMethod
    fun sortSceneList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID, SCENEIDS), params)) {
            var list = java.util.ArrayList<String>()
            var length = params.getArray(SCENEIDS).size()-1
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


    fun createTask(devids: String, tasks: HashMap<String, Any>): SceneTask {
        return TuyaHomeSdk.getSceneManagerInstance().createDpTask(devids, tasks)
    }

    fun createTasks(params: ReadableMap): ArrayList<SceneTask> {
        var array = params.getArray(TASKS)
        var devidsArray = params.getArray(DEVIDS)
        var tasks = ArrayList<SceneTask>()
        var i = 0
        var j = 0
        while (j < array.size()) {
            while (i < devidsArray.size()) {
                if (array.getMap(i).getString(DEVID) == devidsArray.getString(i)) {
                    val hashMap = hashMapOf<String, Any>()
                    hashMap.put(array.getMap(i).getDouble(DPID).toInt().toString(), array.getMap(i).getBoolean(VALUE))
                    tasks.add(createTask(array.getMap(i).getString(DEVID), hashMap))
                }
                i++;
            }
            j++;
        }

        return tasks
    }

    fun getRule(params: ReadableMap): Rule {
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

    fun getEnumRule(type: String, value: String): Rule {
        var enumRule: Rule
        enumRule = EnumRule.newInstance(
                type,
                value)
        return enumRule
    }

    fun getTempRule(type: String, range: String, value: String): Rule {
        var enumRule: Rule
        enumRule = ValueRule.newInstance(
                type,
                range,
                value.toInt())
        return enumRule
    }

    fun getScene(scendId: String): ITuyaHomeScene? {
        return TuyaHomeSdk.newSceneInstance(scendId);
    }
}
