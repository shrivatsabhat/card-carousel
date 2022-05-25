import { data } from "./data";
import "./App.css";
import Carousal from "./Carousal";
import Rail from "./Rail";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState([]);
  const fetchData = async () => {
    const result = await fetch("https://randomuser.me/api/?results=10");
    const data = await result.json();
    return data;
  };
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then((res) => {
        const data = res.results.map((item) => {
          return {
            name: item.name.first + " " + item.name.last,
            email: item.email,
            phone: item.phone,
            picture: item.picture.large,
          };
        });
        setUser(data);
      });
  }, []);

  return (
    <>
      <main className="App">
        {/* <Carousal data={data} sliderLength={6} auto={0} indicator={0} /> */}
        {/* <Carousal data={data} sliderLength={6} auto={1} /> */}
        <Carousal data={user} sliderLength={6} auto={1} />
      </main>
      {/* <div
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 64,
        }}
      >
        <Rail show={4} infiniteLoop>
          <div id="block">
            <img
              src="https://via.placeholder.com/300x300"
              alt="placeholder"
              style={{ width: "100%" }}
            />
          </div>
          <div id="block">
            <img
              src="https://via.placeholder.com/300x300"
              alt="placeholder"
              style={{ width: "100%" }}
            />
          </div>
          <div id="block">
            <img
              src="https://via.placeholder.com/300x300"
              alt="placeholder"
              style={{ width: "100%" }}
            />
          </div>
          <div id="block">
            <img
              src="https://via.placeholder.com/300x300"
              alt="placeholder"
              style={{ width: "100%" }}
            />
          </div>
          <div id="block">
            <img
              src="https://via.placeholder.com/300x300"
              alt="placeholder"
              style={{ width: "100%" }}
            />
          </div>
          <div id="block">
            <img
              src="https://via.placeholder.com/300x300"
              alt="placeholder"
              style={{ width: "100%" }}
            />
          </div>
          <div id="block">
            <img
              src="https://via.placeholder.com/300x300"
              alt="placeholder"
              style={{ width: "100%" }}
            />
          </div>
          <div id="block">
            <img
              src="https://via.placeholder.com/300x300"
              alt="placeholder"
              style={{ width: "100%" }}
            />
          </div>
          <div id="block">
            <img
              src="https://via.placeholder.com/300x300"
              alt="placeholder"
              style={{ width: "100%" }}
            />
          </div>
        </Rail>
      </div> */}
    </>
  );
};
export default App;
