package com.tuya.smart.rnsdk.utils;

import com.facebook.react.bridge.ReadableMap;

import java.util.List;

public class ReactParamsCheck {

    public static Boolean checkParams(List<String> keys, ReadableMap params) {
        for (int i = 0; i < keys.size(); i++) {
            if (!params.hasKey(keys.get(i))) {
                throw new IllegalArgumentException("need key"+keys.get(i));
            }
        }
        return true;
    }
}
