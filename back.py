from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import textstat
import nltk

nltk.download('stopwords')
nltk.download('punkt')

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

def keyword_match_score(resume_text, job_description):
    stop_words = set(stopwords.words('english'))
    resume_tokens = [word for word in word_tokenize(resume_text.lower()) if word.isalnum()]
    job_tokens = [word for word in word_tokenize(job_description.lower()) if word.isalnum()]
    resume_keywords = [word for word in resume_tokens if word not in stop_words]
    job_keywords = [word for word in job_tokens if word not in stop_words]
    matched_keywords = set(resume_keywords) & set(job_keywords)
    return round((len(matched_keywords) / len(job_keywords)) * 100, 2)

def formatting_compliance(resume_text):
    headers = ["education", "experience", "skills", "projects", "contact"]
    points = sum(1 for header in headers if header in resume_text.lower())
    return round((points / len(headers)) * 100, 2)

def readability_score(resume_text):
    return round(textstat.flesch_reading_ease(resume_text), 2)

@app.route('/api/ats_score', methods=['POST'])
def ats_score():
    data = request.json
    resume_text = data.get("resume_text", "")
    job_description = data.get("job_description", "")
    
    if not resume_text or not job_description:
        return jsonify({"error": "Resume text and job description are required"}), 400

    keyword_score = keyword_match_score(resume_text, job_description)
    formatting_score = formatting_compliance(resume_text)
    readability = readability_score(resume_text)
    
    total_score = round((0.5 * keyword_score) + (0.3 * formatting_score) + (0.2 * readability), 2)

    return jsonify({
        "keyword_score": keyword_score,
        "formatting_score": formatting_score,
        "readability_score": readability,
        "total_score": total_score
    })

if __name__ == '__main__':
    app.run(debug=True)
