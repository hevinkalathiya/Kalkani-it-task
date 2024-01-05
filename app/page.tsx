"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";

export default function Home() {
  const [query, setQuery] = useState("naruto");
  const [totalResults, setTotalResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/characters`, {
        params: {
          // page: 1,
          // limit: 15,
          q: query,
          order_by: "favorites",
          sort: "desc",
        },
      });
      setTotalResults(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center py-10 text-3xl font-medium">
        Search Anime Character
      </h1>
      <div className="flex justify-center items-center gap-3">
        <Input
          className="max-w-[450px] rounded-xl p-2"
          placeholder="Search Your Favourite Anime 😁"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          className="rounded-xl px-7 border-2 border-black"
          variant="purple"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <p className="text-center py-10">
        Total <span className="font-bold">{totalResults.length}</span> matching
        anime character found
      </p>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={totalResults} />
      </div>
    </div>
  );
}
