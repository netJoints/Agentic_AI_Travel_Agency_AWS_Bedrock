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


<img width="1213" height="638" alt="image" src="https://github.com/user-attachments/assets/a56e1004-702b-411b-93bc-91d30d3566f3" />

<img width="1265" height="540" alt="image" src="https://github.com/user-attachments/assets/d0384176-410c-4aa6-a0f7-cbc9c6fc3971" />

<img width="1306" height="616" alt="image" src="https://github.com/user-attachments/assets/f0f31a14-59d9-464e-9bd3-c93694c834b9" />

# Arm64 Support Error

If you see this error

<pre>New agentic resource was not able to be successfully created: Architecture incompatible for uri '513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-shahzad_ai_agent2:latest'. Supported architectures: [arm64].</pre>

The issue is that your Docker image was built for the wrong architecture! Bedrock AgentCore requires ARM64 architecture, but your image was likely built for x86_64/amd64.

## Solution: Build ARM64 Image



```
# Clean up first
docker system prune -f

# Build specifically for ARM64 architecture
docker buildx build --platform linux/arm64 -t bedrock-agentcore-shahzad_ai_agent2 .

# Tag for ECR
docker tag bedrock-agentcore-shahzad_ai_agent2:latest 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-shahzad_ai_agent2:latest

# Push to ECR
docker push 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-shahzad_ai_agent2:latest
```


Then

<pre>  # Create Dockerfile without forcing platform
cat > Dockerfile << 'EOF'
FROM python:3.11-alpine

# Install Flask
RUN pip install flask

# Create app directory
WORKDIR /app

# Copy the app file
COPY app.py .

# Expose port
EXPOSE 8080

# Run the application
CMD ["python", "app.py"]
EOF

# Build without specifying platform (let Docker choose)
docker build -t bedrock-agentcore-shahzad_ai_agent2 .

# Tag and push
docker tag bedrock-agentcore-shahzad_ai_agent2:latest 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-shahzad_ai_agent2:latest

docker push 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-shahzad_ai_agent2:latest </pre>


### Then run following commands in AWS Cloud Shell

```  Create a new builder instance that supports ARM64
docker buildx create --name arm-builder --driver docker-container --use
docker buildx inspect --bootstrap

# Now build for ARM64
docker buildx build --platform linux/arm64 \
  -t 513826297540.dkr.ecr.us-west-2.amazonaws.com/bedrock-agentcore-shahzad_ai_agent2:latest \
  --push . ```







