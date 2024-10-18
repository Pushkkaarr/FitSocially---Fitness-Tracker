import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MusicContext } from "../../helpers/Context";
import PinnedMusic from "./PinnedMusic";
import LikedMusic from "./LikedMusic";

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic || [];
  const pinnedMusic = musicContext.pinnedMusic || [];
  const setResultOffset = musicContext.setResultOffset;

  return (
    <>
      <nav className="bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link className="text-white text-xl flex items-center" to="/">
            <i className="bi bi-music-note-list mx-3"></i> FitSocially
          </Link>
          {/* <div>
            <button
              type="button"
              className="bg-gray-600 text-white text-sm px-3 py-1 rounded-md mx-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i className="bi bi-pin-angle-fill"></i> {pinnedMusic.length}
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white text-sm px-3 py-1 rounded-md mx-1"
              data-bs-toggle="modal"
              data-bs-target="#likedMusicModal"
            >
              <i className="bi bi-heart-fill"></i> {likedMusic.length}
            </button>
          </div> */}

          <div className="flex items-center space-x-2">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyPress}
              className="bg-gray-700 text-white w-72 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              onClick={() => {
                setResultOffset(0);
                fetchMusicData(keyword);
              }}
              className="bg-green-500 text-white py-2 px-4 rounded-md transition duration-200 hover:bg-green-600"
            >
              Search
            </button>
          </div>
        </div>
      </nav>

      {/* Pinned Music Modal
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      > */}
        {/* <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title text-lg font-semibold" id="exampleModalLabel">
                Pinned Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <PinnedMusic />
            </div>
          </div>
        </div> */}
      {/* </div> */}

      {/* Liked Music Modal
      <div
        className="modal fade"
        id="likedMusicModal"
        tabIndex={-1}
        aria-labelledby="likedMusicModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title text-lg font-semibold" id="likedMusicModalLabel">
                Liked Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <LikedMusic />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
