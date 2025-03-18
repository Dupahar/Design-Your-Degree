import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, Calendar, ChevronLeft, FileText, BookOpen } from 'lucide-react';

// ------------------- WELCOME SCREEN -------------------
const WelcomeScreen = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stageTimer = setTimeout(() => {
      setStage(1);
    }, 1500);
    return () => clearTimeout(stageTimer);
  }, []);

  // Parent container for letters
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  // Each letter animates without rotateX
  const letterVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  // Particle generator
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 2
    }));
  };

  const particles = generateParticles(30);
  const titleText = "Design Your Degree";
  const titleLetters = titleText.split("");

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-[#070721] via-[#0a0a30] to-[#0c0c44] flex items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.size / 2}px rgba(59, 130, 246, 0.6)`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0.5],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Pulsing circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border-2 border-blue-500/30"
            initial={{ width: 20, height: 20, opacity: 0.8 }}
            animate={{
              width: [20, 500],
              height: [20, 500],
              opacity: [0.8, 0],
              borderWidth: [2, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 1.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-sm mx-auto">
        {/* Spinning emblem */}
        <motion.div
          className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6"
          initial={{ rotateY: 0, scale: 0 }}
          animate={{ rotateY: 360, scale: [0, 1.2, 1], opacity: [0, 1] }}
          transition={{
            rotateY: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, ease: "backOut" }
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/80 to-purple-600/80 shadow-lg shadow-blue-500/50" />
          <motion.div
            className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(59, 130, 246, 0.8)",
                "0 0 20px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xl sm:text-2xl font-bold text-white">DYD</span>
          </motion.div>
        </motion.div>

        {/* Title (no rotateX) */}
        <motion.h1
          className="mb-6"
          variants={textVariants}
          initial="hidden"
          animate={stage >= 1 ? "visible" : "hidden"}
        >
          <div className="text-center">
            <div className="inline-block whitespace-nowrap text-3xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {titleLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                  style={{
                    textShadow: "0 0 10px rgba(59, 130, 246, 0.7)",
                    marginLeft: letter === " " ? "0.25rem" : "0"
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-white/80 text-sm sm:text-base md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            textShadow: ["0 0 4px #fff", "0 0 8px #fff", "0 0 4px #fff"]
          }}
          transition={{
            opacity: { delay: 2, duration: 1 },
            y: { delay: 2, duration: 1 },
            textShadow: { delay: 2.5, duration: 2, repeat: Infinity }
          }}
        >
          University of Jammu
        </motion.p>

        {/* Welcome button */}
        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.button
            className="w-full max-w-xs mx-auto px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 0 10px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.8)",
                "0 0 10px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
          >
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%", opacity: 0.5 }}
              animate={{ x: "100%", opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            />
            Welcome
          </motion.button>
        </motion.div>
      </div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
        style={{ height: "10px" }}
        initial={{ top: "-10px" }}
        animate={{ top: "100%" }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />
    </motion.div>
  );
};

// ------------------- APP CONTAINER -------------------
function AppContainer() {
  const [nav, setNav] = useState<NavigationState>({
    batch: null,
    semester: null,
    buttonGroup: null,
    level: 'batch'
  });
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const totalSemesters = nav.batch === '2023-2027' ? 4 : 2;

  const isSemesterDisabled = (index: number) => {
    if (nav.batch === '2023-2027' && index === 3) return true;
    if (nav.batch === '2024-2028' && index === 1) return true;
    return false;
  };

  const getButtonCount = (semester: number) => {
    if (nav.batch === '2023-2027') {
      const opts = optionDetails['2023-2027'][semester];
      return opts ? Object.keys(opts).length : 0;
    }
    if (nav.batch === '2024-2028') {
      const opts = optionDetails['2024-2028'][semester];
      return opts ? Object.keys(opts).length : 0;
    }
    return 0;
  };

  const handleBack = () => {
    if (nav.level === 'pdf') {
      setNav({ ...nav, buttonGroup: null, level: 'buttons' });
    } else if (nav.level === 'buttons') {
      setNav({ ...nav, semester: null, level: 'semester' });
    } else if (nav.level === 'semester') {
      setNav({ batch: null, semester: null, buttonGroup: null, level: 'batch' });
    }
  };

  const transition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <>
      <AnimatePresence>
        {showWelcome && <WelcomeScreen key="welcome" />}
      </AnimatePresence>
      {!showWelcome && (
        <div className="min-h-screen bg-[#0a0a3a] cyber-grid text-white overflow-hidden">
          <header className="container mx-auto px-4 py-6 relative z-10">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold glitch neon-text" data-text="Design Your Degree">
                  Design Your Degree
                </h1>
                <p className="text-white">University of Jammu</p>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-12 relative z-10">
            <AnimatePresence mode="wait">
              {nav.level !== 'batch' && (
                <motion.button
                  onClick={handleBack}
                  className="flex items-center text-white hover:text-yellow-400 transition-colors mb-8 w-full max-w-xs mx-auto"
                  {...transition}
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back
                </motion.button>
              )}

              {/* Batch view */}
              {nav.level === 'batch' && (
                <motion.div key="batch" className="max-w-4xl mx-auto" {...transition}>
                  <h2 className="text-5xl md:text-6xl font-bold text-center mb-12"></h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {['2023-2027', '2024-2028'].map((batch) => (
                      <motion.button
                        key={batch}
                        onClick={() =>
                          setNav({
                            batch: batch as BatchType,
                            semester: null,
                            buttonGroup: null,
                            level: 'semester'
                          })
                        }
                        className="group cyberpunk-border relative overflow-hidden rounded-2xl bg-[#1a1a3a]/50 p-8 transition-all duration-300 hover:scale-105 w-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="relative z-10">
                          <Calendar className="h-12 w-12 mb-4 text-yellow-400" />
                          <h3 className="text-2xl font-bold mb-2 text-red-400">Batch {batch}</h3>
                          <p className="text-white mb-4">
                            {batch === '2023-2027' ? 'Four Semesters' : 'Two Semesters'}
                          </p>
                          <div className="flex items-center text-gray-900 group-hover:text-red-400">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Semester selection */}
              {nav.level === 'semester' && (
                <motion.div key="semester" className="max-w-4xl mx-auto" {...transition}>
                  <h2 className="text-4xl font-bold mb-8 text-white">Select Semester</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Array.from({ length: totalSemesters }).map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          if (isSemesterDisabled(index)) {
                            alert("Semester in progress");
                            return;
                          }
                          setNav({ ...nav, semester: index + 1, level: 'buttons' });
                        }}
                        className={`cyberpunk-border relative overflow-hidden rounded-xl bg-[#1a1a3a]/50 p-6 text-left transition-all duration-300 ${
                          isSemesterDisabled(index) ? "opacity-50 cursor-not-allowed" : ""
                        } w-full`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <h3 className="text-xl font-bold mb-2 text-black">
                          {isSemesterDisabled(index) ? "Semester in progress" : `Semester ${index + 1}`}
                        </h3>
                        {!isSemesterDisabled(index) && (
                          <div className="flex items-center text-white">
                            View Options <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Major Projects (Options) view */}
              {nav.level === 'buttons' && nav.semester && (
                <motion.div key="buttons" className="max-w-4xl mx-auto" {...transition}>
                  <h2 className="text-4xl font-bold mb-8 text-white">Major Projects</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({ length: getButtonCount(nav.semester) }).map((_, index) => {
                      let optionDetail = { name: `Major Project ${index + 1}`, color: "text-yellow-400" };
                      if (
                        nav.batch &&
                        nav.semester &&
                        optionDetails[nav.batch] &&
                        optionDetails[nav.batch][nav.semester] &&
                        optionDetails[nav.batch][nav.semester][index + 1]
                      ) {
                        optionDetail = optionDetails[nav.batch][nav.semester][index + 1];
                      }
                      return (
                        <motion.button
                          key={index}
                          onClick={() => setNav({ ...nav, buttonGroup: index + 1, level: 'pdf' })}
                          className="cyberpunk-border relative overflow-hidden rounded-xl bg-[#1a1a3a]/50 p-6 text-left w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <h3 className={`text-xl font-semibold mb-2 ${optionDetail.color}`}>
                            {optionDetail.name}
                          </h3>
                          <div className="flex items-center text-white">
                            View Documents <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* PDF view with disabled right-click */}
              {nav.level === 'pdf' && nav.semester && nav.buttonGroup && (
                <motion.div
                  key="pdf"
                  className="max-w-4xl mx-auto"
                  {...transition}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <h2 className="text-4xl font-bold mb-8 text-white">Documents</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {Array.from({
                      length: mockPdfs[nav.batch!][nav.semester!][nav.buttonGroup!].length
                    }).map((_, index) => {
                      const pdfPath = mockPdfs[nav.batch!][nav.semester!][nav.buttonGroup!][index];
                      const fileName = pdfPath.split('/').pop();
                      const optionDetail =
                        optionDetails[nav.batch!][nav.semester!][nav.buttonGroup!] || { color: "text-yellow-400" };
                      return (
                        <motion.button
                          key={index}
                          onClick={() => window.open(pdfPath, "_blank")}
                          className="cyberpunk-border relative overflow-hidden rounded-xl bg-[#1a1a3a]/50 p-6 text-left w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FileText className={`h-8 w-8 mb-3 ${optionDetail.color}`} />
                          <h3 className={`text-xl font-semibold mb-2 ${optionDetail.color}`}>
                            {fileName}
                          </h3>
                          <div className="flex items-center text-white">
                            Open PDF <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <footer className="container mx-auto px-4 py-8 mt-auto relative z-10">
            <div className="text-center text-white">
              <p>&copy; {new Date().getFullYear()} Design Your Degree - University of Jammu</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default AppContainer;
