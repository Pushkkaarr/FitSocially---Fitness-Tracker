import React, { useState } from "react";

function CreatePlaylist() {
  const [playlistName, setPlaylistName] = useState("");

  const create = () => {
    let currentPlaylist = localStorage.getItem("allPlaylist");
    currentPlaylist = JSON.parse(currentPlaylist) || {};
    currentPlaylist[playlistName] = []; // Adding new empty playlist with given name
    localStorage.setItem("allPlaylist", JSON.stringify(currentPlaylist));
    // Add logic to close the modal after creating a playlist
  };

  const closeModal = () => {
    // Logic to close the modal (could use a state or context)
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content rounded-lg shadow-lg">
        <div className="modal-header flex justify-between items-center p-4 border-b">
          <h1 className="text-lg font-semibold">New Playlist</h1>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900"
            aria-label="Close"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <div className="modal-body p-4">
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </div>
        <div className="modal-footer flex justify-end p-4 border-t">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2 hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            onClick={create}
            type="button"
            className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylist;
