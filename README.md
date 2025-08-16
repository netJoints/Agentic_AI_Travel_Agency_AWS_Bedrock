# Overview

Amazon Bedrock AgentCore allows you to securely deploy and operate AI agents at scale. We'll create a basic agent that can process user input and return responses.

# Step 1: Environment Setup

First, ensure you have the proper environment:
- Python 3.10 or higher installed
- AWS account with appropriate permissions.
- Make sure your AWS IAM user/role has these permissions for Bedrock AgentCore:
  <pre> 
    bedrock:*
    iam:PassRole
    logs:CreateLogGroup
    logs:CreateLogStream
    logs:PutLogEvents
  </pre>
- AWS credentials configured locally

  <pre>
    $ vi ~/.aws/credentials
    [agentic-ai]
    credential_process=pybritive-aws-cred-process --profile "aws_standalone_app_513826297540/513826297540 (aws_standalone_app_513826297540_environment)/AWS Admin Full Access" -t agentic-ai.britive-app.com
    region = us-west-2
    
  </pre>

  $ export AWS_PROFILE=agentic-ai

  <img width="680" height="220" alt="image" src="https://github.com/user-attachments/assets/af267f6c-4461-4ee3-92a6-3f28f2e71566" />

aws sts get-caller-identity --profile agentic-ai

<img width="931" height="88" alt="image" src="https://github.com/user-attachments/assets/0b1a1c13-e0d4-4fc0-9d0e-6941db5fd570" />


# Step 2: Install Required Packages
Create a virtual environment and install the necessary packages:

<code>
python -m venv bedrock-agentcore-env
source bedrock-agentcore-env/bin/activate  
# On Windows: bedrock-agentcore-env\Scripts\activate
pip install strands-agents bedrock-agentcore bedrock-agentcore-starter-toolkit
</code>

# Step 3: Create Your Agent Code
Create a file named shahzad_ai_agent1.py
with the following code:

<code>
from strands import Agent
from bedrock_agentcore.runtime import BedrockAgentCoreApp

agent = Agent()
app = BedrockAgentCoreApp()

@app.entrypoint
def invoke(payload):
    """Process user input and return a response"""
    user_message = payload.get("prompt", "Hello")
    response = agent(user_message)
    return str(response)  # response should be JSON serializable

if __name__ == "__main__":
    app.run()
</code>

# Step 4: Test Locally
<pre>python shahzad_ai_agent1.py</pre>
The agent should start and be accessible locally for testing.

<img width="741" height="135" alt="image" src="https://github.com/user-attachments/assets/d4387508-ff44-4b80-a31a-1e9b51bd4089" />



# Step 5: Deploy to AWS
To deploy your agent to AWS: Install the Bedrock AgentCore CLI:


<code> pip install bedrock-agentcore-starter-toolkit</code>


Configure your deployment:
<code>agentcore configure --entrypoint shahzad_ai_agent1.py</code>
Follow the prompts to set up your execution role and authentication method.

<img width="1327" height="770" alt="image" src="https://github.com/user-attachments/assets/b1592044-f9e5-47e6-9dc4-e15a9cc7f83f" />



<pre>agentcore launch</pre>


<img width="1081" height="776" alt="image" src="https://github.com/user-attachments/assets/54f77816-860a-4637-9a81-c6fa9c888c68" />


<img width="1142" height="776" alt="image" src="https://github.com/user-attachments/assets/d29eb0d5-0931-44a5-b409-db4577409e47" />

<img width="1123" height="778" alt="image" src="https://github.com/user-attachments/assets/caf079a4-6526-4e45-a2ee-6f976bad75a9" />


# Step 6: Test Your Deployed Agent

agentcore status

<img width="927" height="582" alt="image" src="https://github.com/user-attachments/assets/8251712d-ac74-4155-9001-6d88e05177bc" />


After deployment, you'll receive an agent runtime ARN that you can use to invoke your agent through the AWS SDK or CLI.
Key Benefits

    Scalable: Automatically scales based on demand
    Secure: Built-in security features and AWS IAM integration
    Flexible: Works with any agent framework
    Cost-effective: Pay only for what you use

This basic structure provides a foundation that you can expand upon to create more sophisticated agents tailored to your specific use cases. 
Remember to follow AWS security best practices, implement proper error handling, and add logging and monitoring for production deployments.
