package com.jobmaster.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobmaster.model.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUserId(Long userId);
}
