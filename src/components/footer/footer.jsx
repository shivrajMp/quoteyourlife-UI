// import styled from "styled-components";
import "./footer.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { YouTube, LinkedIn } from "@mui/icons-material";

// import theme from "../../styles/theme";
function Footer(prop) {
  const currentYear = new Date().getFullYear();
  return (
    <footer class="footer">
      <div class="parent_footer">
        <div class="social-links">
        <h5>Connect</h5>
          <a href="https://www.youtube.com/@kotiamaru5250" target="_blank">
            {/* <YouTube sx={{ color: "#ff5733" }} />{" "} */}
            <span className="clickme_">My drawing Channel</span>
          </a>
          <a
            href="https://www.linkedin.com/in/shivraj-pattanshetti-bb70b2120/"
            target="_blank"
          >
            {/* <LinkedIn sx={{ color: "#1976d2" }} />{" "} */}
            <span className="clickme_">Feedback / Hire me </span>
          </a>
        </div>
        <div class="product-link">
          <h5>Products</h5>
          <a href="https://shivcolorgame.web.app/" target="_blank">
            <span className="clickme_">Color Game (Javascript) </span>
          </a>
          <a href="https://shivcovid19india.web.app/" target="_blank">
            <span className="clickme_">COVID App (Server down) </span>
          </a>
          <a href="https://shivrajmp.github.io/myApp/" target="_blank">
            <span className="clickme_">Simple Angular (Typescript)</span>
          </a>
          <a href="https://shivrajmp.github.io/cinemanima" target="_blank">
            <span className="clickme_">React Application - Cinemanima</span>
          </a>
        </div>
      </div>
      <div class="copyright">
        &copy; <span id="currentYear">{currentYear}</span> Quote Your Life
      </div>
    </footer>
  );
}
export default Footer;
