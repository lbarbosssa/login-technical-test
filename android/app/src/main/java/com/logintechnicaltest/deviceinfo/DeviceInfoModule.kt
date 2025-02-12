package com.logintechnicaltest.deviceinfo

import com.facebook.react.bridge.*
import android.os.Build

class DeviceInfoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "DeviceInfoModule"
    }

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun getManufacturer(callback: Callback) {
        try {
            val manufacturer = Build.MANUFACTURER
            callback.invoke(null, manufacturer)
        } catch (e: Exception) {
            callback.invoke(e.message, null)
        }
    }
}