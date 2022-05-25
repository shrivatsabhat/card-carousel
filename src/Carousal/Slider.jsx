import "./style.css";

const Slider = ({ data }) => {
  return (
    <div className={"slider"}>
      <div className="slider__img">
        <img src={data.picture} alt="logo" />
      </div>

      <div className={"slider__title"}>
        <h3>{data.name}</h3>
        <a href="mailto:">{data.email}</a>
        <a href="tel:+">{data.phone}</a>
      </div>
    </div>
  );
};

export default Slider;
