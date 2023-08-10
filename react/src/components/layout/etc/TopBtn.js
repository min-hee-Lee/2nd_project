import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const TopBtn = () => {
  const topClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <button
        onClick={topClick}
        style={{
          background: "black",
          border: "2px solid white",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <ArrowUpwardIcon style={{ fontSize: 50 }} />
      </button>
    </>
  );
};

export default TopBtn;
