"use client";

import { useState } from "react";

interface Track {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_medium: string;
  };
  preview: string;
  duration: number;
}

export default function ExplorePage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );

  const searchTracks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          `https://api.deezer.com/search?q=${searchQuery}`
        )}`
      );
      const data = await response.json();
      setTracks(data.data || []);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      alert("Failed to fetch tracks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const playPreview = (previewUrl: string) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(previewUrl);
    audio.play();
    setCurrentAudio(audio);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <div className="row justify-content-center mb-4">
        <div className="col-lg-8">
          <h1 className="display-5 text-center mb-4">🎧 Explore Music</h1>
          <p className="text-center text-muted mb-4">
            Search for your favorite songs and artists from Deezer
          </p>
          <form onSubmit={searchTracks}>
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control"
                placeholder="Search for songs, artists, or albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && tracks.length > 0 && (
        <div className="row">
          {tracks.map((track) => (
            <div key={track.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={track.album.cover_medium}
                  className="card-img-top"
                  alt={track.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{track.title}</h5>
                  <p className="card-text text-muted mb-1">{track.artist.name}</p>
                  <p className="card-text">
                    <small className="text-muted">{track.album.title}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Duration: {formatDuration(track.duration)}
                    </small>
                  </p>
                  <button
                    onClick={() => playPreview(track.preview)}
                    className="btn btn-primary btn-sm w-100"
                  >
                    ▶ Play Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && searchQuery && tracks.length === 0 && (
        <div className="alert alert-info text-center" role="alert">
          No tracks found. Try a different search query.
        </div>
      )}
    </div>
  );
}