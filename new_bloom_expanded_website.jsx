import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flower2,
  Stars,
  SunMedium,
  MoonStar,
  UserRound,
  CalendarDays,
  Brain,
  Heart,
  BookOpenText,
  Layers3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const zodiacAnimals = [
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
];

const zodiacDetails = {
  Rat: {
    traits: "Quick-minded, adaptable, resourceful, charming",
    strengths: "Smart decisions, social intelligence, survival instinct",
    challenges: "Overthinking, secrecy, nervous energy",
    career: "Research, sales, strategy, business, media",
  },
  Ox: {
    traits: "Steady, dependable, patient, grounded",
    strengths: "Discipline, loyalty, consistency",
    challenges: "Stubbornness, resistance to change",
    career: "Management, finance, engineering, operations",
  },
  Tiger: {
    traits: "Bold, magnetic, passionate, fearless",
    strengths: "Leadership, courage, independence",
    challenges: "Impulsiveness, restlessness",
    career: "Entrepreneurship, activism, entertainment, sports",
  },
  Rabbit: {
    traits: "Gentle, thoughtful, elegant, intuitive",
    strengths: "Diplomacy, calm energy, emotional awareness",
    challenges: "Avoiding conflict, sensitivity",
    career: "Design, counseling, beauty, hospitality",
  },
  Dragon: {
    traits: "Powerful, visionary, confident, vibrant",
    strengths: "Ambition, presence, big-picture thinking",
    challenges: "Intensity, pride, impatience",
    career: "Leadership, branding, public speaking, innovation",
  },
  Snake: {
    traits: "Wise, mysterious, strategic, refined",
    strengths: "Deep thinking, intuition, elegance",
    challenges: "Distrust, emotional reserve",
    career: "Psychology, writing, research, luxury industries",
  },
  Horse: {
    traits: "Free-spirited, energetic, expressive, driven",
    strengths: "Confidence, movement, charm",
    challenges: "Impatience, inconsistency",
    career: "Travel, sales, events, performance",
  },
  Goat: {
    traits: "Creative, warm, empathetic, artistic",
    strengths: "Compassion, imagination, emotional depth",
    challenges: "Self-doubt, moodiness",
    career: "Art, wellness, education, nonprofit work",
  },
  Monkey: {
    traits: "Clever, playful, inventive, curious",
    strengths: "Problem solving, wit, adaptability",
    challenges: "Scattered focus, trickster energy",
    career: "Tech, marketing, design, entrepreneurship",
  },
  Rooster: {
    traits: "Sharp, expressive, organized, confident",
    strengths: "Presentation, precision, discipline",
    challenges: "Criticism, perfectionism",
    career: "Fashion, project leadership, analysis, communication",
  },
  Dog: {
    traits: "Loyal, honest, protective, sincere",
    strengths: "Integrity, devotion, fairness",
    challenges: "Worry, cynicism, guardedness",
    career: "Law, advocacy, public service, counseling",
  },
  Pig: {
    traits: "Warm, generous, sincere, pleasure-loving",
    strengths: "Kindness, abundance mindset, loyalty",
    challenges: "Overgiving, avoidance, indulgence",
    career: "Care work, hospitality, food, community building",
  },
};

const personalYearMeanings = {
  1: "A year of fresh starts, independence, leadership, and planting new seeds.",
  2: "A slower year focused on patience, relationships, intuition, and emotional balance.",
  3: "A creative year for visibility, joy, self-expression, and social connection.",
  4: "A practical year for structure, hard work, stability, and building strong foundations.",
  5: "A year of movement, freedom, change, adventure, and major shifts.",
  6: "A heart-centered year focused on love, family, home, beauty, and responsibility.",
  7: "A reflective year for inner healing, spiritual growth, wisdom, and solitude.",
  8: "A powerful year for success, money, ambition, confidence, and authority.",
  9: "A transformational year of completion, release, forgiveness, and emotional clearing.",
  11: "A spiritually heightened year of intuition, inspiration, illumination, and awakening.",
  22: "A master builder year for turning dreams into reality through vision and grounded action.",
  33: "A sacred service year centered on compassion, healing, teaching, and upliftment.",
};

