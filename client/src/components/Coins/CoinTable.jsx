import CoinGecko from "coingecko-api";
import { useEffect, useState } from "react";
import "./CoinTable.scss";
import { FaStar } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export default function CoinTable() {
  const CoinGeckoClient = new CoinGecko();
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });

  const history = useHistory();
  const handleRowClick = (coin) => {
    history.push(`/coins/${coin.id}`);
  }  

  const numColor = (num) => {
    if (num[0] === "-") {
      return <div style={{ color: "red" }}>{num}</div>;
    }
    return <div style={{ color: "green" }}>{num}</div>;
  };
  useEffect(() => {
    const getCoinData = async () =>
      await CoinGeckoClient.coins.markets({
        order: "market_cap_desc",
        per_page: 100,
        vs_currency: "cad",
      });
    getCoinData().then((res) => setCoins(res.data));
  }, []);
  return (
    <table className="coins-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th></th>
          <th>Name</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>24hr change</th>
          <th>Watchlist</th>
        </tr>
      </thead>
      {coins.map((coin) => (
        <tbody>
          
          <tr>
            <td>{coin.market_cap_rank}</td>
            <td id="logo-name"  onClick={() => handleRowClick(coin)}>
              <img className="coin-logo" src={coin.image} alt={coin.name} />{" "}
            </td>
            <td onClick={() => handleRowClick(coin)}>
              <p>{coin.name}</p>
            </td>
            <td onClick={() => handleRowClick(coin)}>{formatter.format(coin.current_price)}</td>
            <td>{formatter.format(coin.market_cap)}</td>
            <td onClick={() => handleRowClick(coin)}>
              {numColor(
                Number(coin.price_change_percentage_24h / 100).toLocaleString(
                  undefined,
                  {
                    style: "percent",
                    minimumFractionDigits: 2,
                  }
                )
              )}
            </td>
            <td>
              <div onClick={() => {
                console.log(coin.id)
                }}>
              <FaStar className="star" />
                </div>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
