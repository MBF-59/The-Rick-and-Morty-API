import "./App.css";
// import {allCharacters} from "../data/data"
import axios from "axios";
import Loder from "./components/Loder";
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/Modal";
function App() {
  const [charecters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setIserror] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setfavourites] = useState(()=>JSON.parse(localStorage.getItem("FAVOURITES")) || []);
// console.log(JSON.parse(localStorage.getItem("FAVOURITES")));



  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchdata() {
      try {
        // if (query.length < 5) {
        //   setCharacters([]);
        //   return;
        // }
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
          // ,{ signal }
        );
        setCharacters(data.results.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        // if (error.name !== "AbortError") {
        //   setCharacters([]);
        //   toast(error.response.data.error);
        // }
               setCharacters([]);
          toast(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchdata();

    return () => {
      controller.abort();
    };
  }, [query]);
  console.log();
  const isAddedtofavourite = favourites
    .map((item) => item.id)
    .includes(selectedId);
  const onSelectCharacter = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };
  const onAddFavourite = (id) => {
    setfavourites((prev) => [...prev, id]);
    console.log(favourites);
  };
  const handleRemove=(id)=>{
    setfavourites(favourites.filter(fav => fav.id !==id))
  }
  useEffect(()=>{
  localStorage.setItem("FAVOURITES",JSON.stringify(favourites) )
},[favourites])


  return (
    <div className="app">

      <Toaster />
      <Navbar handleRemove={handleRemove} charecters={charecters} favourites={favourites} setQuery={setQuery} query={query} />

      <div className="main">
        {isLoading ? (
          <Loder />
        ) : (
          <CharacterList
            isLoading={isLoading}
            selectedId={selectedId}
            charecters={charecters}
            onSelectCharacter={onSelectCharacter}
          />
        )}
        <CharacterDetail
          isAddedtofavourite={isAddedtofavourite}
          selectedId={selectedId}
          onAddFavourite={onAddFavourite}
        />
      </div>
    </div>
  );
}
export default App;
