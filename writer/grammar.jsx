import { useState } from "react";
import { Sparkles } from "lucide-react";

export function GrammarChecker({ text, onApply }) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const improveText = async () => {
    if (!text.trim()) {
      alert("Please enter some text in the editor first");
      return;
    }

    setLoading(true);
    setResult("Improving...");

    try {
      const response = await fetch("http://localhost/project/grammar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setResult("Error: " + data.error);
      } else {
        setResult(data.choices?.[0]?.message?.content || "No response received");
      }
    } catch (error) {
      console.error("Full error:", error);
      setResult("Server error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    onApply(result); // send improved text back to parent
    setResult("");
  };

  const isError =
    result.startsWith("Error:") || result.startsWith("Server error:");

  return (
    <div className="w-72 border rounded-lg p-4 bg-[#FFFFFF]  flex flex-col gap-3 overflow-auto scrollbar-thin">
      <h3 className="flex items-center gap-2">
        <Sparkles className="h-4 w-4" /> AI Assistant
      </h3>

      <button
        className="h-8 justify-center items-center rounded-md gap-1.5 px-3 text-white text-sm font-medium bg-[#b13a2d]"
        onClick={improveText}
        disabled={loading}
      >
        {loading ? "Improving..." : "Improve Writing"}
      </button>

      {result && (
        <div className="mt-2">
          <strong>Result:</strong>
          <p className="text-sm mt-1">{result}</p>

          {!loading && !isError && (
            <button
              onClick={handleApply}
              className="mt-2 h-8 px-3 rounded-md text-sm font-medium border border-[#b13a2d] text-[#b13a2d]"
            >
              Apply
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default GrammarChecker;
