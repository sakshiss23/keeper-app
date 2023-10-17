import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Made with ❤️ by Sakshi Singh | ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
