import React, { useEffect, useState } from "react";
import "./Meal.css";

const Meal = () => {
  const [mealData, setMealData] = useState([]);
  const [allMeals, setAllMeals] = useState([]); // store full data to reset
  const [inputData, setInputData] = useState("");
  useEffect(() => {
    const fetchDataFromApi = async () => {
      const api = await fetch("https://dummyjson.com/recipes");
      const data = await api.json();

      console.log(data.recipes);
      setMealData(data.recipes);
      setAllMeals(data.recipes); // store full list for reset
    };
    fetchDataFromApi();
  }, []);

  // filter meals based on cuisines type
  const filterByCuisine = (cuisines) => {
    setMealData(allMeals.filter((meal) => cuisines.includes(meal.cuisine)));
  };

  //reset to all meals
  const resetMeals = () => {
    setMealData(allMeals);
  };

  // filters meals based on search
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setInputData(input);

    if (input === "") {
      setMealData(allMeals); // reset to full lidt when empty
    } else {
      setMealData(
        allMeals.filter((meal) => meal.name.toLowerCase().includes(input))
      );
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "22rem" }}>
        {/* Search input */}
        <div style={{ textAlign: "left", marginTop: "30px" }}>
          <input
            style={{
              padding: "10px",
              width: "300px",
              marginBottom: "20px",
              border: "1px solid grey",
              borderRadius: "5px",
              marginLeft: "20px",
            }}
            type="text"
            placeholder="Search your meal"
            value={inputData}
            onChange={handleSearch}
          />
        </div>
        <div style={{ textAlign: "right", marginTop: "30px" }}>
          <button
            onClick={resetMeals}
            type="button"
            className="btn btn-outline-primary"
            style={{ marginRight: "20px" }}
          >
            All
          </button>

          <button
            onClick={() =>
              filterByCuisine(["Italian", "Moroccan", "Greek", "Mediterranean"])
            }
            type="button"
            className="btn btn-outline-secondary"
            style={{ marginRight: "20px" }}
          >
            Italian
          </button>
          <button
            onClick={() => filterByCuisine(["American"])}
            type="button"
            className="btn btn-outline-success"
            style={{ marginRight: "20px" }}
          >
            American
          </button>

          <button
            onClick={() => filterByCuisine(["Mexican"])}
            type="button"
            className="btn btn-outline-warning"
            style={{ marginRight: "20px" }}
          >
            Mexican
          </button>
          <button
            onClick={() =>
              filterByCuisine([
                "Asian",
                "Indian",
                "Pakistani",
                "Japanese",
                "Korean",
                "Thia",
                "Labanese",
                "Turkish",
                "Smoothie",
              ])
            }
            type="button"
            className="btn btn-outline-primary"
            style={{ marginRight: "20px" }}
          >
            Asian
          </button>

          <button
            onClick={() => filterByCuisine(["Russian"])}
            type="button"
            className="btn btn-outline-dark"
            style={{ marginRight: "20px" }}
          >
            Russian
          </button>

          <button
            onClick={() => filterByCuisine(["Brazilian"])}
            type="button"
            className="btn btn-outline-danger"
            style={{ marginRight: "20px" }}
          >
            Brazilian
          </button>
        </div>
      </div>

      <h3
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "50px",
          color: "chocolate",
          fontFamily: "cursive",
        }}
      >
        My Meal Zone
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          justifyContent: "center",
          alignItems: "center",
          width: "1000px",
          margin: "auto",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        {mealData.map((data) => (
          <div key={data.id} style={{ maxWidth: "350px", textAlign: "center" }}>
            <div>
              {" "}
              <img
                className="images"
                src={data.image}
                alt=""
                style={{
                  width: "230px",
                  border: "3px solid darkslateblue",
                  borderRadius: "7px",
                  marginBottom: "20px",
                }}
              />
            </div>
            <h6 style={{ fontStyle: "italic" }}>{data.name}</h6>
          </div>
        ))}
      </div>
    </>
  );
};

export default Meal;
