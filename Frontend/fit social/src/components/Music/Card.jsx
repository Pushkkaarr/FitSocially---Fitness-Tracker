import React, { useContext, useEffect } from "react";
import { MusicContext } from "../../helpers/Context";

function Card({ element }) {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const setLikedMusic = musicContext.setLikedMusic;
  const pinnedMusic = musicContext.pinnedMusic;
  const setPinnedMusic = musicContext.setPinnedMusic;

  const handlePin = () => {
    let pinnedMusic = localStorage.getItem("pinnedMusic");
    pinnedMusic = JSON.parse(pinnedMusic) || [];
    let updatedPinnedMusic = [];

    if (pinnedMusic.some((item) => item.id === element.id)) {
      updatedPinnedMusic = pinnedMusic.filter((item) => item.id !== element.id);
    } else {
      if (pinnedMusic.length < 4) {
        updatedPinnedMusic = [...pinnedMusic, element];
      }
    }

    setPinnedMusic(updatedPinnedMusic);
    localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
  };

  const handleLike = () => {
    let likedMusic = localStorage.getItem("likedMusic");
    likedMusic = JSON.parse(likedMusic) || [];
    let updatedLikedMusic = [];

    if (likedMusic.some((item) => item.id === element.id)) {
      updatedLikedMusic = likedMusic.filter((item) => item.id !== element.id);
    } else {
      updatedLikedMusic = [...likedMusic, element];
    }

    setLikedMusic(updatedLikedMusic);
    localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
  };

  useEffect(() => {
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic")) || [];
    setLikedMusic(localLikedMusic);
  }, [setLikedMusic]);

  return (
    <div key={element.id} className="flex-1 min-w-[200px] max-w-[250px] p-2">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full font-cambria">
        <div className="bg-gray-200 h-64">
          <img
            src={element.album.images[0].url}
            className="object-cover w-full h-full"
            alt={element.name}
          />
        </div>
        <div className="p-4 flex-grow">
          <h5 className="text-lg font-semibold flex justify-between items-center">
            {element.name}
            <div className="flex items-center">
              {/* <button onClick={handlePin} className="text-gray-800 mx-1">
                {pinnedMusic.some((item) => item.id === element.id) ? (
                  <i className="bi bi-pin-angle-fill"></i>
                ) : (
                  <i className="bi bi-pin-angle"></i>
                )}
              </button> 
               <button onClick={handleLike} className="text-gray-800">
                {likedMusic.some((item) => item.id === element.id) ? (
                  <i className="bi bi-heart-fill text-red-500"></i>
                ) : (
                  <i className="bi bi-heart"></i>
                )}
              </button> */}
            </div>
          </h5>
          <p className="text-gray-600">Artist: {element.album.artists[0].name}</p>
        </div>
        <audio src={element.preview_url} controls className="w-full mt-4" />
      </div>
    </div>
  );
}

export default Card;
