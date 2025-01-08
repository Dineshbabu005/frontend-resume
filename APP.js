import React, { useState } from 'react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import ATSScore from './ATSScore';
import { fetchATSScore } from './api';

function App() {
  const [resumeData, setResumeData] = useState({});
  const [atsScoreData, setAtsScoreData] = useState(null);

  const handleGenerate = async (data) => {
    setResumeData(data);

    const { name, email, phone, skills, experience } = data;
    const resumeText = `${name}\n${email}\n${phone}\nSkills:\n${skills}\nExperience:\n${experience}`;
    const mockJobDescription = "data analysis, power bi, python, visualization";
    const API_URL = "https://your-backend.onrender.com/api/ats_score";


    const atsData = await fetchATSScore(resumeText, mockJobDescription);
    setAtsScoreData(atsData);
  };

  return (
    <div>
      <ResumeForm onGenerate={handleGenerate} />
      <ResumePreview data={resumeData} />
      {atsScoreData && <ATSScore score={atsScoreData.total_score} />}
    </div>
  );
}

export default App;