const lifePathMeanings = {
  1: "Independent, original, and called to lead.",
  2: "Sensitive, diplomatic, and naturally cooperative.",
  3: "Expressive, joyful, and creatively gifted.",
  4: "Reliable, practical, and here to build.",
  5: "Freedom-loving, versatile, and adventurous.",
  6: "Nurturing, loving, and service oriented.",
  7: "Introspective, spiritual, and analytical.",
  8: "Powerful, ambitious, and business-minded.",
  9: "Compassionate, wise, and humanitarian.",
  11: "Intuitive visionary with spiritual sensitivity.",
  22: "Master builder with the power to manifest big ideas.",
  33: "Master teacher with deep healing and heart energy.",
};

function reduceNumber(num, keepMasters = true) {
  let n = Number(num);
  while (n > 9 && (!keepMasters || ![11, 22, 33].includes(n))) {
    n = n
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return n;
}

function charValue(char) {
  const map = {
    A: 1, J: 1, S: 1,
    B: 2, K: 2, T: 2,
    C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4,
    E: 5, N: 5, W: 5,
    F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7,
    H: 8, Q: 8, Z: 8,
    I: 9, R: 9,
  };
  return map[char.toUpperCase()] || 0;
}

function cleanName(name) {
  return (name || "").replace(/[^a-zA-Z]/g, "");
}

function calculateExpression(name) {
  const total = cleanName(name)
    .split("")
    .reduce((sum, char) => sum + charValue(char), 0);
  return reduceNumber(total);
}

function calculateSoulUrge(name) {
  const vowels = cleanName(name)
    .split("")
    .filter((char) => "AEIOUaeiou".includes(char));
  const total = vowels.reduce((sum, char) => sum + charValue(char), 0);
  return reduceNumber(total || 0);
}

function calculatePersonality(name) {
  const consonants = cleanName(name)
    .split("")
    .filter((char) => !"AEIOUaeiou".includes(char));
  const total = consonants.reduce((sum, char) => sum + charValue(char), 0);
  return reduceNumber(total || 0);
}

function calculateLifePath(dateStr) {
  if (!dateStr) return null;
  const digits = dateStr.replace(/-/g, "").split("").map(Number);
  return reduceNumber(digits.reduce((a, b) => a + b, 0));
}

function calculatePersonalYear(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(date.getTime())) return null;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentYear = new Date().getFullYear();
  const yearReduced = reduceNumber(
    currentYear
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0)
  );
  const birthReduced = reduceNumber(month + day);
  return reduceNumber(birthReduced + yearReduced);
}

function getChineseZodiac(year) {
  const y = Number(year);
  if (!y) return null;
  const index = (y - 4) % 12;
  return zodiacAnimals[(index + 12) % 12];
}

