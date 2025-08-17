import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AgentCoreDashboard() {
  const agents = [
    {
      name: "shahzad_ai_agent1",
      default: true,
      status: "Ready",
      entrypoint: "shahzad_ai_agent1.py",
      region: "us-west-2",
    },
    {
      name: "shahzad_ai_agent2",
      default: false,
      status: "Ready",
      entrypoint: "shahzad_ai_agent2.py",
      region: "us-west-2",
    },
    {
      name: "shahzad_ai_agent3",
      default: false,
      status: "Ready",
      entrypoint: "shahzad_ai_agent3.py",
      region: "us-west-2",
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <Card key={agent.name} className="shadow-lg rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold flex items-center justify-between">
              {agent.name}
              {agent.default && (
                <span className="ml-2 text-xs bg-green-200 text-green-700 px-2 py-1 rounded">
                  Default
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-600">Status: {agent.status}</p>
            <p className="text-sm text-gray-600">Entrypoint: {agent.entrypoint}</p>
            <p className="text-sm text-gray-600">Region: {agent.region}</p>

            <div className="mt-4 flex gap-2">
              <Button variant="default">Invoke</Button>
              <Button variant="secondary">View Logs</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
