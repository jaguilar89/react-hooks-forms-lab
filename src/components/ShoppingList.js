import React, { useState } from "react";
import uuid from "react-uuid";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const [newItemCategory, setNewItemCategory] = useState("Produce");
  const [newItemInput, setNewItemInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("")

  function handleNewItemInput(event) {
    setNewItemInput(event.target.value)
  };

  function handleItemAdd(event) {
    event.preventDefault()
    const newItem = {
      id: uuid(),
      name: newItemInput,
      category: newItemCategory
    }
    setItems([...items, newItem])
  };
  
  function handleNewItemCategory(event) {//Category select for new item
    setNewItemCategory(event.target.value)
  };

  function handleCategoryChange(event) { //Category select for filter
    setSelectedCategory(event.target.value);
  };

  function handleSearch(event) { //Search filter
    setSearchInput(event.target.value)
  };

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  }).filter((item => item.name.includes(searchInput)));

  return (
    <div className="ShoppingList">
      <ItemForm 
        onNewItemInput={handleNewItemInput} 
        onNewItemCategoryChange={handleNewItemCategory}
        onItemFormSubmit={handleItemAdd}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearch}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
