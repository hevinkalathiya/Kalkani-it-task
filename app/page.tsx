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
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.jikan.moe/v4/characters`, {
        params: {
          q: query,
          order_by: "favorites",
          sort: "desc",
        },
      });
      setTotalResults(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="gradient "></div>
      <div className="bg-image"></div>
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
        {loading && <p className="text-center py-2">Loading...</p>}
        {!loading && (
          <p className="text-center py-10">
            Total <span className="font-bold">{totalResults.length}</span>{" "}
            matching anime character found
          </p>
        )}
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={totalResults} />
        </div>
      </div>
    </>
  );
}
