package com.jobmaster.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

@Component
public class AIClient {

	@Value("${groq.api.key}")
	private String groqApiKey;

	private static final String API_URL = "https://api.groq.com/openai/v1/chat/completions";

	public Map<String, Object> getResumeAnalysis(String resumeText, String jobDescription) throws IOException {
		OkHttpClient client = new OkHttpClient();

		String prompt = """
				You are an expert recruiter and resume coach. Your goal is to make the candidate get shortlisted for this job.
				Identify missing skills, ATS keywords, and give actionable advice to get the resume shortlisted.
				Return JSON with keys: matchScore(0-100), missingSkills(list), ATSFriendly (text), shortlistingSuggestions (text advice).
				Resume:
				""" + resumeText + "\n\nJob Description:\n" + jobDescription;

		JSONObject jsonBody = new JSONObject();
		jsonBody.put("model", "llama-3.3-70b-versatile");
		jsonBody.put("messages", List.of(Map.of("role", "system", "content", "You are a helpful AI career assistant."),
				Map.of("role", "user", "content", prompt)));
		jsonBody.put("response_format", Map.of("type", "json_object"));

		RequestBody body = RequestBody.create(MediaType.parse("application/json"), jsonBody.toString());

		Request request = new Request.Builder().url(API_URL).addHeader("Authorization", "Bearer " + groqApiKey)
				.post(body).build();

		Response response = client.newCall(request).execute();
		String result = response.body().string();
		
		System.out.println("AI API raw response: " + result);

		String resultString = new JSONObject(result).getJSONArray("choices").getJSONObject(0).getJSONObject("message")
				.getString("content");

		JSONObject contentJson = new JSONObject(resultString);
		
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("matchScore", contentJson.getInt("matchScore"));
		responseMap.put("missingSkills", contentJson.getJSONArray("missingSkills").toList());
		responseMap.put("shortlistingSuggestions", contentJson.getString("shortlistingSuggestions"));
		responseMap.put("ATSFriendly", contentJson.getString("ATSFriendly"));

		return responseMap;
	}

}