function getSunSign(dateString) {
  if (!dateString) return null;
  const d = new Date(dateString + "T00:00:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

function clampPercent(num) {
  return Math.max(0, Math.min(100, Math.round(num)));
}

function FloatingDecor() {
  const petals = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((i) => (
        <motion.div
          key={i}
          className="absolute text-pink-200/60"
          initial={{ y: -40, x: `${(i * 9) % 100}%`, opacity: 0.3, rotate: 0 }}
          animate={{
            y: [0, 700],
            x: [`${(i * 9) % 100}%`, `${((i * 9) % 100) + (i % 2 === 0 ? 3 : -3)}%`],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{ duration: 13 + i, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
        >
          <Flower2 className="h-6 w-6" />
        </motion.div>
      ))}
    </div>
  );
}

function TraitBar({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm text-slate-700">
        <span>{label}</span>
        <span className="font-medium text-rose-700">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-rose-100">
        <div className="h-2 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function NewBloomExpandedWebsite() {
  const [activeTab, setActiveTab] = useState("home");
  const [year, setYear] = useState("");
  const [zodiacResult, setZodiacResult] = useState(null);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [numerologyResult, setNumerologyResult] = useState(null);

  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthChartResult, setBirthChartResult] = useState(null);

  const [identityName, setIdentityName] = useState("");
  const [identityFocus, setIdentityFocus] = useState("");
  const [identityResult, setIdentityResult] = useState(null);

  const [journalMood, setJournalMood] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [journalResult, setJournalResult] = useState(null);

  const currentYear = new Date().getFullYear();

  const sectionButtonClasses = (tab) =>
    `rounded-full px-5 py-2.5 text-sm md:text-base transition-all border ${
      activeTab === tab
        ? "bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200 text-white border-white/50 shadow-lg"
        : "bg-white/70 text-rose-700 border-rose-100 hover:bg-white"
    }`;

  const heroCards = useMemo(
    () => [
      {
        key: "Chinese Zodiac",
        tab: "zodiac",
        icon: <Stars className="h-5 w-5" />,
        text: "Discover your animal sign, natural traits, strengths, and career energy.",
      },
      {
        key: "Numerology",
        tab: "numerology",
        icon: <Sparkles className="h-5 w-5" />,
        text: "Reveal your core numbers, including your Life Path and Personal Year.",
      },
      {
        key: "Birth Chart",
        tab: "birthchart",
        icon: <MoonStar className="h-5 w-5" />,
        text: "Enter your birth details to explore your cosmic blueprint and birth chart basics.",
      },
      {
        key: "Identity Systems",
        tab: "identity",
        icon: <Layers3 className="h-5 w-5" />,
        text: "Explore MBTI, Big Five, Enneagram, Human Design, chakras, and shadow archetypes.",
      },
      {
        key: "AI Journal",
        tab: "journal",
        icon: <BookOpenText className="h-5 w-5" />,
        text: "Write reflections and receive soft AI-style insight readings and prompts.",
      },
    ],
    []
  );

  const runZodiac = () => {
    const animal = getChineseZodiac(year);
    if (!animal) return;
    setZodiacResult({ animal, ...zodiacDetails[animal] });
  };

  const runNumerology = () => {
    const lifePath = calculateLifePath(dob);
    const expression = calculateExpression(name);
    const soulUrge = calculateSoulUrge(name);
    const personality = calculatePersonality(name);
    const personalYear = calculatePersonalYear(dob);

    if (!lifePath) return;

    setNumerologyResult({
      lifePath,
      expression,
      soulUrge,
      personality,
      personalYear,
    });
  };

  const runBirthChart = () => {
    const sunSign = getSunSign(birthDate);
    if (!sunSign) return;
    setBirthChartResult({
      sunSign,
      summary:
        "This preview gives you a clean starting point for your birth chart journey. A full live version can connect to a real astrology API to calculate moon sign, rising sign, planets, and houses accurately.",
      nextStep:
        "Backend upgrade: connect date, time, and birthplace to a real astrology API so users receive true natal chart placements.",
      birthTime,
      birthPlace,
    });
  };

  const runIdentityReading = () => {
    const clean = cleanName(identityName);
    if (!clean) return;

    const total = clean.split("").reduce((sum, ch) => sum + charValue(ch), 0);
    const mbtiOptions = ["INFJ", "ENFP", "INTJ", "ISFP", "ENTP", "ESFJ", "INFP", "ESTJ"];
    const enneagramOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const humanDesignOptions = ["Generator", "Manifesting Generator", "Projector", "Manifestor", "Reflector"];
    const chakraOptions = [
      "Root Chakra",
      "Sacral Chakra",
      "Solar Plexus Chakra",
      "Heart Chakra",
      "Throat Chakra",
      "Third Eye Chakra",
      "Crown Chakra",
    ];
    const archetypeOptions = [
      "The Seeker",
      "The Healer",
      "The Visionary",
      "The Mystic",
      "The Rebel",
      "The Creator",
      "The Guardian",
      "The Lover",
    ];

    setIdentityResult({
      mbti: mbtiOptions[total % mbtiOptions.length],
      enneagram: enneagramOptions[total % enneagramOptions.length],
      humanDesign: humanDesignOptions[total % humanDesignOptions.length],
      chakra: chakraOptions[total % chakraOptions.length],
      archetype: archetypeOptions[total % archetypeOptions.length],
      focus: identityFocus || "self-discovery",
      bigFive: {
        openness: clampPercent(((total * 7) % 45) + 50),
        conscientiousness: clampPercent(((total * 5) % 45) + 45),
        extraversion: clampPercent(((total * 3) % 45) + 40),
        agreeableness: clampPercent(((total * 6) % 40) + 50),
        emotionalSensitivity: clampPercent(((total * 4) % 40) + 35),
      },
    });
  };

  const runJournalReading = () => {
    if (!journalEntry.trim()) return;
    const words = journalEntry.trim().split(/\s+/).length;
    const themes = [];

    if (/love|heart|relationship|family|care/i.test(journalEntry)) themes.push("relationships");
    if (/work|career|money|goal|success/i.test(journalEntry)) themes.push("career and purpose");
    if (/heal|healing|peace|rest|calm|spirit/i.test(journalEntry)) themes.push("healing and inner peace");
    if (/change|growth|grow|new|shift|release/i.test(journalEntry)) themes.push("transformation");
    if (!themes.length) themes.push("personal clarity");

    const mood = journalMood || "reflective";
    setJournalResult({
      mood,
      themes,
      reading: `Your reflection carries a ${mood} energy. Right now your words point toward ${themes.join(", ")} as the main theme moving through your life. This feels like a season of noticing what is blooming, what needs gentleness, and what truth is ready to be honored more fully.`,
      prompt: "What part of me is asking to be seen more honestly, and what am I ready to release with love?",
      summary: `You wrote ${words} words. Your entry suggests that your growth is connected to self-awareness, softness, and intentional inner work.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50 text-slate-800 relative overflow-hidden">
      <FloatingDecor />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,215,0,0.12),_transparent_25%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-[2rem] border border-white/60 bg-white/60 p-6 shadow-xl backdrop-blur-md"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm text-rose-600 shadow-sm">
                <Flower2 className="h-4 w-4" /> New Bloom
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-rose-700 md:text-6xl">
                Bloom into deeper self-discovery
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-rose-900/80 md:text-lg">
                A soft, beautiful space to explore your <span className="font-semibold">Chinese zodiac</span>,
                <span className="font-semibold"> numerology</span>, <span className="font-semibold"> birth chart</span>,
                and deeper identity systems through a spring-inspired experience filled with flowers, pink glow, gold accents, and sparkling detail.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {heroCards.map((card) => (
                <button
                  key={card.key}
                  onClick={() => setActiveTab(card.tab)}
                  className="rounded-3xl border border-white/70 bg-white/80 p-4 text-left shadow-md transition-transform hover:-translate-y-1"
                >
                  <div className="mb-2 inline-flex rounded-full bg-rose-100 p-2 text-rose-500">{card.icon}</div>
                  <div className="font-semibold text-rose-700">{card.key}</div>
                  <div className="mt-1 text-sm text-slate-600">{card.text}</div>
                </button>
              ))}
            </div>
          </div>
        </motion.header>

        <nav className="mb-8 flex flex-wrap gap-3">
          <Button className={sectionButtonClasses("home")} onClick={() => setActiveTab("home")}>Home</Button>
          <Button className={sectionButtonClasses("zodiac")} onClick={() => setActiveTab("zodiac")}>Chinese Zodiac</Button>
          <Button className={sectionButtonClasses("numerology")} onClick={() => setActiveTab("numerology")}>Numerology</Button>
          <Button className={sectionButtonClasses("birthchart")} onClick={() => setActiveTab("birthchart")}>Birth Chart</Button>
          <Button className={sectionButtonClasses("identity")} onClick={() => setActiveTab("identity")}>Identity Systems</Button>
          <Button className={sectionButtonClasses("journal")} onClick={() => setActiveTab("journal")}>AI Journal</Button>
        </nav>

        {activeTab === "home" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-3">
            <Card className="rounded-[2rem] border-white/60 bg-white/75 shadow-lg backdrop-blur-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Welcome to New Bloom</CardTitle>
                <CardDescription className="text-base text-slate-600">
                  This is your informational self-discovery page where each section has its own button and gives meaningful details based on what a user enters.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-700">
                <p>
                  <span className="font-semibold text-rose-700">Chinese Zodiac</span> helps users learn their animal sign,
                  personality style, strengths, challenges, and natural career energy.
                </p>
                <p>
                  <span className="font-semibold text-rose-700">Numerology</span> reveals core numbers like Life Path,
                  Expression, Soul Urge, Personality, and <span className="font-semibold">Personal Year</span>.
                </p>
                <p>
                  <span className="font-semibold text-rose-700">Birth Chart</span> introduces users to their cosmic blueprint.
                  This preview is ready to connect to a backend astrology API later for full moon sign, rising sign, and house placements.
                </p>
                <p>
                  <span className="font-semibold text-rose-700">Identity Systems</span> adds MBTI, Big Five, Enneagram,
                  Human Design, chakra focus, and shadow work archetypes in one soft discovery space.
                </p>
                <p>
                  <span className="font-semibold text-rose-700">AI Journal</span> gives users a modern reflection space with guided prompts and gentle AI-style readings.
                </p>
                <div className="grid gap-4 pt-3 sm:grid-cols-3">
                  <div className="rounded-3xl bg-rose-50 p-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-rose-700"><Stars className="h-4 w-4" /> Insightful</div>
                    <p className="text-sm text-slate-600">Clear explanations in a soft, welcoming format.</p>
                  </div>
                  <div className="rounded-3xl bg-amber-50 p-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-amber-700"><Sparkles className="h-4 w-4" /> Beautiful</div>
                    <p className="text-sm text-slate-600">Spring flowers, pink glow, gold details, and white sparkle energy.</p>
                  </div>
                  <div className="rounded-3xl bg-pink-50 p-4">
                    <div className="mb-2 flex items-center gap-2 font-semibold text-fuchsia-700"><MoonStar className="h-4 w-4" /> Expandable</div>
                    <p className="text-sm text-slate-600">Ready for backend upgrades, accounts, subscriptions, and downloadable reports.</p>
                  </div>
                </div>
                <div className="grid gap-4 pt-2 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/80 p-4">
                    <div className="font-semibold text-rose-700">More identity tools</div>
                    <p className="mt-1 text-sm text-slate-600">MBTI, Big Five, Human Design, chakras, shadow archetypes, and Enneagram now have their own section.</p>
                  </div>
                  <div className="rounded-3xl bg-white/80 p-4">
                    <div className="font-semibold text-rose-700">Modern journal flow</div>
                    <p className="mt-1 text-sm text-slate-600">Users can reflect, process emotions, and receive supportive AI-style guidance.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-white/60 bg-gradient-to-br from-white/80 to-rose-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Planned Backend Features</CardTitle>
                <CardDescription>What this website can grow into next.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="rounded-2xl bg-white/70 p-3">Save user profiles and reading history</li>
                  <li className="rounded-2xl bg-white/70 p-3">Real astrology API for moon and rising sign</li>
                  <li className="rounded-2xl bg-white/70 p-3">AI-generated personalized interpretations</li>
                  <li className="rounded-2xl bg-white/70 p-3">PDF report downloads</li>
                  <li className="rounded-2xl bg-white/70 p-3">Voice input for easy form entry</li>
                  <li className="rounded-2xl bg-white/70 p-3">Login + subscription system for premium readings</li>
                  <li className="rounded-2xl bg-white/70 p-3">Questionnaire engine for MBTI, Big Five, and Enneagram</li>
                  <li className="rounded-2xl bg-white/70 p-3">Human Design and astrology calculation integrations</li>
                  <li className="rounded-2xl bg-white/70 p-3">Reflection analyzer for journal-based AI readings</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "zodiac" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-[2rem] border-white/60 bg-white/75 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Chinese Zodiac</CardTitle>
                <CardDescription>Enter your birth year to reveal your animal sign and traits.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="birthYear">Birth Year</Label>
                  <Input id="birthYear" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Example: 1998" className="rounded-2xl border-rose-100 bg-white" />
                </div>
                <Button onClick={runZodiac} className="rounded-full bg-rose-500 hover:bg-rose-600 text-white">Reveal My Chinese Zodiac</Button>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-white/60 bg-gradient-to-br from-white/85 to-amber-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Your Result</CardTitle>
                <CardDescription>Soft insight based on the year you entered.</CardDescription>
              </CardHeader>
              <CardContent>
                {zodiacResult ? (
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-rose-700">
                      <Stars className="h-4 w-4" /> {zodiacResult.animal}
                    </div>
                    <div className="rounded-3xl bg-white/80 p-4"><p><span className="font-semibold text-rose-700">Traits:</span> {zodiacResult.traits}</p></div>
                    <div className="rounded-3xl bg-white/80 p-4"><p><span className="font-semibold text-rose-700">Strengths:</span> {zodiacResult.strengths}</p></div>
                    <div className="rounded-3xl bg-white/80 p-4"><p><span className="font-semibold text-rose-700">Challenges:</span> {zodiacResult.challenges}</p></div>
                    <div className="rounded-3xl bg-white/80 p-4"><p><span className="font-semibold text-rose-700">Career Energy:</span> {zodiacResult.career}</p></div>
                  </div>
                ) : (
                  <div className="rounded-3xl bg-white/80 p-6 text-slate-600">Enter a birth year and press the button to see your result.</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "numerology" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-[2rem] border-white/60 bg-white/75 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Numerology</CardTitle>
                <CardDescription>Enter your full name and birth date to reveal your core numbers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="rounded-2xl border-rose-100 bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="rounded-2xl border-rose-100 bg-white" />
                </div>
                <Button onClick={runNumerology} className="rounded-full bg-rose-500 hover:bg-rose-600 text-white">Reveal My Numbers</Button>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-white/60 bg-gradient-to-br from-white/85 to-pink-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Your Numbers</CardTitle>
                <CardDescription>Includes your Personal Year for {currentYear}.</CardDescription>
              </CardHeader>
              <CardContent>
                {numerologyResult ? (
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        ["Life Path", numerologyResult.lifePath],
                        ["Expression", numerologyResult.expression],
                        ["Soul Urge", numerologyResult.soulUrge],
                        ["Personality", numerologyResult.personality],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-3xl bg-white/80 p-4">
                          <div className="text-sm text-slate-500">{label}</div>
                          <div className="text-3xl font-bold text-rose-700">{value}</div>
                          <div className="mt-2 text-sm text-slate-600">{lifePathMeanings[value] || "A unique energetic pattern."}</div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-[2rem] border border-amber-100 bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 p-5 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-amber-700 font-semibold"><Sparkles className="h-4 w-4" /> Your Personal Year</div>
                      <div className="text-4xl font-bold text-rose-700">{numerologyResult.personalYear}</div>
                      <p className="mt-2 text-slate-700">{personalYearMeanings[numerologyResult.personalYear] || "A year of meaningful growth and change."}</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl bg-white/80 p-6 text-slate-600">Enter your name and birth date to reveal your numerology chart.</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "birthchart" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-[2rem] border-white/60 bg-white/75 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Birth Chart</CardTitle>
                <CardDescription>Enter your birth details for a beautiful starter reading.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="rounded-2xl border-rose-100 bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthTime">Birth Time</Label>
                  <Input id="birthTime" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="rounded-2xl border-rose-100 bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthPlace">Birth Place</Label>
                  <Input id="birthPlace" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="City, State/Country" className="rounded-2xl border-rose-100 bg-white" />
                </div>
                <Button onClick={runBirthChart} className="rounded-full bg-rose-500 hover:bg-rose-600 text-white">View Birth Chart Preview</Button>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-white/60 bg-gradient-to-br from-white/85 to-rose-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Chart Preview</CardTitle>
                <CardDescription>This section is ready for full backend API integration.</CardDescription>
              </CardHeader>
              <CardContent>
                {birthChartResult ? (
                  <div className="space-y-4">
                    <div className="rounded-3xl bg-white/80 p-4">
                      <div className="text-sm text-slate-500">Sun Sign</div>
                      <div className="text-3xl font-bold text-rose-700">{birthChartResult.sunSign}</div>
                    </div>
                    <div className="rounded-3xl bg-white/80 p-4">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-rose-700"><SunMedium className="h-4 w-4" /> Summary</div>
                      <p className="text-slate-700">{birthChartResult.summary}</p>
                    </div>
                    <div className="rounded-3xl bg-white/80 p-4">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-rose-700"><CalendarDays className="h-4 w-4" /> Next Backend Upgrade</div>
                      <p className="text-slate-700">{birthChartResult.nextStep}</p>
                    </div>
                    <div className="rounded-3xl bg-white/80 p-4 text-sm text-slate-600">
                      <p><span className="font-semibold text-rose-700">Birth Time Entered:</span> {birthChartResult.birthTime || "Not entered"}</p>
                      <p><span className="font-semibold text-rose-700">Birth Place Entered:</span> {birthChartResult.birthPlace || "Not entered"}</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl bg-white/80 p-6 text-slate-600">Enter your birth details to see a preview. For a full live version, this section can connect to a real astrology backend.</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "identity" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-[2rem] border-white/60 bg-white/75 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Identity Systems</CardTitle>
                <CardDescription>Preview MBTI, Big Five, Human Design, chakra focus, shadow work archetypes, and Enneagram.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="identityName">Name</Label>
                  <Input id="identityName" value={identityName} onChange={(e) => setIdentityName(e.target.value)} placeholder="Enter your name" className="rounded-2xl border-rose-100 bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="identityFocus">What do you want insight on?</Label>
                  <Input id="identityFocus" value={identityFocus} onChange={(e) => setIdentityFocus(e.target.value)} placeholder="Purpose, love, healing, confidence..." className="rounded-2xl border-rose-100 bg-white" />
                </div>
                <div className="rounded-3xl bg-rose-50 p-4 text-sm text-slate-600">
                  This section is a beautiful preview layout. For a truly accurate live version, MBTI, Big Five, and Enneagram should use real question scoring, and Human Design should use exact birth calculations.
                </div>
                <Button onClick={runIdentityReading} className="rounded-full bg-rose-500 hover:bg-rose-600 text-white">Reveal My Identity Reading</Button>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-white/60 bg-gradient-to-br from-white/85 to-pink-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Your Identity Reading</CardTitle>
                <CardDescription>A modern self-discovery preview that can grow into a full assessment system.</CardDescription>
              </CardHeader>
              <CardContent>
                {identityResult ? (
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-white/80 p-4"><div className="text-sm text-slate-500">MBTI</div><div className="text-2xl font-bold text-rose-700">{identityResult.mbti}</div></div>
                      <div className="rounded-3xl bg-white/80 p-4"><div className="text-sm text-slate-500">Enneagram</div><div className="text-2xl font-bold text-rose-700">Type {identityResult.enneagram}</div></div>
                      <div className="rounded-3xl bg-white/80 p-4"><div className="text-sm text-slate-500">Human Design</div><div className="text-2xl font-bold text-rose-700">{identityResult.humanDesign}</div></div>
                      <div className="rounded-3xl bg-white/80 p-4"><div className="text-sm text-slate-500">Chakra Focus</div><div className="text-2xl font-bold text-rose-700">{identityResult.chakra}</div></div>
                    </div>
                    <div className="rounded-3xl bg-white/80 p-4">
                      <div className="mb-1 text-sm text-slate-500">Shadow Work Archetype</div>
                      <div className="text-2xl font-bold text-rose-700">{identityResult.archetype}</div>
                      <p className="mt-2 text-sm text-slate-600">Current focus: {identityResult.focus}</p>
                    </div>
                    <div className="rounded-3xl bg-white/80 p-4 space-y-3">
                      <div className="mb-1 flex items-center gap-2 font-semibold text-rose-700"><Brain className="h-4 w-4" /> Big Five Personality Traits</div>
                      <TraitBar label="Openness" value={identityResult.bigFive.openness} />
                      <TraitBar label="Conscientiousness" value={identityResult.bigFive.conscientiousness} />
                      <TraitBar label="Extraversion" value={identityResult.bigFive.extraversion} />
                      <TraitBar label="Agreeableness" value={identityResult.bigFive.agreeableness} />
                      <TraitBar label="Emotional Sensitivity" value={identityResult.bigFive.emotionalSensitivity} />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl bg-white/80 p-6 text-slate-600">Enter your name to preview your expanded personality systems reading.</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "journal" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-[2rem] border-white/60 bg-white/75 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">Modern Self-Discovery Journal</CardTitle>
                <CardDescription>Reflect, process, and receive a gentle AI-style reading from your words.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="journalMood">Current Mood</Label>
                  <Input id="journalMood" value={journalMood} onChange={(e) => setJournalMood(e.target.value)} placeholder="Hopeful, heavy, reflective, excited..." className="rounded-2xl border-rose-100 bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="journalEntry">Journal Reflection</Label>
                  <textarea id="journalEntry" value={journalEntry} onChange={(e) => setJournalEntry(e.target.value)} placeholder="Write what is on your heart, what you are learning, or what season of life you are in..." className="min-h-[220px] w-full rounded-3xl border border-rose-100 bg-white p-4 outline-none" />
                </div>
                <Button onClick={runJournalReading} className="rounded-full bg-rose-500 hover:bg-rose-600 text-white">Generate AI Reflection Reading</Button>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-white/60 bg-gradient-to-br from-white/85 to-amber-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-700">AI Reading</CardTitle>
                <CardDescription>A modern journal flow for reflection, pattern noticing, and soft emotional guidance.</CardDescription>
              </CardHeader>
              <CardContent>
                {journalResult ? (
                  <div className="space-y-4">
                    <div className="rounded-3xl bg-white/80 p-4">
                      <div className="text-sm text-slate-500">Mood Energy</div>
                      <div className="text-2xl font-bold text-rose-700 capitalize">{journalResult.mood}</div>
                    </div>
                    <div className="rounded-3xl bg-white/80 p-4">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-rose-700"><Heart className="h-4 w-4" /> AI-Based Reading</div>
                      <p className="text-slate-700">{journalResult.reading}</p>
                    </div>
                    <div className="rounded-3xl bg-white/80 p-4">
                      <div className="mb-2 flex items-center gap-2 font-semibold text-rose-700"><BookOpenText className="h-4 w-4" /> Reflection Prompt</div>
                      <p className="text-slate-700">{journalResult.prompt}</p>
                    </div>
                    <div className="rounded-3xl bg-white/80 p-4">
                      <div className="mb-2 font-semibold text-rose-700">Journal Summary</div>
                      <p className="text-slate-700">{journalResult.summary}</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl bg-white/80 p-6 text-slate-600">Write a reflection to generate your AI-based reading and guided journal prompt.</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <footer className="mt-10 rounded-[2rem] border border-white/60 bg-white/60 p-5 text-sm text-slate-600 shadow-md backdrop-blur-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-rose-700 font-semibold"><Flower2 className="h-4 w-4" /> New Bloom</div>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-1"><UserRound className="h-4 w-4" /> Self-discovery</span>
              <span className="inline-flex items-center gap-1"><Sparkles className="h-4 w-4" /> Spring glow theme</span>
              <span className="inline-flex items-center gap-1"><MoonStar className="h-4 w-4" /> Ready to expand</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
