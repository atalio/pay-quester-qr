
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bug } from "lucide-react";

interface LogEntry {
  timestamp: string;
  message: string;
}

export const DebugPanel = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Override console.debug to capture UI logs
  useEffect(() => {
    const originalDebug = console.debug;
    console.debug = (...args) => {
      const message = args.join(" ");
      if (message.startsWith("[UI]")) {
        setLogs(prev => [
          {
            timestamp: new Date().toISOString(),
            message: message.replace("[UI] ", "")
          },
          ...prev
        ]);
      }
      originalDebug.apply(console, args);
    };

    return () => {
      console.debug = originalDebug;
    };
  }, []);

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50"
      >
        <Bug className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-64 bg-white border rounded-lg shadow-lg z-50">
      <div className="p-2 border-b flex justify-between items-center">
        <h3 className="text-sm font-medium">Debug Logs</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
        >
          ×
        </Button>
      </div>
      <ScrollArea className="h-[calc(100%-40px)] p-2">
        {logs.map((log, i) => (
          <div key={i} className="text-xs mb-1">
            <span className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
            {" "}
            {log.message}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
