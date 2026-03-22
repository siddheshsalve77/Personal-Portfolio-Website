"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Phone,
  GraduationCap,
  Award,
  Briefcase,
  Code2,
  Cloud,
  Database,
  Download,
  Menu,
  X,
  ArrowUpRight,
  Send,
  CheckCircle,
  Loader2,
  Zap,
  BarChart3,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ============ DATA ============
const heroStats = [
  { value: "284K+", label: "Records Processed", icon: Database },
  { value: "15.8M", label: "Revenue Insights (BRL)", icon: BarChart3 },
  { value: "60%", label: "Efficiency Improvement", icon: Zap },
];

const skillGroups = [
  {
    category: "Core Stack",
    icon: Code2,
    skills: [
      { name: "Python", exp: "2+ years" },
      { name: "SQL", exp: "2+ years" },
      { name: "PySpark", exp: "1+ year" },
      { name: "Pandas", exp: "2+ years" },
    ],
  },
  {
    category: "AWS Cloud",
    icon: Cloud,
    skills: [
      { name: "S3", exp: "Production" },
      { name: "Glue ETL", exp: "Production" },
      { name: "Lambda", exp: "Production" },
      { name: "Athena", exp: "Production" },
      { name: "RDS", exp: "Production" },
      { name: "SQS", exp: "Production" },
    ],
  },
  {
    category: "Data Engineering",
    icon: Database,
    skills: [
      { name: "ETL/ELT Pipelines", exp: "" },
      { name: "Medallion Architecture", exp: "" },
      { name: "Dimensional Modeling", exp: "" },
      { name: "Data Quality", exp: "" },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: Server,
    skills: [
      { name: "Apache Airflow", exp: "" },
      { name: "Power BI", exp: "" },
      { name: "PostgreSQL", exp: "" },
      { name: "Git & GitHub", exp: "" },
    ],
  },
];

const projects = [
  {
    title: "PayFlow Analytics",
    subtitle: "UPI Payments Intelligence Platform",
    description:
      "Serverless streaming pipeline for real-time UPI payment fraud detection. Built event-driven architecture using SQS + Lambda, processing 284,807 transactions with velocity-based fraud detection.",
    tech: ["Python", "PySpark", "AWS Lambda", "Glue ETL", "S3", "Athena", "SQS", "SNS"],
    metrics: [
      { label: "Transactions", value: "284,807" },
      { label: "Monthly Cost", value: "$0" },
      { label: "Banks Covered", value: "30+" },
    ],
    github: "https://github.com/siddheshsalve77/payflow-analytics",
    highlight: true,
  },
  {
    title: "E-Commerce Data Pipeline",
    subtitle: "AWS Star Schema Data Warehouse",
    description:
      "Full ELT pipeline ingesting 112,650 Olist orders into a 3-zone Medallion Data Lake on S3, transformed via dimensional modeling into a Star Schema on RDS PostgreSQL.",
    tech: ["Python", "Pandas", "AWS S3", "RDS PostgreSQL", "boto3", "SQLAlchemy"],
    metrics: [
      { label: "Orders", value: "112,650" },
      { label: "Revenue Tracked", value: "BRL 15.8M" },
      { label: "Customers", value: "96,000+" },
    ],
    github: "https://github.com/siddheshsalve77/E-Commerce-Data-Pipeline",
    highlight: true,
  },
  {
    title: "Hybrid Cloud Streaming Pipeline",
    description: "Production-grade data engineering pipeline for real-time e-commerce transaction processing.",
    tech: ["Kafka", "Spark Streaming", "Delta Lake", "Databricks"],
    github: "https://github.com/siddheshsalve77/hybrid-cloud-streaming-pipeline",
  },
  {
    title: "Real-Time Stock Analytics",
    description: "Live stock market analytics with real-time data processing and visualization dashboards.",
    tech: ["Python", "WebSocket", "Time Series", "Visualization"],
    github: "https://github.com/siddheshsalve77/Real-Time-Stock-Analytics",
  },
  {
    title: "Finance Analytics",
    description: "SQL-based financial analytics for fraud detection, credit risk analysis, and advanced queries.",
    tech: ["SQL", "Python", "Fraud Detection", "Risk Modeling"],
    github: "https://github.com/siddheshsalve77/finance-analytics-siddhesh",
  },
];

const experiences = [
  {
    role: "Junior Data Engineer",
    company: "Si Soft Infosys",
    location: "Aurangabad, Maharashtra",
    period: "Jan 2026 - Present",
    type: "Full-time",
    achievements: [
      "Built end-to-end data pipelines for IRIS on AWS, reducing manual processing by 60%",
      "Designed S3 data lake and RDS PostgreSQL warehouse with high availability architecture",
      "Optimized batch processing workflows, reducing data turnaround time by 40%",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "Cognifyz Technologies",
    location: "Remote",
    period: "Feb 2025 - Jun 2025",
    type: "Internship",
    achievements: [
      "Analyzed multi-source datasets using Python and SQL, improving business decisions by 25%",
      "Implemented data cleaning pipelines, reducing errors by 30%",
      "Designed dashboards translating complex findings for non-technical stakeholders",
    ],
  },
];

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Maharashtra Institute of Technology",
    location: "Aurangabad",
    period: "2024 - 2026",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Modern College of Arts, Science & Commerce",
    location: "Pune",
    period: "2021 - 2024",
  },
];

