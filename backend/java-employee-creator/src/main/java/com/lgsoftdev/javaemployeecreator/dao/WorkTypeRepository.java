package com.lgsoftdev.javaemployeecreator.dao;

import com.lgsoftdev.javaemployeecreator.entity.WorkType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkTypeRepository extends JpaRepository<WorkType, Integer> {
}
