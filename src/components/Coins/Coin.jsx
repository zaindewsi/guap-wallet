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
import { FaStar } from "react-icons/fa";

export default function Coin() {
  const [coinData, setCoinData] = useState({});
  const [priceData, setPriceData] = useState([]);
  const [dateRange, setDateRange] = useState("max");
  const [range, setRange] = useState("daily");
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (watchlist) {
      const myList = localStorage.getItem("Watchlist");
      myList && setWatchlist(myList.split(","));
    }
  }, []);

  const addToWatchlist = (coin) => {
    if (!watchlist.includes(coin.id)) {
      let newWatchList = [...watchlist, coin.id];
      setWatchlist([...watchlist, coin.id]);
      localStorage.setItem("Watchlist", newWatchList);
    } else {
      const newWatchList = watchlist.filter((item) => item !== coin.id);
      setWatchlist(newWatchList);
      localStorage.setItem("Watchlist", newWatchList);
    }
  };

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

  useEffect(() => {
    fetchData();
  }, [dateRange, range]);

  const formatMoney = (val) => {
    return `$${val}`;
  };

  return (
    <div className="coin">
      <span>
        {coinData.image && (
          <img
            src={coinData.image.large}
            alt={coinData.id}
            style={{ width: "100px" }}
          />
        )}
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {coinData.name} ({coinData.symbol}){" "}
          <FaStar
            onClick={() => addToWatchlist(coinData)}
            className="star-coin"
            style={
              watchlist.includes(coinData.id)
                ? { color: "orange" }
                : { color: "rgb(202, 202, 202)" }
            }
          />
        </h1>
      </span>
      <h4>Rank: {coinData.market_cap_rank}</h4>
      <h4>
        Current Price:{" "}
        {coinData.market_data &&
          coinData.market_data.current_price.cad.toLocaleString("en-US", {
            style: "currency",
            currency: "CAD",
          })}
      </h4>
      <form>
        <select
          value={dateRange}
          onChange={(event) => {
            setDateRange(event.target.value);
          }}
        >
          <option name="max">max</option>
          <option name="365">365</option>
          <option name="30">30</option>
          <option name="1">1</option>
        </select>
      </form>
      <div className="graph-container">
        <ResponsiveContainer>
          <LineChart data={priceData} style={{ color: "black" }}>
            <CartesianGrid strokeDasharray="1" />
            <XAxis dataKey="date" tick="false" />
            <YAxis
              dataKey="price"
              domain={["auto", "auto"]}
              tickFormatter={formatMoney}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h4>Last updated: {coinData.last_updated}</h4>
      <h4>Genesis Date: {coinData.genesis_date}</h4>

      {coinData.description && (
        <>
          <h2>Description</h2>
          <p
            dangerouslySetInnerHTML={{ __html: coinData.description.en }}
            className="coin-description"
          />
        </>
      )}
    </div>
  );
}
