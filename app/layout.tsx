import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music Playlist Manager",
  description: "Manage your music playlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container">
            <a className="navbar-brand" href="/">
              🎵 Music Playlist Manager
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/playlists">
                    My Playlists
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/explore">
                    Explore Music
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}