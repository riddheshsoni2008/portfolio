"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Collaboration Opportunity",
    message: "",
  });

  const [activeTab, setActiveTab] = useState("message.json");
  const [isSending, setIsSending] = useState(false);
  const [logs, setLogs] = useState([]);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isMockMode, setIsMockMode] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const executeSend = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields before executing.");
      return;
    }

    setIsSending(true);
    setLogs([]);
    setSendSuccess(false);
    setIsMockMode(false);

    // Initial console commands
    setLogs([
      { text: "$ node contact.js --send", type: "cmd" },
      { text: "[info] Parsing message payload config...", type: "info" },
    ]);

    try {
      // Start API request in parallel
      const apiPromise = fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Staggered log steps to look like a build compilation
      const simulationSteps = [
        { text: "[info] Validating sender email format...", delay: 500, type: "info" },
        { text: `[success] Payload compilation OK: ${formData.name.toLowerCase().replace(/\s+/g, "_")}_message.json`, delay: 1000, type: "success" },
        { text: "[info] Initializing Nodemailer SMTP transport...", delay: 1500, type: "info" },
        { text: "[info] Establishing secure SSL handshake...", delay: 2000, type: "info" },
        { text: "[info] Transmitting SMTP pack files...", delay: 2500, type: "info" },
        { text: "  0% [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]", delay: 2600, type: "progress" },
        { text: " 45% [█████████████░░░░░░░░░░░░░░░░░]", delay: 2800, type: "progress" },
        { text: " 85% [█████████████████████████░░░░░]", delay: 3000, type: "progress" },
        { text: "100% [██████████████████████████████]", delay: 3400, type: "progress" },
      ];

      for (const step of simulationSteps) {
        await new Promise((resolve) => setTimeout(resolve, step.delay - (simulationSteps[simulationSteps.indexOf(step) - 1]?.delay || 0)));
        setLogs((prev) => [...prev, step]);
      }

      // Wait for the actual API response
      const response = await apiPromise;
      const data = await response.json();

      if (response.ok && data.success) {
        if (data.mock) {
          setIsMockMode(true);
          setLogs((prev) => [
            ...prev,
            { text: "[warning] SMTP credentials missing in .env.local!", type: "info" },
            { text: "[info] Running in safe mock verification mode.", type: "info" },
            { text: "✔ Simulation complete. Exit code 0", type: "done" },
          ]);
        } else {
          setLogs((prev) => [
            ...prev,
            { text: "[success] Server response: SMTP Transmission Complete!", type: "success" },
            { text: "✔ Message sent successfully! Exit code 0", type: "done" },
          ]);
        }
        setSendSuccess(true);
      } else {
        throw new Error(data.error || "SMTP delivery failure");
      }
    } catch (error) {
      setLogs((prev) => [
        ...prev,
        { text: `[error] Transmit failed: ${error.message}`, type: "info" },
        { text: "❌ Process terminated with exit code 1", type: "done" },
      ]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background spotlights */}
      <div className="spotlight-bg animate-pulse" style={{ top: "30%", left: "10%", transform: "translate(-50%, -50%)", opacity: 0.3 }} />
      <div className="spotlight-bg" style={{ bottom: "10%", right: "10%", transform: "translate(50%, 50%)", opacity: 0.4 }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-[1280px] mx-auto px-[24px] md:px-[64px] relative z-10"
      >
        {/* Section Header */}
        <SectionHeader number="06." title="GetInTouch" />

        {/* Info text */}
        <motion.div variants={itemVariants} className="max-w-xl mb-12">
          <p className="body-lg text-[var(--color-on-surface-variant)] mb-4">
            Whether you want to hire me, collaborate on a project, or need any help with MERN stack development my digital console is open.
          </p>
          <p className="font-mono text-xs text-gray-500">
            <span className="text-[#C678DD]">const</span> <span className="text-[#61DAFB]">contact</span> = <span className="text-[#C678DD]">new</span> <span className="text-[#E5C07B]">NodemailerBridge</span><span className="text-gray-400">();</span>
          </p>
        </motion.div>

        {/* IDE Layout */}
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
          <div className="bg-[#0D1117] border border-gray-800 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.4)] relative">

            {/* Topbar tabs */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#161B22] font-mono text-xs select-none">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex gap-1 border-l border-gray-700 pl-3">
                  <button
                    onClick={() => setActiveTab("message.json")}
                    className={`px-3 py-1 rounded transition-colors ${activeTab === "message.json" ? "bg-[#0D1117] text-[#61DAFB]" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    message.json
                  </button>
                  <button
                    onClick={() => setActiveTab("mailer.config")}
                    className={`px-3 py-1 rounded transition-colors ${activeTab === "mailer.config" ? "bg-[#0D1117] text-[#61DAFB]" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    mailer.config
                  </button>
                </div>
              </div>
              <span className="text-gray-400 hidden sm:inline">{activeTab === "message.json" ? "JSON" : "CONFIG"}</span>
            </div>

            {/* Editor Body */}
            <div className="p-6 md:p-8 min-h-[320px] relative">
              <AnimatePresence mode="wait">
                {isSending ? (
                  /* Terminal log screen */
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 p-6 font-mono text-[11px] md:text-sm overflow-y-auto z-30 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      {logs.map((log, index) => {
                        let colorClass = "text-gray-400";
                        if (log.type === "cmd") colorClass = "text-[#61DAFB]";
                        if (log.type === "success") colorClass = "text-[#98C379]";
                        if (log.type === "info") colorClass = "text-[#56B6C2]";
                        if (log.type === "progress") colorClass = "text-[#E5C07B]";
                        if (log.type === "done") colorClass = "text-[#28C840] font-semibold";
                        return (
                          <div key={index} className={colorClass}>
                            {log.text}
                          </div>
                        );
                      })}
                    </div>

                    {sendSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4"
                      >
                        {isMockMode ? (
                          <div className="bg-[#FEBC2E]/10 border border-[#FEBC2E]/30 rounded-lg p-3 text-[#FEBC2E] text-center">
                            ⚠️ Live delivery inactive: Add SMTP credentials to .env.local to go live.
                          </div>
                        ) : (
                          <div className="bg-[#28C840]/10 border border-[#28C840]/30 rounded-lg p-3 text-[#28C840] text-center">
                            🚀 Message transmitted securely via SMTP.
                          </div>
                        )}
                        <button
                          onClick={() => setIsSending(false)}
                          className="mt-3 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded font-mono text-xs cursor-pointer block mx-auto transition-colors"
                        >
                          Return to Editor
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                ) : activeTab === "message.json" ? (
                  /* JSON Form Screen */
                  <motion.div
                    key="json-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 font-mono text-xs md:text-sm text-gray-300"
                  >
                    <div><span className="text-[#C678DD]">const</span> <span className="text-[#61DAFB]">senderConfig</span> = <span className="text-white">{'{'}</span></div>

                    {/* Name */}
                    <div className="pl-6 flex flex-wrap items-center gap-2">
                      <span className="text-[#E06C75]">&quot;senderName&quot;</span>:
                      <span className="text-[#98C379]">&quot;</span>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-[#161B22] border border-gray-800 focus:border-[#61DAFB] rounded px-2 py-1 outline-none text-[#98C379] w-full sm:w-64 transition-all"
                        placeholder="your name"
                      />
                      <span className="text-[#98C379]">&quot;</span>,
                    </div>

                    {/* Email */}
                    <div className="pl-6 flex flex-wrap items-center gap-2">
                      <span className="text-[#E06C75]">&quot;senderEmail&quot;</span>:
                      <span className="text-[#98C379]">&quot;</span>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-[#161B22] border border-gray-800 focus:border-[#61DAFB] rounded px-2 py-1 outline-none text-[#98C379] w-full sm:w-64 transition-all"
                        placeholder="your@email.com"
                      />
                      <span className="text-[#98C379]">&quot;</span>,
                    </div>

                    {/* Subject */}
                    <div className="pl-6 flex flex-wrap items-center gap-2">
                      <span className="text-[#E06C75]">&quot;messageSubject&quot;</span>:
                      <span className="text-[#98C379]">&quot;</span>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="bg-[#161B22] border border-gray-800 focus:border-[#61DAFB] rounded px-2 py-1 outline-none text-[#98C379] w-full sm:w-64 transition-all"
                        placeholder="collaboration"
                      />
                      <span className="text-[#98C379]">&quot;</span>,
                    </div>

                    {/* Message Body */}
                    <div className="pl-6 flex flex-wrap items-start gap-2">
                      <span className="text-[#E06C75]">&quot;messageBody&quot;</span>:
                      <span className="text-[#98C379]">&quot;</span>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="bg-[#161B22] border border-gray-800 focus:border-[#61DAFB] rounded px-2 py-1 outline-none text-[#98C379] w-full resize-none transition-all"
                        placeholder="write your message / pitch here..."
                      />
                      <span className="text-[#98C379]">&quot;</span>
                    </div>

                    <div><span className="text-white">{'}'}</span>;</div>

                    {/* Action Button */}
                    <div className="pt-6">
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(97,218,251,0.2)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={executeSend}
                        className="px-6 py-2.5 bg-[#1d2433] hover:bg-[#283247] border border-[#61DAFB]/30 text-[#61DAFB] rounded-lg font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <span>node contact.js --send</span>
                        <span className="text-gray-500">▶</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  /* mailer.config tab view */
                  <motion.div
                    key="config"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 font-mono text-xs md:text-sm text-gray-400"
                  >
                    <div><span className="text-gray-600">// Config file for Nodemailer client connection</span></div>
                    <div>
                      <span className="text-[#C678DD]">const</span> <span className="text-[#E5C07B]">config</span> = <span className="text-white">{'{'}</span>
                    </div>
                    <div className="pl-6">
                      <span className="text-[#E06C75]">service</span>: <span className="text-[#98C379]">&quot;gmail&quot;</span>,
                    </div>
                    <div className="pl-6">
                      <span className="text-[#E06C75]">recipient</span>: <span className="text-[#98C379]">&quot;riddheshsoni008@gmail.com&quot;</span>,
                    </div>
                    <div className="pl-6">
                      <span className="text-[#E06C75]">ssl</span>: <span className="text-[#D19A66]">true</span>,
                    </div>
                    <div className="pl-6">
                      <span className="text-[#E06C75]">status</span>: <span className="text-[#98C379]">&quot;ready&quot;</span>
                    </div>
                    <div><span className="text-white">{'}'}</span>;</div>
                    <div className="pt-4 text-xs text-gray-500">
                      // Message transmission is handled securely by a Next.js server route using Nodemailer.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
