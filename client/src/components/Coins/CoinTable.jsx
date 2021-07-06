import CoinGecko from "coingecko-api";
import { useEffect, useState } from "react";
import "./CoinTable.scss";
import { FaStar, FaArrowsAltV } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export default function CoinItemList() {
  const CoinGeckoClient = new CoinGecko();
  const [coins, setCoins] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchId, setSearchId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [allCoins, setAllCoins] = useState([]);
  const [button, setButton] = useState(false);
  const [orderBy, setOrderBy] = useState("market_cap_desc");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });

  const history = useHistory();
  const handleRowClick = (coin) => {
    history.push(`/coins/${coin.id}`);
  };

  const numColor = (num) => {
    if (num[0] === "-") {
      return <div style={{ color: "red" }}>{num}</div>;
    }
    return <div style={{ color: "green" }}>{num}</div>;
  };
  useEffect(() => {
    const getCoinData = async () =>
      await CoinGeckoClient.coins.markets({
        order: orderBy,
        per_page: 50,
        vs_currency: "cad",
        page: pageNumber,
        ids: searchId,
      });
    getCoinData().then((res) => setCoins(res.data));
  }, [pageNumber, searchId, searchValue]);

  useEffect(() => {
    const coinData = async () =>
      await CoinGeckoClient.coins.markets({
        order: "market_cap_desc",
        vs_currency: "cad",
        per_page: 250,
      });
    coinData().then((res) => setAllCoins(res.data));
  }, []);

  // coins.forEach(coin = )

  const getCoinId = (search) => {
    const shortSearch = search
      .replaceAll(" ", "")
      .replaceAll("-", "")
      .toLowerCase();

    allCoins.forEach((coin) => {
      if (
        shortSearch ===
        coin.name.replaceAll(" ", "").replaceAll("-", "").toLowerCase()
      ) {
        console.log(coin.id);
        setSearchId(coin.id);
        setPageNumber(1);
        setButton(true);
      } else if (shortSearch === "") {
        setSearchId("");
        setButton(false);
      }
    });
  };

  return (
    <>
      <form>
        <input
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
            getCoinId(event.target.value);
          }}
        />
      </form>
      {/* {getCoinId()} */}
      {pageNumber === 1 ? (
        <button onClick={() => setPageNumber(pageNumber + 1)} disabled={button}>
          Next
        </button>
      ) : (
        <>
          <button onClick={() => setPageNumber(pageNumber - 1)}>Prev</button>
          <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
        </>
      )}
      <table className="coins-table">
        <thead>
          <tr>
            <th>
              Rank <FaArrowsAltV />
            </th>
            <th></th>
            <th>
              Name <FaArrowsAltV />
            </th>
            <th>
              Price <FaArrowsAltV />
            </th>
            <th>
              Market Cap <FaArrowsAltV />
            </th>
            <th>
              24hr change <FaArrowsAltV />
            </th>
            <th>Watchlist</th>
          </tr>
        </thead>
        {coins.map((coin) => (
          <tbody>
            <tr onClick={() => handleRowClick(coin)}>
              <td>{coin.market_cap_rank}</td>
              <td id="logo-name">
                <img className="coin-logo" src={coin.image} alt={coin.name} />{" "}
              </td>
              <td>
                <p>{coin.name}</p>
              </td>
              <td>{formatter.format(coin.current_price)}</td>
              <td>{formatter.format(coin.market_cap)}</td>
              <td>
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
                <FaStar className="star" />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}
