package com.tuya.smart.rnsdk.utils;

import com.alibaba.fastjson.JSONArray;
import com.facebook.react.bridge.Promise;
import com.tuya.smart.android.user.api.IBooleanCallback;
import com.tuya.smart.home.sdk.callback.ITuyaResultCallback;
import com.tuya.smart.sdk.api.IResultCallback;
import com.tuya.smart.sdk.api.ITuyaDataCallback;

import java.util.List;

public class Constant {
    public static final String SUCCESS = "success";

    public static final String NEEDLOGIN = "needLogin";
    public static final String API_REQUEST_ERROR = "api request error";

    public static final String COUNTRYCODE = "countryCode";
    public static final String EMAIL = "email";
    public static final String DATA = "data";
    public static final String PHONENUMBER = "phoneNumber";
    public static final String RELATIONID = "relationId";
    public static final String VALIDATECODE = "validateCode";
    public static final String PASSWORD = "password";
    public static final String ISCREATEHOME = "isCreateHome";
    public static final String NEWPASSWORD = "newPassword";
    public static final String APPKEY = "appKey";
    public static final String APPSECRET = "appSecret";
    public static final String CODE = "code";
    public static final String UID = "uid";
    public static final String KEY = "key";
    public static final String SECRET = "secret";
    public static final String USERID = "userId";
    public static final String USER = "user";
    public static final String ACCESSTOKEN = "accessToken";
    public static final String TOKEN = "token";
    public static final String FILEPATH = "filePath";
    public static final String DEBUG = "debug";

    public static final String TEMPUNITENUM = "tempUnitEnum";

    public static final String DEVID = "devId";
    public static final String NODEID = "nodeId";
    public static final String GWID = "gwId";
    public static final String LOCALSID = "localSid";
    public static final String AUTOSHARING = "autoSharing";
    public static final String SHAREBEAN = "shareBean";
    public static final String TYDEVICEPUBLISHMODEENUM = "TYDevicePublishModeEnum";
    public static final String OFFSET = "offset";
    public static final String LIMIT = "limit";
    public static final String LIST = "list";
    public static final String GROUPID = "groupId";
    public static final String MESHID = "meshId";
    public static final String HOMEID = "homeId";
    public static final String DEVICES = "devices";
    public static final String REGION = "region";
    public static final String NAME = "name";
    public static final String FILENAME = "fileName";
    public static final String PLACE = "place";
    public static final String LON = "lon";
    public static final String PARENTID = "parentId";
    public static final String PARENTTYPE = "parentType";
    public static final String LAT = "lat";
    public static final String GEONAME = "geoName";
    public static final String ROOMID = "roomId";
    public static final String IDLIST = "idList";
    public static final String PRODUCTID = "productId";
    public static final String DEVIDLIST = "devIdList";
    public static final String ROMMS = "rooms";
    public static final String MEMBERID = "memberId";
    public static final String MEMBERWRAPPERBEAN = "memberWrapperBean";
    public static final String USERACCOUNT = "userAccount";
    public static final String USERNAME = "userName";
    public static final String ADMIN = "admin";
    public static final String SSID = "ssid";
    public static final String TIME = "time";
    public static final String TIMEZONEID = "timezoneId";
    public static final String DATAPOINTTYPEENUM = "DataPointTypeEnum";
    public static final String NUMBER = "number";
    public static final String STARTTIME = "startTime";
    public static final String MSGTYPE = "msgType";
    public static final String MSGSRCID = "msgSrcId";
    public static final String ENDTIME = "endTime";

    public static final String DEVIDS = "devIds";
    public static final String IDS = "ids";

    public static final String TASKNAME = "taskName";
    public static final String LOOPS = "loops";
    public static final String RANGETYPE="rangeType";
    public static final String RULE = "rule";
    public static final String RANGE="range";
    public static final String DPS = "dps";
    public static final String DISPLAY="display";
    public static final String DEVICEBEAN = "deviceBean";
    public static final String PUBLISHMODEENUM = "publishModeEnum";
    public static final String INSTRUCT = "instruct";
    public static final String DPID = "dpId";
    public static final String ISOPEN = "isOpen";
    public static final String STATUS = "status";
    public static final String TIMEID = "timeId";
    public static final String SHAREID = "shareId";
    public static final String GROUPNAME = "groupName";
    public static final String SHOWFAHRENHEIT = "showFahrenheit";

    public static final String LOCALID = "localId";

    public static final String CITYID = "cityId";

    public static final String SCENEID = "sceneId";
    public static final String SCENEIDS = "sceneIds";
    public static final String TYPE = "type";
    public static final String RULETYPE = "ruleType";
    public static final String VALUE = "value";
    public static final String TASKS = "tasks";
    public static final String SCENEBEAN = "sceneBean";
    public static final String ID = "id";
    public static final String MESEAGE = "message";
    public static final String CONTACT = "contact";
    public static final String HDID = "hdId";
    public static final String HDTYPE = "hdType";

    public static final String STICKYONTOP = "stickyOnTop";
    public static final String BACKGROUND = "background";
    public static final String MATCHTYPE = "matchType";
    public static final String CONDITIONLIST = "conditionList";
    public static final String PRECONDITION = "PreCondition";
    public static final String ACTION = "action";

    public static final String ALIASID = "aliasId";
    public static final String PUSHPROVIDER = "pushProvider";

    public static IResultCallback getIResultCallback(final Promise promise) {
        return new IResultCallback() {
            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }

            @Override
            public void onSuccess() {
                promise.resolve(SUCCESS);
            }
        };
    }


    public static IBooleanCallback getIBooleanCallback(final Promise promise) {
        return new IBooleanCallback() {
            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }

            @Override
            public void onSuccess() {
                promise.resolve(SUCCESS);
            }
        };
    }


    public static ITuyaResultCallback getITuyaResultCallback(final Promise promise) {
        return new ITuyaResultCallback() {
            @Override
            public void onSuccess(Object result) {
                handlePromise(promise,result);
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }
        };
    }
    public static final void handlePromise(Promise promise,Object result){
        if(result instanceof Integer){
            promise.resolve(result);
        }else if (result instanceof Boolean){
            promise.resolve(result);
        }else if (result instanceof Long){
            promise.resolve(((Long)result).intValue());
        }else if (result instanceof String){
            promise.resolve(result);
        }else if (result instanceof List){
            promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(result)));
        }else {
            promise.resolve(TuyaReactUtils.parseToWritableMap(result));
        }
    }

    public static ITuyaDataCallback getITuyaDataCallback(final Promise promise) {
        return new ITuyaDataCallback() {
            @Override
            public void onSuccess(Object result) {
                if (result instanceof List) {
                    promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(result)));
                } else {
                    handlePromise(promise,result);
                }
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }

        };
    }

    public static Long coverDTL(double d) {
        return Double.valueOf(d).longValue();
    }
}
