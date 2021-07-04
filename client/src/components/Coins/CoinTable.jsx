import  CoinGecko from 'coingecko-api';
import { useEffect, useState } from 'react';
import "./CoinTable.scss";
import { MdStars } from "react-icons/md"

export default function CoinItemList () {
  const CoinGeckoClient = new CoinGecko();
  const [coins, setCoins] = useState([]);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const numColor = (num) => {
    if (num[0] === '-') {
      return (
        <div style={{ color: 'red' }}>
          {num}
        </div>
      );
    }
    return (
      <div style={{ color: 'green' }}>
        {num}
      </div>
    );
  };
  useEffect(() => {
    const getCoinData = async () => await CoinGeckoClient.coins.markets();
    getCoinData().then(res => setCoins(res.data));
  }, []);
  return (
    <table className="coins-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>24hr change</th>
          <th>Watchlist</th>
        </tr>
      </thead>
      {coins.map((coin) => (
        <tbody>
          <tr class="border-bottom"> 
            <td>{coin.market_cap_rank}</td>
            <td id="logo-name"><img className="coin-logo" src={coin.image} alt={coin.name}/> {coin.name}</td>
            <td>{formatter.format(coin.current_price)}</td>
            <td>{formatter.format(coin.market_cap)}</td>
            <td>{numColor(Number(coin.price_change_percentage_24h / 100).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })) }</td>
            <td><MdStars className="star"/></td>
          </tr>
        </tbody>
      ))}
    </table>
  )
};