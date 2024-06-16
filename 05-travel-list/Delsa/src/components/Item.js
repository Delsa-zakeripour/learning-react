import React from "react";

export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-throught" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        style={{ color: "red", fontWeight: "bolder" }}
        onClick={() => onDeleteItem(item.id)}
      >
        X
      </button>
    </li>
  );
  
}
