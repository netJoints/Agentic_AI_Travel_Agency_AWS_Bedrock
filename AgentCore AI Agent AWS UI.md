# Creating Agentic AI using AWS UI

Create an empty ECR registry 

<img width="1213" height="501" alt="image" src="https://github.com/user-attachments/assets/bc3a9f9a-0494-4550-a44f-17c94ec89dc4" />


# Create a reliable Dockerfile using official Python image

<pre>

cat > Dockerfile << 'EOF'
FROM python:3.11-slim

# Install curl for health checks
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# Install Python packages
RUN pip install flask boto3 requests

# Create app directory
WORKDIR /app

# Copy application file
COPY app.py .

# Expose port
EXPOSE 8080

# Run the application
CMD ["python", "app.py"]
EOF

</pre>


# Now Build with One of These
        
<pre>
# Clean up first
docker system prune -f

# Build with the new Dockerfile
docker build -t bedrock-agentcore-shahzad_ai_agent2 .

# If successful, continue
docker tag bedrock-agentcore-shahzad_ai_agent2:latest 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-shahzad_ai_agent2:latest

docker push 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-shahzad_ai_agent2:latest
</pre>
