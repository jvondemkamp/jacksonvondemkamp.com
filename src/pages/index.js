import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll('.parallax, .content-section');
    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          entry.target.classList.remove('fade-out');
          document.body.classList.add('bg-transition');
          document.body.style.backgroundColor = getComputedStyle(entry.target).backgroundColor;
        } else {
          entry.target.classList.add('fade-out');
          entry.target.classList.remove('fade-in');
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <Layout>
      <div id="home" className="parallax fade-out">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/video2_o.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex flex-col items-start justify-start min-h-screen p-8">
          <h1 className="text-6xl md:text-5xl sm:text-4xl font-bold typing">Jackson Vondemkamp</h1>
          <p className="mt-3 text-2xl md:text-xl sm:text-lg typing-subtext">
            Portfolio Website With Projects and Resume
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-5"></div>
      </div>

      <div id="about" className="content-section flex flex-col md:flex-row items-center justify-center" style={{ fontFamily: 'Hind' }}>
        <img src="/me.jpeg" alt="Jackson Vondemkamp" className="w-1/2 md:w-1/3 rounded-lg shadow-lg" />
        <div className="mt-8 md:mt-0 md:ml-8 text-center md:text-left">
          <h1 className="text-6xl font-bold">About Me</h1>
          <p className="mt-3 text-2xl">
            I am a student developer at University of Colorado, Boulder studying Computer Science. I am interested in full-stack development, data science, and also product management!
          </p>
          <div className="mt-4 flex justify-center md:justify-start">
            <a href="https://www.linkedin.com/in/jackson-vondemkamp/" target="_blank" rel="noopener noreferrer" className="mr-4">
              <img src="/linkedin.svg" alt="LinkedIn" className="w-8 h-8" />
            </a>
            <a href="https://github.com/jvondemkamp" target="_blank" rel="noopener noreferrer">
              <img src="/github.svg" alt="GitHub" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>

      <div className="parallax fade-out" style={{ backgroundImage: 'url(/sunset.jpeg)' }}>
      </div>

      <div id="projects" className="content-section" style={{ fontFamily: 'Hind' }}>
        <h1 className="text-6xl font-bold">Projects</h1>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center">
          <img src="/stanvideo.gif" alt="Stan App" className="w-1/2 md:w-1/3 rounded-lg shadow-lg" />
          <div className="mt-8 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-4xl font-bold">stan!</h2>
            <p className="mt-3 text-2xl">
              A web application that allows users to search for their favorite artists and songs, and receive recommendations for similar music.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center">
          <img src="/personal_website_video.gif" alt="Personal Website" className="w-1/2 md:w-1/3 rounded-lg shadow-lg" />
          <div className="mt-8 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-4xl font-bold">Personal Website</h2>
            <p className="mt-3 text-2xl">
              Using Next.js, Tailwind CSS, and Netlify, I created this portfolio website to showcase my projects and resume.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center">
          <div className="mt-8 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-4xl font-bold">Memory Allocator</h2>
            <p className="mt-3 text-2xl">
              Developed a memory allocator for C programs using a red-black tree-based dynamic storage allocation technique, significantly improving allocation and deallocation speed with O(log n) time complexity.
            </p>
            <p className="mt-3 text-2xl">
              Achieved a 30x performance improvement in memory management, minimizing fragmentation and optimizing allocation times for large datasets.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center">
          <div className="mt-8 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-4xl font-bold">Image Filter</h2>
            <p className="mt-3 text-2xl">
              Achieved a 25× speedup in image filtering by applying 2×2 loop unrolling, optimizing memory access, and reducing redundant computations.
            </p>
            <p className="mt-3 text-2xl">
              Improved cache efficiency by restructuring loops to align with row-major storage, minimizing memory references and optimizing divisor calculations.
            </p>
          </div>
        </div>
      </div>

      <div className="parallax fade-out" style={{ backgroundImage: 'url(/goat_lake.jpeg)' }}>
      </div>

      <div id="resume" className="content-section" style={{ fontFamily: 'Hind' }}>
        <h1 className="text-6xl font-bold">Resume</h1>
        <p className="mt-3 text-2xl">
          View and download my resume!
        </p>
        <embed src="/jacksonvondemkamp-resume-2025.pdf" type="application/pdf" width="100%" height="600px" className="mt-4 rounded-lg shadow-lg" />
        <a href="/jacksonvondemkamp-resume-2025.pdf" download className="download-button mt-4">
          Download Resume
        </a>
      </div>

      <div className="parallax fade-out" style={{ backgroundImage: 'url(/vesper.jpeg)' }}>
      </div>
    </Layout>
  );
}
