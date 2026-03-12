"use client";

import React, { createContext, useContext, useState } from "react";

interface SearchContextType {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  searchData: {
    purpose: string;
    location: string;
    type: string;
    budget: string;
  };
  setSearchData: (data: Partial<SearchContextType["searchData"]>) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchData, setSearchDataState] = useState({
    purpose: "buy",
    location: "",
    type: "",
    budget: "",
  });

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const setSearchData = (data: Partial<SearchContextType["searchData"]>) => {
    setSearchDataState((prev) => ({ ...prev, ...data }));
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        openSearch,
        closeSearch,
        searchData,
        setSearchData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
