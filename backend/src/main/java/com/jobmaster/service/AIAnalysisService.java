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

	private final AIClient openAIClient;
	
	public AIAnalysisService(AIClient openAIClient) {
        this.openAIClient = openAIClient;
    }
	
	public Map<String, Object> analyzeResumeAndJD(MultipartFile resume, String jobDescription) throws IOException{
		
		String resumeText = extractTextFromPdf(resume);
		
		return openAIClient.getResumeAnalysis(resumeText, jobDescription);
	}

	private String extractTextFromPdf(MultipartFile file) {
	    try (PDDocument document = Loader.loadPDF(file.getBytes())) {
	        PDFTextStripper stripper = new PDFTextStripper();
	        return stripper.getText(document);
	    } catch (IOException e) {
	        throw new RuntimeException("Error extracting text from PDF", e);
	    }
	}
}
