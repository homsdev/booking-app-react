import { useState, useEffect } from "react";
import getData from "./api";

export default function useFetch(url) {
  /**Array with two elements: Value, updaterFunction */
  /**You can pass a function to set a lazy initial state */
  /*const [value,setValue] = useState(()-> return initialState)*/
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let doUpdate = true;

    setStatus("loading");
    setData(undefined);
    setError(null);

    getData(url)
      .then((data) => {
        if (doUpdate) {
          setData(data);
          setStatus("success");
        }
      })
      .catch((error) => {
        if (doUpdate) {
          setStatus("error");
          setError(error);
        }
      });

    return () => {
      doUpdate = false;
    };
  }, [url]);

  return { data, status, error };
}
