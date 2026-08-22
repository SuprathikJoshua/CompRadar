import { useState, useEffect } from "react";
import { getHealEvents } from "../services/healEvents.service";

export const useHealEvents = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealEvents = async () => {
      try {
        setLoading(true);
        const events = await getHealEvents();
        setData(events);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHealEvents();
  }, []);

  return { data, loading, error };
};