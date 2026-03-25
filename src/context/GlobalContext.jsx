import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  axios
  .get("https://dummyjson.com/products/categories")
  .then((res) =>
    setCategories([ ...res.data.map((c) => c.slug)])
  )
      .catch((err) => console.log(err));
  }, []);

  return (
    <GlobalContext.Provider value={{ categories }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
