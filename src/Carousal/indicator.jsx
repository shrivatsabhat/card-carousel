import "./style.css";

const Indicator = (props) => {
  return (
    <div
      className={`indicator ${props.active ? "active" : ""}`}
      onClick={props.onClick}
    ></div>
  );
};

export default Indicator;
