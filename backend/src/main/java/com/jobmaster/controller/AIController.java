package com.jobmaster.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobmaster.dto.ResumeAnalysisRequestDTO;
import com.jobmaster.service.AIAnalysisService;

@RestController
@RequestMapping("/ai")
public class AIController {

	@Autowired
    private AIAnalysisService aiAnalysisService;
	
	@PostMapping("/analyze")
	public Map<String, Object> analyzeResume(@ModelAttribute ResumeAnalysisRequestDTO request) throws IOException {
	    return aiAnalysisService.analyzeResumeAndJD(request.getResume(), request.getJobDescription());
	}

	
}
