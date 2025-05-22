import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";
import { Character } from "./CharacterList";
function Navbar({ setQuery, query, favourites, charecters,handleRemove }) {
  const[open,setisopen]=useState(false);
  return (
    <>
      {" "}
      <Modal title={"List of Favourites"} open={open}  onclose={()=> setisopen(false)}>
      {
        favourites.map((item,index)=>(
          <Character2 handleRemove={handleRemove} item={item} key={item.id}/>
        ))
      }
      </Modal>
      <nav className="navbar">
        <div className="navbar__logo">LOGO</div>
        <input
          onChange={(e) => { 
            setQuery(e.target.value);
          }}
          type="text"
          value={query}
          className="text-field"
          placeholder="search..."
        />
        <div className="navbar__result">
          Found {charecters.length} characters
        </div>
        <button className="heart">
          <HeartIcon className="icon" onClick={()=>setisopen(true)}/>
          <span className="badge">{favourites.length}</span>
        </button>
      </nav>
    </>
  );
}

export default Navbar;


 function Character2({ item,handleRemove ,index}) {
  return (
    <div key={index} className="list__item  " >
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "👨" : "👩"}</span>
        <span>{item.name}</span>
        <div className="list-item__info">
          <span
            className={`status ${item.status === "Dead" ? "red" : ""}`}
          ></span>
          <span> {item.status}</span>
          <span>-{item.species}</span>
        </div>
      </h3>
      <button className="icon red" onClick={()=>{handleRemove(item.id)}}>
         <TrashIcon/>
      </button>   
    </div>
  );
}

