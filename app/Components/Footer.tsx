"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-5 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
        <p className="text-sm">
          © {new Date().getFullYear()} NextBoard. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-2xl">
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

        <p className="text-xs text-blue-100">
          Built with ❤️ using Next.js, Redux Toolkit & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}