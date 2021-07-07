import CoinGecko from "coingecko-api";
import { useEffect, useState } from "react";
import "./CoinTable.scss";
import { FaStar, FaArrowsAltV } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export default function CoinTable() {
  const CoinGeckoClient = new CoinGecko();
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
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
  }, [pageNumber, searchId, searchValue, orderBy]);

  useEffect(() => {
    const coinData = async () =>
      await CoinGeckoClient.coins.markets({
        order: "market_cap_desc",
        vs_currency: "cad",
        per_page: 250,
      });
    coinData().then((res) => setAllCoins(res.data));
  }, []);

  useEffect(() => {
    if (watchlist) {
      const myList = localStorage.getItem("Watchlist");
      myList && setWatchlist(myList.split(","));
    }
  }, []);

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
        setSearchId(coin.id);
        setPageNumber(1);
        setButton(true);
      } else if (shortSearch === "") {
        setSearchId("");
        setButton(false);
      }
    });
  };

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
      <button
        disabled={pageNumber === 1 ? true : false}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        Prev
      </button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
      <table className="coins-table">
        <thead>
          <tr>
            <th>
              Rank
              <FaArrowsAltV
                onClick={() => {
                  orderBy === "market_cap_desc"
                    ? setOrderBy("market_cap_asc")
                    : setOrderBy("market_cap_desc");
                }}
              />
            </th>
            <th></th>
            <th>
              Name
              <FaArrowsAltV
                onClick={() => {
                  orderBy === "coin_name_asc"
                    ? setOrderBy("coin_name_desc")
                    : setOrderBy("coin_name_asc");
                }}
              />
            </th>
            <th>
              Price
              <FaArrowsAltV
                onClick={() => {
                  orderBy === "price_asc"
                    ? setOrderBy("price_desc")
                    : setOrderBy("price_asc");
                }}
              />
            </th>
            <th>
              Market Cap
              <FaArrowsAltV
                onClick={() => {
                  orderBy === "market_cap_desc"
                    ? setOrderBy("market_cap_asc")
                    : setOrderBy("market_cap_desc");
                }}
              />
            </th>
            <th>24hr change</th>
            <th>Watchlist</th>
          </tr>
        </thead>
        {coins.map((coin) => (
          <tbody>
            <tr>
              <td onClick={() => handleRowClick(coin)}>
                {coin.market_cap_rank}
              </td>
              <td id="logo-name" onClick={() => handleRowClick(coin)}>
                <img className="coin-logo" src={coin.image} alt={coin.name} />{" "}
              </td>
              <td onClick={() => handleRowClick(coin)}>
                <p>{coin.name}</p>
              </td>
              <td onClick={() => handleRowClick(coin)}>
                {formatter.format(coin.current_price)}
              </td>
              <td onClick={() => handleRowClick(coin)}>
                {formatter.format(coin.market_cap)}
              </td>
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
              <td onClick={() => addToWatchlist(coin)}>
                <FaStar
                  className="star"
                  style={
                    watchlist.includes(coin.id)
                      ? { color: "orange" }
                      : { color: "rgb(202, 202, 202)" }
                  }
                />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}
