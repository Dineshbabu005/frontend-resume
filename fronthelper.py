import axios from "axios";

export const fetchATSScore = async (resumeText, jobDescription) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/api/ats_score", {
      resume_text: resumeText,
      job_description: jobDescription,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ATS score:", error);
    return null;
  }
};
