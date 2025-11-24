"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Playlist {
  id: number;
  name: string;
  description: string;
  genre: string;
  mood: string;
  createdAt: string;
}

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch("/api/playlists");
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this playlist?")) return;

    try {
      const response = await fetch(`/api/playlists/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPlaylists();
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5">My Playlists</h1>
        <a href="/playlists/new" className="btn btn-primary">
          + Create Playlist
        </a>
      </div>

      {playlists.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <h5>No playlists yet!</h5>
          <p>Create your first playlist to get started.</p>
        </div>
      ) : (
        <div className="row">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{playlist.name}</h5>
                  <p className="card-text text-muted">{playlist.description}</p>
                  <div className="mb-3">
                    <span className="badge bg-primary me-2">{playlist.genre}</span>
                    <span className="badge bg-secondary">{playlist.mood}</span>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      onClick={() => router.push(`/playlists/${playlist.id}`)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </button>
                    <div className="btn-group" role="group">
                      <button
                        onClick={() =>
                          router.push(`/playlists/${playlist.id}/edit`)
                        }
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(playlist.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}