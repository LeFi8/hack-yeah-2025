import { useEffect, useState } from "react";
import Title from "../common/Title.tsx";
import QueryBuilder from "../../utils/QueryBuilder.ts";
import GeminiClient from "../../google/GeminiClient.ts";
import Spinner from "../common/Spinner.tsx";
import type { Game } from "../../game/game.ts";

interface LifeSummaryProps {
  game: Game;
}

function LifeSummary({ game }: LifeSummaryProps) {
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
      const query = QueryBuilder.build(game);
      const result = await geminiClient.generate(query);

      setSummary(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching life summary:", error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  if (hasError) {
    console.error("Error generating life summary.");
  }

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
        <p className="text-black text-md">Failed to generate summary.</p>
      ) : (
        <p className="text-black text-md">{summary}</p>
      )}
    </>
  );
}

export default LifeSummary;
