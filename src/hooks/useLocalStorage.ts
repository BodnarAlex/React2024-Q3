import { useState, useEffect } from "react";

export function useLocalStorage(
  initialValue = "",
): [string, (value: string) => void] {
  const [searchLS, setSearchLS] = useState<string>(
    () => localStorage.getItem("searchTerm") || initialValue,
  );

  useEffect(() => {
    localStorage.setItem("searchTerm", searchLS);
  }, [searchLS]);

  return [searchLS, setSearchLS];
}
