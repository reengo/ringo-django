import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Section from '../components/Section';

import Hero from '../sections/Hero';
import Experience from '../sections/Experience';
import Skills from '../sections/Skills';
import Quote from '../sections/Quote';
import BlogPreview from '../sections/BlogPreview';
import Socials from '../sections/Socials';
import Contact from '../sections/Contact';

import busuanga from '../assets/img/busuanga.jpeg';
import logo from '../assets/img/logo-ringo-pad.png';
import { cn } from "../utils";

function Landing({ CONFIG, sections, darkMode, toggleDark, loading }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className={cn("min-h-screen selection:bg-[var(--accent,#ff8c2d)]", darkMode ? "bg-slate-900 text-slate-100" : "bg-[var(--neutral,#ffffff)] text-slate-900")}>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[var(--primary,#247A3B)] origin-left z-[60]" style={{ scaleX }} />

      <Nav CONFIG={CONFIG} sections={sections} darkMode={darkMode} toggleDark={toggleDark} />

      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-900">
          <img src={logo} alt="Logo" className="cursor-pointer rounded-xl" />
        </div>
      )}

      <Section id="home"       className="pt-14"><Hero       CONFIG={CONFIG} /></Section>
      <Section id="experience">                  <Experience CONFIG={CONFIG} /></Section>
      <Section id="skills">                      <Skills /></Section>
      <Section id="quote"      bg={busuanga}>    <Quote /></Section>
      <Section id="blog">                        <BlogPreview /></Section>
      <Section id="profile">                     <Socials CONFIG={CONFIG} /></Section>
      <Section id="contact">                     <Contact CONFIG={CONFIG} /></Section>

      <Footer />
    </div>
  );
}

export default Landing;
