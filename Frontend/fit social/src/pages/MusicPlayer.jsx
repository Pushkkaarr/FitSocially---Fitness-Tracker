import "../../src/MusicPlayer.css"; // Update the CSS file as needed
import { useContext, useEffect, useState } from "react";
import Card from "../components/Music/Card";
import CreatePlaylist from "../components/Music/CreatePlaylist";
import initializePlaylist from "../helpers/initialize";
import Navbar from "../components/Music/Navbar";
import { MusicContext } from "../helpers/Context";

function MusicPlayer() {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);

  const musicContext = useContext(MusicContext);
  const isLoading = musicContext.isLoading;
  const setIsLoading = musicContext.setIsLoading;
  const setLikedMusic = musicContext.setLikedMusic;
  const setPinnedMusic = musicContext.setPinnedMusic;
  const resultOffset = musicContext.resultOffset;
  const setResultOffset = musicContext.setResultOffset;

  const fetchMusicData = async () => {
    setTracks([]);
    window.scrollTo(0, 0);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track&offset=${resultOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch music data");
      }

      const jsonData = await response.json();
      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setResultOffset(0);
      fetchMusicData();
    }
  };

  useEffect(() => {
    initializePlaylist();

    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials&client_id=a77073181b7d48eb90003e3bb94ff88a&client_secret=68790982a0554d1a83427e061e371507",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const jsonData = await response.json();
        setToken(jsonData.access_token);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchToken();
    setLikedMusic(JSON.parse(localStorage.getItem("likedMusic")));
    setPinnedMusic(JSON.parse(localStorage.getItem("pinnedMusic")));
  }, [setIsLoading, setLikedMusic, setPinnedMusic]);

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={fetchMusicData}
      />

      <div className="container mx-auto p-4">
        {isLoading && (
          <div className="flex justify-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap justify-between p-4">
  {tracks.map((element) => (
    <Card key={element.id} element={element} />
  ))}
</div>




        <div className={`flex justify-between my-4 ${tracks.length === 0 ? 'hidden' : ''}`}>
          <button
            onClick={() => {
              setResultOffset((previous) => Math.max(previous - 20, 0));
              fetchMusicData();
            }}
            className="btn btn-outline-success w-1/2"
            disabled={resultOffset === 0}
          >
            Previous Page: {resultOffset / 20}
          </button>
          <button
            onClick={() => {
              setResultOffset((previous) => previous + 20);
              fetchMusicData();
            }}
            className="btn btn-outline-success w-1/2"
          >
            Next Page: {resultOffset / 20 + 2}
          </button>
        </div>

        {message && (
          <div className="text-center text-danger py-2">
            <h4>{message}</h4>
          </div>
        )}

        <div className="text-center py-5">
          <h1>
            <i className="bi bi-music-note-list mx-3"></i>
           FitSocially
          </h1>
          <h3 className="py-5">Discover music in 30 seconds</h3>
          <div>
            <a
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-dark"
              href="https://spotify.com"
            >
              <i className="bi bi-github mx-2"></i>©SPOTIFY
            </a>
          </div>
        </div>
      </div>

      <div
        className="modal fade position-absolute"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <CreatePlaylist />
      </div>
    </>
  );
}

export default MusicPlayer;
