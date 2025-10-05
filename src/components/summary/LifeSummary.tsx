import { useEffect, useState } from "react";
import Title from "../common/Title.tsx";
import QueryBuilder from "../../utils/QueryBuilder.ts";
import GeminiClient from "../../google/GeminiClient.ts";
import Spinner from "../common/Spinner.tsx";

// FIXME: mock data remove and replace with real data
const stats =
  "Age: 81, Savings: 500 000PLN, Happiness: 40%, Focus areas: Health 61%, Hobby 90%, Work 80%, Relationships 70%, Pension: 2000PLN";

function LifeSummary() {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchSummary = async () => {
    const geminiClient = GeminiClient.newClient();
    if (!geminiClient) {
      setIsLoading(false);
      setHasError(false);
      setSummary("");
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const query = QueryBuilder.build(stats);
      const result = await geminiClient.generate(query);

      setSummary(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching life summary:", error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <>
      <Title text="Your Life" />
      {isLoading ? (
        <div className="flex items-center justify-center py-8 h-full relative">
          <span className="ml-3 text-2xl text-gray-600 transform translate-y-[-6.5rem]">
            Generating your life summary...
          </span>
          <Spinner className="absolute left-0 right-0 bottom-[50%]" />
        </div>
      ) : hasError ? (
        <div className="text-red-600 py-4">
          <p className="mb-2">
            Failed to generate life summary. Please try again.
          </p>
          <button
            onClick={fetchSummary}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      ) : (
        <p className="text-black text-md">{summary}</p>
      )}
    </>
  );
}

export default LifeSummary;
