package com.jobmaster.service;

import java.io.IOException;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.Loader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AIAnalysisService {

	private final AIClient aiClient;
	
	public AIAnalysisService(AIClient aiClient) {
        this.aiClient = aiClient;
    }
	
	public Map<String, Object> analyzeResumeAndJD(MultipartFile resume, String resumeText, String jobDescription) throws IOException{
		String resumeContent = "";
	    if (resume != null && !resume.isEmpty()) {
	        resumeContent = extractTextFromPdf(resume);
	    } else if (resumeText != null && !resumeText.isEmpty()) {
	        resumeContent = resumeText;
	    } else {
	        throw new IllegalArgumentException("Resume file or text is required");
	    }
		return aiClient.getResumeAnalysis(resumeContent, jobDescription);
	}

	public String extractTextFromPdf(MultipartFile file) {
	    try (PDDocument document = Loader.loadPDF(file.getBytes())) {
	        PDFTextStripper stripper = new PDFTextStripper();
	        return stripper.getText(document);
	    } catch (IOException e) {
	        throw new RuntimeException("Error extracting text from PDF", e);
	    }
	}
}
