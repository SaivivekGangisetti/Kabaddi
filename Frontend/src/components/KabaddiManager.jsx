import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const KabaddiManager = () => {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({
    id: '',
    playername: '',
    playertype: '',
    position: '',
    teamname: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedPlayer, setFetchedPlayer] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/kabaddiapi`;

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  const fetchAllPlayers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setPlayers(res.data);
    } catch (error) {
      setMessage('Failed to fetch players.');
    }
  };

  const handleChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in player) {
      if (!player[key] || player[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addPlayer = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, player);
      setMessage('Player added successfully.');
      fetchAllPlayers();
      resetForm();
    } catch (error) {
      setMessage('Error adding player.');
    }
  };

  const updatePlayer = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, player);
      setMessage('Player updated successfully.');
      fetchAllPlayers();
      resetForm();
    } catch (error) {
      setMessage('Error updating player.');
    }
  };

  const deletePlayer = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllPlayers();
    } catch (error) {
      setMessage('Error deleting player.');
    }
  };

  const getPlayerById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedPlayer(res.data);
      setMessage('');
    } catch (error) {
      setFetchedPlayer(null);
      setMessage('Player not found.');
    }
  };

  const handleEdit = (pl) => {
    setPlayer(pl);
    setEditMode(true);
    setMessage(`Editing player with ID ${pl.id}`);
  };

  const resetForm = () => {
    setPlayer({
      id: '',
      playername: '',
      playertype: '',
      position: '',
      teamname: ''
    });
    setEditMode(false);
  };

  return (
    <div className="student-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>🏆 PRO KABADDI - Player Management</h2>

      <div>
        <h3>{editMode ? 'Edit Player' : 'Add Player'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={player.id} onChange={handleChange} />
          <input type="text" name="playername" placeholder="Player Name" value={player.playername} onChange={handleChange} />
          <select name="playertype" value={player.playertype} onChange={handleChange}>
            <option value="">Select Player Type</option>
            <option value="Raider">Raider</option>
            <option value="Defender">Defender</option>
            <option value="All-Rounder">All-Rounder</option>
          </select>
          <input type="text" name="position" placeholder="Position" value={player.position} onChange={handleChange} />
          <input type="text" name="teamname" placeholder="Team Name" value={player.teamname} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addPlayer}>Add Player</button>
          ) : (
            <>
              <button className="btn-green" onClick={updatePlayer}>Update Player</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Player By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getPlayerById}>Fetch</button>

        {fetchedPlayer && (
          <div>
            <h4>Player Found:</h4>
            <pre>{JSON.stringify(fetchedPlayer, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Players</h3>
        {players.length === 0 ? (
          <p>No players found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(player).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((pl) => (
                  <tr key={pl.id}>
                    {Object.keys(player).map((key) => (
                      <td key={key}>{pl[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(pl)}>Edit</button>
                        <button className="btn-red" onClick={() => deletePlayer(pl.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default KabaddiManager;
