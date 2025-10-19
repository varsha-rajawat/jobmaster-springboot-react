
package com.jobmaster.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeAnalysisRequestDTO {
	private MultipartFile resume;
	private String jobDescription;
}
