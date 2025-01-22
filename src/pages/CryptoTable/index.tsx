import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

// Define TypeScript types for cryptocurrency data
interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
}

const columnHelper = createColumnHelper<Coin>();

const CryptoTable: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((response) => response.json())
      .then((data) => setCoins(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = [
    columnHelper.accessor("name", {
      header: () => <span>Name</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.symbol, {
      id: "symbol",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Symbol</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("current_price", {
      header: () => "Current Price",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("market_cap", {
      header: () => <span>Visits</span>,
      footer: (info) => info.column.id,
    }),
  ];

  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
      <Table columns={columns} data={coins} />
    </div>
  );
};

export default CryptoTable;
