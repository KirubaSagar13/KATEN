import React, { useEffect, useState, useRef } from "react";

type Slide = {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  image: string;
};

const HeroSlider: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    fetch("http://reactwpbackend.local/wp-json/wp/v2/posts?_embed")
      .then((res) => res.json())
      .then((data) => {
        const sliderData = data
          .map((post: any) => ({
            id: post.id,
            category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Category",
            title: post.title.rendered,
            author: post._embedded?.author?.[0]?.name || "Katen Theme",
            date: new Date(post.date).toLocaleDateString(),
            image:
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              post.content.rendered.match(/<img.*?src=["'](.*?)["']/)?.[1] ||
              "",
          }))
          .filter((slide: Slide) => slide.image !== "")
          .filter((slide: Slide) => slide.category === "Politic"); // only show specific category
        setSlides(sliderData);
      })
      .catch((err) => console.error("Error fetching slides:", err));
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    startAutoPlay();
    return stopAutoPlay;
  }, [slides]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const goTo = (i: number) => setIndex(i);

  if (slides.length === 0) return <div>Loading slides...</div>;

  return (
    // Centered container for alignment with posts/sidebar
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 20px" }} onMouseEnter={stopAutoPlay} onMouseLeave={startAutoPlay}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 520,
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        {/* Slide Image */}
        <img
          src={slides[index].image}
          alt={slides[index].title}
          style={{ width: "100%", height: "520px", objectFit: "cover" }}
        />

        {/* Slide Info */}
        <div
          style={{
            position: "absolute",
            left: 40,
            bottom: 48,
            right: 40,
            color: "#fff",
            textShadow: "0 6px 18px rgba(0,0,0,0.6)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "7px 14px",
              borderRadius: 20,
              background: "linear-gradient(90deg,#ff5f6d,#ffc371)",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {slides[index].category}
          </span>

          <h2
            style={{
              margin: "14px 0",
              fontSize: 32,
              lineHeight: 1.12,
              maxWidth: "70%",
            }}
          >
            {slides[index].title}
          </h2>

          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.95)" }}>
            {slides[index].author} • {slides[index].date}
          </div>
        </div>

        {/* Prev / Next Buttons */}
        <button
          onClick={prev}
          aria-label="Prev"
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.45)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.45)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ›
        </button>

        {/* Dots Navigation */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
          }}
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === index ? 12 : 8,
                height: i === index ? 12 : 8,
                borderRadius: "50%",
                border: "none",
                background: i === index ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
