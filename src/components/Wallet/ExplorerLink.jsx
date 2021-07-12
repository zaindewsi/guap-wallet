export default function ExplorerLink(props) {
  return (
    <span>
      <p>
        View your transaction{" "}
        <a
          href={`https://explorer.bitcoin.com/bch/tx/${props.tx}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          here!
        </a>
      </p>
    </span>
  );
}
