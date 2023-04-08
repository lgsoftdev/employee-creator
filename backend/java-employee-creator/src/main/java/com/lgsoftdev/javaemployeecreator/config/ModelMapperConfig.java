package com.lgsoftdev.javaemployeecreator.config;

import com.lgsoftdev.javaemployeecreator.utils.StringTrimConvertor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.typeMap(String.class, String.class).setConverter(new StringTrimConvertor());
        mapper.getConfiguration();
        return mapper;
    }
}
