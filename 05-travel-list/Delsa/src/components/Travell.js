import React, { useState } from "react";
import "../Travell.css";
import PackingList from "./PackageList";
import Form from "./Form";
import Stats from "./Stats";

// const initialItems = [
//   { id: 1, description: "passport", quantity: 2, packed: false },
//   { id: 2, description: "socks", quantity: 12, packed: true },
//   { id: 3, description: "charger", quantity: 1, packed: true },
// ];
export default function Travell() {
  const { items, setItems } = useState([]);

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
        onDeleteItem={handleDeleteItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> Far Away</h1>
}
