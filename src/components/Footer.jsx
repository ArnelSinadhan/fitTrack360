import { Container } from "react-bootstrap";
export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto fixed-bottom">
      <Container>
        <p className="mb-0 text-center">© 2024 FitTrack 360°</p>
        <div className="text-center mt-3">
          <a
            href="https://www.facebook.com"
            className="text-light me-3 text-decoration-none">
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            className="text-light me-3 text-decoration-none">
            Twitter
          </a>
          <a
            href="https://www.instagram.com"
            className="text-light text-decoration-none">
            Instagram
          </a>
        </div>
      </Container>
    </footer>
  );
}
