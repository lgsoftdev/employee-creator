package com.lgsoftdev.javaemployeecreator.utils;

import org.springframework.beans.factory.annotation.Value;

public class Helper {
    public static final String corsAllowedOrigins = "http://localhost:5173";

    public static String getNullIfEmptyString(String value){
        return isBlankString(value) ? null : value.trim();
    }

    public static boolean isBlankString(String value) {
        return value == null || value.isBlank();
    }
}
