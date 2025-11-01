import React, { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Typography,
    TextField,
    Chip
} from "@mui/material";
import api from "../services/api";

const AiResumeAnalysis = () => {
    const [resume, setResumeFile] = useState(null);
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {
        if (!resume && !resumeText) {
            setError("Upload a resume file or paste resume text");
            return;
        }
        if (!jobDescription) {
            setError("Job Description is required");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const formData = new FormData();
            if (resume) formData.append("resume", resume);
            if (resumeText) formData.append("resumeText", resumeText);
            formData.append("jobDescription", jobDescription);
            console.log("Form Data:", {
                resumeFile: resume,
                resumeText,
                jobDescription
            });
            const res = await api.post("/ai/analyze", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setAnalysisResult(res.data);
        } catch (err) {
            setError("Something went wrong");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                AI Resume Analysis
            </Typography>

            <Grid container spacing={3}>
                {/* Resume Text */}
                <Grid item xs={12}>
                    <TextField
                        label="Paste Resume Text (Optional)"
                        multiline
                        rows={6}
                        fullWidth
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                    />
                </Grid>

                {/* File Upload */}
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                    >
                        Upload Resume File
                        <input
                            hidden
                            type="file"
                            accept=".pdf,.txt,.docx"
                            onChange={(e) => setResumeFile(e.target.files[0])}
                        />
                    </Button>
                    {resume && (
                        <Typography mt={1} color="success.main">
                            ✅ {resume.name} uploaded
                        </Typography>
                    )}
                </Grid>

                {/* Job Description */}
                <Grid item xs={12}>
                    <TextField
                        label="Job Description (Required)"
                        multiline
                        rows={4}
                        fullWidth
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </Grid>

                {error && (
                    <Grid item xs={12}>
                        <Typography color="error">{error}</Typography>
                    </Grid>
                )}

                {/* Analyze Button */}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        onClick={handleAnalyze}
                    >
                        {loading ? <CircularProgress size={24} /> : "Analyze Resume"}
                    </Button>
                </Grid>

                {/* Results */}
                {analysisResult && (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3, mt: 2 }}>
                            <Typography variant="h6" fontWeight="bold">
                                ✅ Analysis Results
                            </Typography>

                            {/* Match Score */}
                            <Box mt={2} display="flex" alignItems="center" gap={2}>
                                <CircularProgress
                                    variant="determinate"
                                    value={analysisResult.matchScore}
                                    size={70}
                                />
                                <Typography fontSize={18}>
                                    Match Score: <b>{analysisResult.matchScore}%</b>
                                </Typography>
                            </Box>

                            {/* Missing Skills */}
                            <Box mt={3}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Missing Skills:
                                </Typography>
                                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                                    {analysisResult.missingSkills.map((skill, idx) => (
                                        <Chip key={idx} label={skill} color="warning" />
                                    ))}
                                </Box>
                            </Box>

                            {/* ATS Tips */}
                            {analysisResult.ATSFriendly && (
                                <Box mt={3}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        ATS Optimization:
                                    </Typography>
                                    <Typography>{analysisResult.ATSFriendly}</Typography>
                                </Box>
                            )}

                            {/* Shortlisting Suggestions */}
                            {analysisResult.shortlistingSuggestions && (
                                <Box mt={3}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Shortlisting Suggestions:
                                    </Typography>
                                    <Typography>{analysisResult.shortlistingSuggestions}</Typography>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default AiResumeAnalysis;
