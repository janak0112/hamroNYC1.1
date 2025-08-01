// pages/market/MarketDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Client, Databases } from "appwrite";
import conf from "../../../conf/conf";
import MarketDetailContent from "./MarketDetailContent";

const client = new Client()
  .setEndpoint(conf.appWriteUrl)
  .setProject(conf.appWriteProjectId);
const databases = new Databases(client);

function MarketDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await databases.getDocument(
          conf.appWriteDatabaseId,
          conf.appWriteCollectionIdMarket,
          id
        );
        setItem(res);
      } catch (err) {
        console.error("Error fetching item:", err);
        setError("Failed to load item.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p className="text-center p-8">Loading...</p>;
  if (error || !item)
    return (
      <p className="text-center p-8 text-red-500">
        {error || "Item not found."}
      </p>
    );

  return <MarketDetailContent item={item} />;
}

export default MarketDetailPage;
