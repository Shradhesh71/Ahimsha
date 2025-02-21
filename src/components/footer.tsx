import { Twitter, Facebook, Globe } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" text-white py-10 border-t-2 pl-5 pr-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl font-bold font-mono">Ahimsha</h2>
            <p className="text-sm mt-2">An AI-powered Ahimsha experience.</p>
          </div>

          {/* Middle Section */}
          <div className="flex flex-wrap justify-center flex-col md:justify-start space-x-8 mb-6 md:mb-0">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
              <ul className="grid grid-cols-2 ">
                <li>
                  <a href="https://archive.org/details/tattvarthbook10webf/mode/2up" target="_blank" className="hover:underline">
                  Tattvartha Sutra
                  </a>
                </li>
                <li>
                  <a href="https://www.jainfoundation.in/JAINLIBRARY/books/agam_30_mool_03_uttaradhyayana_sutra_sthk_002912_std.pdf" target="_blank" className="hover:underline">
                  Uttaradhyayana Sutra
                  </a>
                </li>
                <li>
                  <a href="https://www.jainfoundation.in/JAINLIBRARY/books/agam_01_ang_01_acharanga_sutra_003238_hr.pdf" target="_blank" className="hover:underline">
                  Acharanga Sutra
                  </a>
                </li>
                <li>
                  <a href="https://mangalayatan.com/images/shastra-bhandar/ChhadhaalaaHindiEnglish/Chahdhala-Hindi-Sachitra.pdf" target="_blank" className="hover:underline">
                  Chahdhala
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-secondary mb-4">
              Truthful Wisdom | Compassionate Guidance | Spiritual Enlightenment
              </p>
              <p className="text-sm">
                <Link
                  href="mailto:shradeshjain123@gmail.com"
                  className="text-secondary hover:text-accent"
                >
                  Contact Developer: Shradhesh71
                </Link>
              </p>
              <p className="text-sm mt-2">
                &copy; {new Date().getFullYear()} Ahimsha. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://x.com/Shradeshjain835"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5 hover:text-gray-200" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5 hover:text-gray-200" />
              </a>
              <a
                href="https://ahimsha.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-5 h-5 hover:text-gray-200" />
              </a>
            </div>
            <p className="text-sm mt-4">
              Reach us at:{" "}
              <a href="mailto:support@ahimsha.com" className="underline">
                support@ahimsha.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
