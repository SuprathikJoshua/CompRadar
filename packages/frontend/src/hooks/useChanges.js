import { useState, useEffect } from "react";
import { getChanges } from "../services/changes.service";

export const useChanges = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        setLoading(true);
        const changes = await getChanges();
        setData(changes);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChanges();
  }, []);

  return { data, loading, error };
};