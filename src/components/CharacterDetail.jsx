import { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";
import Loder from "./Loder";
function CharacterDetail({ selectedId, onAddFavourite, isAddedtofavourite }) {
  const [character, setcharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episdoes, setEpisodes] = useState(null);
  const [sortBy, setSortby] = useState(true);
  let sortedEpisodes;
  useEffect(() => {
    try {
      setIsLoading(true);
      // setcharacter([])
      async function fetchData() {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        const episodeId = data.episode.map((e) => {
          return e.split("/").at(-1);
        });
        const { data: episodedata } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setEpisodes(episodedata);
        setcharacter(data);
      }
      if (selectedId) fetchData();
    } catch (error) {
      toast(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedId]);

  if (isLoading) return Loder();

  if (!character || !selectedId) {
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        Please select a character.
      </div>
    );
  }
  if (sortBy) {
    sortedEpisodes = [...episdoes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episdoes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__image"
        />
        <div className="character-detail__info">
          <h3 className="name">
            <span> {character.gender === "Male" ? "👨" : "👩"}</span>
            <span> {character.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${character.status === "Dead" ? "red" : ""}`}
            ></span>
            <span> {character.status}</span>
            <span>-{character.species}</span>
          </div>
          <div className="location">
            <p>Last Known location :</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            {isAddedtofavourite ? (
              <p>Alreadu Add To Favourite</p>
            ) : (
              <button
                className="btn btn--primary"
                onClick={() => {
                  return onAddFavourite(character);
                }}
              >
                Add to Favourite
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List Of Episodes:</h2>
          <button className="title">
            <ArrowUpCircleIcon
              style={{ rotate: sortBy ? "0deg" : "180deg" }}
              onClick={() => setSortby((prev) => !prev)}
              className="icon"
            />
          </button>
        </div>
        <ul>
          {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
<svg width="40" height="40" viewBox="0 0 50 50" fill="none">…</svg>