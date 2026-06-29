"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

export default function StorySection() {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    const rotate = (el, deg, cx, cy, r1, r2) => {
      if (!el) return;
      const rad = ((deg - 90) * Math.PI) / 180;
      el.setAttribute("x1", cx - r1 * Math.cos(rad));
      el.setAttribute("y1", cy - r1 * Math.sin(rad));
      el.setAttribute("x2", cx + r2 * Math.cos(rad));
      el.setAttribute("y2", cy + r2 * Math.sin(rad));
    };

    let frameId;
    const tick = () => {
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      rotate(hourRef.current, hr * 30, 150, 150, 10, 58);
      rotate(minuteRef.current, min * 6, 150, 150, 14, 82);
      rotate(secondRef.current, sec * 6, 150, 150, 16, 90);

      frameId = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(frameId);
  }, []);

  // Hour tick marks
  const hourMarks = Array.from({ length: 12 }, (_, i) => {
    const rad = ((i * 30 - 90) * Math.PI) / 180;
    const isQuarter = i % 3 === 0;
    const x1 = 150 + 116 * Math.cos(rad);
    const y1 = 150 + 116 * Math.sin(rad);
    const x2 = 150 + 126 * Math.cos(rad);
    const y2 = 150 + 126 * Math.sin(rad);
    return (
      <line
        key={i}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={isQuarter ? "#B8943A" : "#C8C3BB"}
        strokeWidth={isQuarter ? 1.8 : 0.8}
      />
    );
  });

  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "96px 52px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400;500&display=swap');
      `}</style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        className="story-inner"
      >
        {/* ── VISUAL ── */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              bottom: "-24px",
              left: "-24px",
              width: "70%",
              aspectRatio: "1",
              background: "#F0EDE7",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #DDD9D1",
              background: "#F8F6F2",
            }}
          >
            <svg viewBox="0 0 300 300" width="80%" height="80%">
              <circle cx="150" cy="150" r="144" fill="none" stroke="#DDD9D1" strokeWidth="1" />
              <circle cx="150" cy="150" r="128" fill="none" stroke="#E8E3DA" strokeWidth="0.5" />
              <g>{hourMarks}</g>

              <text x="150" y="50" textAnchor="middle" fill="#B8943A" fontSize="10" letterSpacing="2" fontFamily="Cormorant Garamond, serif">XII</text>
              <text x="248" y="155" textAnchor="middle" fill="#B8943A" fontSize="10" letterSpacing="2" fontFamily="Cormorant Garamond, serif">III</text>
              <text x="150" y="258" textAnchor="middle" fill="#B8943A" fontSize="10" letterSpacing="2" fontFamily="Cormorant Garamond, serif">VI</text>
              <text x="52" y="155" textAnchor="middle" fill="#B8943A" fontSize="10" letterSpacing="2" fontFamily="Cormorant Garamond, serif">IX</text>

              <line ref={hourRef} x1="150" y1="150" x2="150" y2="85" stroke="#1A1714" strokeWidth="3" strokeLinecap="round" />
              <line ref={minuteRef} x1="150" y1="150" x2="150" y2="52" stroke="#1A1714" strokeWidth="2" strokeLinecap="round" />
              <line ref={secondRef} x1="150" y1="168" x2="150" y2="42" stroke="#B8943A" strokeWidth="1.2" strokeLinecap="round" />

              <circle cx="150" cy="150" r="5" fill="#B8943A" />
              <circle cx="150" cy="150" r="2.5" fill="#F8F6F2" />
            </svg>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "-24px",
              right: "-24px",
              zIndex: 2,
              width: "110px",
              height: "110px",
              background: "#B8943A",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", color: "#FFFFFF", lineHeight: 1 }}>
              1990
            </div>
            <div style={{ fontSize: "8px", letterSpacing: "0.22em", color: "rgba(255,255,255,0.8)", marginTop: "3px" }}>
              FOUNDED
            </div>
          </div>
        </div>

        {/* ── TEXT ── */}
        <div>
          <p style={{ fontSize: "10px", letterSpacing: "0.38em", textTransform: "uppercase", color: "#B8943A", marginBottom: "14px" }}>
            Our Heritage
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 4vw, 54px)",
              fontWeight: 300,
              lineHeight: 1.06,
              color: "#1A1714",
              margin: 0,
            }}
          >
            A Journey<br />
            <em style={{ fontStyle: "italic", color: "#B8943A" }}>Through Time</em>
          </h2>
          <div style={{ width: "40px", height: "1px", background: "#B8943A", margin: "22px 0" }} />

          <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#9B9490", marginBottom: "14px" }}>
            Every great story starts small — ours began in the early 1990s, when
            passion met perseverance. Our founder Rajkumar Chhatwani set out to
            build more than a business — he began shaping a legacy.
          </p>
          <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#9B9490", marginBottom: "14px" }}>
            From a modest repair shop to a name that resonates with trust and
            precision, his vision has always been rooted in authenticity and
            excellence.
          </p>

          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "26px",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#B8943A",
              lineHeight: 1.45,
              borderLeft: "2px solid #B8943A",
              paddingLeft: "24px",
              margin: "32px 0",
            }}
          >
            "We don't just mark time — we celebrate it, one masterpiece at a
            time."
          </div>

          <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#9B9490", marginBottom: "14px" }}>
            Today, we curate world-class timepieces from Fossil, Tommy
            Hilfiger, Casio, and Police to Indian icons like Titan and Sonata.
            Each stands as a testament to grace and timeless design.
          </p>

          <Link
            href="#contact"
            style={{
              marginTop: "32px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 30px",
              background: "#1A1714",
              color: "#FFFFFF",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Connect With Us
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .story-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
