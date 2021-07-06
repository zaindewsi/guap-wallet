import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Coin.scss";
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
  const [dateRange, setDateRange] = useState("max");
  const [range, setRange] = useState("daily");

  const { id } = useParams();
  const fetchData = async () => {
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    setCoinData(data.data);

    const graphData = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=cad&days=${dateRange}&interval=${range}`
    );

    const prices = graphData.data.prices;

    const arr = [];

    prices.forEach((price) => {
      if (dateRange === "max") {
        arr.push({
          date: new Date(price[0]).toLocaleDateString(),
          price: price[1],
        });
      } else if (dateRange === "1") {
        setRange("hourly");

        arr.push({
          date: new Date(price[0]).toLocaleTimeString(),
          price: price[1],
        });
      } else {
        arr.push({
          date: new Date(price[0]).toLocaleDateString(),
          price: price[1],
        });
      }
    });

    setPriceData(arr);
  };

  // CONVERT TIMESTAMPS
  // const timestamp = 1622939369628;
  // const date = new Date(timestamp);
  // console.log("DATE", date.getMinutes());

  useEffect(() => {
    fetchData();
  }, [dateRange, range]);

  const formatMoney = (val) => {
    return `$${val}`;
  };

  return (
    <div className="coin">
      <h1>
        {coinData.id} ({coinData.symbol})
      </h1>
      <form>
        <select
          value={dateRange}
          onChange={(event) => {
            console.log(event.target);
            setDateRange(event.target.value);
          }}
        >
          <option name="max">max</option>
          <option name="365">365</option>
          <option name="30">30</option>
          <option name="1">1</option>
        </select>
      </form>

      <ResponsiveContainer
        width={1000}
        height={300}
        className="graph-conatiner"
      >
        <LineChart
          data={priceData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="date" tick="false" />
          <YAxis
            dataKey="price"
            domain={["auto", "auto"]}
            tickFormatter={formatMoney}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
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
      {coinData.description && (
        <p dangerouslySetInnerHTML={{ __html: coinData.description.en }} />
      )}
    </div>
  );
}
