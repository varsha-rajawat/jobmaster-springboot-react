package com.jobmaster.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jobmaster.dto.JobApplicationDTO;
import com.jobmaster.model.JobApplication;
import com.jobmaster.model.User;
import com.jobmaster.repository.JobApplicationRepository;
import com.jobmaster.repository.UserRepository;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository, UserRepository userRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public JobApplicationDTO createJob(JobApplication jobApplication) {
        User user = getCurrentUser();
        jobApplication.setUser(user);
        jobApplication = jobApplicationRepository.save(jobApplication);
        return mapToDTO(jobApplication);
    }

    public List<JobApplicationDTO> getAllJobsForCurrentUser() {
        User user = getCurrentUser();
        return user.getJobApplications().stream().map(this::mapToDTO).collect(Collectors.toList());
    }
    
    public JobApplicationDTO getJobById(Long id) {
        JobApplication jobApplication = getJobByIdForCurrentUser(id);
        return mapToDTO(jobApplication);
    }
     

    public JobApplicationDTO updateJob(Long id, JobApplication updatedJob) {
        JobApplication existingJob = getJobByIdForCurrentUser(id);
        existingJob.setCompanyName(updatedJob.getCompanyName());
        existingJob.setPosition(updatedJob.getPosition());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setStatus(updatedJob.getStatus());
        existingJob.setAppliedDate(updatedJob.getAppliedDate());
        existingJob.setFollowUpDate(updatedJob.getFollowUpDate());
        existingJob.setJobLink(updatedJob.getJobLink());
        existingJob.setNotes(updatedJob.getNotes());
        existingJob = jobApplicationRepository.save(existingJob);
        return mapToDTO(existingJob);
    }

    public void deleteJob(Long id) {
        JobApplication existingJob = getJobByIdForCurrentUser(id);
        jobApplicationRepository.delete(existingJob);
    }
    
    private JobApplicationDTO mapToDTO(JobApplication jobApp) {
        JobApplicationDTO dto = new JobApplicationDTO();
        dto.setId(jobApp.getId());
        dto.setCompanyName(jobApp.getCompanyName());
        dto.setPosition(jobApp.getPosition());
        dto.setLocation(jobApp.getLocation());
        dto.setStatus(jobApp.getStatus());
        dto.setAppliedDate(jobApp.getAppliedDate());
        dto.setFollowUpDate(jobApp.getFollowUpDate());
        dto.setJobLink(jobApp.getJobLink());
        dto.setNotes(jobApp.getNotes());
        dto.setUserId(jobApp.getUser().getId());
        return dto;
    }
    
    private JobApplication getJobByIdForCurrentUser(Long id) {
        User user = getCurrentUser();
        return jobApplicationRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Job not found or unauthorized"));
    }

}
