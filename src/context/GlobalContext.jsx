import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_CONFIG } from "../services/config";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `${API_CONFIG.DUMMY_JSON_URL}/products/categories`,
        );

        setCategories(res.data.map((c) => c.slug));
      } catch (err) {
        setError("No internet connection or server unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        categories,
        loading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
