export default function NotFound() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="col-lg-6 text-center">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div style={{ fontSize: "6rem" }} className="mb-3">
                🎵
              </div>
              <h1 className="display-1 fw-bold text-primary">404</h1>
              <h2 className="mb-4">Page Not Found</h2>
              <p className="lead text-muted mb-4">
                Oops! The page you are looking for does not exist. 
                It might have been moved or deleted.
              </p>
              <div className="alert alert-warning" role="alert">
                <strong>Lost in the music?</strong> Let get you back on track!
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <a href="/" className="btn btn-primary btn-lg">
                  Go Home
                </a>
                <a href="/playlists" className="btn btn-outline-secondary btn-lg">
                  View Playlists
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}