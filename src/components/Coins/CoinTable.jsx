import { useEffect, useState } from "react";
import "./CoinTable.scss";
import axios from "axios";
import { FaStar, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

export default function CoinTable({ varBalance, setVarBalance }) {
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
    currency: varBalance,
  });

  const history = useNavigate();
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
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${varBalance}&ids=${searchId}&order=${orderBy}&per_page=50&page=${pageNumber}`
        )
        .then((res) => setCoins(res.data));
    getCoinData();
  }, [pageNumber, searchId, searchValue, orderBy, varBalance]);

  const DenomSelector = () => {
    return (
      <select
        value={varBalance}
        onChange={(event) => {
          setVarBalance(event.target.value);
        }}
        className="denom"
      >
        <option>cad</option>
        <option>usd</option>
        <option>eur</option>
        <option>gbp</option>
        <option>aud</option>
        <option>chf</option>
      </select>
    );
  };

  useEffect(() => {
    const coinData = async () =>
      await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${varBalance}&order=market_cap_desc&per_page=250`
      )
      .then((res) => setAllCoins(res.data));
    coinData()
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
      <div className="top-section">
        <div className="search-section">
          <DenomSelector />
          <form>
            <input
              value={searchValue}
              placeholder="🔍 Search Coin"
              onChange={(event) => {
                setSearchValue(event.target.value);
                getCoinId(event.target.value);
              }}
              className="coin-search"
            />
          </form>
        </div>

        <div className="arrow-buttons">
          <button
            disabled={pageNumber === 1 ? true : false}
            onClick={() => setPageNumber(pageNumber - 1)}
            className="page-arrow"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            className="page-arrow"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      <table className="coins-table">
        <thead>
          <tr className="coins-header">
            <th>
              Rank
              <TiArrowUnsorted
                className="arrow"
                onClick={() => {
                  orderBy === "market_cap_desc"
                    ? setOrderBy("market_cap_asc")
                    : setOrderBy("market_cap_desc");
                }}
              />
            </th>
            <th></th>
            <th id="coin-name">Name</th>
            <th>
              Price
              <TiArrowUnsorted
                className="arrow"
                onClick={() => {
                  orderBy === "price_asc"
                    ? setOrderBy("price_desc")
                    : setOrderBy("price_asc");
                }}
              />
            </th>
            <th>
              Market Cap
              <TiArrowUnsorted
                className="arrow"
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
                <p className="name">
                  <strong>{coin.name}</strong>
                </p>
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
      <div className="bottom-section">
        <div className="search-section">
          <DenomSelector />
        </div>

        <div className="arrow-buttons">
          <button
            disabled={pageNumber === 1 ? true : false}
            onClick={() => setPageNumber(pageNumber - 1)}
            className="page-arrow"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            className="page-arrow"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
}
