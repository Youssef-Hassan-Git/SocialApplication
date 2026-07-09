"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  
  return (
<footer className="fixed bottom-0 left-0 w-full bg-blue-500 text-white py-2 px-4 z-50">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <p className="text-xs">
      © {new Date().getFullYear()} NextBoard. All rights reserved.
    </p>

    <p className="text-xs hidden md:block">
      Built with ❤️ using Next.js, Redux Toolkit & Tailwind CSS
    </p>

    <div className="flex items-center gap-4 text-lg">
      <a
        href="https://github.com/Youssef-Hassan-Git"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-200 transition"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>

      <a
        href="https://www.linkedin.com/in/youssef-hassan-professional1/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-200 transition"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
    </div>
  </div>
</footer>
  );
}