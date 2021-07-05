import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Coin() {
  const [coinData, setCoinData] = useState({});
  const [priceData, setPriceData] = useState([]);

  const fetchData = async () => {
    const data = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    );
    setCoinData(data.data);

    const graphData = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=365&interval=daily"
    );
    console.log(graphData.data.prices);

    const prices = graphData.data.prices;

    const arr = [];
    // console.log("OOOOOBJECT", Object.fromEntries(prices));

    prices.forEach((price) => {
      arr.push({ date: new Date(price[0]).getHours(), value: price[1] });
    });

    setPriceData(arr);
    console.log(priceData);
  };

  // CONVERT TIMESTAMPS
  // const timestamp = 1622939369628;
  // const date = new Date(timestamp);
  // console.log("DATE", date.getMinutes());

  useEffect(() => {
    fetchData();
  }, []);

  console.log("this is the new data from state", coinData);

  return (
    <div>
      <h1>
        {coinData.id} ({coinData.symbol})
      </h1>
      <ResponsiveContainer width={1100} height={300}>
        <LineChart
          data={priceData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            // activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <p>Last updated: {coinData.last_updated}</p>
      <p>Genesis Date: {coinData.genesis_date}</p>
      <p>
        Price:{" "}
        {coinData.market_data &&
          coinData.market_data.current_price.cad.toLocaleString("en-US", {
            style: "currency",
            currency: "CAD",
          })}
      </p>
      <h1>{coinData.market_cap_rank}</h1>
      {coinData.image && <img src={coinData.image.large} alt={coinData.id} />}
      {coinData.description && <p>{coinData.description.en} </p>}
    </div>
  );
}

// description
// price
// image large
//