// FIXED: Changed "Amazon Web Services" to "Udemy"
const certifications = [
  { name: "AWS Certified Solutions Architect", issuer: "Udemy" },
  { name: "Python for Data Science", issuer: "IBM" },
  { name: "Business Analytics with Excel", issuer: "Microsoft" },
];

// ============ ANIMATIONS ============
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// ============ COMPONENTS ============
function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <a
      href={href}
      className={`text-sm font-medium transition-colors ${
        active ? "text-white" : "text-zinc-400 hover:text-white"
      }`}
    >
      {children}
    </a>
  );
}

function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <div className="text-xl font-bold text-white">{value}</div>
          <div className="text-xs text-zinc-500">{label}</div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: typeof projects[0]; featured?: boolean }) {
  if (featured) {
    return (
      <motion.a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        variants={fadeUp}
        className="group block bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
              {project.title}
            </h3>
            {project.subtitle && <p className="text-sm text-zinc-500">{project.subtitle}</p>}
          </div>
          <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-orange-500 transition-colors flex-shrink-0" />
        </div>

        <p className="text-sm text-zinc-400 leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded-md">
              {t}
            </span>
          ))}
        </div>

        {project.metrics && (
          <div className="flex flex-wrap gap-6 pt-4 border-t border-zinc-800">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-sm font-semibold text-white">{m.value}</div>
                <div className="text-xs text-zinc-500">{m.label}</div>
              </div>
            ))}
          </div>
        )}
      </motion.a>
    );
  }

  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      className="group block bg-zinc-900/30 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-white group-hover:text-orange-400 transition-colors">
          {project.title}
        </h3>
        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-orange-500 transition-colors" />
      </div>
      <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 bg-zinc-800/50 text-zinc-500 rounded">
            {t}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="text-xs px-2 py-0.5 text-zinc-600">+{project.tech.length - 3}</span>
        )}
      </div>
    </motion.a>
  );
}

