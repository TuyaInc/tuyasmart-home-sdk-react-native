React Native SDK DOC
---




## 功能概述
rnSdk基于涂鸦智能sdk做了一层封装.涂鸦全屋智能SDK提供了以家庭为单位，对硬件设备、涂鸦云通讯的接口封装，加速应用开发过程，主要包括了以下功能：

- 硬件设备相关（配网、控制、状态上报、定时任务、群组、固件升级、共享）
- 账户体系（手机号、邮箱的注册、登录、重置密码等通用的账户功能）
- 家庭管理
- ZigBee网关
- 消息中心
- 意见反馈 
- 涂鸦云HTTP API接口封装 (参见[涂鸦云api调用](https://docs.tuya.com/cn/cloudapi/appAPI/index.html)）

---

## 集成准备

### 获取App ID和App Secret

开发平台上，在`应用管理`中新建一款应用，输入应用名称、应用包名、应用标示符等信息。创建成功后，即可获得App ID和Secret用于SDK开发。

![cmd-markdown-logo](http://images.airtakeapp.com/smart_res/developer_default/sdk_zh.jpeg) 

---

## 集成SDK
### 集成准备 Android
#### （1）创建工程

在Android Studio中建立你的工程。

#### （2）加入lib

拷贝demo中的sdk 到你react native工程下


#### （3) gradle 配置

setting.gralde
```
...
include ':tuya-react-sdk'
project(':tuya-react-sdk').projectDir = new File(rootProject.projectDir, '../sdk/android')
...

```

build.gradle 文件里添加如下配置

```groovy

dependencies {
    ...
    implementation project(':tuya-react-sdk')
    ...
}

```
### 集成准备 ios
#### （1）创建工程

创建工程

#### （2）加入lib

拷贝demo中的sdk 到你react native工程下,同时进入ios/TuyaRnDemo/ 把TuyaRNSDK 拷贝进去





##### 【注意事项】

涂鸦智能sdk默认只支持armeabi-v7a和x86架构的平台，如有其他平台需要可前往[GitHub](https://github.com/TuyaInc/tuyasmart_android_sdk/tree/master/library)获取


#### (1) 初始化涂鸦智能sdk。
##### 【描述】

主要用于初始化通信服务等组件。

##### 【代码范例】

```javascript
 TuyaCoreApi.initWithOptions({
      appKey:Platform.OS=='ios'?iosAppKey:androidAppKey,
      appSecret:Platform.OS=='ios'?iosAppSecret:androidAppSecret,
    });
```

#### (2)  注销涂鸦智能云连接
在退出应用的时候调用以下接口注销掉。

```javascript
TuyaCoreApi.onDestroy()
```

#### (3)  注册session失效监听
##### 【描述】

Session由于可能存在一些异常或者在一段时间不操作（45天）会失效掉，这时候需要退出应用，重新登陆获取Session。

##### 【方法调用】


```javascript
TuyaCoreApi.setOnNeedLoginListener(()=>{})
```


【注意事项】

- 一旦出现此类回调，请跳转到登陆页面，让用户重新登陆。

---



## 用户管理

### 1系列SDK账户迁移（非1系列用户可以忽略此步）
需要登陆后在升级

```
    //检测是否要升级用户数据
    checkVersionUpgrade ();
    //升级账号
    upgradeVersion ();
    //检测是否升级
    TuyaHomeSdk.getUserInstance().checkVersionUpgrade()
    //升级用户账号
    TuyaHomeSdk.getUserInstance().upgradeVersion()
```


### 用户手机验证码登陆

涂鸦智能提供手机验证码登陆体系。
#### (1)手机验证码登陆
##### 【描述】

手机验证码登陆，支持国内手机验证码登陆。
##### 【代码调用】

```java
//获取手机验证码
* @param countryCode   国家区号
* @param phoneNumber   手机号码
TuyaUserApi.getValidateCode({countryCode,phoneNumber})
//手机验证码登陆
* @param countryCode 国家区号
* @param phoneNumber       电话
* @param validateCode        验证码
TuyaUserApi.loginWithPhone({countryCode,phoneNumber,validateCode})
```

##### 【代码范例】

```java
//获取手机验证码
 TuyaUserApi.getValidateCode({countryCode,phoneNumber})
        .then(() => {})
        .catch((error) => {});
//手机验证码登陆
 TuyaUserApi.loginWithPhone({countryCode,phoneNumber,validateCode,})
        .then(() => {})
        .catch((error) => {});
```
### 用户手机密码登陆

涂鸦智能提供手机密码登陆体系。
#### (1)手机密码注册
##### 【描述】

手机密码注册。支持国内外手机注册。
##### 【方法调用】

```java
//获取手机验证码
* @param countryCode   国家区号
* @param phoneNumber   手机号码
 TuyaUserApi.getValidateCode({countryCode,phoneNumber})
        .then(() => {})
        .catch((error) => {});

//注册手机密码账户
* @param countryCode 国家区号
* @param phoneNumber       手机密码
* @param password      登陆密码
* @param validateCode    验证码
TuyaUserApi.registerAccountWithPhone({countryCode,phoneNumber,validateCode,password})
```
##### 【代码范例】

```java

//获取手机验证码
TuyaUserApi.getValidateCode({countryCode,phoneNumber})
        .then(() => {})
        .catch((error) => {});
//注册手机密码账户
TuyaUserApi.registerAccountWithPhone({countryCode,phoneNumber,validateCode,password})
        .then(() => {})
        .catch((error) => {});
```
#### (2)手机密码登陆
##### 【描述】

手机密码登陆。
##### 【方法调用】

```java
//手机密码登陆
* @param countryCode 国家区号
* @param phoneNumber       手机密码
* @param passwd      登陆密码
* @param callback    登陆回调接口
TuyaUserApi.loginWithPhonePassword({countryCode,phoneNumber,password})
```
##### 【代码范例】

```java
//手机密码登陆
TuyaUserApi.loginWithPhonePassword({countryCode,phoneNumber,password})
        .then(() => {})
        .catch((error) => {});
```
#### (3)手机重置密码
##### 【描述】

手机密码登陆 重置密码。
##### 【方法调用】

```java
//获取手机验证码
* @param countryCode   国家区号
* @param phoneNumber   手机号码
 TuyaUserApi.getValidateCode({countryCode,phoneNumber})


//重置密码
* @param countryCode 国家区号
* @param phone       手机号码
* @param code        手机验证码
* @param newPasswd   新密码
TuyaUserApi.resetPhonePassword({phone,code,newPassword,countryCode})

```
##### 【代码范例】

```java
//手机获取验证码

 TuyaUserApi.getValidateCode({countryCode,phoneNumber})
        .then(() => {})
        .catch((error) => {});
//重置手机密码
TuyaUserApi.resetPhonePassword({phone,code,newPassword,countryCode})
        .then(() => {})
        .catch((error) => {});
```
### 用户邮箱密码登陆
涂鸦智能提供邮箱密码登陆体系。
#### (1) 用户邮箱密码注册
##### 【描述】

用户邮箱密码注册。支持国内外邮箱注册。
##### 【方法调用】
```java
//邮箱注册获取验证码
/**
 * 注册获取邮箱验证码
 * @param countryCode
 * @param email
 */
TuyaUserApi.getRegisterEmailValidateCode({countryCode,email})
//邮箱密码注册
* @param countryCode 国家区号
* @param email       邮箱账户
* @param password      登陆密码
* @param code    验证码
TuyaUserApi.registerAccountWithEmail({countryCode, email,code,password})
```
##### 【代码范例】

```java
//注册获取邮箱验证码
TuyaUserApi.getRegisterEmailValidateCode({phone,code,newPassword,countryCode})
        .then(() => {})
        .catch((error) => {});

//邮箱密码注册
TuyaUserApi.registerAccountWithEmail({countryCode, email,code,password})
        .then(() => {})
        .catch((error) => {});
```

##### 【注意事项】

*   账户一旦注册到一个国家，目前数据无法迁移其他国家。

#### (2) 用户邮箱密码登陆
##### 【描述】

用户邮箱密码登陆

##### 【方法调用】

```java
//邮箱密码登陆
* @param email  邮箱账户
* @param passwd 登陆密码
* @param countryCode 国家码
TuyaUserApi.loginWithEmail({email,password,countryCode,})
```
##### 【代码范例】

```java
//邮箱密码登陆
TuyaUserApi.loginWithEmail({email,password,countryCode,})
        .then(() => {})
        .catch((error) => {});
```
#### (3) 用户邮箱重置密码
##### 【描述】

用户邮箱重置密码
##### 【方法调用】

```java
//邮箱找回密码，获取验证码
* @param countryCode 国家区号
* @param email       邮箱账户
TuyaUserApi.getEmailValidateCode({countryCode,email})

//邮箱重置密码
* @param email     用户账户
* @param validateCode 邮箱验证码
* @param newPassword    新密码
* @param countryCode  国家区号
TuyaUserApi.resetEmailPassword({email, validateCode,newPassword,countryCode})
```
##### 【代码范例】

```java
//获取邮箱验证码
TuyaUserApi.getEmailValidateCode({email,password,countryCode,})
        .then(() => {})
        .catch((error) => {});
//重置密码
TuyaUserApi.resetEmailPassword({email,password,countryCode,})
        .then(() => {})
        .catch((error) => {});
```
### 用户uid登陆体系
涂鸦智能提供uid登陆体系。如果客户自有用户体系，那么可以通过uid登陆体系，接入我们的sdk。
#### (1) 用户uid注册

##### 【描述】

用户uid注册
##### 【方法调用】

```java
//用户uid注册
* @param countryCode 国家号码
* @param uid         用户uid
* @param password    用户密码
TuyaUserApi.registerAccountWithUid({password,countryCode,uid})
```
##### 【代码范例】

```java
//uid注册
TuyaUserApi.registerAccountWithUid({password,countryCode,uid})
        .then(() => {})
        .catch((error) => {});
```
#### (2) 用户uid登陆
##### 【描述】

用户uid登陆
##### 【方法调用】

```java
//uid 登陆
* @param countryCode 国家号码
* @param uid         用户uid
* @param password      用户密码
 TuyaUserApi.loginWithUid({password,countryCode,uid})
```
##### 【代码范例】

```java
//uid登陆
TuyaUserApi.loginWithUid({password,countryCode,uid})
        .then(() => {})
        .catch((error) => {});
```
#### (3) 用户uid重置密码
##### 【描述】

用户uid重置密码，需要通过云云对接的方式进行重置密码。详看云端API文档



#### (4) 用户uid登陆注册接口
##### 【描述】

用户UID 登陆注册合成一个接口。
##### 【方法调用】

```java
//uid 登陆
* @param countryCode 国家号码
* @param uid         用户uid
* @param password      用户密码
TuyaUserApi.loginOrRegisterWithUid({password,countryCode,uid})
```
##### 【代码范例】

```java
//uid登陆
TuyaUserApi.loginOrRegisterWithUid({password,countryCode,uid})
        .then(() => {})
        .catch((error) => {});
```
###  第三方登陆

#### Twitter登陆

##### 【方法调用】

```java
* @param countryCode 国家区号
* @param key         twitter授权登录获取的key
* @param secret      twitter授权登录获取的secret

 TuyaUserApi.loginByTwitter({countryCode,key,secret})
```


#### QQ登陆

##### 【方法调用】

```java

* @param countryCode 国家区号
* @param userId         QQ授权登录获取的userId
* @param accessToken    QQ授权登录获取的accessToken

TuyaUserApi.loginByQQ({countryCode,userId,accessToken})
```

#### 微信登陆

##### 【方法调用】

```java

 *  @param countryCode 国家区号
 *  @param code 微信授权登录获取的code
TuyaUserApi.loginByWechat({countryCode,code})

```

#### Facebook 登陆

```java

 *  @param countryCode 国家区号
 *  @param token facebook授权登录获取的token
 
 TuyaUserApi.loginByFacebook({countryCode,token})
```


### 上传用户头像
上传用户的头像。
##### 【描述】
用于上传用户自定义的头像。
##### 【方法原型】
```java
/**
 * 上传用户头像
 *
 * @param filePath    文件路径
 */
TuyaUserApi.uploadUserAvatar({filePath})
```
##### 【代码范例】
```java
TuyaUserApi.uploadUserAvatar({filePath})
        .then(() => {})
        .catch((error) => {});
```
###  设置温度单位
设置温度单位是摄氏度还是华氏度

```java
/**
 * TempUnitEnum.Celsius是摄氏度,TempUnitEnum.Fahrenheit是华摄度
 *
 * @param tempUnitEnum
 */
TuyaUserApi.setTempUnit({ tempUnitEnum})
```


### 退出登录接口

用户账号切换的时候需要调用退出登录接口

```
 TuyaUserApi.logout()
        .then(() => {})
        .catch((error) => {});

```
###  注销账户
一周后账号才会永久停用并删除以下你账户中的所有信息，在此之前重新登录，则你的停用请求将被取消

```java

/**
 * 注销账户
 * Account cancellation
 *
 * @param callback
 */
TuyaUserApi.cancelAccount()
    
```
##### 【代码范例】
```java
TuyaUserApi.cancelAccount()
        .then(() => {})
        .catch((error) => {});

```


### 数据模型
用户相关的数据模型。

#### User
* nickName  昵称
* phoneCode 国家区号
* mobile 手机号码
* username 用户名称
* email 邮箱地址
* uid 用户唯一标识符
* sid 用户登录产生唯一标识id.
* headPic 用户头像路径

----


## 家庭


### 家庭操作类

TuyaHomeApi 提供了家庭相关的操作类，负责处理家庭的数据和信息的更新。
#### 初始化家庭下的所有数据

```java 
  TuyaHomeApi.getHomeDetail({ homeId})

```

#### 获取本地缓存中的数据信息 


```java 
	
	获取家庭下面的本地cache
  TuyaHomeApi.getHomeLocalCache({ homeId})


```
#### 更新家庭信息

```java

    /**
     * 更新家庭信息
     *
     * @param name     家庭名称
     * @param lon      当前家庭的经度
     * @param lat      当前家庭的纬度
     * @param geoName  地理位置的地址
     * @param callback
     */
TuyaHomeApi.updateHome({homeId,name,lon,lat,geoName})
```

#### 解散家庭

```java
	/**
     * 解散家庭
     *
     */
TuyaHomeApi.dismissHome({ homeId})

```

#### 排序

```java

    /**
     * 排序
     *
     * @param idList homeId list 
     * @param callback
     */
TuyaHomeApi.sortHome({homeId,idList})
```

#### 添加房间

```java
   /**
     * 添加房间
     *
     * @param name
     * @param callback
     */
TuyaHomeApi.addRoom({homeId,name})
```

#### 移除家庭下面的房间

```
 /**
     * 移除房间
     *
     * @param roomId
     * @param callback
     */
TuyaHomeApi.removeRoom({homeId,roomId})

```

#### 排序家庭下面的房间

```java

 /**
     * 排序房间
     *
     * @param idList   房间id的list
     * @param callback
     */
 TuyaHomeApi.sortRoom({homeId,idList})

```

#### 查询房间列表

```java
   /**
     * 查询房间列表
     */
 TuyaHomeApi.queryRoomList({homeId})

```

#### 创建群组

```java
    /**
     * 创建群组
     *
     * @param productId 产品ID
     * @param name      群组名称
     * @param devIdList 设备ID List
     * @param callback
     */
TuyaHomeApi.createGroup({homeId,productId,name,devIdList,})

```

#### 根据设备查询房间信息
```java
    /**
     * 根据设备查询房间信息
     *
     * @param devices
     * @return
     */
TuyaHomeApi.queryRoomInfoByDevice({homeId,devices});
```

#### 监听家庭下面信息的变更
```java

    /**
     * 监听家庭下面信息(设备的新增或者删除)变更的监听
     *
     * @param listener
     */
TuyaHomeApi.registerHomeStatusListener({homeId: this.state.home.homeId},()=>{
      console.log("onDeviceAdded")
    },()=>{
      console.log("onDeviceRemoved")
    },()=>{
      console.log("onGroupAdded")
    },()=>{
      console.log("onGroupRemoved")
    },()=>{
      console.log("onMeshAdded")
    })    

```
#### 注销家庭下面信息变更的监听
```java

TuyaHomeApi.unRegisterHomeStatusListener({homeId})
```

#### 查询用户下面相同产品且支持群组的设备列表

```java
TuyaHomeApi.queryDeviceListToAddGroup({homeId,groupId,productId})
```




### 家庭管理类
TuyaHomeManagerApi 提供了创建家庭、获取家庭列表以及监听家庭相关的变更

#### 获取家庭列表

```java


TuyaHomeManagerApi.queryHomeList()
```
#### 创建家庭

```java
 /**
     *
     * @param name     家庭名称
     * @param lon      经度
     * @param lat      纬度
     * @param geoName  家庭地理位置名称
     * @param rooms    房间列表
     */
 TuyaHomeManagerApi.createHome({name,lon,lat,geoName,rooms})


```

#### 家庭信息的变更

```

	 /**
     * 注册家庭信息的变更
     * 有：家庭的增加、删除、信息变更、分享列表的变更和服务器连接成功的监听
     *
     * @param listener
     */
    TuyaHomeManagerApi.registerTuyaHomeChangeListener(() => {
      console.log("onHomeAdded")
    }, () => {
      console.log("onHomeRemoved")
    }, () => {
         console.log("onHomeInfoChanged")
     }, () => { 
          console.log("onSharedDeviceList")
     }, () => { 
         console.log("onSharedGroupList")
     }, () => {
          console.log("onServerConnectSuccess")
      })
    

    TuyaHomeManagerApi.unregisterTuyaHomeChangeListener()
    
```

### 家庭成员管理类
TuyaHomeMemberApi提供了家庭成员管理接口，包括添加、删除成员，更新成员的控制权限、获取家庭成员列表等
```java
	private long homeId; //家庭id
    private String nickName;//备注名
    private boolean admin;//是否是管理员
    private long memberId;//成员id
    private String headPic;//头像地址
    private String account;//成员账户名称
    private String uid;//成员唯一标识id
```

#### Home下面添加成员

```java
    /**
     * 给这个Home下面添加成员
     *
     * @param countryCode 国家码
     * @param userAccount 用户名
     * @param name        昵称
     * @param admin       是否拥有管理员权限
     */
TuyaHomeMemberApi.addMember({homeId,countryCode,userAccount,name,admin})

```

#### 移除Home下面的成员

```java
   /**
     * 移除Home下面的成员
     *
     * @param id
     * @param callback
     */
TuyaHomeMemberApi.removeMember({memberId})
```

#### 更新成员备注名和权限
```java
/**
 * 更新成员备注名和权限
 * @param name 备注名 如果不更改备注名，传入从memberBean获取的nickName
 * @param admin  是否是管理员
 * @param callback
 */
 TuyaHomeMemberApi.updateMember({ memberId, name, admin}).then(() => {})
```

#### 查询Home下面的成员列表

```java
   /**
     * 查询Home下面的成员列表
     *
     */
  TuyaHomeMemberApi.queryMemberList({ homeId })
```

###  房间管理类
TuyaRoomApi 提供房间的管理类，负责房间的新增、删除设备或群组

```


    /**
     * 更新房间名称
     *
     * @param name     新房间名称
     */
TuyaRoomApi.updateRoom({roomId,name})
    /**
     * 添加设备
     *
     * @param devId
     */
 TuyaRoomApi.addDevice({roomId,devId})
    /**
     * 添加群组
     *
     * @param groupId
     */
 TuyaRoomApi.addGroup({roomId,groupId})

    /**
     * 删除设备
     *
     * @param devId
     */
 TuyaRoomApi.removeDevice({roomId,devId})

    /**
     * 删除群组
     *
     * @param groupId
     */
 TuyaRoomApi.removeGroup({roomId,groupId})

    /**
     * 把群组或者设备移除房间
     *
     * @param list
     */
 TuyaRoomApi.moveDevGroupListFromRoom({roomId,list})
    /**
     * 对房间里的群组或者设备进行排序
     * @param list
     */
 TuyaRoomApi.sortDevInRoom({roomId,list})

```

### 对家庭的缓存数据操作

```

获取此数据前，应该调用家庭的初始化接口 getHomeDetail、或者getHomeLocalCache 之后才会有

TuyaHomeDataManagerApi{

    /**
     * 家庭下面的设备、群组、房间列表
     */

     TuyaHomeDataManagerApi.getHomeRoomList({homeId})

    /**
     * 获取家庭下面的设备列表
     *
     * @param homeId 家庭ID
     * @return
     */
    TuyaHomeDataManagerApi.getHomeDeviceList({homeId})

    /**
     * 获取家庭下面的群组列表
     *
     * @param homeId
     * @return
     */
    TuyaHomeDataManagerApi.getHomeGroupList({homeId});

    //获取群组
    TuyaHomeDataManagerApi.getGroupBean({groupId})

    //获取设备
     TuyaHomeDataManagerApi.getDeviceBean({devId})

    //根据群组ID获取房间
    TuyaHomeDataManagerApi.getGroupRoomBean({groupId})

    //获取房间
     TuyaHomeDataManagerApi.getRoomBean({roomId,homeId })

    //根据设备获取房间信息
    TuyaHomeDataManagerApi.getDeviceRoomBean({devId})

    //获取群组下面的设备列表
   TuyaHomeDataManagerApi.getGroupDeviceList({groupId})

    //获取mesh下面的群组列表
       TuyaHomeDataManagerApi.getMeshGroupList({groupId})


       TuyaHomeDataManagerApi.getMeshDeviceList({meshId})

    /**
     * 根据房间ID获取房间下面的设备列表
     *
     * @param roomId
     * @return
     */
          TuyaHomeDataManagerApi.getRoomDeviceList({roomId})

    /**
     * 根据房间ID获取房间下面的群组列表
     *
     * @param roomId
     * @return
     */
    TuyaHomeDataManagerApi.getRoomGroupList({roomId})


    /**
     * 获取Home数据
     *
     * @param homeId
     * @return
     */
        TuyaHomeDataManagerApi.getHomeBean({homeId})

}

```

## 设备配网
TuyaActivatorApi 集成了WiFi配网、ZigBee配网、蓝牙mesh配网等。

### WiFi配网
##### 【描述】
	WiFi配网主要有EZ模式和AP模式两种

##### 【初始化参数配置】

```java
TuyaActivatorApi.initActivator({homeId,ssid,password,time,type,})
```
##### 【参数说明】

###### 【入参】

```java
* @param ssid   配网之后，设备工作WiFi的名称。（家庭网络）
* @param password   配网之后，设备工作WiFi的密码。（家庭网络）
* @param type:	现在给设备配网有以下两种方式:
ActivatorModelEnum.TY_EZ: 传入该参数则进行EZ配网
ActivatorModelEnum.TY_AP: 传入该参数则进行AP配网
* @param time     配网的超时时间设置，默认是100s.
```

###### 【出参】

ITuyaSmartActivatorListener listener 配网回调接口

```java
* @method onError(String errorCode,String errorMsg);			

@param errorCode:
1001        网络错误
1002        配网设备激活接口调用失败，接口调用不成功
1003        配网设备激活失败，设备找不到。
1004        token 获取失败
1005        设备没有上线
1006        配网超时

@param errorMsg:
暂时没有数据，请参考errorCode。

* @method onActiveSuccess(DeviceBean deviceBean);		设备配网成功,且设备上线（手机可以直接控制），可以通过
* @method onStep(String step, Object o);	
|@param step         |@param o
|device_find         |devId (String)
|device_bind_success |dev (DeviceBean)
【备注】
device_find 发现设备
device_bind_success 设备绑定成功，但还未上线，此时设备处于离线状态，无法控制设备。
```

##### 【方法调用】

```java
//getActivator Token
TuyaActivatorApi.initActivator({homeId,ssid,password,time,type,})
//开始配置
TuyaActivatorApi.stop();

```




#### 【配网问题汇总】
#####  配网超时，此时设备一直处于连不上网络的状态。有以下几种原因。
- 获取WiFi Ssid 错误，导致配网失败
  安卓系统API里面获取到ssid，通常前后会有“”。
  建议使用Tuya Sdk里面自带的WiFiUtil.getCurrentSSID()去获取
  
-  WiFi密码包含空格
  用户在输入密码的时候，由于输入法联想的功能很容易在密码中输入空格。建议密码输入的时候直接显示出来，另外在判断密码含有空格的时候，弹窗提醒用户。
  
- 用户不输入WiFi密码
  用户在首次使用智能设备产品的过程中，很容易不输入密码就进行后续操作
  建议判断密码输入为空且WiFi加密类型不为NONE时，弹窗提醒用户。
  
- 用户在AP配网时选择了设备的热点名称，用户首次使用智能产品的过程中，很容易出现此问题。
  建议在判别AP配网时用户选择了设备的热点名称，弹窗提醒给用户。
  
- 获取WiFi的Ssid为"0x","\<unknown ssid\>"
  目前发现在一些国产手机会出现此问题。并不是用户选择的WiFi名称。这是由于定位权限没开启导致的，建议用户可以手动输入WiFi的Ssid，或者给出弹窗提醒，让用户开启相应权限。

#####  配网超时，此时设备已经激活成功。可能原因有：

* APP没有连接到正常的网络，导致无法获取设备的状态。




#### ZigBee子设备配网

ZigBee子设备配网需要ZigBee网关设备云在线的情况下才能发起,且子设备处于配网状态。

##### 【方法调用】

```java
TuyaActivatorApi.newGwSubDevActivator({time,devId})
```

##### 【代码范例】

```java

TuyaActivatorApi.newGwSubDevActivator({time,devId})


```

## 设备控制

### 设备信息获取
##### 【描述】

涂鸦智能提供了丰富的接口供开发者实现设备信息的获取和管理能力(移除等)。设备相关的返回数据都采用异步消息的方式通知接受者.


##### 【注意事项】

* 设备控制必须先初始化数据，即先调用TuyaHomeSdk.newHomeInstance(homeId).getHomeDetail(ITuyaHomeResultCallback callback)

* schema dp数据相关介绍[详见功能点相关概念][3]

---

### 设备操作控制

TuyaDeviceApi类提供了设备状态通知能力，通过注册回调函数，开发者可以方便的获取设备数据接受、设备移除、设备上下线、手机网络变化的通知。同时也提供了控制指令下发，设备固件升级的接口。


#### 设备功能点
DeviceBean 类 dps 属性定义了设备的状态，称作数据点（DP点）或功能点。`dps`字典里的每个`key`对应一个功能点的`dpId`，`dpValue`为该功能点的值。各自产品功能点定义参见[涂鸦开发者平台](https://developer.tuya.com/)的产品功能。
功能点具体参见[快速入门-功能点相关概念](https://docs.tuya.com/cn/creatproduct/#_7)

##### 【指令格式】

发送控制指令按照以下格式：
{"(dpId)":"(dpValue)"}

##### 【功能点示例】
开发平台可以看到一个产品这样的界面
![功能点](./images/ios_dp_sample.jpeg)

根据后台该产品的功能点定义，示例代码如下:

```java

//设置dpId为1的布尔型功能点示例 作用:开关打开 
dps = {"1": true};

//设置dpId为4的字符串型功能点示例 作用:设置RGB颜色为ff5500
dps = {"4": "ff5500"};

//设置dpId为5的枚举型功能点示例 作用:设置档位为2档
dps = {"5": "2"};

//设置dpId为6的数值型功能点示例 用:设置温度为20°
dps = {"6": 20};

//设置dpId为15的透传型(byte数组)功能点示例 作用:透传红外数据为1122
dps = {"15": "1122"};

//多个功能合并发送
dps = {"1": true, "4": "ff5500"};

TuyaGatewayApi.publishDps({devId,localId,dps:JSON.stringify(dps)})
```
##### 【注意事项】
* 控制命令的发送需要特别注意数据类型。<br />
比如功能点的数据类型是数值型（value），那控制命令发送的应该是 `{"2": 25}`  而不是  `{"2": "25"}`<br />
* 透传类型传输的byte数组是字符串格式并且必须是偶数位。<br />
比如正确的格式是: `{"1": "0110"}` 而不是 `{"1": "110"}`


####  初始化数据监听
##### 【描述】

TuyaDeviceApi提供设备相关信息（dp数据、设备名称、设备在线状态和设备移除）的监听，会实时同步到这里。

##### 【实现回调】

```java
 TuyaDeviceApi.registerDevListener(
      { devId: this.state.devId },
      () => {
        console.log("onDpUpdate")
      },
      (data) => {
        console.warn('onRemoved', data);
      },
      (data) => {
        console.warn('onStatusChanged', data);
      },
      (data) => {
        console.warn('onNetworkStatusChanged', data);
      },
      (data) => {
        console.warn('onDevInfoUpdate', data);
      },
    );
```

#### 数据下发

##### 【描述】

通过局域网或者云端这两种方式发送控制指令给设备。






5、注销设备监听事件
```java
TuyaDeviceApi.unRegisterDevListener();
```

6、设备资源销毁
```java
TuyaDeviceApi.onDestroy();
```

##### 【注意事项】

*  指令下发成功并不是指设备真正操作成功，只是意味着指令成功发送出去。操作成功会有dp数据信息上报上来 ，且通过`IDevListener onDpUpdate`接口返回。
*  command 命令字符串 是以`Map<String dpId,Object dpValue>` 数据格式转成JsonString。
*  command 命令可以一次发送多个dp数据。

#### 固件升级

##### 【描述】
固件升级主要用于修复设备bug和增加设备新功能。固件升级主要分两种，第一种是设备升级，第二种是MCU升级。升级的接口位于ITuyaOta中。
#### 查询固件升级信息
##### 【方法调用】
```java
//获取固件升级信息
TuyaOTAApi.startOta({devId})

```
`UpgradeInfoBean`返回固件升级的信息，提供以下信息
```java
	private int upgradeStatus;//升级状态，0:无新版本 1:有新版本 2:在升级中
    private String version;//最新版本
    private String currentVersion;//当前版本
    private int timeout;//超时时间，单位：秒
    private int upgradeType;//0:app提醒升级 2-app强制升级 3-检测升级
    private int type;//0:wifi设备 1:蓝牙设备 2:GPRS设备 3:zigbee设备（目前只支持zigbee网关）9:MCU
    private String typeDesc;//模块描述
    private long lastUpgradeTime;//上次升级时间，单位：毫秒
```


#### 设置升级状态回调

##### 【描述】
ota之前需要注册监听，以实时获取升级状态

##### 【方法调用】
```java
//otaType 升级的设备类型，同`UpgradeInfoBean`的type字段
  TuyaOTAApi.getOtaInfo({devId},()=>{
      console.log('onSuccess')
  },()=>{
      console.log('onFailure')
  },()=>{
      console.log('onProgress')
  })
});
```

#### 开始升级

##### 【描述】
 调用以开始升级,调用后注册的ota监听会把升级状态返回回来，以便开发者构建UI
##### 【方法调用】

```java
TuyaOTAApi.startOta();
```

#### 销毁
##### 【描述】
 离开升级页面后要销毁，回收内存。
##### 【方法调用】

```java
TuyaOTAApi.onDestroy();
```

#### 设备信息查询
##### 【描述】

查询单个dp数据 从设备上查询dp最新数据.

##### 【方法调用】

```java
TuyaHomeDataManagerApi.getDp({devId,dpId})
```



#### 设备重命名
##### 【描述】

设备重命名，支持多设备同步。
##### 【方法调用】
```java
//重命名
TuyaDeviceApi.renameDevice({ devId, name })
```


调用以下方法获取最新数据，然后刷新设备信息即可。

```java
TuyaHomeDataManagerApi.getDeviceBean({devId})
```

#### 移除设备

##### 【描述】
用于从用户设备列表中移除设备
##### 【方法调用】
```java
/**
 * 移除设备
 *
 */
  TuyaDeviceApi.removeDevice({devId})
```


### 设备数据流通道

主要用于扫地机地图数据等大量实时上报的场景

```java
SinglerTransferNativeApi
```

```java
SinglerTransferNativeApi {
	/**
	 * 开始连接
	 */
     startConnect();

	/**
	 * 是否在线
	 */
     isOnline();

	/**
	 * 订阅设备数据，订阅设备之后，设备如果有数据上报上来，便可以通过 registerTransferDataListener 回调上来。需要注意的是，每次通道连接成功都需要重新订阅设备数据
	 */
     subscribeDevice({devId});

	/**
	 * 取消订阅设备信息，则设备数据不在收到
	 *
	 */
     unSubscribeDevice({devId});

	/**
	 * 注册设备数据流，SDK不做数据解析，具体格式需要和硬件上报方协商一致，然后解析。
	 */
     registerTransferDataListener(()=>{
         console.log("success")
     },()=>{
         console.log("error")
     });
	/**
	 * 取消订阅设备数据流
	 */
    unRegisterTransferDataListener();

    /**
     * 注册通道状态变化，在网络波动的情况下会导致通道断开重连的情况 
     */
     registerTransferCallback(()=>{
         console.log("success")
     },()=>{
         console.log("error")
     };

    /** 取消注册
    */
     unRegisterTransferCallback();

    /**
    	断开数据流通道
    */
     stopConnect();
}

```



### 数据模型

#### DeviceBean

* iconUrl 设备图标链接地址
* devId 设备唯一标示id
* isOnline 设备是否在线（局域网或者云端在线） 
* name 设备名称
* schema 用来描述设备dp点属性
* productId 产品唯一标示id
* pv  网关通信协议版本 用x.x来表示 。
* bv  网关通用固件版本 用x.x来表示。
* time 设备添加时间
* isShare 设备是否被分享
* schemaMap Map类型 key 表示dpId， value 表示Schema 数据。
* dps  设备当前数据信息。key 是 dpId ，value 是值。
* lon、lat用来标示经纬度信息，需要用户使用sdk前，调用TuyaSdk.setLatAndLong 设置经纬度信息。
* isZigBeeWifi 是否是ZigBee网关设备
* hasZigBee 是否包含ZigBee能力（网关设备或者子设备）

---

## 共享设备

涂鸦智能提供了向好友分享控制设备的能力。支持分享者和被分享者对分享的设备进行增加、删除、查询、修改。

###  添加分享

#### (1)添加多个设备共享（覆盖）
##### 【描述】
分享多个设备给指定用户，会将指定用户的以前所有分享覆盖掉
##### 【方法调用】

```java
@param homeId	 家庭id
@param countryCode 手机区号码,例如中国是“86”
@param userAccount 账号
@param ShareIdBean 分享内容 目前支持 设备或者mesh
@param autoSharing 是否自动分享新增的设备，如果为true，则分享者以后新增的设备都会自动分享给该指定用户（mesh暂不支持该选项）

TuyaShareApi.addShare({ homeId, countryCode, userAccount, shareBean: {
                        devIds:[devId],
                        meshIds:[]
                    }, autoSharing: false })

```


#### (2)添加多个设备共享（追加）
##### 【描述】
分享多个设备给指定用户，会将要分享的设备追加到指定用户的所有分享中
##### 【方法调用】

```java
@param homeId		分享者家庭id
@param countryCode   手机区号码,例如中国是“86”
@param phoneNumber   手机号码
@param devIds 		 分享的设备id列表

TuyaShareApi.addShareWithHomeId({homeId, countryCode,phoneNumber,devIds,})

```
##### 【代码范例】

```java
TuyaShareApi.addShareWithHomeId({homeId, countryCode,phoneNumber,devIds})
          .then(() => {})
          .catch((err) => {});

```

```java
/**
 * 批量添加设备共享
 * @param memberId 分享目标用户id
 * @param devIds 设备id列表
 * @param callback
 */
TuyaShareApi.addShareWithMemberId({memberId, devIds})

```
##### 【代码范例】

```java
TuyaShareApi.addShareWithMemberId({memberId, devIds: [devId]})
          .then(() => {})
          .catch((err) => {});
```

#### (3)单个设备取消共享
##### 【描述】
通过用户关系id取消单个设备分享
##### 【方法调用】

```java

/**
 * 用户下的设备分享关闭
 *
 * @param devId
 * @param memberId
 */
TuyaShareApi.disableDevShare({devId, memberId})
```
##### 【代码范例】

```java
TuyaShareApi.disableDevShare({devId, memberId})
          .then(() => {})
          .catch((err) => {});
```


### 查询分享

#### (1)查询主动分享的关系列表
##### 【描述】
分享者获取主动分享的关系列表(分享给其他用户的用户信息列表)
##### 【方法调用】

```java
TuyaShareApi.queryUserShareList({ homeId})
      .then(() => {})
```

#### (2)查询收到分享关系列表
##### 【描述】
被分享者获取收到的分享关系列表
##### 【方法调用】

```java
TuyaShareApi.queryShareReceivedUserList()
```

##### 【代码范例】

```java
TuyaShareApi.queryShareReceivedUserList().then((data) => {}).catch((error) => {});

```

#### (3)查询指定设备的分享用户列表
##### 【描述】
分享者获取某个设备的共享用户列表
##### 【方法调用】

```java
@param devId 设备Id
TuyaShareApi.queryDevShareUserList({devId,})
```

##### 【代码范例】

```java
TuyaShareApi.queryDevShareUserList({devId,}).then((data) => {}).catch((error) => {});

```

#### (4)查询指定设备是谁共享的
##### 【描述】
被分享者查找指定设备是谁共享过来的
##### 【方法调用】

```java
@param devId 设备Id
 TuyaShareApi.queryShareDevFromInfo({ devId })

```

##### 【代码范例】

```java
TuyaShareApi.queryShareDevFromInfo({devId,}).then((data) => {}).catch((error) => {});

```

#### (5)查询分享到指定用户的共享关系
##### 【描述】
分享者 通过memberId 获取分享给这个关系用户的所有共享设备信息
##### 【方法调用】

```
@param memberId 用户成员Id 从SharedUserInfoBean中获取
TuyaShareApi.getUserShareInfo({ memberId })

```

##### 【代码范例】

```java
TuyaShareApi.getUserShareInfo({ memberId }).then((data) => {}).catch((error) => {});

```

#### (6)查询收到指定用户共享的信息
##### 【描述】
被分享者 通过memberId 获取收到这个关系用户的所有共享设备信息
##### 【方法调用】

```java
@param memberId 用户成员Id 从SharedUserInfoBean中获取
TuyaShareApi.getReceivedShareInfo({ memberId })
```

##### 【代码范例】

```java
TuyaShareApi.getReceivedShareInfo({ memberId }).then((data) => {}).catch((error) => {});

```
#### (7) 邀请分享

##### 【描述】

可分享给未注册用户

##### 【方法调用】

```java

 @param devId       分享的设备id
 @param userAccount 账户
 @param countryCode 手机区号码,例如中国是“86”
TuyaShareApi.inviteShare({ devId, userAccount, countryCode })

```

##### 【代码范例】

```java

TuyaShareApi.inviteShare({ devId, userAccount, countryCode }).then((data) => {}).catch((error) => {});

```

#### (8) 邀请分享确认

##### 【描述】

可分享给未注册用户

##### 【方法调用】

```java

@param shareId  分享id 从邀请分享接口那里可获取该参数
TuyaShareApi.confirmShareInviteShare({ shareId })
```

##### 【代码范例】

```java
TuyaShareApi.confirmShareInviteShare({ shareId }).then((data) => {}).catch((error) => {});

```


### 移除分享

#### (1)删除共享关系
##### 【描述】
分享者通过memberId 删除与这个关系用户的所有共享关系（用户维度删除）
##### 【方法调用】

```java
@param memberId 用户成员Id 从SharedUserInfoBean中获取
TuyaShareApi.removeUserShare({ memberId })
```
##### 【代码范例】

```java
TuyaShareApi.removeUserShare({ memberId }).then((data) => {}).catch((error) => {});

```

#### (2)删除收到的共享关系
##### 【描述】
被分享者通过memberId 删除与这个关系用户的所有共享关系（用户维度删除）
##### 【方法调用】

```java
@param memberId 用户成员Id 从SharedUserInfoBean中获取
TuyaShareApi.removeReceivedUserShare({ memberId })
```
##### 【代码范例】

```java
TuyaShareApi.removeReceivedUserShare({ memberId }).then((data) => {}).catch((error) => {});

```

#### (3)删除某个设备共享
##### 【描述】
分享者删除指定关系用户下的某个共享的设备
##### 【方法调用】

```java
@param devId 设备Id
@param memberId 用户成员Id 从SharedUserInfoBean中获取
TuyaShareApi.disableDevShare({devId,memberId})
```
##### 【代码范例】

```java
TuyaShareApi.disableDevShare({devId,memberId}).then((data) => {}).catch((error) => {});

```

#### (4)移除收到的分享设备
##### 【描述】
被分享者删除某个共享的设备
##### 【方法调用】

```java
@param devId 设备Id
TuyaShareApi.removeReceivedDevShare({devId})
```
##### 【代码范例】

```java
TuyaShareApi.removeReceivedDevShare({devId}).then((data) => {}).catch((error) => {});

```

### 修改备注名

#### (1)修改发出的分享人的备注名
##### 【描述】

分享者修改发出的分享人的备注名.即你收到其他用户分享给你的设备，可以修改他们的备注名.(发出的分享)
##### 【代码调用】

```java
* @param memberId     用户成员Id 从SharedUserInfoBean中获取
* @param name   			  要修改的备注名
TuyaShareApi.renameShareNickname({ memberId, name});
```
##### 【代码范例】

```java
TuyaShareApi.renameShareNickname({ memberId, name}).then((data) => {}).catch((error) => {});

```

#### (2)修改接收到的分享人的备注名
##### 【描述】

分享者修改接收到的分享人的备注名.即你分享设备给其他人，可以修改他们的备注名.（接收到的分享）
##### 【方法调用】

```  java
* @param memberId     用户成员Id 从SharedUserInfoBean中获取
* @param name    		 要修改的备注名 
TuyaShareApi.renameReceivedShareNickname({ memberId, name})
```
##### 【代码范例】

```java
TuyaShareApi.renameReceivedShareNickname({ memberId, name}).then((data) => {}).catch((error) => {});

```

---
## 定时任务

涂鸦智能提供了基本的定时能力，支持设备（包括WiFi设备，蓝牙mesh子设备，zigbee子设备）和群组。并封装了针对设备dp点的定时器信息的增删改查接口。APP通过定时接口设置好定时器信息后，硬件模块会自动根据定时要求进行预订的操作。每个定时任务下可以包含多个定时器。如下图所示：
![timer](./images/ios-sdk-timer.jpg)

定时相关的所有方法都在`TuyaTimerApi`中

以下多个接口用到了taskName这个参数，具体可描述为一个分组，一个分组可以有多个定时器。每个定时属于或不属于一个分组，分组目前仅用于展示

### 增加定时器
##### 【 描述】

增加一个定时器
##### 【方法调用】

```java
*  增加定时器 单dp点 默认置为true  支持子设备
*  @param taskName     定时任务名称
*  @param loops        循环次数 "0000000", 每一位 0:关闭,1:开启, 从左至右依次表示: 周日 周一 周二 周三 周四 周五 周六
*  @param devId        设备Id或群组Id
*  @param dps  			dp点id
*  @param time         定时任务下的定时钟
TuyaTimerApi.addTimerWithTask({taskName,loops,devId,dps,time})



```

##### 【代码范例】

```java
TuyaTimerApi.addTimerWithTask({taskName,loops,devId,dps,time}).then((data) => {}).catch((error) => {});

```

### 获取某设备下的所有定时任务状态
##### 【描述】

获取某设备下的所有定时任务状态
##### 【方法调用】

```java
* 获取某设备下的所有定时任务状态
*
* @param devId    设备Id
TuyaTimerApi.getTimerTaskStatusWithDeviceId({devId})
```

##### 【代码范例】

```java
TuyaTimerApi.getTimerTaskStatusWithDeviceId({devId}).then((data) => {}).catch((error) => {});
```
### 控制定时任务中所有定时器的开关状态
##### 【描述】

控制定时任务中所有定时器的开关状态
##### 【方法调用】

```java
* 控制定时任务中所有定时器的开关状态
* @param taskName 定时任务名称
* @param devId    设备Id或群组Id
* @param status   状态值 1表示开关状态开启  0开关状态关闭
TuyaTimerApi.updateTimerTaskStatusWithTask({devId,taskName,status})

```

##### 【代码范例】

```java
TuyaTimerApi.updateTimerTaskStatusWithTask({devId,taskName,status}).then((data) => {}).catch((error) => {});

```

### 控制某个定时器的开关状态
##### 【描述】

控制某个定时器的开关状态
##### 【方法调用】

```java
* 控制某个定时器的开关状态
* @param taskName 定时任务名称
* @param devId    设备Id或群组Id
* @param timerId  定时钟Id
* @param isOpen   开关
 TuyaTimerApi.updateTimerStatusWithTask({taskName,devId,timeId,isOpen})
```

##### 【代码范例】

```java
 TuyaTimerApi.updateTimerStatusWithTask({taskName,devId,timeId,isOpen}).then((data) => {}).catch((error) => {});
```

### 删除定时器
##### 【描述】

删除定时器
##### 【方法调用】

```java
* 删除定时器
* @param taskName 定时任务名称
* @param devId    设备Id或群组Id
* @param timerId  定时钟Id
TuyaTimerApi.removeTimerWithTask({taskName,devId,timeId})

```

##### 【代码范例】

```java
TuyaTimerApi.removeTimerWithTask({taskName,devId,timeId}).then((data) => {}).catch((error) => {});
```
### 更新定时器的状态
##### 【描述】

更新定时器的状态 该接口可以修改一个定时器的所有属性。
##### 【方法调用】

```java
* 更新定时器的状态
* @param taskName 定时任务名称
* @param loops    循环次数 如每周每天传”1111111”
* @param devId    设备Id或群组Id
* @param timerId  定时钟Id
* @param dpId     dp点id
* @param time     定时时间
* @param isOpen	  是否开启 
 TuyaTimerApi.updateTimerWithTask({taskName,loops,devId, dpId,isOpen,timeId,time,})


/**
 * 更新定时器的状态
 * @param taskName 定时任务名称
 * @param devId    设备Id或群组id
 * @param timerId  定时钟Id
 * @param loops    循环次数
 * @param instruct 定时dp点数据,只支持单dp点 json格式 如:   [{
 *                 "time": "20:00",
 *                 "dps": {
 *                 "1": true
 *                 }]
 */
TuyaTimerApi.updateTimerWithTaskAndInstruct({taskName,loops,devId,timeId,instruct,time,})

```


### 获取定时任务下所有定时器
##### 【描述】

获取定时任务下所有定时器
##### 【方法调用】

```java
* 获取定时任务下所有定时器
* @param taskName 定时任务名称
* @param devId    设备Id或群组Id
TuyaTimerApi.getTimerWithTask({devId,taskName})
```

##### 【代码范例】

```java
TuyaTimerApi.getTimerWithTask({devId,taskName}).then((data) => {}).catch((error) => {});
```
### 获取设备所有定时任务下所有定时器
##### 【描述】

获取设备所有定时任务下所有定时器
##### 【方法调用】

```java
* 获取设备所有定时任务下所有定时器
* @param devId    设备Id或群组Id
TuyaTimerApi.getAllTimerWithDeviceId({ devId })
```

##### 【代码范例】

```java
TuyaTimerApi.getAllTimerWithDeviceId({ devId }).then((data) => {}).catch((error) => {});

```

## 群组管理
涂鸦云支持群组管理体系：可以创建群组，修改群组名称，管理群组设备，通过群组管理多个设备，解散群组。


### 创建群组
##### 【描述】

涂鸦智能提供一些设备群组控制的接口。这里的群组控制是指WiFi群组，目前只有群控的功能。群组功能默认关闭，如果需要开通群组功能，联系我们业务人员


##### 【注意事项】

群组默认不支持创建，如果你的产品需要这个功能，那么请联系我们对产品进行开启这项功能。


### 群组列表获取
##### 【描述】
此接口主要是从云端拉取最新群组列表。

##### 【代码范例】

```java
//云端获取群组列表
TuyaHomeApi.queryDeviceListToAddGroup({homeId,groupId,productId }).then(data => { }).catch((error) => {})
```
### 群组操作
##### 【描述】
涂鸦智能群组操作，主要是基于对主设备的操作，主设备是指当前群组在线的第一个设备。在线和离线状态、数据上报都是依赖于主设备的变更。发送控制命令是面对群组的所有设备。



#### (1) 解散群组
##### 【描述】
解散群组
##### 【方法调用】

```java
* 解散群组
* @param groupId    群组id
* @param callback 回调
TuyaHomeApi.dismissGroup({groupId})
```

#### (2) 群组回调事件
##### 【描述】
群组回调事件
##### 【方法调用】

```java
* 注册群组回调事件
TuyaGroupApi.registerGroupListener({groupId},()=>{
    console.log("onDpUpdate")
},()=>{
    console.log("onGroupInfoUpdate")
},()=>{
    console.log("onGroupRemoved")
});

* 注销群组回调事件
TuyaGroupApi.unregisterGroupListener({groupId});
```

#### （3）发送群组控制命令
##### 【描述】
发送群组控制命令
##### 【方法调用】

```java
* 发送群组控制命令
* @param command 控制命令
* @param listener 回调
TuyaGroupApi.publishDps({groupId,command);

```

##### 【注意事项】

群组的发送命令返回结果，是指发送给云端成功，并不是指实际控制设备成功。 



#### （4）群组数据获取
##### 【描述】
本地获取群组数据，需要初始化Home（调用getHomeDetail()或者getHomeLocalCache）之后,才能取到数据
##### 【方法调用】

```java
* 本地获取群组数据bean
* @param groupId 群组id
* @return GroupBean  群组数据类
TuyaHomeDataManagerApi.getGroupBean({groupId})
* 本地获取群组数据列表
* @return  List<GroupBean>  群组列表
 TuyaHomeDataManagerApi.getGroupDeviceList({groupId})
```



## 智能
### 简介
智能分为场景和自动化。场景是用户添加动作，手动触发；自动化是由用户设定条件，当条件触发后自动执行设定的动作。


涂鸦智能Android SDK中，智能包括场景和自动化的统一管理接口`TuyaSceneApi`，独立操作接口需要用场景id初始化，场景id可以在[获取场景列表接口](###10.1)的返回结果中获取。


<strong>以下文档中手动场景和自动化场景简称为场景。</strong>


### 获取场景列表
##### 【方法原型】

```java
/**
 * 获取场景列表
 * @param homeId 家庭Id
 */
TuyaSceneApi.getSceneList({ homeId})
```

其中，`SceneBean`的接口定义如下

```java

/**
 *  获取场景id
 * @return 场景id
 */
public String getId()

/**
 *  获取场景名称
 * @return 场景名称
 */
public String getName()

/**
 *  获取场景条件 
 * @return 场景条件
 */
public List<SceneCondition> getConditions()


/**
 *  获取场景任务
 * @return 场景任务
 */
public List<SceneTask> getActions()
    
```

##### 【代码范例】

```java
TuyaSceneApi.getSceneList({ homeId}).then((data) => {}).catch((error) => {});

```


### 自动化条件

用户可设置的条件包括天气状况、设备状况、定时。
​	
​	
- 天气型
	
	天气条件包括温度、湿度、天气、PM2.5、空气质量、日出日落， 可自由选定城市。根据用户账号中设备的不同，可选择的天气条件也不同。

    ```java
    
    /**
     * 创建天气型条件
     *
     * @param place 天气城市 
     * @param type  条件类型
     * @param rule  条件规则
     * @return
     */
    TuyaSceneApi.createWeatherCondition({place,ruleType, type,range,value})
    ```

    注: PlaceFacadeBean类对象请从[获取城市列表](####10.2.4),[根据经纬度获取城市](####10.2.6), [根据城市id获取城市](####10.2.5)接口获取。
  ​      目前获取城市接口只支持国内。
	
- 设备型
	
	设备条件是指当一个设备处于某种状态时，会触发另一台或多台设备的预定任务。<strong>为了避免循环控制，同一台设备无法同时作为条件和任务。</strong>

    ```java
    /**
     * 创建设备型条件
     *
     * @param devBean 条件设备
     * @param dpId    条件dpId
     * @param rule    条件规则
     * @return
     */
    TuyaSceneApi.createDevCondition({deviceBean,dpId,ruleType, type,range,value})
    ```

    注: SceneDevBean类对象请从[获取条件设备列表](####10.2.2)接口获取。
  
- 定时

   定时指到达指定时间执行预定任务  

   ```java
   /**
     * 创建定时条件
     * @param display 用于展示的用户选定的时间条件
     * @param name  定时条件的名称
     * @param type  条件类型
     * @param rule  条件规则
     * @return
     */
     TuyaSceneApi.createTimerCondition({display,name,ruleType,type,timezoneId,loops,time,data})
   
   ```

rule-条件规则有四种规则:
​	
- 数值型
	
	以温度为例，数值型条件的最终表达式为"temp > 20"的格式。您可以从获取条件列表接口获得目前支持的温度最大值、最小值、粒度（步进)，您可以从获取条件列表获取支持的温度等。
	

    
	
- 枚举型
	
	以天气状况为例, 枚举型条件的最终表达式为"condition == rainy"的格式，您可以从获取条件列表接口获得目前支持的天气状况，包括每种天气状况的code和名称。
	
- 布尔型

    布尔型常见于设备型条件, 最终表达式为"dp1 == true"的格式, 您需要调用获取条件设备列表接口获取支持配置智能场景的设备， 然后根据设备id查询该设备可支持的操作，详见获取设备支持的操作。
    例:
    


#### 获取条件列表
##### 【接口描述】
获取当前用户支持配置的条件的列表，通常用于添加或修改条件的第一步。
##### 【方法原型】
```java
/**
 * 获取条件列表
 * @param showFahrenheit 是否显示华氏度
 */
TuyaSceneApi.getConditionList({ showFahrenheit})
```

其中， `ConditionListBean`提供的接口为

```java
/**
 * 获取条件类别
 *
 * @return 类别 [1]
 */
public String getType() {
    return type;
}·

/**
 * 获取条件名称
 *
 * @return 名称
 */
public String getName() {
    return name;
}

/**
 * 获取Property [2]
 *
 * @return Property 
 */
public IProperty getProperty() {
    return property;
} 
```

<strong>注:</strong>

1. 目前支持的天气条件类别及其名称和Property类型

    名称|Type|Property Type
    -|-|-
    温度|Temp|ValueProperty
    湿度|humidity|EnumProperty
    天气|condition|EnumProperty
    PM2.5|pm25|EnumProperty
    空气质量|aqi|EnumProperty
    日出日落|sunsetrise|EnumProperty
    定时|timer|TimerProperty

2. Property是涂鸦智能中一种常用的数据结构，可以用来控制设备和其他功能。目前提供四种Property: 数值型，枚举型，布尔型和用于定时的类型(与条件中的数值型，枚举型，布尔型相对应), 每种Property提供不同的访问接口。详见前文规则介绍处。


##### 【代码范例】
```java
TuyaHomeApi.getConditionList({ showFahrenheit}).then(data => { }).catch((error) => {})
```

####  获取条件设备列表
##### 【描述】
获取可用于条件设置的设备列表。
##### 【方法原型】
```java
/**
 * 获取条件中的可选设备列表
 * @param homeId 家庭的id
 * @param callback 回调
 */
TuyaSceneApi.getConditionDevList({ homeId })
```
##### 【代码范例】
```java
TuyaSceneApi.getConditionDevList({ homeId }).then(data => { }).catch((error) => {})

```

#### 根据设备id获取设备任务
##### 【描述】
用于获取在选择设备具体的触发条件时， 可选择的任务。
##### 【方法原型】
```java
  /**
     * 获取设备支持的任务条件列表
     *
     * @param devId    设备id
     */
TuyaSceneApi.getDeviceConditionOperationList({ devId })
```
其中, `TaskListBean`提供以下接口:

```java

/**
 *  获取dp点名称， 用于界面展示
 *
 * @return dp点名称
 */
public String getName() {
    return name;
}

/**
 *  获取dpId
 *
 * @return dpId
 */
public long getDpId() {
    return dpId;
}

/**
 *  获取该dp点可配置的操作
 *
 *   格式:
 *     {
 *       {true, "已开启"},
 *       {false, "已关闭"}
 *     }
 *
 * @return 
 */
public HashMap<Object, String> getTasks() {
    return tasks;
}
/**
 *  获取该条件的类型bool、value、enum等
 */
public String getType() {
    return type;
}
```
##### 【代码范例】
```java
TuyaSceneApi.getDeviceConditionOperationList({ devId }).then(data => { }).catch((error) => {})

```

####  获取城市列表
##### 【描述】
用于在创建天气条件时，选择城市。
注： 目前城市列表暂时仅支持中国。
##### 【方法原型】
```java
/**
 * 根据国家码获取城市列表
 *
 * @param countryCode 国家码
 */
TuyaSceneApi.getCityListByCountryCode({ countryCode })
```

其中, `PlaceFacadeBean`类提供以下接口:

```java
/**
 * 获取区域名称
 *
 * @return 区域名称
 */
public String getArea() {
    return area;
}

/**
 * 获取省份名称
 *
 * @return 省份名称
 */
public String getProvince() {
    return province;
}

/**
 * 获取城市名称
 *
 * @return 城市名称
 */
public String getCity() {
    return city;
}

/**
 * 获取城市id
 *
 * @return 城市id
 */
public long getCityId() {
    return cityId;
}
```
##### 【代码范例】
```java
TuyaSceneApi.getCityListByCountryCode({ countryCode }).then(data=>{})
```

#### 根据城市id获取城市信息
##### 【描述】
根据城市id获取城市信息， 用于展示已有的天气条件。城市id可以在获取城市列表接口中获取。
##### 【方法原型】
```java
/**
 * 根据城市id获取城市信息
 *
 * @param cityId   城市id{@link PlaceFacadeBean}
 * @param callback 回调
 */
TuyaSceneApi.getCityByCityIndex({cityId })
```
#### 【代码范例】
```java
TuyaSceneApi.getCityByCityIndex({cityId }).then(data=>{})

```

#### 根据经纬度获取城市信息
##### 【描述】
根据经纬度获取城市信息， 用于展示已有的天气条件。
##### 【方法原型】
```java
/**
 * 根据经纬度获取城市信息
 *
 * @param lon      经度
 * @param lat      纬度
 * @param callback 回调
 */
TuyaSceneApi.getCityByLatLng({lon,lat})
```
##### 【代码范例】
```java
TuyaSceneApi.getCityByLatLng({lon,lat}).then(data=>{})

```


### 场景动作
场景动作指当条件触发时执行的控制设备动作。手动场景可执行的动作包含自动化场景和智能设备，自动化场景可执行的动作包含手动场景、其他自动化场景和智能设备。用户可设定的任务视用户的设备而定，请注意，并不是每一款产品都支持场景。
#### 创建动作
##### 【描述】
用于创建场景动作。
##### 【方法原型】
```java
/**
 * 创建场景动作
 *
 * @param devId 设备id
 * @param tasks 要执行的任务 格式: { dpId: dp点值 }
 *                          例：
 *                          {
 *                              "1": true,
 *                          }
 * @return 场景动作
 */
TuyaSceneApi.createDpTask({devId,tasks})
```
##### 【代码范例】
```java
  TuyaSceneApi.createDpTask({
                devId,
                tasks: {
                 dpId,
                 value,
                 devId,
                 devName
                 dpName,
                }
              }).then(d => {})
```
#### 获取执行动作支持的设备列表
##### 【描述】
获取支持场景动作的设备列表， 用于选择添加到要执行的动作中。
##### 【方法原型】
```java
/**
 * 获取动作中的可选设备列表
 * @param homeId 家庭id
 */
  TuyaSceneApi.getTaskDevList({homeId})
```

其中， `DeviceBean `提供以下接口:

```java

/**
 *  获取设备名称
 * 
 * @return 设备名称
 */
public String getName() {
    return name;
}

/**
 *  产品id
 * 
 * @return 产品id
 */
public String getProductId() {
    return productId;
}

/**
 *  获取设备id
 * 
 * @return 设备id
 */
public String getDevId() {
    return devId;
}

/**
 *  获取设备图标
 * 
 * @return 图标地址
 */
public String getIconUrl() {
     return iconUrl;
 }
```
##### 【代码范例】
```java
  TuyaSceneApi.getTaskDevList({homeId}).then(d => {})
```

#### 根据设备id获取可执行的动作
##### 【描述】
用于在创建动作时， 获取设备可执行的任务。设备id可以从[获取执行动作支持的设备列表](####10.3.1)获取
##### 【方法原型】
```java
/**
* 获取设备可以执行的操作
*
* @param devId    设备id
*/
 TuyaSceneApi.getDeviceTaskOperationList({devId})
```
其中, `TaskListBean`提供以下接口:

```java
/**
 *  获取dp点名称， 用于界面展示
 *
 * @return dp点名称
 */
public String getName() {
    return name;
}

/**
 *  获取dpId
 *
 * @return dpId
 */
public long getDpId() {
    return dpId;
}

/**
 *  获取该dp点可配置的操作
 *
 *   格式:
 *     {
 *       {true, "已开启"},
 *       {false, "已关闭"}
 *     }
 *
 * @return 
 */
public HashMap<Object, String> getTasks() {
    return tasks;
}
/**
 *  获取该条件的类型bool、value、enum等
 */
public String getType() {
    return type;
}

```
##### 【代码范例】
```java
 TuyaSceneApi.getDeviceTaskOperationList({devId}).then((data)=>{})
```


### 创建场景
##### 【描述】
用于将条件和动作组装成场景并创建新的场景， 成功后会返回场景数据。
两种创建方法，唯一区别是否含有stickyOnTop参数
##### 【方法原型】
```java
/**
 * 创建场景
 *
 * @param homeId	  家庭id
 * @param name       场景名称
 * @param stickyOnTop 是否显示在首页
 * @param conditions 场景触发条件 {@link SceneCondition}
 * @param tasks      场景执行任务 {@link SceneTask}
 * @param matchType  场景条件与或关系  SceneBean.MATCH_TYPE_OR 表示满足任意条件执行，默认值；SceneBean.MATCH_TYPE_AND 表示满足所有条件
 */
TuyaSceneApi.createScene({homeId,name, stickyOnTop,background,matchType,tasks,conditionList})
```

##### 【代码范例】
```java
TuyaSceneApi.createScene({homeId,name, stickyOnTop,background,matchType,tasks,conditionList}).then(data=>{})
```

### 10.5 修改场景
##### 【描述】
用于修改场景， 成功后会返回新的场景数据。
##### 【方法原型】
```java
/**
 *  修改场景
 * 
 * @param sceneReqBean 场景数据类
 */
  TuyaSceneApi.modifyScene({sceneBean,sceneId}) 
```


### 执行场景
##### 【描述】
用于执行手动场景。
##### 【方法原型】
```java
/**
 * 执行场景动作
 *
 */
TuyaSceneApi.executeScene({ sceneId })
```


### 删除场景
##### 【描述】
用于删除场景。
##### 【方法原型】
```java
/**
 * 删除场景
 *
 * @param callback 回调
 */
TuyaSceneApi.deleteScene({ sceneId })
```


### 开启关闭自动化场景
##### 【描述】
用于开启或关闭自动化场景
##### 【方法原型】
```java
/**
 * 开启自动化场景
 * @param sceneId  
 */
TuyaSceneApi.enableScene({ sceneId })

```
```java
/**
 * 关闭自动化场景
 * @param sceneId  
 */
TuyaSceneApi.disableScene({ sceneId })

```
##### 【代码范例】
```java
 TuyaSceneApi.enableScene({ sceneId }).then((data)=>{})

 TuyaSceneApi.disableScene({ sceneId }).then((data)=>{})

```
### 场景排序
##### 【描述】
手动场景或自动化场景排序。注意：只能单独对手动场景或自动化场景排序，不能混排。
##### 【方法原型】
```java
/**
 * 场景排序
 * @param homeId 家庭id
 * @param sceneIds 手动场景或自动化场景已排序好的的id列表
 * @param callback    回调
 */
 TuyaSceneApi.sortSceneList({homeId,sceneIds})
```
##### 【代码范例】
```java
 TuyaSceneApi.sortSceneList({homeId,sceneIds}).then((data)=>{})

```


## 消息中心

### 获取消息列表
##### 【描述】
用于获取全部消息列表。
##### 【方法原型】
```java
/**
 *  获取消息列表
 *
 * @param callback 回调
 */
TuyaMessageApi.getMessageList();
```
其中， `MessageBean`提供以下接口：

```java
/**
 * 获取日期和时间 格式: 2017-09-08 17:12:45
 *
 * @return 日期和时间
 */
public String getDateTime() {
    return dateTime;
}

/**
 * 获取消息图标URL
 *
 * @return 消息图标URL
 */
public String getIcon() {
    return icon;
}

/**
 * 获取消息类型名称(如果是告警类型消息则为dp点名称)
 *
 * @return 消息类型名称
 */
public String getMsgTypeContent() {
    return msgTypeContent;
}

/**
 *  获取消息内容, 可用于界面展示
 *
 * @return 消息内容
 */
public String getMsgContent() {
    return msgContent;
}

/**
 * 获取消息类型
 * 0: 系统消息
 * 1: 有新的设备
 * 2: 有新的好友
 * 4: 设备告警
 *
 * @return 消息类型
 */
public int getMsgType() {
    return msgType;
}

/**
 * 获取设备id
 * 注： 只有告警类型消息才会有该字段
 *
 * @return 设备ID
 */
public String getMsgSrcId() {
    return msgSrcId;
}

/**
 *  获取消息id
 *
 * @return 消息id
 */
public String getId() {
    return id;
}
```
##### 【代码范例】
```java
TuyaMessageApi.getMessageList().then(data=>{})
```

### 删除消息
##### 【描述】
用于批量删除消息。
##### 【方法原型】
```java
/**
 *  删除消息
 *
 * @param mIds 要删除的消息的id列表
 * @param callback 回调
 */
TuyaMessageApi.deleteMessage({ids})
```
##### 【代码范例】
```java
TuyaMessageApi.getMessageList(ids:[]).then(data=>{})

```


## 意见反馈

用于在用户和企业或开发者之间提供一种沟通通道。

### 获取反馈列表
#### 【描述】
获取该用户所有的反馈。

##### 【方法原型】
```java
/**
 * 获取反馈列表
 *
 */
TuyaFeedBackApi.getFeedbackList()
```

其中， `FeedbackTalkBean`类提供以下接口:

```java
/**
 * 获取日期和时间 格式: 2018-06-08 17:12:45
 * 
 * @return 日期和时间
 */
public String getDateTime() {
    return dateTime;
}

/**
 *  获取最新一条反馈内容, 用于显示在列表中
 *
 * @return 反馈内容
 */ 
public String getContent() {
    return content;
}

/**
 *  获取反馈类目id
 *
 * @return 反馈类目id
 */
public String getHdId() {
    return hdId;
}

/**
 * 获取反馈类型
 * 2: 设备故障
 * 7: 其他
 *
 * @return 反馈类型
 */
public int getHdType() {
    return hdType;
}

/**
 *  获取反馈类目标题(如果为设备故障反馈即设备名称)
 *
 * @return 类目标题
 */
public String getTitle() {
    return title;
}
```

##### 【代码范例】
```java
TuyaFeedBackApi.getFeedbackList().then(data=>{})
```
### 获取反馈类型列表
##### 【描述】
获取可选择的反馈类型列表，用于创建反馈之前选择。

##### 【方法原型】
```java
/**
 * 获取反馈类型列表
 *
 * @param callback 回调
 */
TuyaFeedBackApi.getFeedbackType()
```
其中, `FeedbackTypeRespBean`类提供以下接口:

```java
/**
 * 获取反馈类型列表(设备列表和其他列表)
 *
 * @return 类型列表
 */
public ArrayList<FeedbackTypeBean> getList() {
    return list;
}

/**
 *  获取列表类别(目前仅有设备和其他)
 * 
 * @return 列表类别
 */
public String getType() {
    return type;
}
```

`FeedbackTypeBean`类提供以下接口:

```java
/**
 *  获取反馈类型id
 *
 * @return 反馈类型id
 */
public String getHdId() {
    return hdId;
}

/**
 * 获取反馈类型
 * 2: 设备故障
 * 7: 其他
 *
 * @return 反馈类型
 */
public int getHdType() {
    return hdType;
}

/**
 *  获取反馈类型标题(如果为设备故障反馈即设备名称)
 *
 * @return 类型标题
 */
public String getTitle() {
    return title;
}
```
##### 【代码范例】
```java
TuyaFeedBackApi.getFeedbackType().then(data=>{})
```
###  新增反馈
##### 【描述】
新增一条反馈信息。
##### 【方法原型】
```java
/**
 * 添加反馈
 *
 * @param message  反馈内容
 * @param contact  联系方式（电话或邮箱）
 * @param hdId     反馈类目id
 * @param hdType   反馈类型
 */
 TuyaFeedBackApi.addFeedback({
     message, // 反馈内容
     contact, // 联系方式（电话或邮箱）
     hdId, // 反馈类目id
     hdType, // 反馈类型
     })
```
注 `hdId`, `hdType`变量可以从[获取反馈类型列表]()接口返回的`FeedbackTypeBean`类中获取。
##### 【代码范例】
```java
 TuyaFeedBackApi.addFeedback({
     message: '哈哈', // 反馈内容
     contact: '123123123', // 联系方式（电话或邮箱）
     hdId: '6c03b81fade341ad12bezz', // 反馈类目id
     hdType: 2, // 反馈类型
     })
```

####  获取反馈消息列表
##### 【描述】
用于获取当前反馈话题（会话场景）的消息列表。

##### 【方法原型】
```java
/**
 * 获取反馈消息列表
 *
 *  @param callback 回调
 */
TuyaFeedBackApi.getMsgList({
    hdId, // 反馈类目id
    hdType, // 反馈类型
    })
```
其中, `FeedbackMsgBean`提供以下接口:

```java
/**
 *  获取消息内容
 * 
 * @return 消息内容
 */
public String getContent() {
    return content;
}

/**
 *  获取消息时间
 *
 * @return 消息时间
 */
public int getCtime() {
    return ctime;
}
/**
 * 区分用户和后台发送的消息
 * 0代表用户
 */
public int getType() {
    return type;
}
```
##### 【代码范例】
```java
TuyaFeedBackApi.getMsgList({
    hdId, // 反馈类目id
    hdType, // 反馈类型
    }).then(data=>{})
```
####  添加新反馈
##### 【描述】
用于在当前对话中添加新的反馈消息。
##### 【方法原型】
```java
/**
 * 添加新反馈
 *
 * @param msg      反馈内容
 * @param contact  联系方式
 */
 TuyaFeedBackApi.addMsg({
    message,
    contact, // 联系方式（电话或邮箱）
    hdId, // 反馈类目id
    hdType, // 反馈类型
    })
```
##### 【代码范例】
```java
TuyaFeedBackApi.addMsg({
     message: 'hahahaah', // 反馈内容
     contact: '123123123', // 联系方式（电话或邮箱）
     hdId: '6c03b81fade341ad12bezz', // 反馈类目id
     hdType: 2, // 反馈类型
     }).then(data => { })
```

## 集成Push
基于Tuya SDK开发的app，Tuya平台支持Push功能，支持给用户发送运营Push和产品的告警Push。



###  Push涂鸦云注册
将aliasId注册到涂鸦云

```java
* @param aliasId   用户别名 为第二步向友盟注册用户别名的alias
* @param pushProvider   注册push的类别  友盟填"umeng"
TuyaPushApi.registerDevice({
    aliasId:'',
    pushProvider:''
    })
```

###  第三方通道设置
如果使用了友盟第三方通道，弹窗的activity必须命名为SpecialPushActivity.
![push](images/push_mi.png)
以小米为例，SpecialPushActivity继承自UmengNotifyClickActivity，并且完整的包名路径为`com.activity.SpecialPushActivity`.

###  Push消息接收
继承 UmengMessageService, 实现自己的Service来完全控制达到消息的处理，参考友盟文档

```java
public class MyPushIntentService extends UmengMessageService {
    @Override
    public void onMessage(Context context, Intent intent) {
        try {
            String message = intent.getStringExtra(AgooConstants.MESSAGE_BODY);
            UMessage msg = new UMessage(new JSONObject(message);
            UmLog.d(TAG, "message=" + message);      //消息体
            UmLog.d(TAG, "custom=" + msg.custom);    //自定义消息的内容
            UmLog.d(TAG, "title=" + msg.title);      //通知标题
            UmLog.d(TAG, "text=" + msg.text);        //通知内容
            
            PushBean pushBean=PushBean.formatMessage(msg.custom)

        } catch (Exception e) {
            L.e(TAG, e.toString());
        }
}
```

##### 【说明】

- msg.custom中的内容就是收到的推送信息

- msg.custom的具体协议格式：
		custom=tuya://message?a=view&ct=${title}&cc=${content}&p={}&link=tuyaSmart%3A%2F%2Fbrowser%3Furl%3Dhttp%253A%252F%252Fwww.baidu.com;

- 通过PushBean.formatMessage()来对数据进行解析得到PushBean



###  发送Push

#### 新增运营Push

涂鸦开发者平台 - 用户运营 - 消息中心 - 新增消息

#### 新增告警Push

涂鸦开发者平台 - 对应产品 - 扩展功能 - 告警设置 - 新增告警规则(应用推送方式)


###  集成FCM Push
对于国外的用户，需要集成Google的FCM推送服务。先参照官方文档 [将 Firebase 添加到您的 Android 项目](https://firebase.google.com/docs/android/setup?hl=zh-cn),之后配置客户端，参考 [Android客户端配置Firebase](https://firebase.google.com/docs/cloud-messaging/android/client?hl=zh-cn)

###  将注册令牌注册到涂鸦云
在继承`FirebaseInstanceIdService`类的`onTokenRefresh`方法监控注册令牌的生成，并将令牌注册到涂鸦云。

```java
* @param aliasId   用户别名 即fcm生成的token
* @param pushProvider   注册push的类别  fcm填"gcm"
		
TuyaPushApi.registerDevice({
    aliasId:'',
    pushProvider:''
    })
```




## 网关

网关类封装了ZigBee网关的相关操作，包括控制，查询子设备，监听子设备状态等。
可以通过TuyaGatewayApi。

```

TuyaGatewayApi{
    /**
     * 发送命令
     *
     * @param dps
     */
    TuyaGatewayApi.publishDps({devId,localId,dps})
    /**
     * 广播控制设备
     *
     * @param dps
     */
     TuyaGatewayApi.broadcastDps({devId,dps})
    /**
     * 组播控制设备
     *
     * @param localId
     * @param dps
     * @param callback
     */
     TuyaGatewayApi.multicastDps({localId,devId,dps);

    /**
     * 获取网关子设备
     *
     * @param callback
     */
     TuyaHomeDataManagerApi.getSubDevList({devId})
    /**
     * 注册子设备信息变更
     *
     * @param listener
     */
    TuyaGatewayApi.registerSubDevListener({ devId },()=>{
        console.log('onSubDevDpUpdate')
    },()=>{
        console.log('onSubDevRemoved')
    },()=>{
        console.log('onSubDevAdded')
    },()=>{
        console.log('onSubDevInfoUpdate')
    },()=>{
        console.log('onSubDevStatusChanged')
    })

    /**
     * 注销子设备信息变更
     */
     TuyaGatewayApi.unRegisterSubDevListener({devId})
```

---
