import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { country2FlagMapper, getSortedMedalsArray } from "@/lib/utils";
import { useMedalStore } from "@/store/flagStore";

export default function useMedalDataFetcher() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedalData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/getMedals");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const json = await res.json();
        const medalDataArray = country2FlagMapper(json);
        const sortedData = getSortedMedalsArray(medalDataArray);
        useMedalStore.getState().setMedalData(sortedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError((err as Error).message);
        router.push('/error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedalData();
  }, [router]);

  return { isLoading, error };
}