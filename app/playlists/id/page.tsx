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
  updatedAt: string;
}

export default function PlaylistDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    try {
      const response = await fetch(`/api/playlists/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPlaylist(data);
      } else {
        router.push("/not-found");
      }
    } catch (error) {
      console.error("Error fetching playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this playlist?")) return;

    try {
      const response = await fetch(`/api/playlists/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/playlists");
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

  if (!playlist) {
    return null;
  }

  return (
    <div className="container">
      <button
        onClick={() => router.push("/playlists")}
        className="btn btn-outline-secondary mb-4"
      >
        ← Back to Playlists
      </button>

      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">🎵 {playlist.name}</h2>
        </div>
        <div className="card-body p-4">
          <div className="row mb-4">
            <div className="col-md-6">
              <h5 className="text-muted">Description</h5>
              <p className="lead">{playlist.description}</p>
            </div>
            <div className="col-md-6">
              <h5 className="text-muted">Details</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Genre:</strong>{" "}
                  <span className="badge bg-primary">{playlist.genre}</span>
                </li>
                <li className="mb-2">
                  <strong>Mood:</strong>{" "}
                  <span className="badge bg-secondary">{playlist.mood}</span>
                </li>
                <li className="mb-2">
                  <strong>Created:</strong>{" "}
                  {new Date(playlist.createdAt).toLocaleDateString()}
                </li>
                <li>
                  <strong>Last Updated:</strong>{" "}
                  {new Date(playlist.updatedAt).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>

          <hr />

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              onClick={() => router.push(`/playlists/${playlist.id}/edit`)}
              className="btn btn-warning"
            >
              Edit Playlist
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete Playlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}