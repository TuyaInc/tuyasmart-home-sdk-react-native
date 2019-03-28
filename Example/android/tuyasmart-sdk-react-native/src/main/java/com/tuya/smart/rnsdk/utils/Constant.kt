package com.tuya.smart.rnsdk.utils

import com.facebook.react.bridge.Promise
import com.tuya.smart.sdk.api.IResultCallback

object Constant {

    /**
     * 在创建自动化条件时标识符
     */
    const val ENTITY_TYPE_TIMER = 6
    const val ENTITY_TYPE_WEATHER = 3
    const val ENTITY_TYPE_DEVICE = 1
    const val ENTITY_TYPE = "entityType"

    const val SUCCESS = "success"
    const val FAILED = "failed"

    const val NEEDLOGIN = "needLogin"
    const val API_REQUEST_ERROR = "api request error"

    const val COUNTRYCODE = "countryCode"
    const val EMAIL = "email"
    const val PHONENUMBER = "phoneNumber"
    const val VALIDATECODE = "validateCode"
    const val PASSWORD = "password"
    const val NEWPASSWORD = "newPassword"
    const val CODE = "code"
    const val UID = "uid"
    const val KEY = "key"
    const val SECRET = "secret"
    const val USERID = "userId"
    const val ACCESSTOKEN = "accessToken"
    const val TOKEN = "token"
    const val FILEPATH = "filePath"
    const val TEMPUNITENUM = "tempUnitEnum"

    const val DEVID = "devId"
    const val GROUPID = "groupId"
    const val MESHID = "meshId"
    const val HOMEID = "homeId"
    const val NAME = "name"
    const val LON = "lon"
    const val LAT = "lat"
    const val GEONAME = "geoName"
    const val ROOMID = "roomId"
    const val IDLIST = "idList"
    const val PRODUCTID = "productId"
    const val DEVIDLIST = "devIdList"
    const val ROMMS = "rooms"
    const val MEMBERID = "memberId"
    const val USERACCOUNT = "userAccount"
    const val ADMIN = "admin"
    const val SSID = "ssid"
    const val TIME = "time"
    const val ACTIVATORMODELENUM = "ActivatorModelEnum"
    const val COMMAND = "command"
    const val DATAPOINTTYPEENUM = "DataPointTypeEnum"
    const val NUMBER = "number"
    const val STARTTIME = "startTime"
    const val DEVIDS = "devIds"
    const val IDS = "ids"
    const val OPERATOR = "operator"

    const val TASKNAME = "taskName"
    const val LOOPS = "loops"
    const val DPS = "dps"
    const val TIMERID = "timerId"
    const val INSTRUCT = "instruct"
    const val DPID = "dpId"
    const val ISOPEN = "isOpen"
    const val STATUS = "status"
    const val TIMEID = "timeId"
    const val SHAREID = "shareId"
    const val GROUPNAME = "groupName"
    const val GROUPLISTENER = "GroupListener"
    const val SHOWFAHRENHEIT = "showFahrenheit"

    const val LOCALID = "localId"

    const val CITYID = "cityId"
    const val CITYIDS = "cityIdS"
    const val CONDITIONLISTS = "conditionList"

    const val RULE = "rule"
    const val CONDITIONS = "conditions"
    const val SCENETASK = "SceneTask"
    const val SCENEID = "sceneId"
    const val SCENEIDS = "sceneIds"
    const val TASK = "task"
    const val TYPE = "type"
    const val DISPLAY = "display"
    const val VALUE = "value"
    const val TASKS = "tasks"
    const val RANGE = "range"
    const val ID = "id"
    const val MESEAGE = "message"
    const val CONTACT = "contact"
    const val HDID = "hdId"
    const val HDTYPE = "hdType"
    const val RULES = "rules"
    const val DPVALUE = "dpvalue"

    const val STICKYONTOP = "stickyOnTop"
    const val BACKGROUND = "background"
    const val MATCHTYPE = "matchType"
    const val ALIASID = "aliasId"
    const val PUSHPROVIDER = "pushProvider"
    fun getIResultCallback(promise: Promise): IResultCallback? {
        return object : IResultCallback {
            override fun onSuccess() {
                promise.resolve(Constant.SUCCESS)
            }

            override fun onError(code: String?, error: String?) {
                promise.reject(code, error)
            }
        }
    }
}