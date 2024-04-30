import React, { StrictMode } from "react";
import reactDOM from "react-dom/client";
import "./index.css";
import { func } from "prop-types";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div>
    <Header />
    <Menu />
    {/* <Footer /> */}
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>react fast food </h1>
    </header>
  );
}

function Menu() {
  const pizzasList = pizzaData;
  const pizzaNum = pizzaData.length;
  return (
    <main>
      <h2>our menu</h2>
      {pizzaNum > 0 ? (
        <>
          <p>kjdsfldjb lf lidufjisu l kkhhkdbrks;lofd</p>
          <ul>
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>dblfjkdb</p>
      )}
    </main>
  );
}

function Pizza({pizzaObj}) {
  return (
    <li>
      <img src={pizzaObj.photoName} alt={pizzaObj.name}  />
      <div>
        <h3>{pizzaObj.ingredients}</h3>
        <p>{pizzaObj.ingredients}</p>

        {pizzaObj.soldOut ? (
            <span>sold out </span>
        ): (
            <span>{pizzaObj.price}</span>
        )}
      </div>
    </li>
  );
}


function Footer() {
    const hour = new Date().getHours();
    const openHour = 11;
    const closeHour = 23;
    const isOpen = hour >= openHour && hour <= closeHour;
    return(
        <footer>
            {isOpen ?(
                <Order  openHour={openHour} closeHour={closeHour}/>
            ): (
                <p>sorry we're just open between {openHour} and {closeHour}</p>
            )}
        </footer>
    )
}


function Order({openHour, closeHour}) {
    return (
        <div>
                <p>we're open from {openHour} until {closeHour}</p>
                <button >order </button>
        </div>
    )
}
//  const root = reactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <strickMode>
//     <App />
//   </strickMode>
// );


const root = reactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)