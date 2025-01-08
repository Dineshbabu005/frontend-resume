function ResumePreview({ data }) {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <h3>Skills</h3>
      <p>{data.skills}</p>
      <h3>Experience</h3>
      <p>{data.experience}</p>
    </div>
  );
}

export default ResumePreview;
