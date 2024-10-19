import "../../src/MusicPlayer.css";
import { useContext, useEffect, useState } from "react";
import Card from "../components/Music/Card";
import Navbar from "../components/Music/Navbar";
import { MusicContext } from "../helpers/Context";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function MusicPlayer() {
  const [keyword, setKeyword] = useState("Workout Songs");
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

  const fetchMusicData = async (searchKeyword = "") => {
    if (!token) return; // Check if token is available
    setTracks([]);
    window.scrollTo(0, 0);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchKeyword}&type=track&offset=${resultOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Waiting For User Input in Search");
      }

      const jsonData = await response.json();
      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      setIsLoading(true);
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

  useEffect(() => {
    if (token) {
      fetchMusicData(keyword); // Fetch music data for the initial keyword
    }
  }, [token, keyword, resultOffset]); // Add resultOffset to re-fetch when changing pages

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={(event) => {
          if (event.key === "Enter") {
            setResultOffset(0);
          }
        }}
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
              fetchMusicData(keyword);
            }}
            className="btn btn-outline-success w-1/2 flex items-center justify-center"
            disabled={resultOffset === 0}
          >
            <FaArrowLeft />
            <span className="ml-2">Previous</span>
          </button>
          <button
            onClick={() => {
              setResultOffset((previous) => previous + 20);
              fetchMusicData(keyword);
            }}
            className="btn btn-outline-success w-1/2 flex items-center justify-center"
          >
            <FaArrowRight />
            <span className="ml-2">Next</span>
          </button>
        </div>

        {message && (
          <div className="text-center text-danger py-2">
            <h4>{message}</h4>
          </div>
        )}

        <div className="text-center py-5">
          <h1>
            <i className="bi bi-music-note-list mx-3 size-8"></i>
            FitSocially
          </h1>

          <div>
            <a
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-dark"
              href="https://spotify.com"
            >
              <i className="bi bi-github mx-2 "></i>©SPOTIFY
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
