function ATSScore({ score }) {
  return (
    <div>
      <h3>ATS Score: {score}%</h3>
      {score >= 90 ? <p>Excellent! Your resume is ATS-optimized.</p> : <p>Consider improving your resume for a higher ATS score.</p>}
    </div>
  );
}

export default ATSScore;
