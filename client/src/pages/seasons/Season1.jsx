import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../../assets/styles/seasons.css';

export default function Season1 () {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const response = await axios.get(`https://capstone-back-end-ft5y.onrender.com/api/season1`);
        //const response = await axios.get(`http://localhost:5000/api/season1`);
        const results = response.data.data;
        setEpisodes(results);
      } catch (e) {
        console.error('Error fetching episodes', e);
      } finally {
        setLoading(false);
      }
    };
    getEpisodes();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="season_container">
      <div className="episodes">
        <h2 className="episodes_heading1"><b>Season 1</b></h2>
      </div> 

      <ul className="episode_ul">
        <li className="episode_span1">
          <span>EPISODES</span>
          <span>Original Air Date</span>
        </li>
        {episodes.map((episode) => (
          <li key={episode._id} className="episode_li">
            <Link to={`/api/season1/${episode._id}`} className="epidose_title">{episode.name}</Link>
            <Link to={`/api/season1/${episode._id}`} className="episode_date">{episode.air_date}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

