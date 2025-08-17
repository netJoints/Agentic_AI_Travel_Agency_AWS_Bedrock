Here's the supervisor agent code that will coordinate between your flight and hotel agents.

Key Features:

1. Intent Analysis: Determines if user needs flights, hotels, or both
2. Request Routing: Calls appropriate specialist agents based on intent
3. Travel Detail Extraction: Parses locations, dates, budget, traveler count
4. Response Coordination: Combines results from multiple agents
5. Smart Recommendations: Provides travel advice and suggestions

# Coordination Logic:
## Analyzes User Intent:

Flight keywords: flight, fly, plane, airline, airport
Hotel keywords: hotel, stay, accommodation, room
Trip planning: trip, vacation, travel, plan, itinerary

## Routes to Appropriate Agents:

Flight-only requests → Flight Agent
Hotel-only requests → Hotel Agent
Trip planning → Both Flight + Hotel Agents
Combined requests → Both agents with coordination

## Combines Results:

Merges flight and hotel search results
Provides unified recommendations
Includes coordination summary and travel advice

# Example Interactions:
bash 
~ Test trip planning (calls both agents)
agentcore invoke '{"prompt": "Plan a trip from Los Angeles to New York in September"}'

~ Test flight only
agentcore invoke '{"prompt": "Find flights from LAX to JFK"}'

~ Test hotel only  
agentcore invoke '{"prompt": "Show me hotels in Manhattan"}'

~ Test complex request
agentcore invoke '{"prompt": "I need flights from San Francisco to Boston and hotels downtown with budget $200"}'

# To Deploy:
Since you want this as shahzad_ai_agent1.py, you'll need to:

Replace your existing agent1 or rename it
Configure and deploy:

bash
agentcore configure --entrypoint shahzad_ai_agent1.py
agentcore launch

This supervisor agent will intelligently coordinate between your flight and hotel agents, providing a unified travel planning experience!
