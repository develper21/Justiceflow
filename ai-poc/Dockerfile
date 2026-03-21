FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-hin \
    tesseract-ocr-ben \
    tesseract-ocr-tam \
    tesseract-ocr-tel \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download spaCy model
RUN python -m spacy download en_core_web_sm

# Copy application code
COPY . .

# Create storage directories
RUN mkdir -p storage/extracts storage/output/ai_extractions storage/output/ai_documents

# Expose port
EXPOSE 10000

# Start the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
