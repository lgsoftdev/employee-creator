package com.lgsoftdev.javaemployeecreator.config;

import com.lgsoftdev.javaemployeecreator.entity.*;
import com.lgsoftdev.javaemployeecreator.utils.Helper;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.support.lob.TemporaryLobCreator;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = { HttpMethod.DELETE };
        config.exposeIdsFor(Employee.class);
        config.exposeIdsFor(EmployeeContactDetail.class);
        config.exposeIdsFor(EmployeeStatus.class);
        config.exposeIdsFor(ContractType.class);
        config.exposeIdsFor(WorkType.class);
        config.exposeIdsFor(EmployeeCard.class);
        disableHttpMethods(Employee.class, config, unsupportedActions);

        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(Helper.corsAllowedOrigins);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions ){
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(unsupportedActions)))
                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(unsupportedActions)));
    }
}
