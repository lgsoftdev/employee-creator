package com.lgsoftdev.javaemployeecreator.utils;

import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

public class StringTrimConvertor implements Converter<String, String> {
    @Override
    public String convert(MappingContext<String, String> context) {
        if(context.getSource() == null || context.getSource().trim() == ""){
            return null;
        }

        return context.getSource().trim();
    }
}
