import { useState, useEffect, useCallback } from "react";
import { getRivals } from "../services/rivals.service";

export const useRivals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRivals = useCallback(async () => {
    try {
      setLoading(true);
      const rivals = await getRivals();
      setData(rivals);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRivals();
  }, [fetchRivals]);

  return { data, loading, error, refetch: fetchRivals };
};
