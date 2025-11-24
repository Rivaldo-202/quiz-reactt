"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPlaylistPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    genre: "",
    mood: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    try {
      const response = await fetch(`/api/playlists/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name,
          description: data.description,
          genre: data.genre,
          mood: data.mood,
        });
      }
    } catch (error) {
      console.error("Error fetching playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/playlists/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/playlists/${params.id}`);
      } else {
        alert("Failed to update playlist");
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
      alert("Error updating playlist");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title mb-4">Edit Playlist</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Playlist Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description *
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">
                    Genre *
                  </label>
                  <select
                    className="form-select"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a genre</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Classical">Classical</option>
                    <option value="Electronic">Electronic</option>
                    <option value="R&B">R&B</option>
                    <option value="Country">Country</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="mood" className="form-label">
                    Mood *
                  </label>
                  <select
                    className="form-select"
                    id="mood"
                    name="mood"
                    value={formData.mood}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a mood</option>
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Energetic">Energetic</option>
                    <option value="Relaxed">Relaxed</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Motivational">Motivational</option>
                  </select>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? "Updating..." : "Update Playlist"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push(`/playlists/${params.id}`)}
                    className="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}