import Loder from "./Loder";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
function CharacterList({ charecters, isLoading,onSelectCharacter,selectedId }) {
  return (
    <div className="characters-list">
      {isLoading ? (
      <Loder />
      ) : (
        charecters.map((item) => <Character selectedId={selectedId} key={item.id} item={item} onSelectCharacter={onSelectCharacter}/>)
      )}
    </div>
  );
}

export default CharacterList;

export  function Character({ item,onSelectCharacter,selectedId }) {
  return (
    <div className="list__item">
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
      <button className="icon red" onClick={()=>{onSelectCharacter(item.id)}}>
      {selectedId ==item.id ?  <EyeSlashIcon/>    :     <EyeIcon />}
      </button>    
    </div>
  );
}
