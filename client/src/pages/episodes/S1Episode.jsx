import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import { CharacterCard } from '../../components/CharacterCard';
import '../../assets/styles/episodes.css';

export default function S1Episode () {
  const { id } = useParams();
  const [episode, setEpisode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEpisode = async () => {
      try {
        //const response = await axios.get(`http://localhost:5000/api/season1/${id}`);
        const response = await axios.get(`https://capstone-back-end-ft5y.onrender.com/api/season1/${id}`);
        const result = response.data.data;
        setEpisode(result);
      } catch (error) {
        console.error(`Error fetching episode`, error);
      } finally {
        setLoading(false);
      }
    };
    getEpisode();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="episode_container">
      <div className="episode">
        <div className="episode_title1">
          <Link className="season1_link" to={`/api/season1`}><b>Season 1</b></Link>
          <span>Episode {episode.num} : {episode.name}</span>
          <div className="btns">
            <Link to={``} className="watch_btn">Watch</Link>
            {/* <Link to={`/api/season1/reviews`} className="review_btn">Reviews</Link> */}
          </div>
        </div>
        <div><h4><b>Plot :</b></h4> 
        <p>Duis cillum fugiat nostrud aliquip do proident. Qui id nostrud cupidatat dolor duis veniam voluptate fugiat exercitation. 
          Occaecat nisi ullamco cupidatat esse esse proident. Culpa fugiat eu sit in. Fugiat velit culpa dolor culpa ullamco nisi ad quis. 
          Fugiat cupidatat reprehenderit occaecat voluptate ullamco minim. Reprehenderit fugiat Lorem consectetur ullamco 
          incididunt voluptate nulla excepteur do labore irure.
        </p></div>
        <div className="characters_container">
          <h4><b>Characters :</b></h4>
          <div className="characters">
          {episode.characters.map((character, index) => (
            <li key={index}>
              <div className="character_list">
                <CharacterCard key={character.id} character={character} />
              </div>
            </li>
          ))}
          </div>
        </div>
      </div> 
    </div>
  );
};