import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "../../helpers/Context.jsx";

function LikedMusic() {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const setLikedMusic = musicContext.setLikedMusic;

  useEffect(() => {
    window.scrollTo(0, 0);
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic")) || [];
    setLikedMusic(localLikedMusic);
  }, [setLikedMusic]);

  return (
    <div className="container mx-auto p-4">
      {likedMusic.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <h3 className="text-center text-lg font-semibold mb-4">
            You don't have any liked music yet!
          </h3>
          <div className="text-center">
            <i className="bi bi-emoji-frown text-6xl"></i>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <h1 className="text-2xl text-red-600 font-bold">
            Your Liked Music <i className="bi bi-heart-fill text-red-600"></i>
          </h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {likedMusic.map((element) => (
          <Card key={element.id} element={element} />
        ))}
      </div>
    </div>
  );
}

export default LikedMusic;
