export default function Home() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5 text-center">
              <div className="mb-4">
                <span style={{ fontSize: "5rem" }}>🎵</span>
              </div>
              <h1 className="display-4 fw-bold mb-3">Music Playlist Manager</h1>
              <hr className="my-4" />
              <div className="mb-4">
                <h5 className="text-muted mb-3">Project Information</h5>
                <p className="mb-2">
                  <strong>Nama:</strong> Rivaldo Marcellino Patty
                </p>
                <p className="mb-2">
                  <strong>NIM:</strong> 535240202
                </p>
                <p className="mb-4">
                  <strong>Topik:</strong> Music Playlist Manager
                </p>
              </div>
              <div className="alert alert-info" role="alert">
                <h6 className="alert-heading">📝 About This Project</h6>
                <p className="mb-0">
                  A web application to manage your personal music playlists. 
                  Create, edit, and organize your favorite music collections. 
                  Explore trending music from around the world!
                </p>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <a href="/playlists" className="btn btn-primary btn-lg px-4">
                  My Playlists
                </a>
                <a href="/explore" className="btn btn-outline-secondary btn-lg px-4">
                  Explore Music
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}