// ============ MAIN COMPONENT ============
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState({ email: false, telegram: false });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "about", "experience", "projects", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (res.ok) {
        setIsSubmitted(true);
        setNotificationStatus({
          email: data.emailSent || false,
          telegram: data.telegramSent || false,
        });
        setFormState({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased">
      {/* ============ NAVIGATION ============ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#09090b]/95 backdrop-blur-sm border-b border-zinc-800" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="text-lg font-bold tracking-tight">
              <span className="text-zinc-400">siddhesh</span>
              <span className="text-orange-500">.</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink key={item.id} href={`#${item.id}`} active={activeSection === item.id}>
                  {item.label}
                </NavLink>
              ))}
              <a
                href="https://github.com/siddheshsalve77"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0c0c0f] border-b border-zinc-800"
            >
              <div className="px-6 py-4 space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-16 w-full">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
            {/* Left Content - 3 columns */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-3 space-y-7"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 text-sm text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for new opportunities
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Siddhesh Salve
                </h1>
                <p className="text-xl sm:text-2xl text-zinc-400 font-light">
                  Data Engineer & Analytics Specialist
                </p>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-zinc-500 text-base leading-relaxed max-w-lg"
              >
                Building scalable ETL/ELT pipelines, streaming architectures, and cloud-native
                analytics solutions on AWS. Passionate about transforming raw data into actionable
                business insights.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-orange-500 hover:bg-orange-600 text-black font-medium px-6 h-11"
                >
                  <a href="#projects">
                    View Projects <ArrowUpRight className="w-4 h-4 ml-1.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800 text-white h-11"
                >
                  <a href="#contact">Contact Me</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-11"
                >
                  <a href="/resume.pdf" download>
                    <Download className="w-4 h-4 mr-2" />
                    Resume
                  </a>
                </Button>
              </motion.div>

              {/* Stats Grid */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 pt-2">
                {heroStats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Profile Card - 2 columns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 flex justify-center"
            >
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
                {/* Profile Image - FIXED: Properly fitted circular image */}
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-zinc-600 ring-4 ring-zinc-700/50">
                      <img
                        src="/profile.png"
                        alt="Siddhesh Salve"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    {/* Status badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1">
                      <span className="text-xs text-emerald-400 font-medium">Available</span>
                    </div>
                  </div>
                </div>

                {/* Info - FIXED: Removed redundant name, cleaner layout */}
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-sm text-orange-500 font-medium">Junior Data Engineer</p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5">
                    {["AWS", "Python", "PySpark", "SQL"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 bg-zinc-800/80 text-zinc-400 rounded-full border border-zinc-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-zinc-500">
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Pune, Maharashtra</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs">siddhesh.salve77@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 pt-1">
                    <a
                      href="https://github.com/siddheshsalve77"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/siddheshsalve77"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="mailto:siddhesh.salve77@gmail.com"
                      className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ SKILLS SECTION ============ */}
      <section id="about" className="py-20 bg-[#0c0c0f]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-orange-500 text-sm font-medium tracking-wider uppercase">
                Skills & Expertise
              </span>
              <h2 className="text-3xl font-bold mt-2">Technical Stack</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {skillGroups.map((group, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <group.icon className="w-4 h-4 text-orange-500" />
                    </div>
                    <h3 className="text-sm font-medium text-white">{group.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-zinc-300">{skill.name}</span>
                        {skill.exp && (
                          <span className="text-xs text-zinc-600">{skill.exp}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <motion.div variants={fadeUp} className="mt-10 pt-8 border-t border-zinc-800">
              <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                Certifications
              </h3>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/40 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
                  >
                    <Award className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-white">{cert.name}</span>
                    <span className="text-xs text-zinc-500">• {cert.issuer}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ EXPERIENCE SECTION ============ */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-orange-500 text-sm font-medium tracking-wider uppercase">
                Career
              </span>
              <h2 className="text-3xl font-bold mt-2">Work Experience</h2>
            </motion.div>

            <div className="space-y-5">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                        <p className="text-sm text-orange-400">
                          {exp.company}
                          <span className="text-zinc-500 ml-2">• {exp.location}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:text-right">
                      <span className="text-xs px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full">
                        {exp.type}
                      </span>
                      <span className="text-xs text-zinc-500">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-13 pl-0.5">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="text-sm text-zinc-400 flex gap-2">
                        <span className="text-orange-500 mt-0.5">›</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <motion.div variants={fadeUp} className="mt-12">
              <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                Education
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{edu.degree}</h4>
                      <p className="text-sm text-zinc-500">
                        {edu.school}, {edu.location}
                      </p>
                      <p className="text-xs text-zinc-600 mt-1">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ PROJECTS SECTION ============ */}
      <section id="projects" className="py-20 bg-[#0c0c0f]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-orange-500 text-sm font-medium tracking-wider uppercase">
                Portfolio
              </span>
              <h2 className="text-3xl font-bold mt-2">Featured Projects</h2>
            </motion.div>

            {/* Featured Projects */}
            <div className="grid lg:grid-cols-2 gap-4 mb-4">
              {projects
                .filter((p) => p.highlight)
                .map((project) => (
                  <ProjectCard key={project.title} project={project} featured />
                ))}
            </div>

            {/* Other Projects */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects
                .filter((p) => !p.highlight)
                .map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
            </div>

            <motion.div variants={fadeUp} className="text-center mt-8">
              <a
                href="https://github.com/siddheshsalve77?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-orange-400 transition-colors"
              >
                View all projects on GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-10">
              <span className="text-orange-500 text-sm font-medium tracking-wider uppercase">
                Contact
              </span>
              <h2 className="text-3xl font-bold mt-2">Let&apos;s Connect</h2>
              <p className="text-zinc-400 mt-3 max-w-md mx-auto">
                Have a project in mind or want to discuss opportunities? Feel free to reach out.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid lg:grid-cols-5 gap-6">
              {/* Form */}
              <div className="lg:col-span-3 bg-zinc-900/40 border border-zinc-800 rounded-xl p-6">
                {isSubmitted ? (
                  <div className="text-center py-10">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-sm text-zinc-400 mb-4">Thank you! I&apos;ll get back to you soon.</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {notificationStatus.email && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 text-orange-400 text-xs rounded-full">
                          <Mail className="w-3.5 h-3.5" />
                          Email sent
                        </span>
                      )}
                      {notificationStatus.telegram && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                          <Send className="w-3.5 h-3.5" />
                          Telegram notified
                        </span>
                      )}
                      {!notificationStatus.email && !notificationStatus.telegram && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-700 text-zinc-400 text-xs rounded-full">
                          Message received
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="ghost"
                      className="mt-4 text-zinc-400 hover:text-white"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-zinc-500 mb-1.5 block">Name</label>
                        <Input
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="bg-zinc-900 border-zinc-700 focus:border-orange-500 text-white h-10"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-500 mb-1.5 block">Email</label>
                        <Input
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="bg-zinc-900 border-zinc-700 focus:border-orange-500 text-white h-10"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1.5 block">Subject</label>
                      <Input
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 focus:border-orange-500 text-white h-10"
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 mb-1.5 block">Message</label>
                      <Textarea
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 focus:border-orange-500 text-white min-h-[120px] resize-none"
                        placeholder="Your message..."
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-black font-medium h-11"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-3">
                <a
                  href="mailto:siddhesh.salve77@gmail.com"
                  className="flex items-center gap-3 p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-500">Email</div>
                    <div className="text-sm text-white group-hover:text-orange-400 transition-colors truncate">
                      siddhesh.salve77@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/917720038094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">WhatsApp</div>
                    <div className="text-sm text-white group-hover:text-emerald-400 transition-colors">
                      +91 7720038094
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">Location</div>
                    <div className="text-sm text-white">Pune, Maharashtra, India</div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href="https://github.com/siddheshsalve77"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/siddheshsalve77"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-8 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-zinc-600">
              © {new Date().getFullYear()} Siddhesh Salve. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/siddheshsalve77"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/siddheshsalve77"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:siddhesh.salve77@gmail.com"
                className="text-zinc-600 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
