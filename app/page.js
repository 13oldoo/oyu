"use client";
"use State";
"use Effect";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Home,
  MapPin,
  Sparkles,
  BookOpen,
  Calendar,
  Users,
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  Send,
  Star,
  Coffee,
  Wifi,
  Volume2,
  Clock,
  Award,
  Trophy,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
  LogIn,
  Plus,
  ArrowRight,
  Heart,
  Bookmark,
  Share2,
  Play,
  FileText,
  Zap,
  TrendingUp,
  Filter,
  Mic,
  Image as ImageIcon,
  Paperclip,
  Bot,
  ChevronDown,
  CircleCheck,
  Target,
  Flame,
  ArrowUpRight,
  X,
  BarChart3,
  Menu,
  Sun,
  Moon,
  User,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  ThumbsUp,
  MoreVertical,
  Compass,
  Coins,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Globe,
  Layers,
  Navigation2,
  Building2,
  Trash2,
  Pencil,
  CalendarDays,
  BookMarked,
  GraduationCap as GradCap,
  UserCheck,
  Video,
  Headphones,
  MessageCircle,
  Sparkle,
  RefreshCw,
  Download,
  CheckCircle2,
  ChevronUp,
  MoveRight,
  Megaphone,
  Gift,
  Crown,
  MoreHorizontal,
  Camera,
} from "lucide-react";

// =============================================================
// CONSTANTS
// =============================================================

const SPOTS = [
  {
    id: 1,
    name: "МУИС-ийн Төв номын сан",
    type: "library",
    busy: 67,
    rating: 4.8,
    reviews: 1247,
    dist: "0.4 км",
    area: "Сүхбаатар",
    icon: "📚",
    tags: ["wifi", "quiet", "247"],
    desc: "Уламжлалт уур амьсгалтай, чимээгүй уншлагын танхимтай.",
    x: 52,
    y: 38,
    hours: "07:00 - 22:00",
  },
  {
    id: 2,
    name: "Tom n Toms — Сансар",
    type: "cafe",
    busy: 92,
    rating: 4.5,
    reviews: 832,
    dist: "1.2 км",
    area: "Баянзүрх",
    icon: "☕",
    tags: ["wifi", "outlet", "coffee"],
    desc: "24 цаг, гадаа суудалтай, хурдан Wi-Fi.",
    x: 68,
    y: 50,
    hours: "24/7",
  },
  {
    id: 3,
    name: "UB Hub Coworking",
    type: "coworking",
    busy: 48,
    rating: 4.9,
    reviews: 412,
    dist: "2.1 км",
    area: "Хан-Уул",
    icon: "💻",
    tags: ["1Gbps", "monitor", "printer"],
    desc: "Дэлгэц, принтер, гар утсан тал бүхий ажлын орчин.",
    x: 42,
    y: 70,
    hours: "08:00 - 24:00",
  },
  {
    id: 4,
    name: "Шинэ Монгол Сургуулийн Хичээлийн Танхим",
    type: "library",
    busy: 30,
    rating: 4.6,
    reviews: 287,
    dist: "3.4 км",
    area: "Чингэлтэй",
    icon: "🏛",
    tags: ["quiet", "free"],
    desc: "Олон нийтэд нээлттэй, үнэгүй уншлагын танхим.",
    x: 48,
    y: 26,
    hours: "08:00 - 20:00",
  },
  {
    id: 5,
    name: "Caffé Bene — Шангрила",
    type: "cafe",
    busy: 75,
    rating: 4.3,
    reviews: 624,
    dist: "0.8 км",
    area: "Сүхбаатар",
    icon: "☕",
    tags: ["wifi", "food"],
    desc: "Тав тухтай суудал, гэрэлтэй цонх.",
    x: 50,
    y: 42,
    hours: "08:00 - 23:00",
  },
  {
    id: 6,
    name: "ШУТИС-ийн Төв номын сан",
    type: "library",
    busy: 81,
    rating: 4.7,
    reviews: 956,
    dist: "1.5 км",
    area: "Сүхбаатар",
    icon: "📚",
    tags: ["wifi", "quiet", "study"],
    desc: "Инженерийн ном, цахим эх сурвалж элбэгтэй.",
    x: 54,
    y: 36,
    hours: "08:00 - 22:00",
  },
  {
    id: 7,
    name: "Coffee Coffee — Зайсан",
    type: "cafe",
    busy: 55,
    rating: 4.4,
    reviews: 387,
    dist: "5.2 км",
    area: "Хан-Уул",
    icon: "☕",
    tags: ["view", "outlet"],
    desc: "Уулын үзэмжтэй, тайвшралтай орчин.",
    x: 38,
    y: 78,
    hours: "07:00 - 22:00",
  },
  {
    id: 8,
    name: "OYU Hub — Оюутны Төв",
    type: "coworking",
    busy: 62,
    rating: 4.9,
    reviews: 198,
    dist: "0.6 км",
    area: "Сүхбаатар",
    icon: "🎓",
    tags: ["free", "wifi", "events"],
    desc: "Зөвхөн оюутнуудад зориулсан үнэгүй ажлын орчин.",
    x: 51,
    y: 40,
    hours: "09:00 - 23:00",
  },
];

const COURSES = [
  {
    id: "em",
    title: "Электромагнетизм",
    sub: "Физик · 12-р анги",
    progress: 67,
    color: "#C8FF3A",
    lessons: "14/21",
    instructor: "Б.Бат-Эрдэнэ",
    duration: "12 цаг 30 мин",
    students: 1247,
    rating: 4.8,
    desc: "Цахилгаан ба соронзон оронд суурилсан физикийн салбар. ЭЕШ-д орох, инженерийн чиглэлээр ороход чухал суурь хичээл.",
    category: "physics",
  },
  {
    id: "math",
    title: "ЭЕШ — Математик",
    sub: "Бэлтгэл · ЭЕШ",
    progress: 42,
    color: "#FF6B35",
    lessons: "9/24",
    instructor: "Д.Сараа",
    duration: "18 цаг",
    students: 3892,
    rating: 4.9,
    desc: "Алгебр, геометр, функц, дифференциал — ЭЕШ 2026-д орох бүх сэдвийг хамарсан бэлтгэл.",
    category: "exam",
  },
  {
    id: "react",
    title: "React Тренд 2026",
    sub: "Програмчлал · Курс",
    progress: 88,
    color: "#9D7CFF",
    lessons: "22/25",
    instructor: "А.Мөнхбат",
    duration: "24 цаг",
    students: 567,
    rating: 4.7,
    desc: "Орчин үеийн React-ийн hook, server component, Next.js 15-ыг хамарсан гүн гүнзгий курс.",
    category: "programming",
  },
  {
    id: "eng",
    title: "Англи хэл — IELTS 7.0",
    sub: "Хэл · Бэлтгэл",
    progress: 25,
    color: "#5DD3FA",
    lessons: "6/24",
    instructor: "Sarah Williams",
    duration: "32 цаг",
    students: 2103,
    rating: 4.6,
    desc: "Speaking, Writing, Reading, Listening — бүх 4 чиглэлийг хамарсан IELTS 7.0+ зорилгоор.",
    category: "language",
  },
  {
    id: "chem",
    title: "Органик Химийн Үндэс",
    sub: "Хими · 11-р анги",
    progress: 12,
    color: "#FFE66A",
    lessons: "3/18",
    instructor: "Ц.Энхтуяа",
    duration: "14 цаг",
    students: 892,
    rating: 4.5,
    desc: "Нүүрстөрөгчийн нэгдлүүд, харилцан үйлчлэл, биомолекулууд.",
    category: "chemistry",
  },
  {
    id: "des",
    title: "UI/UX Дизайны Үндэс",
    sub: "Дизайн · Курс",
    progress: 0,
    color: "#E580B0",
    lessons: "0/16",
    instructor: "Б.Энхтөр",
    duration: "20 цаг",
    students: 1432,
    rating: 4.8,
    desc: "Figma, дизайн системээс эхлээд бодит product UX хүртэл.",
    category: "design",
  },
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: "exam",
    title: "Электромагнетизмийн дунд шалгалт",
    text: "Маргааш 14:00 цагт, A-301 өрөөнд",
    time: "5 минутын өмнө",
    read: false,
    icon: "📚",
    color: "#FF6B35",
  },
  {
    id: 2,
    type: "ai",
    title: "AI таны асуултанд хариуллаа",
    text: "Лоренцын хүчний жишээний асуудал",
    time: "1 цагийн өмнө",
    read: false,
    icon: "✨",
    color: "#C8FF3A",
  },
  {
    id: 3,
    type: "event",
    title: "Bamba Hackathon — энэ Пүрэв",
    text: "47 хүн бүртгүүлсэн. Чи нэгдэх үү?",
    time: "3 цагийн өмнө",
    read: false,
    icon: "🚀",
    color: "#9D7CFF",
  },
  {
    id: 4,
    type: "mentor",
    title: "Энхбат гуай таны ментор болохыг хүлээн авлаа",
    text: "Эхний уулзалт төлөвлөе",
    time: "5 цагийн өмнө",
    read: true,
    icon: "👨‍🏫",
    color: "#5DD3FA",
  },
  {
    id: 5,
    type: "scholarship",
    title: "DAAD тэтгэлэгийн өргөдөл",
    text: "Хүлээн авах эцсийн хугацаа 14 хоног",
    time: "1 өдрийн өмнө",
    read: true,
    icon: "🎓",
    color: "#FFE66A",
  },
  {
    id: 6,
    type: "system",
    title: "Token цуглуулсаны төлөө +50 OYU",
    text: "12 хоногийн streak хадгалсан",
    time: "2 өдрийн өмнө",
    read: true,
    icon: "🪙",
    color: "#C8FF3A",
  },
];

const NEWS = [
  {
    id: 1,
    title: "OYU AI v0.7 шинэчлэлт — зураг танигч нэмэгдлээ",
    category: "Шинэчлэлт",
    time: "Өнөөдөр",
    color: "#C8FF3A",
    desc: "PDF болон зургаас текст автоматаар уншуулж AI-аар хичээл болгох боломжтой.",
  },
  {
    id: 2,
    title: "Эрх ашгийн тэмцээн — ШУТИС vs МУИС",
    category: "Эвент",
    time: "1 өдрийн өмнө",
    color: "#FF6B35",
    desc: "Code marathon · 2026-04-29 · Шагнал ₮5 сая.",
  },
  {
    id: 3,
    title: "Хавар-2026 ЭЕШ-ын бүртгэл нээлттэй",
    category: "Зар",
    time: "2 өдрийн өмнө",
    color: "#9D7CFF",
    desc: "Бүртгэлийн эцсийн хугацаа 5-р сарын 15.",
  },
  {
    id: 4,
    title: "Шинэ ментор — Frontend developer Энхбат",
    category: "Ментор",
    time: "3 өдрийн өмнө",
    color: "#5DD3FA",
    desc: "10 жилийн туршлагатай, Khan Bank Lab-д ажилладаг.",
  },
  {
    id: 5,
    title: "Алтан Гадас тэтгэлэг 2026 — өргөдөл хүлээн авч байна",
    category: "Тэтгэлэг",
    time: "5 өдрийн өмнө",
    color: "#FFE66A",
    desc: "Жилд ₮12 саяын тэтгэлэг. 50 оюутан сонгогдоно.",
  },
];

const MENTORS = [
  {
    id: 1,
    name: "Б.Энхбат",
    role: "Senior Frontend · Khan Bank Lab",
    avatar: "Э",
    color: "#C8FF3A",
    expertise: ["React", "TypeScript", "Web дизайн"],
    rating: 4.9,
    sessions: 247,
    langs: ["MN", "EN"],
    price: "₮25,000/цаг",
    bio: "10 жилийн туршлагатай. Залуу хөгжүүлэгчдэд ажилд орох замыг харуулах сэтгэлтэй.",
    available: true,
  },
  {
    id: 2,
    name: "Д.Сараа",
    role: "Математикийн багш · ЭЕШ 800+",
    avatar: "С",
    color: "#FF6B35",
    expertise: ["Алгебр", "Геометр", "ЭЕШ", "Олимпиад"],
    rating: 5.0,
    sessions: 892,
    langs: ["MN"],
    price: "₮20,000/цаг",
    bio: "ЭЕШ-д 800+ оноо авсан 156 шавьтай. Хувийн стратеги боловсруулж өгнө.",
    available: true,
  },
  {
    id: 3,
    name: "Ц.Энхтуяа",
    role: "Химийн доктор · ШУТИС",
    avatar: "Э",
    color: "#9D7CFF",
    expertise: ["Органик хими", "Биохими"],
    rating: 4.8,
    sessions: 156,
    langs: ["MN", "RU"],
    price: "₮22,000/цаг",
    bio: "ШУТИС-д 8 жил багшилсан. Шинжлэх ухааны гүн ойлголтоор үнэлэгддэг.",
    available: false,
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "IELTS Trainer · Британий зөвлөл",
    avatar: "S",
    color: "#5DD3FA",
    expertise: ["IELTS", "Academic Writing", "Speaking"],
    rating: 4.9,
    sessions: 423,
    langs: ["EN"],
    price: "$25/hour",
    bio: "Cambridge, Oxford-ийн оюутнуудад заасан. Speaking-ийн мэргэжилтэн.",
    available: true,
  },
  {
    id: 5,
    name: "А.Мөнхбат",
    role: "Tech Lead · erxes",
    avatar: "М",
    color: "#FFE66A",
    expertise: ["Full-stack", "DevOps", "Архитектур"],
    rating: 4.7,
    sessions: 187,
    langs: ["MN", "EN"],
    price: "₮30,000/цаг",
    bio: "OSS contributor, monorepo-уудтай ажилласан туршлагатай.",
    available: true,
  },
  {
    id: 6,
    name: "Г.Анхбаяр",
    role: "UX Lead · Khan Bank",
    avatar: "А",
    color: "#E580B0",
    expertise: ["UX Research", "Figma", "Дизайн систем"],
    rating: 4.8,
    sessions: 134,
    langs: ["MN", "EN"],
    price: "₮28,000/цаг",
    bio: "Дизайны бүтээгдэхүүний 0→1 туршлагатай.",
    available: true,
  },
];

const SCHEDULE_DATA = {
  // Day index: 0=Mon, 1=Tue, ..., 6=Sun
  events: [
    {
      day: 0,
      start: 9,
      end: 11,
      title: "Дохио ба систем — лаб 5",
      loc: "ШУТИС, B-203",
      type: "lab",
      color: "#5DD3FA",
    },
    {
      day: 0,
      start: 11.5,
      end: 13,
      title: "Embedded systems лекц",
      loc: "Online · Zoom",
      type: "lecture",
      color: "#C8FF3A",
    },
    {
      day: 0,
      start: 14,
      end: 16,
      title: "Электромагнетизм — Дунд шалгалт",
      loc: "ШУТИС, A-301",
      type: "exam",
      color: "#FF6B35",
    },
    {
      day: 0,
      start: 17.5,
      end: 19,
      title: "Электроник клуб уулзалт",
      loc: "UB Innovation Hub",
      type: "club",
      color: "#9D7CFF",
    },
    {
      day: 1,
      start: 9,
      end: 10.5,
      title: "Магадлал ба санамсаргүй процесс",
      loc: "ШУТИС, A-205",
      type: "lecture",
      color: "#C8FF3A",
    },
    {
      day: 1,
      start: 11,
      end: 12.5,
      title: "Микропроцессор — лаб 4",
      loc: "ШУТИС, B-105",
      type: "lab",
      color: "#5DD3FA",
    },
    {
      day: 1,
      start: 14,
      end: 15,
      title: "Б.Энхбат ментортой уулзалт",
      loc: "Online · Google Meet",
      type: "mentor",
      color: "#FFE66A",
    },
    {
      day: 2,
      start: 10,
      end: 12,
      title: "Электромагнетизм лекц",
      loc: "ШУТИС, A-301",
      type: "lecture",
      color: "#C8FF3A",
    },
    {
      day: 2,
      start: 13,
      end: 15,
      title: "React курс — өөрөө сурах",
      loc: "Гэр",
      type: "self",
      color: "#9D7CFF",
    },
    {
      day: 3,
      start: 9,
      end: 11,
      title: "Дохио ба систем — Дунд шалгалт",
      loc: "ШУТИС, A-201",
      type: "exam",
      color: "#FF6B35",
    },
    {
      day: 3,
      start: 14,
      end: 17,
      title: "Bamba Hackathon",
      loc: "UB Hub",
      type: "event",
      color: "#9D7CFF",
    },
    {
      day: 4,
      start: 9,
      end: 10.5,
      title: "Магадлал лекц",
      loc: "ШУТИС, A-205",
      type: "lecture",
      color: "#C8FF3A",
    },
    {
      day: 4,
      start: 14,
      end: 16,
      title: "IELTS Speaking — Sarah Williams",
      loc: "Online",
      type: "mentor",
      color: "#FFE66A",
    },
    {
      day: 5,
      start: 10,
      end: 12,
      title: "ЭЕШ Математик — өөрөө сурах",
      loc: "МУИС-ийн төв номын сан",
      type: "self",
      color: "#5DD3FA",
    },
  ],
};

// =============================================================
// THEMES
// =============================================================

const lightTheme = {
  bg: "#FAF9F2",
  bgTranslucent: "rgba(250, 249, 242, 0.92)",
  card: "#FFFFFF",
  cardSoft: "#F0EFE7",
  text: "#0A0B10",
  textMuted: "rgba(10, 11, 16, 0.65)",
  textFaint: "rgba(10, 11, 16, 0.4)",
  border: "rgba(10, 11, 16, 0.08)",
  borderStrong: "rgba(10, 11, 16, 0.18)",
  sidebar: "#F0EFE7",
  sidebarBorder: "rgba(10, 11, 16, 0.08)",
  accent: "#7CB300",
  accentText: "#0A0B10",
  accentSoft: "#C8FF3A",
  warm: "#FF6B35",
  cool: "#5DD3FA",
  purple: "#7C5CD9",
  yellow: "#E5C200",
  pink: "#D466A0",
  surfaceMute: "rgba(10, 11, 16, 0.04)",
  surfaceMuteStrong: "rgba(10, 11, 16, 0.08)",
};

const darkTheme = {
  bg: "#0A0B10",
  bgTranslucent: "rgba(10, 11, 16, 0.92)",
  card: "linear-gradient(145deg, #14151D, #0F1015)",
  cardSoft: "#14151D",
  text: "#F0EFE7",
  textMuted: "rgba(240, 239, 231, 0.7)",
  textFaint: "rgba(240, 239, 231, 0.4)",
  border: "rgba(255, 255, 255, 0.06)",
  borderStrong: "rgba(255, 255, 255, 0.18)",
  sidebar: "#08090E",
  sidebarBorder: "rgba(255, 255, 255, 0.05)",
  accent: "#C8FF3A",
  accentText: "#0A0B10",
  accentSoft: "#C8FF3A",
  warm: "#FF6B35",
  cool: "#5DD3FA",
  purple: "#9D7CFF",
  yellow: "#FFE66A",
  pink: "#E580B0",
  surfaceMute: "rgba(255, 255, 255, 0.04)",
  surfaceMuteStrong: "rgba(255, 255, 255, 0.08)",
};

function themeVars(t) {
  return {
    "--bg": t.bg,
    "--bg-translucent": t.bgTranslucent,
    "--card": t.card,
    "--card-soft": t.cardSoft,
    "--text": t.text,
    "--text-muted": t.textMuted,
    "--text-faint": t.textFaint,
    "--border": t.border,
    "--border-strong": t.borderStrong,
    "--sidebar": t.sidebar,
    "--sidebar-border": t.sidebarBorder,
    "--accent": t.accent,
    "--accent-text": t.accentText,
    "--accent-soft": t.accentSoft,
    "--warm": t.warm,
    "--cool": t.cool,
    "--purple": t.purple,
    "--yellow": t.yellow,
    "--pink": t.pink,
    "--surface-mute": t.surfaceMute,
    "--surface-mute-strong": t.surfaceMuteStrong,
  };
}

// =============================================================
// MAIN APP
// =============================================================

export default function OyuApp() {
  // ROUTING via URL hash
  const [view, setViewState] = useState("home");
  const [routeParam, setRouteParam] = useState(null);

  const navigate = useCallback((v) => {
    if (typeof window !== "undefined") {
      window.location.hash = v;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      const h = window.location.hash.replace("#", "") || "home";
      const parts = h.split("/");
      setViewState(parts[0] || "home");
      setRouteParam(parts[1] || null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handler);
    handler();
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  // THEME
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("oyu-theme");
    if (saved) setTheme(saved);
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") localStorage.setItem("oyu-theme", next);
  };

  // AUTH
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("oyu-auth");
    if (saved === "true") setLoggedIn(true);
  }, []);
  const handleLogin = () => {
    setLoggedIn(true);
    if (typeof window !== "undefined") localStorage.setItem("oyu-auth", "true");
    showToast("Тавтай морил! +20 OYU token", "success");
  };
  const handleLogout = () => {
    setLoggedIn(false);
    if (typeof window !== "undefined")
      localStorage.setItem("oyu-auth", "false");
    navigate("home");
  };

  // PROFILE
  const [profile, setProfile] = useState({
    name: "Болдоо",
    fullName: "Б.Болдоо",
    email: "boldoo@must.edu.mn",
    phone: "+976 9911-2233",
    avatar: "Б",
    school: "ШУТИС",
    grade: "2-р курс",
    major: "Электроникийн инженер",
    bio: "Хичээл болон embedded системийг хослуулан суралцагч.",
    tokens: 1240,
    streak: 12,
    joined: "2026-03-15",
  });

  // AI CHAT
  const [aiMessages, setAiMessages] = useState([
    {
      role: "ai",
      text: "Сайн уу Болдоо! Би OYU AI. Энэ долоо хоног электромагнетизмийн шалгалттай байна гэсэн? Тусалъя.",
    },
  ]);
  const [aiInput, setAiInput] = useState("");

  // CHAT
  const [activeChat, setActiveChat] = useState(null);

  // NOTIFICATIONS / NEWS state
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [notifOpen, setNotifOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllRead = () =>
    setNotifications(notifications.map((n) => ({ ...n, read: true })));

  // TOAST
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // BOOKMARKED SPOTS
  const [bookmarks, setBookmarks] = useState([]);
  const toggleBookmark = (spotId) => {
    setBookmarks((prev) =>
      prev.includes(spotId)
        ? prev.filter((x) => x !== spotId)
        : [...prev, spotId],
    );
  };

  // Theme variables
  const t = theme === "dark" ? darkTheme : lightTheme;

  // Show login screen if not logged in
  if (!loggedIn) {
    return (
      <div
        className="min-h-screen w-full"
        style={{
          ...themeVars(t),
          background: "var(--bg)",
          color: "var(--text)",
          fontFamily: "'Geist', system-ui, sans-serif",
        }}
      >
        <GlobalStyles />
        <AuthScreen
          onLogin={handleLogin}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        {toast && <Toast {...toast} />}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{
        ...themeVars(t),
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "'Geist', system-ui, sans-serif",
      }}
    >
      <GlobalStyles />

      <div className="flex">
        {/* DESKTOP SIDEBAR */}
        <Sidebar
          view={view}
          navigate={navigate}
          profile={profile}
          handleLogout={handleLogout}
          unreadCount={unreadCount}
        />

        {/* MOBILE DRAWER */}
        {mobileNavOpen && (
          <MobileDrawer
            view={view}
            navigate={(v) => {
              navigate(v);
              setMobileNavOpen(false);
            }}
            profile={profile}
            handleLogout={handleLogout}
            unreadCount={unreadCount}
            onClose={() => setMobileNavOpen(false)}
          />
        )}

        {/* MAIN */}
        <main className="flex-1 min-h-screen w-full md:w-auto">
          {/* TOP BAR (visible on every view for nav consistency) */}
          <TopBar
            navigate={navigate}
            view={view}
            unreadCount={unreadCount}
            onOpenNotif={() => setNotifOpen(true)}
            onOpenNews={() => setNewsOpen(true)}
            onOpenMobileNav={() => setMobileNavOpen(true)}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          {view === "home" && (
            <DashboardHome navigate={navigate} profile={profile} />
          )}
          {view === "spots" && (
            <StudySpotsView
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
              showToast={showToast}
            />
          )}
          {view === "ai" && (
            <AIView
              messages={aiMessages}
              setMessages={setAiMessages}
              input={aiInput}
              setInput={setAiInput}
            />
          )}
          {view === "learn" && <LearningView navigate={navigate} />}
          {view === "course" && (
            <CourseDetailView
              courseId={routeParam}
              navigate={navigate}
              showToast={showToast}
            />
          )}
          {view === "schedule" && <ScheduleView showToast={showToast} />}
          {view === "mentor" && <MentorView showToast={showToast} />}
          {view === "events" && <EventsView showToast={showToast} />}
          {view === "chat" && (
            <ChatView activeChat={activeChat} setActiveChat={setActiveChat} />
          )}
          {view === "community" && <CommunityView showToast={showToast} />}
          {view === "profile" && (
            <ProfileView
              profile={profile}
              setProfile={setProfile}
              navigate={navigate}
              showToast={showToast}
            />
          )}
          {view === "settings" && (
            <SettingsView
              theme={theme}
              toggleTheme={toggleTheme}
              handleLogout={handleLogout}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {/* OVERLAYS */}
      {notifOpen && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setNotifOpen(false)}
          onMarkAllRead={markAllRead}
        />
      )}
      {newsOpen && <NewsPanel onClose={() => setNewsOpen(false)} />}
      {toast && <Toast {...toast} />}
    </div>
  );
}

// =============================================================
// GLOBAL STYLES
// =============================================================

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
      .font-display { font-family: 'Instrument Serif', Georgia, serif; letter-spacing: -0.02em; }
      .font-mono { font-family: 'Geist Mono', monospace; }
      ::selection { background: var(--accent); color: var(--accent-text); }
      .glow { box-shadow: 0 0 40px -10px rgba(200, 255, 58, 0.4); }
      .accent-grad { background: linear-gradient(135deg, var(--accent-soft), #8EE600); }
      .text-grad { background: linear-gradient(135deg, var(--accent-soft), #FFE66A); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
      .blink { animation: blink 1.5s ease-in-out infinite; }
      @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      .scroll-x { overflow-x: auto; scrollbar-width: none; }
      .scroll-x::-webkit-scrollbar { display: none; }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .grid-bg {
        background-image:
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px);
        background-size: 32px 32px;
      }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .fade-in { animation: fadeIn 0.4s ease-out forwards; }
      @keyframes slideRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
      .slide-right { animation: slideRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      @keyframes slideLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
      .slide-left { animation: slideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
      .slide-down { animation: slideDown 0.25s ease-out forwards; }
      .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }
      @keyframes pulseDot { 0%, 100% { box-shadow: 0 0 0 0 rgba(200, 255, 58, 0.4); } 50% { box-shadow: 0 0 0 8px rgba(200, 255, 58, 0); } }
      .card-bg { background: var(--card); border: 1px solid var(--border); }
      .card-bg-hover { transition: all 0.25s ease; cursor: pointer; }
      .card-bg-hover:hover { background: var(--card-soft); border-color: var(--border-strong); transform: translateY(-2px); }
      .heart-bounce { animation: heartBounce 0.4s ease-out; }
      @keyframes heartBounce { 0% { transform: scale(1); } 50% { transform: scale(1.4); } 100% { transform: scale(1); } }
      body { transition: background-color 0.3s; }
    `}</style>
  );
}

// =============================================================
// AUTH SCREEN (Login + e-Mongolia mock)
// =============================================================

function AuthScreen({ onLogin, theme, toggleTheme }) {
  const [mode, setMode] = useState("login"); // login | register | emongolia
  const [email, setEmail] = useState("boldoo@must.edu.mn");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [emongoliaStep, setEmongoliaStep] = useState(0);

  const tryLogin = () => {
    if (!email || !password) return;
    onLogin();
  };

  const eMongoliaLogin = () => {
    setEmongoliaStep(1);
    setTimeout(() => setEmongoliaStep(2), 1200);
    setTimeout(() => setEmongoliaStep(3), 2400);
    setTimeout(() => onLogin(), 3500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 fade-in">
      {/* Theme toggle in corner */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: "var(--surface-mute)",
          border: "1px solid var(--border)",
        }}
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </button>

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl w-full items-center">
        {/* BRAND SIDE */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-10">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-display text-3xl font-bold accent-grad glow"
              style={{ color: "var(--accent-text)" }}
            >
              O
            </div>
            <div>
              <div className="font-display text-4xl font-bold leading-none">
                OYU
              </div>
              <div className="text-xs opacity-50 tracking-[0.15em] mt-1">
                CAMPUS · v0.7
              </div>
            </div>
          </div>
          <h1 className="font-display text-6xl font-bold leading-[1.05] mb-6">
            Оюутны <span className="italic opacity-60">бүхий</span>
            <br />
            нэг л дороо.
          </h1>
          <p className="text-base opacity-70 mb-10 max-w-md leading-relaxed">
            Хичээлийн хуваарь, AI туслах, ментор, тэтгэлэг, ажил, чат — Монголын
            оюутан, сурагч бүрд зориулсан.
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            {[
              {
                icon: <Sparkles className="w-4 h-4" />,
                label: "AI hands-on тусламж",
              },
              {
                icon: <Calendar className="w-4 h-4" />,
                label: "SiSi-тэй sync",
              },
              { icon: <UserCheck className="w-4 h-4" />, label: "300+ ментор" },
              { icon: <Coins className="w-4 h-4" />, label: "Token шагнал" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-3 rounded-xl text-xs"
                style={{
                  background: "var(--surface-mute)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ color: "var(--accent)" }}>{f.icon}</div>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FORM SIDE */}
        <div
          className="rounded-3xl p-6 sm:p-10 w-full max-w-md mx-auto"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-display text-2xl font-bold accent-grad"
              style={{ color: "var(--accent-text)" }}
            >
              O
            </div>
            <div className="font-display text-3xl font-bold">OYU</div>
          </div>

          {mode === "emongolia" ? (
            <EMongoliaFlow
              step={emongoliaStep}
              onCancel={() => {
                setMode("login");
                setEmongoliaStep(0);
              }}
            />
          ) : (
            <>
              <div className="text-xs font-mono opacity-50 tracking-[0.2em] mb-2">
                {mode === "login" ? "СИСТЕМД НЭВТРЭХ" : "БҮРТГҮҮЛЭХ"}
              </div>
              <h2 className="font-display text-3xl font-bold mb-6">
                {mode === "login" ? (
                  <>
                    <span className="italic opacity-60">Тавтай</span> морил.
                  </>
                ) : (
                  <>
                    <span className="italic opacity-60">Шинэ</span> бүртгэл.
                  </>
                )}
              </h2>

              {/* e-Mongolia button (primary) */}
              <button
                onClick={() => {
                  setMode("emongolia");
                  eMongoliaLogin();
                }}
                className="w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-3 mb-3 transition-all hover:scale-[1.01]"
                style={{
                  background: "linear-gradient(135deg, #1A4FA0, #0D3070)",
                  color: "#FFF",
                }}
              >
                <ShieldCheck className="w-5 h-5" />
                e-Mongolia-аар нэвтрэх
              </button>

              <div className="flex items-center gap-3 my-5">
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--border)" }}
                />
                <div className="text-[10px] font-mono opacity-50">ЭСВЭЛ</div>
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--border)" }}
                />
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-[10px] font-mono opacity-50 mb-1.5 tracking-[0.15em]">
                    ИМЭЙЛ
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-sm"
                      style={{
                        background: "var(--surface-mute)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono opacity-50 mb-1.5 tracking-[0.15em]">
                    НУУЦ ҮГ
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPwd ? "text" : "password"}
                      onKeyDown={(e) => e.key === "Enter" && tryLogin()}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 py-3 rounded-xl text-sm"
                      style={{
                        background: "var(--surface-mute)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                      }}
                    />
                    <button
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                    >
                      {showPwd ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={tryLogin}
                  className="w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 mt-2 accent-grad"
                  style={{ color: "var(--accent-text)" }}
                >
                  {mode === "login" ? "Нэвтрэх" : "Бүртгүүлэх"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center mt-6 text-xs opacity-60">
                {mode === "login" ? (
                  <>
                    Шинэ хэрэглэгч үү?{" "}
                    <button
                      onClick={() => setMode("register")}
                      className="font-semibold underline"
                    >
                      Бүртгүүлэх
                    </button>
                  </>
                ) : (
                  <>
                    Бүртгэлтэй юу?{" "}
                    <button
                      onClick={() => setMode("login")}
                      className="font-semibold underline"
                    >
                      Нэвтрэх
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EMongoliaFlow({ step, onCancel }) {
  const steps = [
    {
      label: "e-Mongolia руу шилжиж байна...",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      label: "ДАН систем рүү залгагдаж байна",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      label: "Иргэний үнэмлэх баталгаажуулж байна",
      icon: <UserCheck className="w-6 h-6" />,
    },
    {
      label: "OYU-д амжилттай нэвтэрлээ",
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ];
  return (
    <div className="text-center py-6">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
        style={{
          background: "linear-gradient(135deg, #1A4FA0, #0D3070)",
          color: "#FFF",
        }}
      >
        <ShieldCheck className="w-10 h-10" />
      </div>
      <div className="text-xs font-mono opacity-50 tracking-[0.2em] mb-2">
        e-MONGOLIA · ДАН
      </div>
      <h2 className="font-display text-3xl font-bold mb-8">
        <span className="italic opacity-60">Аюулгүй</span> нэвтрэлт
      </h2>

      <div className="space-y-3 max-w-sm mx-auto">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl transition-all"
            style={{
              background:
                i <= step
                  ? "var(--surface-mute-strong)"
                  : "var(--surface-mute)",
              opacity: i <= step ? 1 : 0.4,
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  i < step
                    ? "var(--accent)"
                    : i === step
                      ? "#1A4FA0"
                      : "var(--surface-mute)",
                color:
                  i < step
                    ? "var(--accent-text)"
                    : i === step
                      ? "#FFF"
                      : "currentColor",
              }}
            >
              {i < step ? (
                <CheckCircle className="w-4 h-4" />
              ) : i === step ? (
                <div className="animate-spin">
                  <RefreshCw className="w-4 h-4" />
                </div>
              ) : (
                s.icon
              )}
            </div>
            <div className="text-sm text-left flex-1">{s.label}</div>
          </div>
        ))}
      </div>

      {step < 3 && (
        <button
          onClick={onCancel}
          className="text-xs opacity-50 hover:opacity-100 mt-6"
        >
          Цуцлах
        </button>
      )}
    </div>
  );
}

// =============================================================
// SIDEBAR (desktop)
// =============================================================

function Sidebar({ view, navigate, profile, handleLogout, unreadCount }) {
  return (
    <aside
      className="hidden md:flex flex-col w-64 h-screen sticky top-0 p-5 border-r shrink-0"
      style={{
        borderColor: "var(--sidebar-border)",
        background: "var(--sidebar)",
      }}
    >
      {/* Logo (clickable) */}
      <button
        onClick={() => navigate("home")}
        className="flex items-center gap-2 mb-10 px-2 transition-opacity hover:opacity-80"
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-display text-2xl font-bold accent-grad"
          style={{ color: "var(--accent-text)" }}
        >
          O
        </div>
        <div className="text-left">
          <div className="font-display text-2xl font-bold leading-none">
            OYU
          </div>
          <div className="text-[10px] opacity-50 tracking-[0.15em] mt-0.5">
            CAMPUS · v0.7
          </div>
        </div>
      </button>

      <nav className="space-y-1 flex-1 overflow-y-auto scrollbar-hide">
        <NavSection label="ГЛАВ" />
        <NavItem
          icon={<Home className="w-4 h-4" />}
          label="Нүүр"
          id="home"
          active={view}
          onClick={() => navigate("home")}
        />
        <NavItem
          icon={<Calendar className="w-4 h-4" />}
          label="Хуваарь"
          id="schedule"
          active={view}
          onClick={() => navigate("schedule")}
        />
        <NavItem
          icon={<Sparkles className="w-4 h-4" />}
          label="OYU AI"
          id="ai"
          active={view}
          onClick={() => navigate("ai")}
          highlight
        />

        <NavSection label="СУРАХ" />
        <NavItem
          icon={<BookOpen className="w-4 h-4" />}
          label="Сургалт"
          id="learn"
          active={view === "learn" || view === "course" ? "learn" : view}
          onClick={() => navigate("learn")}
          badge="3"
        />
        <NavItem
          icon={<UserCheck className="w-4 h-4" />}
          label="Ментор"
          id="mentor"
          active={view}
          onClick={() => navigate("mentor")}
        />
        <NavItem
          icon={<MapPin className="w-4 h-4" />}
          label="Хийх газар"
          id="spots"
          active={view}
          onClick={() => navigate("spots")}
        />

        <NavSection label="БУСАД" />
        <NavItem
          icon={<Briefcase className="w-4 h-4" />}
          label="Эвент & ажил"
          id="events"
          active={view}
          onClick={() => navigate("events")}
        />
        <NavItem
          icon={<MessageSquare className="w-4 h-4" />}
          label="Чат"
          id="chat"
          active={view}
          onClick={() => navigate("chat")}
          badge="2"
        />
        <NavItem
          icon={<Users className="w-4 h-4" />}
          label="Холбоо"
          id="community"
          active={view}
          onClick={() => navigate("community")}
        />
      </nav>

      <div
        className="space-y-1 pt-4 border-t"
        style={{ borderColor: "var(--sidebar-border)" }}
      >
        <NavItem
          icon={<Settings className="w-4 h-4" />}
          label="Тохиргоо"
          id="settings"
          active={view}
          onClick={() => navigate("settings")}
        />

        {/* Profile preview + logout (side-by-side, no nested buttons) */}
        <div
          className="flex items-center gap-2 mt-3 p-2 rounded-xl"
          style={{ background: "var(--surface-mute)" }}
        >
          <button
            onClick={() => navigate("profile")}
            className="flex items-center gap-3 flex-1 min-w-0 text-left p-1 rounded-lg transition-colors hover:opacity-80"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm accent-grad shrink-0"
              style={{ color: "var(--accent-text)" }}
            >
              {profile.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">
                {profile.name}
              </div>
              <div className="text-[10px] opacity-50 truncate">
                {profile.school} · {profile.grade}
              </div>
            </div>
          </button>
          <button
            onClick={handleLogout}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/15 transition-colors shrink-0"
            title="Гарах"
          >
            <LogOut
              className="w-3.5 h-3.5 opacity-60 hover:opacity-100"
              style={{ color: "var(--warm)" }}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavSection({ label }) {
  return (
    <div className="text-[10px] font-mono tracking-[0.2em] opacity-40 px-3 pt-3 pb-1.5">
      {label}
    </div>
  );
}

function NavItem({ icon, label, id, active, onClick, badge, highlight }) {
  const isActive = active === id;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
      style={{
        background: isActive ? "var(--surface-mute-strong)" : "transparent",
        color: isActive ? "var(--text)" : "var(--text-muted)",
      }}
    >
      <div className={isActive ? "" : "opacity-70"}>{icon}</div>
      <span className="flex-1">{label}</span>
      {highlight && (
        <div
          className="w-1.5 h-1.5 rounded-full pulse-dot"
          style={{ background: "var(--accent)" }}
        ></div>
      )}
      {badge && (
        <span
          className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold accent-grad"
          style={{ color: "var(--accent-text)" }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// =============================================================
// MOBILE DRAWER
// =============================================================

function MobileDrawer({
  view,
  navigate,
  profile,
  handleLogout,
  unreadCount,
  onClose,
}) {
  return (
    <div className="md:hidden fixed inset-0 z-50 fade-in" onClick={onClose}>
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
      />
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] flex flex-col p-5 slide-left"
        style={{
          background: "var(--sidebar)",
          borderRight: "1px solid var(--sidebar-border)",
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-display text-2xl font-bold accent-grad"
              style={{ color: "var(--accent-text)" }}
            >
              O
            </div>
            <div className="font-display text-2xl font-bold">OYU</div>
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "var(--surface-mute)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto scrollbar-hide">
          <NavSection label="ГЛАВ" />
          <NavItem
            icon={<Home className="w-4 h-4" />}
            label="Нүүр"
            id="home"
            active={view}
            onClick={() => navigate("home")}
          />
          <NavItem
            icon={<Calendar className="w-4 h-4" />}
            label="Хуваарь"
            id="schedule"
            active={view}
            onClick={() => navigate("schedule")}
          />
          <NavItem
            icon={<Sparkles className="w-4 h-4" />}
            label="OYU AI"
            id="ai"
            active={view}
            onClick={() => navigate("ai")}
            highlight
          />
          <NavSection label="СУРАХ" />
          <NavItem
            icon={<BookOpen className="w-4 h-4" />}
            label="Сургалт"
            id="learn"
            active={view}
            onClick={() => navigate("learn")}
            badge="3"
          />
          <NavItem
            icon={<UserCheck className="w-4 h-4" />}
            label="Ментор"
            id="mentor"
            active={view}
            onClick={() => navigate("mentor")}
          />
          <NavItem
            icon={<MapPin className="w-4 h-4" />}
            label="Хийх газар"
            id="spots"
            active={view}
            onClick={() => navigate("spots")}
          />
          <NavSection label="БУСАД" />
          <NavItem
            icon={<Briefcase className="w-4 h-4" />}
            label="Эвент & ажил"
            id="events"
            active={view}
            onClick={() => navigate("events")}
          />
          <NavItem
            icon={<MessageSquare className="w-4 h-4" />}
            label="Чат"
            id="chat"
            active={view}
            onClick={() => navigate("chat")}
            badge="2"
          />
          <NavItem
            icon={<Users className="w-4 h-4" />}
            label="Холбоо"
            id="community"
            active={view}
            onClick={() => navigate("community")}
          />
        </nav>

        <div
          className="space-y-1 pt-4 border-t"
          style={{ borderColor: "var(--sidebar-border)" }}
        >
          <NavItem
            icon={<User className="w-4 h-4" />}
            label="Профайл"
            id="profile"
            active={view}
            onClick={() => navigate("profile")}
          />
          <NavItem
            icon={<Settings className="w-4 h-4" />}
            label="Тохиргоо"
            id="settings"
            active={view}
            onClick={() => navigate("settings")}
          />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mt-2"
            style={{ color: "var(--warm)" }}
          >
            <LogOut className="w-4 h-4" />
            <span>Гарах</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

// =============================================================
// TOP BAR (search, bell, "Шинэ", profile, theme)
// =============================================================

function TopBar({
  navigate,
  view,
  unreadCount,
  onOpenNotif,
  onOpenNews,
  onOpenMobileNav,
  theme,
  toggleTheme,
}) {
  // Hide on AI view (it has its own header)
  if (view === "ai" || view === "chat") return null;

  return (
    <div
      className="sticky top-0 z-30 backdrop-blur-md border-b"
      style={{
        background: "var(--bg-translucent)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4">
        {/* Mobile menu */}
        <button
          onClick={onOpenMobileNav}
          className="md:hidden w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "var(--surface-mute)" }}
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Mobile logo */}
        <button
          onClick={() => navigate("home")}
          className="md:hidden flex items-center gap-2"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-display text-xl font-bold accent-grad"
            style={{ color: "var(--accent-text)" }}
          >
            O
          </div>
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            placeholder="Хайх — газар, эвент, хичээл, хүн..."
            className="w-full pl-11 pr-5 py-2.5 rounded-full text-sm"
            style={{
              background: "var(--surface-mute)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono opacity-40 px-1.5 py-0.5 rounded"
            style={{ border: "1px solid var(--border-strong)" }}
          >
            ⌘K
          </div>
        </div>

        <div className="flex-1 sm:hidden" />

        {/* Right buttons */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "var(--surface-mute)" }}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={onOpenNotif}
          className="w-9 h-9 rounded-full flex items-center justify-center relative shrink-0"
          style={{ background: "var(--surface-mute)" }}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
              style={{ background: "var(--warm)", color: "#FFF" }}
            >
              {unreadCount}
            </div>
          )}
        </button>
        <button
          onClick={onOpenNews}
          className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold accent-grad flex items-center gap-1.5 sm:gap-2 shrink-0"
          style={{ color: "var(--accent-text)" }}
        >
          <Megaphone className="w-4 h-4" />
          <span className="hidden sm:inline">Шинэ</span>
        </button>
      </div>
    </div>
  );
}

// =============================================================
// DASHBOARD HOME
// =============================================================

function DashboardHome({ navigate, profile }) {
  const hour = new Date().getHours();
  const greeting =
    hour < 6
      ? "Шөнө"
      : hour < 12
        ? "Өглөөний мэнд"
        : hour < 18
          ? "Өдрийн мэнд"
          : "Оройн мэнд";

  return (
    <div className="fade-in">
      {/* HERO */}
      <section className="px-4 sm:px-8 py-8 sm:py-10 grid md:grid-cols-12 gap-4 sm:gap-6">
        <div className="md:col-span-8">
          <div className="text-xs font-mono tracking-[0.2em] opacity-50 mb-3">
            {greeting.toUpperCase()} · 4-Р САР 27, ДАВАА
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] mb-2">
            <span className="italic opacity-50">Сайн уу,</span>
            <br />
            {profile.name}.
          </h1>
          <p className="text-sm sm:text-base opacity-60 max-w-lg mt-4">
            Өнөөдөр чи Электромагнетизмийн дунд шалгалттай — 14:00. AI чамд
            бэлдэхэд тусална. Бас Tetris төслийн PR review хийх ёстой шүү.
          </p>
        </div>

        <div className="md:col-span-4 card-bg rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-mono opacity-50">
                ӨНӨӨДРИЙН ХЭМНЭЛ
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold mt-2">
                7-н цаг 23м
              </div>
            </div>
            <Flame className="w-7 h-7" style={{ color: "var(--warm)" }} />
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-xs opacity-70">
              <span>Сурлага</span>
              <span className="font-mono">4ц 12м</span>
            </div>
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ background: "var(--surface-mute-strong)" }}
            >
              <div
                className="h-full rounded-full accent-grad"
                style={{ width: "64%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-3 opacity-50">
              <span>🔥 {profile.streak} хоногийн streak</span>
              <span>Top 8%</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOKEN BAR */}
      <section className="px-4 sm:px-8">
        <div
          className="rounded-2xl p-4 flex items-center gap-3 sm:gap-4"
          style={{
            background: "linear-gradient(135deg, var(--accent-soft), #FFE66A)",
            color: "#0A0B10",
          }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black/15 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-mono opacity-70">OYU TOKEN</div>
            <div className="font-display text-xl sm:text-2xl font-bold leading-none mt-0.5">
              {profile.tokens.toLocaleString()}
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs opacity-70">Энэ долоо хоногт</div>
            <div className="font-mono font-bold">+340</div>
          </div>
          <button className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-black/15 hover:bg-black/25 transition-colors flex items-center gap-1.5 shrink-0">
            <Gift className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Дэлгүүр</span>
          </button>
        </div>
      </section>

      {/* QUICK ACCESS GRID */}
      <section className="px-4 sm:px-8 pt-6 sm:pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <QuickCard
          onClick={() => navigate("ai")}
          icon={<Sparkles />}
          title="AI туслах"
          sub="Шалгалтанд бэлд"
          gradient
        />
        <QuickCard
          onClick={() => navigate("schedule")}
          icon={<Calendar />}
          title="Хуваарь"
          sub="Энэ долоо хоног"
        />
        <QuickCard
          onClick={() => navigate("mentor")}
          icon={<UserCheck />}
          title="Ментор"
          sub="300+ мэргэжилтэн"
        />
        <QuickCard
          onClick={() => navigate("events")}
          icon={<Briefcase />}
          title="Цагийн ажил"
          sub="34 шинэ зар"
        />
      </section>

      {/* MAIN GRID */}
      <section className="px-4 sm:px-8 py-8 sm:py-10 grid md:grid-cols-12 gap-4 sm:gap-5">
        {/* TODAY SCHEDULE */}
        <div className="md:col-span-7 card-bg rounded-3xl p-5 sm:p-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <div className="text-xs font-mono opacity-50 mb-1">ӨНӨӨДӨР</div>
              <div className="font-display text-xl sm:text-2xl font-bold">
                Хичээл & ажил
              </div>
            </div>
            <button
              onClick={() => navigate("schedule")}
              className="text-xs opacity-60 hover:opacity-100 flex items-center gap-1"
            >
              7 хоног <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            <ScheduleItem
              time="09:00"
              title="Дохио ба систем — лаб 5"
              loc="ШУТИС, B-203"
              status="done"
            />
            <ScheduleItem
              time="11:30"
              title="Embedded systems лекц"
              loc="Online · Zoom"
              status="now"
            />
            <ScheduleItem
              time="14:00"
              title="Электромагнетизм — дунд шалгалт"
              loc="ШУТИС, A-301"
              status="urgent"
            />
            <ScheduleItem
              time="17:30"
              title="Электроник клубын уулзалт"
              loc="UB Innovation Hub"
              status="upcoming"
            />
          </div>
        </div>

        {/* TRENDING SPOTS */}
        <div className="md:col-span-5 card-bg rounded-3xl p-5 sm:p-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <div className="text-xs font-mono opacity-50 mb-1">
                ЯГ ОДОО ХҮН ОЛОНТОЙ
              </div>
              <div className="font-display text-xl sm:text-2xl font-bold">
                Идэвхтэй газрууд
              </div>
            </div>
            <button
              onClick={() => navigate("spots")}
              className="text-xs opacity-60 hover:opacity-100"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {SPOTS.slice(0, 3).map((s) => (
              <SpotMini key={s.id} spot={s} onClick={() => navigate("spots")} />
            ))}
          </div>
        </div>

        {/* COURSES */}
        <div className="md:col-span-12">
          <div className="flex justify-between items-center mb-5">
            <div>
              <div className="text-xs font-mono opacity-50 mb-1">
                ЯВЦДАА БУЙ
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold">
                Сургалт.
              </div>
            </div>
            <button
              onClick={() => navigate("learn")}
              className="text-xs sm:text-sm opacity-60 hover:opacity-100 flex items-center gap-1"
            >
              БҮХ КУРС <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {COURSES.slice(0, 3).map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                onClick={() => navigate(`course/${c.id}`)}
              />
            ))}
          </div>
        </div>

        {/* OPPORTUNITIES + EVENTS */}
        <div className="md:col-span-12 grid md:grid-cols-2 gap-4 sm:gap-5">
          <div className="card-bg rounded-3xl p-5 sm:p-6">
            <div className="flex justify-between mb-4">
              <div className="font-display text-xl sm:text-2xl font-bold">
                Боломжууд
              </div>
              <Briefcase className="w-5 h-5 opacity-40" />
            </div>
            <div className="space-y-2">
              <OpportunityItem
                title="Frontend developer (intern)"
                company="erxes"
                type="Цагийн"
                pay="₮35,000/цаг"
              />
              <OpportunityItem
                title="ОУ-ын сургалтын тэтгэлэг"
                company="DAAD"
                type="Тэтгэлэг"
                pay="EUR 850/сар"
              />
              <OpportunityItem
                title="UI/UX дизайнер"
                company="Khan Bank Lab"
                type="Бүтэн цаг"
                pay="₮2.5М"
              />
            </div>
          </div>

          <div
            className="rounded-3xl p-5 sm:p-6 grid-bg"
            style={{
              background:
                "linear-gradient(135deg, rgba(200,255,58,0.15), rgba(142,230,0,0.05))",
              border: "1px solid rgba(200,255,58,0.3)",
            }}
          >
            <div
              className="text-xs font-mono tracking-[0.2em] mb-3"
              style={{ color: "var(--accent)" }}
            >
              OYU ХОЛБОО
            </div>
            <div className="font-display text-2xl sm:text-3xl font-bold mb-3">
              Bamba hardware hackathon.
            </div>
            <p className="text-sm opacity-75 mb-5">
              Электроник клубтай хамтарсан hardware hackathon. Пүрэв гарагт UB
              Hub-д. Шагнал ₮3 сая.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["Б", "А", "Д", "М"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0"
                    style={{
                      background: ["#C8FF3A", "#FF6B35", "#9D7CFF", "#5DD3FA"][
                        i
                      ],
                      color: "#0A0B10",
                      borderColor: "var(--bg)",
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div className="text-xs opacity-70">+47 бүртгүүлсэн</div>
              <button
                onClick={() => navigate("events")}
                className="ml-auto px-4 py-2 rounded-full text-xs font-bold accent-grad shrink-0"
                style={{ color: "var(--accent-text)" }}
              >
                Нэгдэх →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function QuickCard({ icon, title, sub, gradient, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`card-bg-hover rounded-2xl p-4 sm:p-5 text-left ${gradient ? "glow" : ""}`}
      style={
        gradient
          ? {
              background:
                "linear-gradient(135deg, var(--accent-soft), #8EE600)",
              color: "#0A0B10",
              border: "none",
            }
          : { background: "var(--card)", border: "1px solid var(--border)" }
      }
    >
      <div className="flex justify-between mb-4 sm:mb-6">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{
            background: gradient
              ? "rgba(10,11,16,0.15)"
              : "var(--surface-mute)",
          }}
        >
          {icon}
        </div>
        <ArrowUpRight className="w-4 h-4 opacity-40" />
      </div>
      <div className="font-display text-lg sm:text-xl font-bold leading-none">
        {title}
      </div>
      <div className="text-xs mt-2 opacity-70">{sub}</div>
    </button>
  );
}

function ScheduleItem({ time, title, loc, status }) {
  const styles = {
    done: {
      bg: "var(--surface-mute)",
      textOpacity: "opacity-50",
      dot: "#5C8A3A",
    },
    now: { bg: "rgba(200,255,58,0.12)", textOpacity: "", dot: "var(--accent)" },
    urgent: {
      bg: "rgba(255,107,53,0.12)",
      textOpacity: "",
      dot: "var(--warm)",
    },
    upcoming: {
      bg: "var(--surface-mute)",
      textOpacity: "",
      dot: "var(--text-faint)",
    },
  }[status];

  return (
    <div
      className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl ${styles.textOpacity}`}
      style={{ background: styles.bg }}
    >
      <div className="font-mono text-xs sm:text-sm font-medium w-12 sm:w-14 shrink-0">
        {time}
      </div>
      <div
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: styles.dot }}
      ></div>
      <div className="flex-1 min-w-0">
        <div className="text-xs sm:text-sm font-semibold truncate">
          {title}
          {status === "urgent" && (
            <span
              className="text-[10px] font-mono ml-1 px-1.5 py-0.5 rounded inline-block"
              style={{
                background: "rgba(255,107,53,0.2)",
                color: "var(--warm)",
              }}
            >
              ЯАРАЛТАЙ
            </span>
          )}
        </div>
        <div className="text-xs opacity-60 truncate">{loc}</div>
      </div>
      {status === "now" && (
        <div
          className="text-[10px] font-mono blink shrink-0"
          style={{ color: "var(--accent)" }}
        >
          ● ОДОО
        </div>
      )}
    </div>
  );
}

function SpotMini({ spot, onClick }) {
  const color =
    spot.busy > 80
      ? "var(--warm)"
      : spot.busy > 50
        ? "var(--yellow)"
        : "var(--accent)";
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl card-bg-hover"
      style={{ background: "var(--surface-mute)" }}
    >
      <div className="text-2xl shrink-0">{spot.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs sm:text-sm font-semibold truncate">
          {spot.name}
        </div>
        <div className="text-[10px] opacity-60 truncate">
          {spot.tags.slice(0, 2).join(" · ")}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="font-mono text-xs font-bold" style={{ color }}>
          {spot.busy}%
        </div>
        <div className="text-[10px] opacity-50">дүүрсэн</div>
      </div>
    </div>
  );
}

function CourseCard({ course, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card-bg-hover rounded-2xl p-5 cursor-pointer text-left w-full"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex justify-between items-start mb-5">
        <div className="text-xs font-mono opacity-50">{course.sub}</div>
        <Play className="w-4 h-4 opacity-50" />
      </div>
      <div className="font-display text-xl sm:text-2xl font-bold mb-4 leading-tight">
        {course.title}
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex-1 h-1.5 rounded-full"
          style={{ background: "var(--surface-mute-strong)" }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${course.progress}%`, background: course.color }}
          ></div>
        </div>
        <span className="text-xs font-mono opacity-60">{course.progress}%</span>
      </div>
      <div className="text-[10px] opacity-50 font-mono">
        {course.lessons} хичээл
      </div>
    </button>
  );
}

function OpportunityItem({ title, company, type, pay }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl card-bg-hover"
      style={{ background: "var(--surface-mute)" }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
        style={{ background: "var(--surface-mute-strong)" }}
      >
        {company[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs sm:text-sm font-semibold truncate">{title}</div>
        <div className="text-[10px] opacity-60">
          {company} · {type}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div
          className="font-mono text-xs font-bold"
          style={{ color: "var(--accent)" }}
        >
          {pay}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// STUDY SPOTS VIEW (with Google Maps-like map)
// =============================================================

function StudySpotsView({ bookmarks, toggleBookmark, showToast }) {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [layer, setLayer] = useState("default"); // default | satellite | transit

  const filtered =
    filterType === "all" ? SPOTS : SPOTS.filter((s) => s.type === filterType);

  return (
    <div className="fade-in">
      <div
        className="px-4 sm:px-8 py-5 sm:py-6 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-xs font-mono opacity-50 tracking-[0.2em]">
          УЛААНБААТАР · 142 БАЙРШИЛ
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
          Хийх <span className="italic opacity-60">газар</span>.
        </h1>
        <p className="text-sm opacity-60 max-w-xl mt-2">
          Номын сан, кафе, coworking — хэн хаашаа хичнээн орсныг бодит цагт харж
          байгаад очно.
        </p>
      </div>

      {/* FILTER PILLS */}
      <div className="px-4 sm:px-8 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {[
          { id: "all", label: "Бүгд", icon: "🌍", count: SPOTS.length },
          {
            id: "library",
            label: "Номын сан",
            icon: "📚",
            count: SPOTS.filter((s) => s.type === "library").length,
          },
          {
            id: "cafe",
            label: "Кафе",
            icon: "☕",
            count: SPOTS.filter((s) => s.type === "cafe").length,
          },
          {
            id: "coworking",
            label: "Coworking",
            icon: "💻",
            count: SPOTS.filter((s) => s.type === "coworking").length,
          },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-all"
            style={{
              background:
                filterType === f.id ? "var(--accent)" : "var(--surface-mute)",
              color: filterType === f.id ? "var(--accent-text)" : "var(--text)",
              border: filterType === f.id ? "none" : "1px solid var(--border)",
            }}
          >
            <span>{f.icon}</span>
            <span>{f.label}</span>
            <span className="opacity-60">{f.count}</span>
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-8 py-4 grid lg:grid-cols-12 gap-4 sm:gap-5">
        {/* MAP */}
        <div className="lg:col-span-7">
          <GoogleStyleMap
            spots={filtered}
            selectedSpot={selectedSpot}
            setSelectedSpot={setSelectedSpot}
            layer={layer}
            setLayer={setLayer}
          />
        </div>

        {/* LIST */}
        <div className="lg:col-span-5 space-y-3 max-h-[80vh] overflow-y-auto pr-1">
          <div className="text-xs font-mono opacity-50 tracking-[0.2em] mb-1">
            {filtered.length} БАЙРШИЛ
          </div>
          {filtered.map((spot, i) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              delay={i * 0.05}
              isSelected={selectedSpot?.id === spot.id}
              onClick={() => setSelectedSpot(spot)}
              isBookmarked={bookmarks.includes(spot.id)}
              onBookmark={() => {
                toggleBookmark(spot.id);
                showToast(
                  bookmarks.includes(spot.id)
                    ? "Хадгалснаас хаслаа"
                    : "Хадгаллаа",
                  "success",
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Google Maps style SVG map - much more realistic
function GoogleStyleMap({
  spots,
  selectedSpot,
  setSelectedSpot,
  layer,
  setLayer,
}) {
  const [zoom, setZoom] = useState(1);
  const [layerOpen, setLayerOpen] = useState(false);

  const layerStyles = {
    default: {
      bg: "#E8EEF4",
      roads: "#FFFFFF",
      roadStroke: "#D0D8E0",
      buildings: "#DCE3EB",
      parks: "#C8E6C9",
      water: "#A8D5F0",
      text: "#4A5568",
    },
    satellite: {
      bg: "#1E2D3A",
      roads: "#3A4A5A",
      roadStroke: "#2A3A4A",
      buildings: "#2A3A4A",
      parks: "#3A5A4A",
      water: "#1E3A5A",
      text: "#FFF",
    },
    transit: {
      bg: "#F5F1E8",
      roads: "#FFFFFF",
      roadStroke: "#C8B89E",
      buildings: "#E8DECE",
      parks: "#D9E5C8",
      water: "#B8D4E0",
      text: "#6B5840",
    },
  };
  const s = layerStyles[layer];

  return (
    <div
      className="rounded-3xl overflow-hidden relative"
      style={{
        minHeight: 500,
        background: s.bg,
        border: "1px solid var(--border)",
      }}
    >
      {/* Top label */}
      <div
        className="absolute top-4 left-4 z-10 backdrop-blur-md rounded-2xl px-3 py-2 flex items-center gap-2"
        style={{ background: "rgba(255,255,255,0.85)", color: "#0A0B10" }}
      >
        <Compass className="w-4 h-4" />
        <div>
          <div className="text-[10px] font-mono opacity-60">УЛААНБААТАР</div>
          <div className="text-xs font-semibold">47.918° N · 106.917° E</div>
        </div>
      </div>

      {/* Layer + zoom controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <div className="relative">
          <button
            onClick={() => setLayerOpen(!layerOpen)}
            className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.9)", color: "#0A0B10" }}
          >
            <Layers className="w-4 h-4" />
          </button>
          {layerOpen && (
            <div
              className="absolute right-12 top-0 rounded-2xl p-2 slide-down min-w-[140px]"
              style={{
                background: "rgba(255,255,255,0.95)",
                color: "#0A0B10",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
            >
              {[
                { id: "default", label: "Үндсэн" },
                { id: "satellite", label: "Хиймэл дагуул" },
                { id: "transit", label: "Тээвэр" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setLayer(opt.id);
                    setLayerOpen(false);
                  }}
                  className="w-full px-3 py-2 rounded-lg text-xs text-left hover:bg-black/5 flex items-center justify-between"
                >
                  {opt.label}
                  {layer === opt.id && <CheckCircle className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setZoom(Math.min(zoom + 0.3, 2))}
          className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.9)", color: "#0A0B10" }}
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(Math.max(zoom - 0.3, 0.7))}
          className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.9)", color: "#0A0B10" }}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* SVG MAP */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full transition-all duration-700"
        style={{
          minHeight: 500,
          transform: `scale(${zoom})`,
          transformOrigin: "center",
        }}
      >
        <defs>
          <pattern
            id="parkPattern"
            patternUnits="userSpaceOnUse"
            width="2"
            height="2"
          >
            <circle cx="1" cy="1" r="0.3" fill={s.parks} opacity="0.6" />
          </pattern>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0.3"
              stdDeviation="0.4"
              floodOpacity="0.25"
            />
          </filter>
        </defs>

        {/* Background */}
        <rect width="100" height="100" fill={s.bg} />

        {/* Parks (green areas) */}
        <g opacity="0.7">
          <path
            d="M 8 20 Q 18 22 22 30 Q 18 38 10 36 Q 5 28 8 20 Z"
            fill={s.parks}
          />
          <path
            d="M 75 12 Q 88 15 90 25 Q 85 32 78 30 Q 72 22 75 12 Z"
            fill={s.parks}
          />
          <path
            d="M 60 65 Q 70 68 72 75 Q 65 80 58 76 Q 55 70 60 65 Z"
            fill={s.parks}
          />
          <path
            d="M 30 85 Q 40 88 42 92 Q 35 96 28 92 Q 25 88 30 85 Z"
            fill={s.parks}
          />
        </g>

        {/* Mountain shading north (Bogd Khan area) */}
        {layer === "default" && (
          <g opacity="0.3">
            <path
              d="M 0 0 L 100 0 L 100 12 Q 80 14 50 11 Q 20 14 0 12 Z"
              fill="#A8B5A0"
            />
          </g>
        )}

        {/* Tuul River */}
        <path
          d="M -2 78 Q 20 75 35 78 Q 55 80 75 76 Q 90 74 102 75"
          stroke={s.water}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="40"
          y="83"
          fontSize="2.2"
          fill={s.water}
          opacity="0.7"
          fontFamily="Geist"
        >
          Туул гол
        </text>

        {/* Major roads (highways) */}
        <g stroke={s.roadStroke} strokeWidth="0.3" fill="none">
          {/* Peace Avenue (Энхтайван) - east-west */}
          <line
            x1="-2"
            y1="48"
            x2="102"
            y2="48"
            stroke={s.roads}
            strokeWidth="1.4"
          />
          <line x1="-2" y1="48" x2="102" y2="48" />
          {/* North-south main */}
          <line
            x1="50"
            y1="-2"
            x2="50"
            y2="102"
            stroke={s.roads}
            strokeWidth="1.4"
          />
          <line x1="50" y1="-2" x2="50" y2="102" />
          {/* Diagonal road */}
          <line
            x1="0"
            y1="30"
            x2="100"
            y2="60"
            stroke={s.roads}
            strokeWidth="1"
          />
          <line x1="0" y1="30" x2="100" y2="60" />
          <line
            x1="0"
            y1="65"
            x2="100"
            y2="35"
            stroke={s.roads}
            strokeWidth="1"
          />
          <line x1="0" y1="65" x2="100" y2="35" />
        </g>

        {/* Smaller streets (grid pattern) */}
        <g stroke={s.roadStroke} strokeWidth="0.15" opacity="0.6">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={(i + 1) * 8}
              x2="100"
              y2={(i + 1) * 8}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={(i + 1) * 8}
              y1="0"
              x2={(i + 1) * 8}
              y2="100"
            />
          ))}
        </g>

        {/* Building blocks (random placement) */}
        <g fill={s.buildings} opacity="0.5">
          {[
            [10, 14, 6, 4],
            [22, 16, 4, 5],
            [30, 14, 5, 4],
            [42, 18, 4, 4],
            [60, 20, 5, 6],
            [12, 32, 5, 4],
            [22, 32, 6, 5],
            [32, 34, 4, 4],
            [60, 32, 5, 5],
            [72, 30, 5, 6],
            [10, 52, 6, 5],
            [20, 54, 5, 4],
            [32, 54, 6, 5],
            [62, 52, 4, 5],
            [74, 54, 5, 6],
            [12, 64, 5, 4],
            [22, 66, 4, 5],
            [42, 66, 6, 4],
            [62, 64, 5, 6],
            [78, 64, 4, 4],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="0.4" />
          ))}
        </g>

        {/* District labels */}
        {layer !== "satellite" && (
          <g fill={s.text} opacity="0.5" fontFamily="Geist" fontWeight="500">
            <text x="50" y="16" fontSize="2.5" textAnchor="middle">
              ЧИНГЭЛТЭЙ
            </text>
            <text x="20" y="38" fontSize="2.5" textAnchor="middle">
              БАЯНГОЛ
            </text>
            <text x="50" y="42" fontSize="2.5" textAnchor="middle">
              СҮХБААТАР
            </text>
            <text x="80" y="50" fontSize="2.5" textAnchor="middle">
              БАЯНЗҮРХ
            </text>
            <text x="42" y="74" fontSize="2.5" textAnchor="middle">
              ХАН-УУЛ
            </text>
            <text x="12" y="62" fontSize="2.5" textAnchor="middle">
              СОНГИНОХАЙРХАН
            </text>
          </g>
        )}

        {/* Place markers */}
        {spots.map((spot) => {
          const isSel = selectedSpot?.id === spot.id;
          const color =
            spot.type === "library"
              ? "#5DD3FA"
              : spot.type === "cafe"
                ? "#FF6B35"
                : "#9D7CFF";
          return (
            <g
              key={spot.id}
              onClick={() => setSelectedSpot(spot)}
              className="cursor-pointer"
            >
              {isSel && (
                <circle
                  cx={spot.x}
                  cy={spot.y}
                  r="4"
                  fill={color}
                  opacity="0.25"
                  className="marker-pulse"
                />
              )}
              <circle
                cx={spot.x}
                cy={spot.y}
                r={isSel ? "1.8" : "1.2"}
                fill={color}
                stroke="#FFF"
                strokeWidth="0.3"
                filter="url(#shadow)"
              />
              {isSel && (
                <foreignObject
                  x={spot.x - 18}
                  y={spot.y - 12}
                  width="36"
                  height="6"
                >
                  <div
                    style={{
                      background: "#FFF",
                      borderRadius: "1px",
                      padding: "1px 2px",
                      fontSize: "1.6px",
                      textAlign: "center",
                      color: "#0A0B10",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontFamily: "Geist",
                      fontWeight: 600,
                      boxShadow: "0 0.5px 1px rgba(0,0,0,0.3)",
                    }}
                  >
                    {spot.name}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}

        {/* User location indicator */}
        <g>
          <circle
            cx="51"
            cy="42"
            r="2"
            fill="#5DD3FA"
            opacity="0.3"
            className="marker-pulse"
          />
          <circle
            cx="51"
            cy="42"
            r="0.8"
            fill="#5DD3FA"
            stroke="#FFF"
            strokeWidth="0.2"
          />
        </g>
      </svg>

      {/* Bottom info card (when spot selected) */}
      {selectedSpot && (
        <div
          className="absolute bottom-4 left-4 right-4 rounded-2xl p-4 backdrop-blur-md slide-up"
          style={{
            background: "rgba(255,255,255,0.95)",
            color: "#0A0B10",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl shrink-0">{selectedSpot.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-lg font-bold leading-tight">
                {selectedSpot.name}
              </div>
              <div className="flex items-center gap-2 text-xs opacity-70 mt-1">
                <Star
                  className="w-3 h-3 fill-current"
                  style={{ color: "#FFB800" }}
                />
                <span>{selectedSpot.rating}</span>
                <span>·</span>
                <span>{selectedSpot.reviews} үнэлгээ</span>
                <span>·</span>
                <span>{selectedSpot.dist}</span>
              </div>
              <div className="text-xs mt-2 opacity-80">{selectedSpot.desc}</div>
            </div>
            <button
              onClick={() => setSelectedSpot(null)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/10 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              className="flex-1 px-4 py-2 rounded-full text-xs font-bold accent-grad flex items-center justify-center gap-1.5"
              style={{ color: "#0A0B10" }}
            >
              <Navigation2 className="w-3.5 h-3.5" />
              Зам заах
            </button>
            <button
              className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5"
              style={{ background: "rgba(0,0,0,0.08)", color: "#0A0B10" }}
            >
              <Phone className="w-3.5 h-3.5" />
              Залгах
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SpotCard({
  spot,
  delay,
  isSelected,
  onClick,
  isBookmarked,
  onBookmark,
}) {
  const color =
    spot.busy > 80
      ? "var(--warm)"
      : spot.busy > 50
        ? "var(--yellow)"
        : "var(--accent)";
  return (
    <div
      onClick={onClick}
      className="card-bg-hover rounded-2xl p-4 fade-in"
      style={{
        animationDelay: `${delay}s`,
        background: isSelected ? "var(--surface-mute-strong)" : "var(--card)",
        border: `1px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl shrink-0">{spot.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">{spot.name}</div>
          <div className="text-[10px] opacity-60 mt-0.5">
            {spot.area} · {spot.dist}
          </div>
          <div className="flex items-center gap-2 text-xs mt-2 opacity-70">
            <Star
              className="w-3 h-3 fill-current"
              style={{ color: "#FFB800" }}
            />
            <span>{spot.rating}</span>
            <span>·</span>
            <Clock className="w-3 h-3" />
            <span>{spot.hours}</span>
          </div>
          <div className="flex gap-1 mt-2 flex-wrap">
            {spot.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: "var(--surface-mute-strong)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background: isBookmarked
                ? "var(--accent)"
                : "var(--surface-mute)",
            }}
          >
            <Bookmark
              className="w-3.5 h-3.5"
              fill={isBookmarked ? "currentColor" : "none"}
              style={{
                color: isBookmarked ? "var(--accent-text)" : "var(--text)",
              }}
            />
          </button>
          <div className="text-right">
            <div className="font-mono text-xs font-bold" style={{ color }}>
              {spot.busy}%
            </div>
            <div className="text-[9px] opacity-50">дүүрсэн</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// AI VIEW (with working send + responsive)
// =============================================================

function AIView({ messages, setMessages, input, setInput }) {
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    const newMsgs = [...messages, { role: "user", text: userText }];
    setMessages(newMsgs);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const aiResponses = [
        "Электромагнетизмийн дунд шалгалтад голдуу гарах асуудлууд: 1) Магнит хүчний орон, 2) Лоренцын хүч, 3) Цэнэгтэй бөөмийн орбит хөдөлгөөн, 4) Био-Саваарын хууль. Алинаас нь эхлэх вэ?",
        "Сайн асуулт байна. Энэ сэдвийг ойлгохын тулд эхлээд суурь ойлголтуудаас эхэлье. Чи өмнө нь ямар хэмжээгээр уншсан бэ?",
        "Энд бичээрэй гэх юм байна. Нийт 3 алхамтай: эхлээд формул, дараа нь жишээ, эцэст нь дасгал. Эхлүүлэе.",
        "Зөв чиглэл рүү явж байна. Энэ нь чиний өмнөх хичээлийн үргэлжлэл болж буйг анзаарлаа. Дараагийн алхамыг тайлбарлая.",
      ];
      const reply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages([...newMsgs, { role: "ai", text: reply }]);
    }, 1200);
  };

  return (
    <div
      className="fade-in flex flex-col"
      style={{ height: "calc(100vh - 0px)" }}
    >
      {/* HEADER */}
      <div
        className="px-4 sm:px-8 py-4 sm:py-6 border-b flex items-center gap-3 sm:gap-4 shrink-0"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center accent-grad glow shrink-0"
          style={{ color: "var(--accent-text)" }}
        >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] sm:text-xs font-mono opacity-50 tracking-[0.2em]">
            ХИЧЭЭЛИЙН ТУСЛАХ
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            OYU AI <span className="italic opacity-60">·</span> v0.7
          </h1>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() =>
              setMessages([{ role: "ai", text: "Сайн уу! Юу сурахаар ирэв?" }])
            }
            className="px-3 py-2 rounded-lg text-xs font-medium"
            style={{ background: "var(--surface-mute)" }}
          >
            Шинэ чат
          </button>
          <button
            className="px-3 py-2 rounded-lg text-xs font-medium"
            style={{ background: "var(--surface-mute)" }}
          >
            Түүх
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 sm:py-6 space-y-4 sm:space-y-5">
        {messages.length === 1 && (
          <div className="max-w-2xl mx-auto pt-6 sm:pt-12">
            <div className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-2">
              <span className="italic opacity-60">Юу сурахаар</span> ирсэн бэ?
            </div>
            <p className="opacity-60 mb-6 sm:mb-8 text-sm sm:text-base">
              OYU AI таны хичээлийн агуулгыг ойлгож, шалгалтад бэлдэхэд тусална.
              Зураг, PDF файл оруулж болно.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: "⚡",
                  title: "Электромагнетизм тайлбарла",
                  sub: "Лоренцын хүчээс эхэл",
                },
                {
                  icon: "📐",
                  title: "ЭЕШ математикийн тест",
                  sub: "20 асуулт, шинэ хувилбар",
                },
                {
                  icon: "🔬",
                  title: "STM32-ийн ADC код",
                  sub: "Жишээтэй тайлбарла",
                },
                {
                  icon: "✍️",
                  title: "Эссэгээ засаарай",
                  sub: "Англиар, академик хэв",
                },
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => setInput(p.title)}
                  className="card-bg-hover rounded-2xl p-4 text-left"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="text-2xl mb-2">{p.icon}</div>
                  <div className="text-sm font-semibold mb-1">{p.title}</div>
                  <div className="text-xs opacity-60">{p.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 max-w-3xl ${m.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
              style={{
                background:
                  m.role === "ai"
                    ? "linear-gradient(135deg, var(--accent-soft), #8EE600)"
                    : "var(--surface-mute-strong)",
                color: m.role === "ai" ? "#0A0B10" : "var(--text)",
              }}
            >
              {m.role === "ai" ? <Bot className="w-4 h-4" /> : "Б"}
            </div>
            <div
              className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "rounded-tr-md" : "rounded-tl-md"}`}
              style={{
                background:
                  m.role === "user"
                    ? "var(--surface-mute-strong)"
                    : "var(--card)",
                border: m.role === "ai" ? "1px solid var(--border)" : "none",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex gap-3 max-w-3xl">
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-soft), #8EE600)",
                color: "#0A0B10",
              }}
            >
              <Bot className="w-4 h-4" />
            </div>
            <div
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl rounded-tl-md text-sm flex items-center gap-1.5"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-current opacity-60 blink"></span>
              <span
                className="w-2 h-2 rounded-full bg-current opacity-60 blink"
                style={{ animationDelay: "0.15s" }}
              ></span>
              <span
                className="w-2 h-2 rounded-full bg-current opacity-60 blink"
                style={{ animationDelay: "0.3s" }}
              ></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div
        className="px-4 sm:px-8 py-4 sm:py-5 border-t shrink-0"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex items-end gap-1 sm:gap-2"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <button className="w-9 h-9 rounded-xl flex items-center justify-center opacity-60 hover:opacity-100 hidden sm:flex">
            <Paperclip className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center opacity-60 hover:opacity-100 hidden sm:flex">
            <ImageIcon className="w-4 h-4" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Юу асуух вэ? (Shift + Enter = шинэ мөр)"
            className="flex-1 bg-transparent resize-none px-2 py-2 text-sm focus:outline-none"
            style={{ minHeight: 36, maxHeight: 120, color: "var(--text)" }}
          />
          <button className="w-9 h-9 rounded-xl flex items-center justify-center opacity-60 hover:opacity-100 hidden sm:flex">
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-xl flex items-center justify-center accent-grad disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{ color: "var(--accent-text)" }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-[10px] font-mono opacity-50 text-center mt-2">
          OYU AI алдаа гаргаж болзошгүй. Чухал мэдээлэл шалгаарай.
        </div>
      </div>
    </div>
  );
}

// =============================================================
// LEARNING VIEW (with clickable courses)
// =============================================================

function LearningView({ navigate }) {
  const [tab, setTab] = useState("k12");

  return (
    <div className="fade-in">
      <div
        className="px-4 sm:px-8 py-5 sm:py-6 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-xs font-mono opacity-50 tracking-[0.2em]">
          ЦОГЦ СУРГАЛТЫН ПЛАТФОРМ
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
          Сурах <span className="italic opacity-60">газар</span>.
        </h1>
      </div>

      {/* TABS */}
      <div
        className="px-4 sm:px-8 py-4 sm:py-5 flex gap-2 border-b overflow-x-auto scrollbar-hide"
        style={{ borderColor: "var(--border)" }}
      >
        {[
          { id: "k12", label: "Бага дунд (1-12)", sub: "medle.mn" },
          { id: "eesh", label: "ЭЕШ бэлтгэл" },
          { id: "uni", label: "Их сургуульд" },
          { id: "extra", label: "Нэмэлт ур чадвар" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0"
            style={{
              background:
                tab === t.id ? "var(--surface-mute-strong)" : "transparent",
              color: tab === t.id ? "var(--text)" : "var(--text-muted)",
              border:
                tab === t.id
                  ? "1px solid var(--border-strong)"
                  : "1px solid transparent",
            }}
          >
            {t.label}
            {t.sub && (
              <span className="opacity-50 ml-1.5 hidden sm:inline">
                · {t.sub}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-8 py-6 sm:py-8">
        {tab === "k12" && <K12View navigate={navigate} />}
        {tab === "eesh" && <EESHView navigate={navigate} />}
        {tab === "uni" && <UniView navigate={navigate} />}
        {tab === "extra" && <ExtraView navigate={navigate} />}
      </div>
    </div>
  );
}

function K12View({ navigate }) {
  return (
    <div className="space-y-6 sm:space-y-8 fade-in">
      <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
        <div
          className="rounded-3xl p-6 sm:p-8 grid-bg"
          style={{
            background:
              "linear-gradient(135deg, rgba(200,255,58,0.18), rgba(125,211,250,0.10))",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="text-xs font-mono tracking-[0.2em] mb-3"
            style={{ color: "var(--accent)" }}
          >
            БАГА · ДУНД АНГИ
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 leading-tight">
            Хичээлээ <span className="italic">тоглоомтой</span> сур.
          </h2>
          <p className="text-sm opacity-75 mb-5">
            1-12 анги бүх хичээлийн контент, видео тайлбар, дасгал. medle.mn-той
            хамтарсан үнэгүй.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Pill text="🎯 Зорилго тавих" />
            <Pill text="🏆 Achievement" />
            <Pill text="👥 Анги" />
          </div>
        </div>

        <div className="card-bg rounded-3xl p-5 sm:p-6">
          <div className="text-xs font-mono opacity-50 mb-3">ЯГ ОДОО ҮЗ</div>
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-4">
            Хийх ёстой
          </h3>
          <div className="space-y-3">
            <DueItem subj="Математик" task="Дасгал 4.7 — 5.2" due="Маргааш" />
            <DueItem
              subj="Физик"
              task="Лабораторийн ажил 3"
              due="3 өдрийн дотор"
            />
            <DueItem
              subj="Англи хэл"
              task="Эссэ — гэр бүл"
              due="7 өдрийн дотор"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs font-mono opacity-50 tracking-[0.2em] mb-3">
          ХИЧЭЭЛҮҮД
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { name: "Математик", icon: "📐", color: "#C8FF3A", lessons: 124 },
            { name: "Монгол хэл", icon: "🇲🇳", color: "#FF6B35", lessons: 89 },
            { name: "Физик", icon: "⚡", color: "#5DD3FA", lessons: 76 },
            { name: "Хими", icon: "🧪", color: "#9D7CFF", lessons: 64 },
            { name: "Биологи", icon: "🧬", color: "#5C8A3A", lessons: 58 },
            { name: "Англи хэл", icon: "🌍", color: "#FFE66A", lessons: 102 },
            { name: "Түүх", icon: "📜", color: "#E580B0", lessons: 47 },
            { name: "Газарзүй", icon: "🗺", color: "#FF9F45", lessons: 39 },
            { name: "Инфо", icon: "💻", color: "#7CB6FF", lessons: 52 },
            { name: "Эх хэл", icon: "📚", color: "#C8FF3A", lessons: 84 },
            { name: "Уран зохиол", icon: "✍️", color: "#9D7CFF", lessons: 41 },
            { name: "Дизайн", icon: "🎨", color: "#FF6B35", lessons: 28 },
          ].map((s, i) => (
            <button
              key={i}
              onClick={() => navigate("course/em")}
              className="card-bg-hover rounded-2xl p-3 sm:p-4 text-center"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-2xl sm:text-3xl mb-2">{s.icon}</div>
              <div className="text-xs sm:text-sm font-semibold">{s.name}</div>
              <div className="text-[10px] opacity-50 mt-1">
                {s.lessons} хичээл
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DueItem({ subj, task, due }) {
  const isUrgent = due === "Маргааш";
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl"
      style={{
        background: isUrgent ? "rgba(255,107,53,0.12)" : "var(--surface-mute)",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono"
        style={{ background: "var(--surface-mute-strong)" }}
      >
        {subj[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate">{task}</div>
        <div className="text-[10px] opacity-60">{subj}</div>
      </div>
      <div
        className="text-[10px] font-mono shrink-0"
        style={{ color: isUrgent ? "var(--warm)" : "var(--text-muted)" }}
      >
        {due}
      </div>
    </div>
  );
}

function EESHView({ navigate }) {
  return (
    <div className="space-y-6 fade-in">
      <div
        className="rounded-3xl p-6 sm:p-8"
        style={{
          background: "linear-gradient(135deg, var(--warm), #FF9F45)",
          color: "#0A0B10",
        }}
      >
        <div className="text-xs font-mono opacity-70 tracking-[0.2em] mb-3">
          ЭЕШ-2026
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2 leading-tight">
          Чи шалгалтанд <span className="italic">бэлэн үү?</span>
        </h2>
        <div className="grid grid-cols-3 gap-3 mt-6 max-w-md">
          <div className="bg-black/15 rounded-xl p-3">
            <div className="font-mono text-xs opacity-60">ХОНОГ</div>
            <div className="font-display text-2xl sm:text-3xl font-bold">
              42
            </div>
          </div>
          <div className="bg-black/15 rounded-xl p-3">
            <div className="font-mono text-xs opacity-60">ОНОО</div>
            <div className="font-display text-2xl sm:text-3xl font-bold">
              670
            </div>
          </div>
          <div className="bg-black/15 rounded-xl p-3">
            <div className="font-mono text-xs opacity-60">SHARTLAGAA</div>
            <div className="font-display text-2xl sm:text-3xl font-bold">
              760
            </div>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.filter(
          (c) =>
            c.category === "exam" ||
            c.category === "physics" ||
            c.category === "chemistry",
        ).map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            onClick={() => navigate(`course/${c.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function UniView({ navigate }) {
  return (
    <div className="space-y-6 fade-in">
      <div className="text-xs font-mono opacity-50 tracking-[0.2em]">
        МИНИЙ ХИЧЭЭЛҮҮД · ШУТИС, 3-Р КУРС
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            onClick={() => navigate(`course/${c.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function ExtraView({ navigate }) {
  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { name: "Програмчлал", icon: "💻", count: 24 },
          { name: "Дизайн", icon: "🎨", count: 18 },
          { name: "Бизнес", icon: "💼", count: 12 },
          { name: "Хэл", icon: "🌐", count: 31 },
          { name: "Шинжлэх ухаан", icon: "🔬", count: 9 },
          { name: "Спорт", icon: "🏃", count: 7 },
          { name: "Хөгжим", icon: "🎵", count: 14 },
          { name: "Гар урлал", icon: "🪡", count: 6 },
        ].map((c, i) => (
          <button
            key={i}
            onClick={() => navigate("course/react")}
            className="card-bg-hover rounded-2xl p-4 sm:p-5 text-center"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="text-3xl mb-3">{c.icon}</div>
            <div className="text-sm font-semibold">{c.name}</div>
            <div className="text-xs opacity-50 mt-1">{c.count} курс</div>
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.filter(
          (c) =>
            c.category === "programming" ||
            c.category === "design" ||
            c.category === "language",
        ).map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            onClick={() => navigate(`course/${c.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function Pill({ text }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-xs"
      style={{ background: "var(--surface-mute-strong)" }}
    >
      {text}
    </span>
  );
}

// =============================================================
// COURSE DETAIL VIEW
// =============================================================

function CourseDetailView({ courseId, navigate, showToast }) {
  const course = COURSES.find((c) => c.id === courseId) || COURSES[0];
  const [tab, setTab] = useState("lessons");

  const lessons = [
    {
      num: 1,
      title: "Цахилгаан цэнэг ба Кулоны хууль",
      duration: "12:30",
      done: true,
    },
    {
      num: 2,
      title: "Цахилгаан орон, орны хүчлэг",
      duration: "15:20",
      done: true,
    },
    { num: 3, title: "Гауссын теорем", duration: "18:45", done: true },
    { num: 4, title: "Электростатик потенциал", duration: "14:10", done: true },
    {
      num: 5,
      title: "Конденсатор, цэнэгийн орон",
      duration: "20:15",
      done: true,
    },
    { num: 6, title: "Цахилгаан гүйдэл", duration: "16:40", done: true },
    { num: 7, title: "Ом, Кирхгофын хууль", duration: "22:00", done: true },
    {
      num: 8,
      title: "Магнит орон",
      duration: "19:30",
      done: false,
      current: true,
    },
    { num: 9, title: "Лоренцын хүч", duration: "17:25", done: false },
    {
      num: 10,
      title: "Ампер, Био-Саваарын хууль",
      duration: "21:10",
      done: false,
    },
    { num: 11, title: "Электромагнит индукц", duration: "23:00", done: false },
    {
      num: 12,
      title: "Максвеллийн тэгшитгэлүүд",
      duration: "28:45",
      done: false,
    },
  ];

  return (
    <div className="fade-in">
      {/* Back nav */}
      <div
        className="px-4 sm:px-8 py-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <button
          onClick={() => navigate("learn")}
          className="text-xs font-mono opacity-60 hover:opacity-100 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> СУРГАЛТ
        </button>
      </div>

      {/* HERO */}
      <div className="px-4 sm:px-8 py-6 sm:py-10 grid lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <div className="text-xs font-mono opacity-50 tracking-[0.2em] mb-2">
            {course.sub.toUpperCase()}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-3 leading-[1.05]">
            {course.title}.
          </h1>
          <p className="text-sm sm:text-base opacity-70 max-w-2xl">
            {course.desc}
          </p>

          <div className="flex items-center gap-4 sm:gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <Star
                className="w-4 h-4 fill-current"
                style={{ color: "#FFB800" }}
              />
              <span className="font-semibold">{course.rating}</span>
              <span className="opacity-50">
                · {course.students.toLocaleString()} оюутан
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-70">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-70">
              <User className="w-4 h-4" />
              <span>{course.instructor}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 card-bg rounded-3xl p-5 sm:p-6">
          <div className="flex justify-between items-center mb-3">
            <div className="text-xs font-mono opacity-50">ЯВЦ</div>
            <div
              className="font-mono text-2xl font-bold"
              style={{ color: course.color }}
            >
              {course.progress}%
            </div>
          </div>
          <div
            className="h-2 rounded-full mb-4"
            style={{ background: "var(--surface-mute-strong)" }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${course.progress}%`, background: course.color }}
            />
          </div>
          <div className="text-xs opacity-60 mb-5">
            {course.lessons} хичээл дууссан
          </div>
          <button
            onClick={() =>
              showToast("Үргэлжлүүлэх — 8-р хичээл нээгдэж байна", "info")
            }
            className="w-full py-3 rounded-2xl font-semibold accent-grad flex items-center justify-center gap-2"
            style={{ color: "var(--accent-text)" }}
          >
            <Play className="w-4 h-4" /> Үргэлжлүүлэх
          </button>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <button
              onClick={() => showToast("Хадгаллаа", "success")}
              className="py-2 rounded-xl flex items-center justify-center"
              style={{ background: "var(--surface-mute)" }}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={() => showToast("Татаж байна...", "info")}
              className="py-2 rounded-xl flex items-center justify-center"
              style={{ background: "var(--surface-mute)" }}
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => showToast("Холбоос copy хийгдлээ", "success")}
              className="py-2 rounded-xl flex items-center justify-center"
              style={{ background: "var(--surface-mute)" }}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div
        className="px-4 sm:px-8 border-b flex gap-2 overflow-x-auto scrollbar-hide"
        style={{ borderColor: "var(--border)" }}
      >
        {[
          { id: "lessons", label: "Хичээлүүд" },
          { id: "notes", label: "Тэмдэглэл" },
          { id: "resources", label: "Эх сурвалж" },
          { id: "quiz", label: "Дасгал" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap relative"
            style={{
              color: tab === t.id ? "var(--text)" : "var(--text-muted)",
            }}
          >
            {t.label}
            {tab === t.id && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "var(--accent)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="px-4 sm:px-8 py-6 sm:py-8">
        {tab === "lessons" && (
          <div className="space-y-2 max-w-3xl">
            {lessons.map((l) => (
              <button
                key={l.num}
                onClick={() =>
                  showToast(`${l.num}-р хичээл нээгдэж байна...`, "info")
                }
                className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all hover:bg-current/5"
                style={{
                  background: l.current
                    ? "rgba(200,255,58,0.10)"
                    : "var(--surface-mute)",
                  border: l.current
                    ? `1px solid var(--accent)`
                    : "1px solid var(--border)",
                }}
              >
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-sm shrink-0"
                  style={{
                    background: l.done
                      ? "var(--accent)"
                      : l.current
                        ? "var(--accent)"
                        : "var(--surface-mute-strong)",
                    color:
                      l.done || l.current
                        ? "var(--accent-text)"
                        : "var(--text)",
                  }}
                >
                  {l.done ? <CheckCircle className="w-4 h-4" /> : l.num}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm sm:text-base font-semibold truncate">
                    {l.title}
                  </div>
                  <div className="text-xs opacity-60 mt-0.5 flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {l.duration}
                    {l.current && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                        style={{
                          background: "var(--accent)",
                          color: "var(--accent-text)",
                        }}
                      >
                        ОДОО
                      </span>
                    )}
                  </div>
                </div>
                <Play className="w-4 h-4 opacity-50 shrink-0" />
              </button>
            ))}
          </div>
        )}

        {tab === "notes" && (
          <div className="max-w-3xl">
            <div className="card-bg rounded-2xl p-5 sm:p-6 mb-4">
              <div className="text-xs font-mono opacity-50 mb-2">
                7-Р ХИЧЭЭЛИЙН ТЭМДЭГЛЭЛ
              </div>
              <h4 className="font-display text-xl font-bold mb-3">
                Ом, Кирхгофын хууль
              </h4>
              <p className="text-sm opacity-80 leading-relaxed">
                Ом-ын хууль: U = IR, энд U — хүчдэл, I — гүйдэл, R — эсэргүүцэл.
                Кирхгофын 1-р хууль — салбараар орох гүйдлүүдийн нийлбэр гарах
                гүйдлүүдийн нийлбэртэй тэнцүү.
              </p>
            </div>
            <button
              onClick={() => showToast("Шинэ тэмдэглэл нэмэгдлээ", "success")}
              className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
              style={{
                background: "var(--surface-mute)",
                border: "1px solid var(--border)",
              }}
            >
              <Plus className="w-4 h-4" /> Тэмдэглэл нэмэх
            </button>
          </div>
        )}

        {tab === "resources" && (
          <div className="max-w-3xl space-y-2">
            {[
              {
                name: "Электромагнетизмийн товч хураангуй",
                type: "PDF",
                size: "2.4 MB",
              },
              {
                name: "Лоренцын хүчний жишээ дасгал",
                type: "PDF",
                size: "1.1 MB",
              },
              {
                name: "Максвеллийн тэгшитгэл — Видео",
                type: "MP4",
                size: "45 MB",
              },
              { name: "Магнит орны симуляц", type: "Веб", size: "—" },
            ].map((r, i) => (
              <button
                key={i}
                onClick={() => showToast("Татаж байна...", "info")}
                className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl"
                style={{
                  background: "var(--surface-mute)",
                  border: "1px solid var(--border)",
                }}
              >
                <FileText className="w-5 h-5 opacity-60 shrink-0" />
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-semibold truncate">{r.name}</div>
                  <div className="text-[10px] opacity-50 mt-0.5">
                    {r.type} · {r.size}
                  </div>
                </div>
                <Download className="w-4 h-4 opacity-50 shrink-0" />
              </button>
            ))}
          </div>
        )}

        {tab === "quiz" && (
          <div className="max-w-3xl text-center py-12">
            <Target className="w-12 h-12 mx-auto opacity-30 mb-3" />
            <div className="font-display text-2xl font-bold mb-2">
              Дасгал бэлэн
            </div>
            <div className="text-sm opacity-60 mb-6">
              7-р хичээлээс шалгалт өгөхөд бэлэн боллоо. 20 асуулт, 30 минут.
            </div>
            <button
              onClick={() => showToast("Дасгал эхэллээ!", "success")}
              className="px-6 py-3 rounded-full font-semibold accent-grad inline-flex items-center gap-2"
              style={{ color: "var(--accent-text)" }}
            >
              Эхлэх <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================
// SCHEDULE VIEW (with mock SiSi sync)
// =============================================================

function ScheduleView({ showToast }) {
  const [synced, setSynced] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const days = ["Дав", "Мяг", "Лха", "Пүр", "Баа", "Бям", "Ням"];
  const dates = [27, 28, 29, 30, 1, 2, 3];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const triggerSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
      showToast("МУИС SiSi-тэй холбогдлоо. 14 хичээл sync хийгдлээ", "success");
    }, 1500);
  };

  return (
    <div className="fade-in">
      <div
        className="px-4 sm:px-8 py-5 sm:py-6 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-xs font-mono opacity-50 tracking-[0.2em]">
              ХИЧЭЭЛИЙН ХУВААРЬ · 4-Р САР 27 — 5-Р САР 3
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
              Долоо <span className="italic opacity-60">хоног</span>.
            </h1>
          </div>
          {!synced ? (
            <button
              onClick={triggerSync}
              disabled={syncing}
              className="px-4 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 accent-grad disabled:opacity-60"
              style={{ color: "var(--accent-text)" }}
            >
              {syncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Sync хийж байна
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" /> Сургуультай sync
                </>
              )}
            </button>
          ) : (
            <div
              className="px-4 py-2.5 rounded-full text-xs font-mono flex items-center gap-2"
              style={{ background: "rgba(92,138,58,0.15)", color: "#7AAD4D" }}
            >
              <CheckCircle className="w-3.5 h-3.5" /> SISI-ТЭЙ ХОЛБОГДСОН
            </div>
          )}
        </div>
      </div>

      {/* MOBILE: Day-by-day list */}
      <div className="lg:hidden px-4 py-5 space-y-5">
        {days.map((day, dayIdx) => {
          const dayEvents = SCHEDULE_DATA.events.filter(
            (e) => e.day === dayIdx,
          );
          if (dayEvents.length === 0) return null;
          return (
            <div key={dayIdx}>
              <div className="text-xs font-mono opacity-60 mb-2 tracking-[0.15em]">
                {day.toUpperCase()} · 4-Р САР {dates[dayIdx]}
              </div>
              <div className="space-y-2">
                {dayEvents.map((e, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl flex items-center gap-3"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderLeft: `3px solid ${e.color}`,
                    }}
                  >
                    <div className="text-xs font-mono w-12 shrink-0 opacity-60">
                      {Math.floor(e.start)}:{e.start % 1 === 0 ? "00" : "30"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">
                        {e.title}
                      </div>
                      <div className="text-[10px] opacity-60 truncate">
                        {e.loc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP: Week grid */}
      <div className="hidden lg:block px-8 py-6">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Header row */}
          <div
            className="grid grid-cols-8 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="p-3 text-xs font-mono opacity-50">ЦАГ</div>
            {days.map((d, i) => (
              <div
                key={i}
                className="p-3 text-center border-l"
                style={{
                  borderColor: "var(--border)",
                  background: i === 0 ? "var(--surface-mute)" : "transparent",
                }}
              >
                <div className="text-xs font-mono opacity-60">{d}</div>
                <div
                  className={`font-display text-2xl font-bold mt-1 ${i === 0 ? "" : "opacity-70"}`}
                >
                  {dates[i]}
                </div>
              </div>
            ))}
          </div>

          {/* Time grid */}
          <div className="relative grid grid-cols-8" style={{ height: 560 }}>
            <div className="border-r" style={{ borderColor: "var(--border)" }}>
              {hours.map((h) => (
                <div
                  key={h}
                  className="text-[10px] font-mono opacity-50 px-3 py-1 border-b"
                  style={{
                    borderColor: "var(--border)",
                    height: 560 / hours.length,
                  }}
                >
                  {h}:00
                </div>
              ))}
            </div>
            {days.map((_, dayIdx) => (
              <div
                key={dayIdx}
                className="relative border-r"
                style={{ borderColor: "var(--border)" }}
              >
                {hours.map((h, i) => (
                  <div
                    key={h}
                    className="border-b"
                    style={{
                      borderColor: "var(--border)",
                      height: 560 / hours.length,
                    }}
                  />
                ))}
                {SCHEDULE_DATA.events
                  .filter((e) => e.day === dayIdx)
                  .map((e, i) => {
                    const startH = e.start - 8;
                    const lenH = e.end - e.start;
                    const top = (startH / hours.length) * 560;
                    const height = (lenH / hours.length) * 560;
                    return (
                      <div
                        key={i}
                        className="absolute left-1 right-1 rounded-md p-2 text-[10px] overflow-hidden"
                        style={{
                          top,
                          height: height - 2,
                          background: `${e.color}25`,
                          borderLeft: `3px solid ${e.color}`,
                        }}
                      >
                        <div className="font-semibold leading-tight truncate">
                          {e.title}
                        </div>
                        <div className="opacity-70 truncate">{e.loc}</div>
                        <div className="font-mono opacity-50 mt-1">
                          {Math.floor(e.start)}:
                          {e.start % 1 === 0 ? "00" : "30"} —{" "}
                          {Math.floor(e.end)}:{e.end % 1 === 0 ? "00" : "30"}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 text-xs">
          {[
            { color: "#C8FF3A", label: "Лекц" },
            { color: "#5DD3FA", label: "Лаб" },
            { color: "#FF6B35", label: "Шалгалт" },
            { color: "#9D7CFF", label: "Эвент / Клуб" },
            { color: "#FFE66A", label: "Менторын уулзалт" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ background: l.color }}
              />
              <span className="opacity-70">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* INTEGRATION INFO */}
      <div className="px-4 sm:px-8 pb-8">
        <div
          className="rounded-3xl p-5 sm:p-6 grid sm:grid-cols-2 gap-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(125,211,250,0.15), rgba(157,124,255,0.05))",
            border: "1px solid var(--border)",
          }}
        >
          <div>
            <div className="text-xs font-mono opacity-50 tracking-[0.2em] mb-2">
              SYSTEM ИНТЕГРАЦ
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">
              Сургуультайгаа холбогдсон бол.
            </h3>
            <p className="text-sm opacity-70">
              МУИС SiSi, ШУТИС eSIS, MEdle — өөрийн сургуулийн систем рүү
              холбогдоод хичээлийн хуваариа автоматаар татна.
            </p>
          </div>
          <div className="space-y-2">
            {[
              { name: "МУИС · SiSi", connected: synced, logo: "🎓" },
              { name: "ШУТИС · eSIS", connected: false, logo: "⚙️" },
              { name: "MEdle", connected: false, logo: "📚" },
            ].map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "var(--surface-mute)" }}
              >
                <div className="text-2xl shrink-0">{s.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{s.name}</div>
                  <div className="text-[10px] opacity-60">
                    {s.connected ? "Холбогдсон" : "Холбогдоогүй"}
                  </div>
                </div>
                <button
                  onClick={() => !s.connected && triggerSync()}
                  className="text-[10px] font-mono px-2 py-1 rounded-full"
                  style={{
                    background: s.connected
                      ? "rgba(92,138,58,0.2)"
                      : "var(--surface-mute-strong)",
                    color: s.connected ? "#7AAD4D" : "var(--text)",
                  }}
                >
                  {s.connected ? "АЖИЛЛАЖ БУЙ" : "ХОЛБОХ"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// MENTOR VIEW
// =============================================================

function MentorView({ showToast }) {
  const [filter, setFilter] = useState("all");
  const [selectedMentor, setSelectedMentor] = useState(null);

  const filtered =
    filter === "all"
      ? MENTORS
      : filter === "available"
        ? MENTORS.filter((m) => m.available)
        : MENTORS;

  return (
    <div className="fade-in">
      <div
        className="px-4 sm:px-8 py-5 sm:py-6 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-xs font-mono opacity-50 tracking-[0.2em]">
          300+ МЭРГЭЖИЛТЭН
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
          Хувийн <span className="italic opacity-60">ментор</span>.
        </h1>
        <p className="text-sm opacity-70 mt-3 max-w-2xl">
          Туршлагатай мэргэжилтнүүдээс зөвлөгөө аваарай — хичээлийн тусламж,
          ажил мэргэжлийн чиглүүлэг, хувийн төлөвлөгөө гэх мэт.
        </p>
      </div>

      <div className="px-4 sm:px-8 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {[
          { id: "all", label: "Бүгд" },
          { id: "available", label: "Боломжтой" },
          { id: "tech", label: "Технологи" },
          { id: "exam", label: "Шалгалт" },
          { id: "lang", label: "Хэл" },
          { id: "design", label: "Дизайн" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap shrink-0"
            style={{
              background:
                filter === f.id ? "var(--accent)" : "var(--surface-mute)",
              color: filter === f.id ? "var(--accent-text)" : "var(--text)",
              border: filter === f.id ? "none" : "1px solid var(--border)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-8 py-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <MentorCard
            key={m.id}
            mentor={m}
            onSelect={() => setSelectedMentor(m)}
          />
        ))}
      </div>

      {selectedMentor && (
        <MentorBookModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
          onBook={() => {
            showToast(`${selectedMentor.name}-той цаг товлогдлоо!`, "success");
            setSelectedMentor(null);
          }}
        />
      )}
    </div>
  );
}

function MentorCard({ mentor, onSelect }) {
  return (
    <div
      className="card-bg-hover rounded-3xl p-5 sm:p-6 relative"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      {!mentor.available && (
        <div
          className="absolute top-4 right-4 text-[10px] font-mono px-2 py-1 rounded-full"
          style={{
            background: "var(--surface-mute-strong)",
            color: "var(--text-muted)",
          }}
        >
          Завгүй
        </div>
      )}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-xl shrink-0"
          style={{ background: mentor.color, color: "#0A0B10" }}
        >
          {mentor.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{mentor.name}</div>
          <div className="text-[11px] opacity-60 leading-tight mt-0.5 line-clamp-2">
            {mentor.role}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <Star
              className="w-3 h-3 fill-current"
              style={{ color: "#FFB800" }}
            />
            <span className="font-semibold">{mentor.rating}</span>
            <span className="opacity-50">· {mentor.sessions} сесс</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {mentor.expertise.slice(0, 3).map((e) => (
          <span
            key={e}
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: "var(--surface-mute-strong)" }}
          >
            {e}
          </span>
        ))}
      </div>
      <div className="text-xs opacity-70 mb-4 line-clamp-2">{mentor.bio}</div>
      <div className="flex items-center justify-between">
        <div
          className="font-mono text-sm font-bold"
          style={{ color: "var(--accent)" }}
        >
          {mentor.price}
        </div>
        <button
          onClick={onSelect}
          disabled={!mentor.available}
          className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: mentor.available
              ? "var(--accent)"
              : "var(--surface-mute)",
            color: mentor.available ? "var(--accent-text)" : "var(--text)",
          }}
        >
          <Calendar className="w-3.5 h-3.5" />
          Цаг авах
        </button>
      </div>
    </div>
  );
}

function MentorBookModal({ mentor, onClose, onBook }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = [
    { day: "Маргааш", date: "28 4-р сар", available: 5 },
    { day: "Лха", date: "29 4-р сар", available: 3 },
    { day: "Пүр", date: "30 4-р сар", available: 7 },
    { day: "Баа", date: "1 5-р сар", available: 4 },
  ];
  const times = ["09:00", "10:00", "11:30", "14:00", "15:30", "17:00", "18:30"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 fade-in"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto slide-up"
        style={{ background: "var(--card)" }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-xl"
                style={{ background: mentor.color, color: "#0A0B10" }}
              >
                {mentor.avatar}
              </div>
              <div>
                <div className="text-xs font-mono opacity-50">ЦАГ ТОВЛОХ</div>
                <div className="font-display text-2xl font-bold">
                  {mentor.name}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "var(--surface-mute)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono opacity-50 tracking-[0.15em] mb-3">
            ОГНОО СОНГО
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {dates.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className="p-3 rounded-xl text-left transition-all"
                style={{
                  background:
                    selectedDate === d.date
                      ? "var(--accent)"
                      : "var(--surface-mute)",
                  color:
                    selectedDate === d.date
                      ? "var(--accent-text)"
                      : "var(--text)",
                  border: `1px solid ${selectedDate === d.date ? "var(--accent)" : "var(--border)"}`,
                }}
              >
                <div className="text-sm font-semibold">{d.day}</div>
                <div className="text-[11px] opacity-70 mt-0.5">{d.date}</div>
                <div className="text-[10px] opacity-60 mt-1">
                  {d.available} цаг боломжтой
                </div>
              </button>
            ))}
          </div>

          {selectedDate && (
            <>
              <div className="text-xs font-mono opacity-50 tracking-[0.15em] mb-3">
                ЦАГ СОНГО
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                {times.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className="p-3 rounded-xl text-sm font-mono font-semibold transition-all"
                    style={{
                      background:
                        selectedTime === t
                          ? "var(--accent)"
                          : "var(--surface-mute)",
                      color:
                        selectedTime === t
                          ? "var(--accent-text)"
                          : "var(--text)",
                      border: `1px solid ${selectedTime === t ? "var(--accent)" : "var(--border)"}`,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}

          <div
            className="p-4 rounded-2xl mb-5"
            style={{ background: "var(--surface-mute)" }}
          >
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-60">Үнэ:</span>
              <span
                className="font-mono font-bold"
                style={{ color: "var(--accent)" }}
              >
                {mentor.price}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="opacity-60">Үргэлжлэх:</span>
              <span>1 цаг</span>
            </div>
            {selectedDate && selectedTime && (
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="opacity-60">Цаг:</span>
                <span className="font-semibold">
                  {selectedDate} · {selectedTime}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onBook}
            disabled={!selectedDate || !selectedTime}
            className="w-full py-3 rounded-full font-semibold accent-grad flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: "var(--accent-text)" }}
          >
            <CheckCircle className="w-4 h-4" /> Цаг товлох
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// TOAST
// =============================================================

function Toast({ message, type }) {
  return (
    <div
      className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-[100] slide-up"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="px-5 py-3.5 rounded-full flex items-center gap-3 shadow-2xl"
        style={{
          background:
            type === "success"
              ? "var(--accent)"
              : type === "error"
                ? "var(--warm)"
                : type === "info"
                  ? "var(--cool)"
                  : "var(--card-soft)",
          color: type === "info" ? "var(--accent-text)" : "var(--accent-text)",
          boxShadow: "0 12px 40px -8px rgba(0,0,0,0.4)",
        }}
      >
        {type === "success" && <CheckCircle2 className="w-5 h-5" />}
        {type === "error" && <AlertCircle className="w-5 h-5" />}
        {type === "info" && <Bell className="w-5 h-5" />}
        <span className="text-sm font-semibold">{message}</span>
      </div>
    </div>
  );
}

// =============================================================
// NOTIFICATION PANEL
// =============================================================

function NotificationPanel({ notifications, onClose, onMarkAllRead }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end p-3 sm:p-4 fade-in"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        ref={ref}
        className="w-full sm:max-w-md rounded-3xl overflow-hidden slide-up flex flex-col max-h-[92vh]"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border-strong)",
          marginTop: "70px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <div className="text-[10px] font-mono opacity-60 tracking-[0.2em]">
              МЭДЭГДЭЛ
            </div>
            <div className="font-display text-2xl font-bold">Шинэчлэлтүүд</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-[11px] opacity-60 hover:opacity-100 px-2 py-1 rounded-full"
              style={{ background: "var(--surface-mute)" }}
            >
              Бүгдийг уншсан
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--surface-mute)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="p-12 text-center opacity-50">
              <Bell className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <div className="text-sm">Мэдэгдэл алга</div>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="p-4 flex gap-3 transition-colors cursor-pointer hover:opacity-80"
                style={{
                  borderBottom: "1px solid var(--border)",
                  background: !n.read ? "var(--surface-mute)" : "transparent",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: n.color + "25" }}
                >
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <div className="text-sm font-semibold truncate">
                      {n.title}
                    </div>
                    {!n.read && (
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: n.color }}
                      ></div>
                    )}
                  </div>
                  <div className="text-xs opacity-70 mb-1.5 leading-relaxed">
                    {n.text}
                  </div>
                  <div className="text-[10px] font-mono opacity-50">
                    {n.time}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// NEWS PANEL ("Шинэ")
// =============================================================

function NewsPanel({ onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end p-3 sm:p-4 fade-in"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        ref={ref}
        className="w-full sm:max-w-md rounded-3xl overflow-hidden slide-up flex flex-col max-h-[92vh]"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border-strong)",
          marginTop: "70px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-5 flex items-center justify-between"
          style={{
            borderBottom: "1px solid var(--border)",
            background:
              "linear-gradient(135deg, rgba(200,255,58,0.15), transparent)",
          }}
        >
          <div>
            <div className="text-[10px] font-mono opacity-60 tracking-[0.2em]">
              OYU CHANGELOG
            </div>
            <div className="font-display text-2xl font-bold">
              Шинэ юу нэмэгдсэн?
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "var(--surface-mute)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-3 space-y-2">
          {NEWS.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl transition-colors hover:opacity-80 cursor-pointer"
              style={{
                borderLeft: `3px solid ${item.color}`,
                background: "var(--surface-mute)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ background: item.color + "25", color: item.color }}
                >
                  {item.category.toUpperCase()}
                </div>
                <div className="text-[10px] font-mono opacity-50">
                  {item.time}
                </div>
              </div>
              <div className="font-display text-base font-bold leading-tight mb-1">
                {item.title}
              </div>
              <div className="text-xs opacity-70 leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// EVENTS VIEW (events + jobs + scholarships)
// =============================================================

function EventsView({ showToast }) {
  const [tab, setTab] = useState("all");
  const events = [
    {
      id: 1,
      type: "event",
      title: "Bamba Hardware Hackathon",
      date: "5-р сар 2",
      loc: "UB Innovation Hub",
      tag: "Хакатон",
      color: "#C8FF3A",
      spots: 47,
      prize: "₮3 сая",
      emoji: "🎉",
    },
    {
      id: 2,
      type: "job",
      title: "Frontend developer (intern)",
      date: "Бүртгэл нээлттэй",
      loc: "erxes",
      tag: "Цагийн ажил",
      color: "#5DD3FA",
      pay: "₮35,000/цаг",
      emoji: "💼",
    },
    {
      id: 3,
      type: "scholarship",
      title: "DAAD Scholarship 2026",
      date: "Хугацаа: 6-р сар 30",
      loc: "Герман",
      tag: "Тэтгэлэг",
      color: "#FFE66A",
      pay: "EUR 850/сар",
      emoji: "🎓",
    },
    {
      id: 4,
      type: "event",
      title: "OYU Networking үдэшлэг",
      date: "5-р сар 15",
      loc: "Choijin Plaza",
      tag: "Networking",
      color: "#9D7CFF",
      spots: 234,
      emoji: "🤝",
    },
    {
      id: 5,
      type: "job",
      title: "UI/UX дизайнер",
      date: "Бүтэн цаг",
      loc: "Khan Bank Lab",
      tag: "Бүтэн цаг",
      color: "#FF6B35",
      pay: "₮2.5М/сар",
      emoji: "🎨",
    },
    {
      id: 6,
      type: "scholarship",
      title: "Японы засгийн газрын тэтгэлэг",
      date: "Хугацаа: 7-р сар 1",
      loc: "MEXT",
      tag: "Тэтгэлэг",
      color: "#5DD3FA",
      pay: "¥150,000/сар",
      emoji: "🇯🇵",
    },
    {
      id: 7,
      type: "event",
      title: "Code Marathon — ШУТИС vs МУИС",
      date: "5-р сар 10",
      loc: "ШУТИС, B хичээлийн байр",
      tag: "Тэмцээн",
      color: "#FF6B35",
      spots: 80,
      prize: "₮5 сая",
      emoji: "💻",
    },
    {
      id: 8,
      type: "job",
      title: "Embedded хөгжүүлэгч (junior)",
      date: "Цагийн",
      loc: "Хөмрөг Tech",
      tag: "Цагийн ажил",
      color: "#9D7CFF",
      pay: "₮40,000/цаг",
      emoji: "🔧",
    },
    {
      id: 9,
      type: "scholarship",
      title: "Алтан Гадас тэтгэлэг 2026",
      date: "Хугацаа: 5-р сар 30",
      loc: "Mонгол",
      tag: "Тэтгэлэг",
      color: "#C8FF3A",
      pay: "₮12М/жил",
      emoji: "🌟",
    },
  ];
  const filtered =
    tab === "all" ? events : events.filter((e) => e.type === tab);

  return (
    <div className="fade-in">
      <div
        className="px-4 sm:px-8 py-5 sm:py-6 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-xs font-mono opacity-50 tracking-[0.2em]">
          БОЛОМЖУУД · 4-Р САР
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
          Эвент, ажил, <span className="italic opacity-60">тэтгэлэг</span>.
        </h1>
        <p className="text-sm opacity-60 mt-3 max-w-xl">
          Идэвхтэй боломжуудыг нэг газраас хайж олох. Хакатон, цагийн ажил,
          тэтгэлэг — бүгд энд.
        </p>
      </div>

      <div className="px-4 sm:px-8 py-5 flex gap-2 scroll-x">
        {[
          ["all", "Бүгд", events.length],
          ["event", "Эвент", events.filter((e) => e.type === "event").length],
          ["job", "Цагийн ажил", events.filter((e) => e.type === "job").length],
          [
            "scholarship",
            "Тэтгэлэг",
            events.filter((e) => e.type === "scholarship").length,
          ],
        ].map(([id, label, count]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 shrink-0 transition-all"
            style={{
              background: tab === id ? "var(--accent)" : "var(--surface-mute)",
              color: tab === id ? "var(--accent-text)" : "var(--text)",
            }}
          >
            {label} <span className="opacity-60">{count}</span>
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-12">
        {filtered.map((e, i) => (
          <div
            key={e.id}
            className="rounded-3xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] fade-in"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <div
              className="aspect-[16/9] flex items-center justify-center text-5xl sm:text-6xl"
              style={{
                background: `linear-gradient(135deg, ${e.color}30, ${e.color}10)`,
              }}
            >
              {e.emoji}
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <div
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ background: e.color + "20", color: e.color }}
                >
                  {e.tag}
                </div>
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    showToast("Хадгаллаа", "success");
                  }}
                >
                  <Bookmark className="w-4 h-4 opacity-50 hover:opacity-100" />
                </button>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold leading-snug mb-2">
                {e.title}
              </h3>
              <div className="text-xs opacity-60 mb-3 flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                <span>{e.date}</span>
                <span>·</span>
                <span>{e.loc}</span>
              </div>
              {(e.pay || e.prize) && (
                <div
                  className="font-mono font-bold text-sm mb-3"
                  style={{ color: e.color }}
                >
                  {e.pay || e.prize}
                </div>
              )}
              {e.spots && (
                <div className="flex items-center gap-2 mb-3 text-xs opacity-70">
                  <Users className="w-3 h-3" /> {e.spots} бүртгүүлсэн
                </div>
              )}
              <button
                onClick={() =>
                  showToast("Бүртгэгдлээ! +20 OYU token", "success")
                }
                className="w-full py-2 rounded-full text-xs font-semibold transition-all hover:scale-[1.02]"
                style={{ background: e.color, color: "#0A0B10" }}
              >
                {e.type === "job"
                  ? "Өргөдөл өгөх"
                  : e.type === "scholarship"
                    ? "Илүү ихийг үзэх"
                    : "Бүртгүүлэх"}{" "}
                →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================
// CHAT VIEW
// =============================================================

function ChatView({ activeChat, setActiveChat }) {
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Б.Энхтуяа",
      avatar: "Э",
      color: "#C8FF3A",
      last: "За 14 цагт уулзья",
      time: "5м",
      unread: 2,
      online: true,
      msgs: [
        {
          from: "them",
          text: "Хичээл хийх газар сонгоё гэж бодож байна",
          time: "14:20",
        },
        { from: "them", text: "UB Hub яаж байна?", time: "14:21" },
        { from: "me", text: "Хурдан, Wi-Fi 1Gbps. Тэр хүрье", time: "14:23" },
        { from: "them", text: "За 14 цагт уулзья", time: "14:25" },
      ],
    },
    {
      id: 2,
      name: "Embedded Club",
      avatar: "EC",
      color: "#9D7CFF",
      last: "@Болдоо STM32-ийн жишээ хэрэгтэй?",
      time: "23м",
      unread: 5,
      group: true,
      msgs: [
        {
          from: "them",
          text: "@Болдоо STM32-ийн жишээ хэрэгтэй?",
          time: "13:45",
          user: "Д.Гүндсамбуу",
        },
      ],
    },
    {
      id: 3,
      name: "Б.Энхбат (ментор)",
      avatar: "Э",
      color: "#FFE66A",
      last: "Уулзах цагийг 16:00 болгоё",
      time: "1ц",
      unread: 0,
      online: true,
      msgs: [
        { from: "them", text: "Уулзах цагийг 16:00 болгоё", time: "13:00" },
      ],
    },
    {
      id: 4,
      name: "OYU AI Reminder",
      avatar: "✨",
      color: "#5DD3FA",
      last: "Өнөөдрийн зорилго: 30 минут React",
      time: "2ц",
      unread: 0,
      system: true,
      msgs: [
        {
          from: "them",
          text: "Өнөөдрийн зорилго: 30 минут React сурах. Бэлэн үү?",
          time: "12:00",
        },
      ],
    },
    {
      id: 5,
      name: "Д.Гүндсамбуу",
      avatar: "Г",
      color: "#FF6B35",
      last: "Tetris PR-ыг хараарай",
      time: "өчигдөр",
      unread: 0,
      msgs: [
        {
          from: "them",
          text: "Tetris PR-ыг хараарай. Шинэчилсэн.",
          time: "Өчигдөр",
        },
      ],
    },
  ]);

  const send = () => {
    if (!msg.trim() || !activeChat) return;
    setChats(
      chats.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              msgs: [...(c.msgs || []), { from: "me", text: msg, time: "сая" }],
              last: msg,
              time: "сая",
            }
          : c,
      ),
    );
    setMsg("");
  };

  const fresh = chats.find((c) => c.id === activeChat?.id) || activeChat;

  return (
    <div className="fade-in flex h-[calc(100vh-65px)] lg:h-screen">
      {/* Chat list */}
      <div
        className={`${activeChat ? "hidden md:flex" : "flex"} w-full md:w-80 lg:w-96 flex-col border-r`}
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="p-4 sm:p-5 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-display text-2xl font-bold">Чат</div>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--surface-mute)" }}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              placeholder="Хайх..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none"
              style={{
                background: "var(--surface-mute)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveChat(c)}
              className="w-full flex items-center gap-3 p-4 transition-colors text-left hover:opacity-90"
              style={{
                background:
                  activeChat?.id === c.id
                    ? "var(--surface-mute)"
                    : "transparent",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="relative shrink-0">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold"
                  style={{ background: c.color, color: "#0A0B10" }}
                >
                  {c.avatar}
                </div>
                {c.online && (
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                    style={{
                      background: "#7AAD4D",
                      borderColor: "var(--card-soft)",
                    }}
                  ></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <div className="text-sm font-semibold truncate flex items-center gap-1.5">
                    {c.name}
                    {c.group && <Users className="w-3 h-3 opacity-50" />}
                    {c.system && <Sparkles className="w-3 h-3 opacity-50" />}
                  </div>
                  <div className="text-[10px] font-mono opacity-50 shrink-0">
                    {c.time}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs opacity-70 truncate">{c.last}</div>
                  {c.unread > 0 && (
                    <div
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 accent-grad"
                      style={{ color: "var(--accent-text)" }}
                    >
                      {c.unread}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat thread */}
      {fresh ? (
        <div className="flex-1 flex flex-col">
          <div
            className="p-4 sm:p-5 border-b flex items-center gap-3"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              onClick={() => setActiveChat(null)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--surface-mute)" }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{ background: fresh.color, color: "#0A0B10" }}
              >
                {fresh.avatar}
              </div>
              {fresh.online && (
                <div
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                  style={{
                    background: "#7AAD4D",
                    borderColor: "var(--card-soft)",
                  }}
                ></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{fresh.name}</div>
              <div className="text-[11px] opacity-60">
                {fresh.online ? "Онлайн" : "Сүүлд " + fresh.time + " өмнө"}
              </div>
            </div>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--surface-mute)" }}
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--surface-mute)" }}
            >
              <Video className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {fresh.msgs?.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 max-w-[85%] sm:max-w-md ${m.from === "me" ? "ml-auto flex-row-reverse" : ""}`}
              >
                {fresh.group && m.from === "them" && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0"
                    style={{ background: fresh.color, color: "#0A0B10" }}
                  >
                    {(m.user || "?")[0]}
                  </div>
                )}
                <div className="min-w-0">
                  {fresh.group && m.from === "them" && (
                    <div className="text-[10px] opacity-60 mb-0.5">
                      {m.user}
                    </div>
                  )}
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm ${m.from === "me" ? "rounded-tr-md" : "rounded-tl-md"}`}
                    style={{
                      background:
                        m.from === "me"
                          ? "var(--accent)"
                          : "var(--surface-mute)",
                      color:
                        m.from === "me" ? "var(--accent-text)" : "var(--text)",
                    }}
                  >
                    {m.text}
                  </div>
                  <div
                    className="text-[10px] opacity-40 mt-0.5 px-1"
                    style={{ textAlign: m.from === "me" ? "right" : "left" }}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="p-3 sm:p-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="flex items-end gap-2 rounded-3xl p-2"
              style={{ background: "var(--surface-mute)" }}
            >
              <button className="w-9 h-9 rounded-xl flex items-center justify-center opacity-60 hover:opacity-100">
                <Paperclip className="w-4 h-4" />
              </button>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Зурвас бичих..."
                className="flex-1 bg-transparent resize-none px-2 py-2 text-sm focus:outline-none"
                style={{ minHeight: 36, maxHeight: 100, color: "var(--text)" }}
              />
              <button
                onClick={send}
                disabled={!msg.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center accent-grad disabled:opacity-40"
                style={{ color: "var(--accent-text)" }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center flex-col p-8 text-center">
          <MessageSquare className="w-12 h-12 opacity-30 mb-3" />
          <div className="font-display text-xl font-bold mb-1">
            Чат сонгоно уу
          </div>
          <div className="text-sm opacity-60">
            Зүүн талаас чат сонгож яриагаа эхлүүлээрэй.
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================
// COMMUNITY VIEW
// =============================================================

function CommunityView({ showToast }) {
  const [tab, setTab] = useState("trending");
  const posts = [
    {
      id: 1,
      user: "Б.Ариунаа",
      avatar: "А",
      color: "#C8FF3A",
      time: "23м",
      school: "ШУТИС · 4-р курс",
      title:
        "Электромагнетизмийн дунд шалгалт — өнөөдрийн зөвлөгөөнд хэн ирэх вэ?",
      body: "А-301 өрөөнд 14:00 цагт. Маш чухал тул бүгдээрээ ирээрэй.",
      likes: 47,
      comments: 12,
      tags: ["Физик", "Шалгалт"],
    },
    {
      id: 2,
      user: "Д.Тэмүүлэн",
      avatar: "Т",
      color: "#9D7CFF",
      time: "1ц",
      school: "МУИС · 2-р курс",
      title: "Хамгийн сайн хичээлийн хийж байгаа газар?",
      body: "ШУТИС-ийн уншлагын танхим вэ, эсвэл Coffee Library Зайсан вэ? Аль нь илүү фокустай байх боломжтой?",
      likes: 23,
      comments: 18,
      tags: ["Зөвлөгөө"],
    },
    {
      id: 3,
      user: "Embedded Club",
      avatar: "EC",
      color: "#FF6B35",
      time: "2ц",
      school: "Багт",
      title:
        "Bamba Hardware Hackathon — багууд бүртгэгдэх 2 өдрийн дараа дуусна!",
      body: "₮3 саяын шагналтай, hardware-аар цоо шинэ юм бүтээх хүн ирээрэй.",
      likes: 89,
      comments: 34,
      tags: ["Хакатон", "Hardware"],
    },
    {
      id: 4,
      user: "С.Мөнхтуяа",
      avatar: "М",
      color: "#5DD3FA",
      time: "5ц",
      school: "ШУТИС · 1-р курс",
      title: "ЭЕШ математик 750+ оноо авахад хэр хугацаа хэрэгтэй вэ?",
      body: "Одоо 600 оноотой байгаа, 5-р сараас бэлдэх төлөвлөгөөтэй.",
      likes: 156,
      comments: 67,
      tags: ["ЭЕШ", "Математик"],
    },
    {
      id: 5,
      user: "Д.Гүндсамбуу",
      avatar: "Г",
      color: "#FFE66A",
      time: "өчигдөр",
      school: "ШУТИС · 3-р курс",
      title:
        "React 19 шинэ feature-уудыг хэн нэгэн нэгтгэн тайлбарласан жишээ нийтлэл байна уу?",
      body: "Server Actions-ийг тойрон ярьсан дэлгэрэнгүй жишээ хэрэгтэй.",
      likes: 34,
      comments: 9,
      tags: ["React", "Програмчлал"],
    },
  ];

  return (
    <div className="fade-in">
      <div
        className="px-4 sm:px-8 py-5 sm:py-6 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-xs font-mono opacity-50 tracking-[0.2em]">
          ОЮУТНЫ ХОЛБОО
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
          Бүх <span className="italic opacity-60">оюутнуудтай</span>.
        </h1>
        <p className="text-sm opacity-60 mt-3 max-w-xl">
          Асуу, хэлэлц, туршлага хуваалц. Энд сурагчаас доктор хүртэл бүгд
          тэнцэхгүй ярьдаг.
        </p>
      </div>

      <div className="px-4 sm:px-8 py-5 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 scroll-x">
          {[
            ["trending", "🔥 Идэвхтэй"],
            ["new", "🆕 Шинэ"],
            ["my", "👤 Миний"],
            ["bookmarked", "🔖 Хадгалсан"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all"
              style={{
                background:
                  tab === id ? "var(--accent)" : "var(--surface-mute)",
                color: tab === id ? "var(--accent-text)" : "var(--text)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => showToast("Шинэ нийтлэл бичих", "info")}
          className="px-4 py-2 rounded-full text-xs font-semibold accent-grad flex items-center gap-1.5"
          style={{ color: "var(--accent-text)" }}
        >
          <Plus className="w-4 h-4" /> Нийтлэл
        </button>
      </div>

      <div className="px-4 sm:px-8 grid lg:grid-cols-12 gap-5 pb-12">
        <div className="lg:col-span-8 space-y-4">
          {posts.map((p) => (
            <article
              key={p.id}
              className="p-5 rounded-3xl transition-all hover:scale-[1.005] cursor-pointer"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold shrink-0"
                  style={{ background: p.color, color: "#0A0B10" }}
                >
                  {p.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{p.user}</div>
                  <div className="text-[10px] opacity-60 truncate">
                    {p.school} · {p.time}
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center opacity-60 hover:opacity-100"
                  style={{ background: "var(--surface-mute)" }}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold leading-snug mb-2">
                {p.title}
              </h3>
              <p className="text-sm opacity-80 leading-relaxed mb-3">
                {p.body}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{ background: "var(--surface-mute)" }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <div
                className="flex items-center gap-4 pt-3 text-xs"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast("Дуртай боллоо", "success");
                  }}
                  className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-4 h-4" /> {p.likes}
                </button>
                <button className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                  <MessageCircle className="w-4 h-4" /> {p.comments}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast("Хадгаллаа", "success");
                  }}
                  className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity ml-auto"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div
            className="rounded-3xl p-5"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="text-[11px] font-mono opacity-60 tracking-[0.15em] mb-3">
              ИДЭВХТЭЙ ГЭШҮҮД
            </div>
            {[
              {
                name: "Б.Ариунаа",
                school: "ШУТИС",
                posts: 47,
                color: "#C8FF3A",
              },
              {
                name: "С.Мөнхтуяа",
                school: "МУИС",
                posts: 38,
                color: "#5DD3FA",
              },
              {
                name: "Д.Тэмүүлэн",
                school: "ХӨХ",
                posts: 29,
                color: "#9D7CFF",
              },
            ].map((u, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5"
                style={{
                  borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: u.color, color: "#0A0B10" }}
                >
                  {u.name[2]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{u.name}</div>
                  <div className="text-[10px] opacity-60">
                    {u.school} · {u.posts} нийтлэл
                  </div>
                </div>
                <button
                  className="text-[10px] px-2.5 py-1 rounded-full"
                  style={{ background: "var(--surface-mute)" }}
                >
                  Дагах
                </button>
              </div>
            ))}
          </div>

          <div
            className="rounded-3xl p-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(200,255,58,0.15), transparent)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="text-[11px] font-mono opacity-60 tracking-[0.15em] mb-2"
              style={{ color: "var(--accent)" }}
            >
              ХОЛБОО ДОТРОО
            </div>
            <div className="font-display text-2xl font-bold mb-2">
              12,847 идэвхтэй оюутан
            </div>
            <p className="text-xs opacity-70 mb-4">
              Энэ долоо хоногт 234 нийтлэл, 1,892 сэтгэгдэл нэмэгдсэн.
            </p>
            <button
              className="w-full py-2 rounded-full text-xs font-semibold accent-grad"
              style={{ color: "var(--accent-text)" }}
            >
              Холбоонд нэгдэх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// PROFILE VIEW
// =============================================================

function ProfileView({ profile, setProfile, navigate, showToast }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [tab, setTab] = useState("info");

  const save = () => {
    setProfile(form);
    setEditing(false);
    showToast("Мэдээлэл шинэчлэгдлээ", "success");
  };

  return (
    <div className="fade-in">
      <div
        className="px-4 sm:px-8 py-5 sm:py-6 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <button
          onClick={() => navigate("home")}
          className="text-xs opacity-60 hover:opacity-100 mb-4 flex items-center gap-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Нүүр
        </button>
        <div className="flex items-start gap-4 sm:gap-6 flex-wrap">
          <div className="relative shrink-0">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center font-display text-4xl sm:text-5xl font-bold accent-grad"
              style={{ color: "var(--accent-text)" }}
            >
              {profile.avatar}
            </div>
            <button
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                background: "var(--card)",
                border: "2px solid var(--bg)",
              }}
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-mono opacity-50 tracking-[0.2em]">
              ОЮУТНЫ ПРОФАЙЛ
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold mt-1 leading-tight">
              {profile.fullName}
            </h1>
            <div className="text-sm opacity-70 mt-1">
              {profile.school} · {profile.major} · {profile.grade}
            </div>
            <p className="text-sm opacity-60 mt-2 max-w-md">{profile.bio}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
            <ProfileStat
              label="Token"
              value={profile.tokens}
              color="var(--accent)"
              icon="🪙"
            />
            <ProfileStat
              label="Streak"
              value={profile.streak}
              color="var(--warm)"
              icon="🔥"
            />
            <ProfileStat
              label="Түвшин"
              value={7}
              color="var(--purple)"
              icon="⭐"
            />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-5 flex gap-2 scroll-x">
        {[
          ["info", "Мэдээлэл", User],
          ["activity", "Идэвх", BarChart3],
          ["achievements", "Амжилт", Award],
          ["bookmarks", "Хадгалсан", Bookmark],
        ].map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 shrink-0 transition-all"
            style={{
              background: tab === id ? "var(--accent)" : "var(--surface-mute)",
              color: tab === id ? "var(--accent-text)" : "var(--text)",
            }}
          >
            <Icon className="w-3.5 h-3.5" /> {label}
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-8 pb-12">
        {tab === "info" && (
          <div
            className="rounded-3xl p-5 sm:p-7 fade-in"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-2xl font-bold">
                Хувийн мэдээлэл
              </h3>
              {!editing ? (
                <button
                  onClick={() => {
                    setForm(profile);
                    setEditing(true);
                  }}
                  className="text-xs font-mono px-4 py-2 rounded-full"
                  style={{
                    background: "var(--surface-mute)",
                    border: "1px solid var(--border)",
                  }}
                >
                  ЗАСВАРЛАХ
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="text-xs font-mono px-4 py-2 rounded-full"
                    style={{ background: "var(--surface-mute)" }}
                  >
                    БУЦАХ
                  </button>
                  <button
                    onClick={save}
                    className="text-xs font-mono px-4 py-2 rounded-full accent-grad"
                    style={{ color: "var(--accent-text)" }}
                  >
                    ХАДГАЛАХ
                  </button>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <ProfileField
                label="Бүтэн нэр"
                value={editing ? form.fullName : profile.fullName}
                editing={editing}
                onChange={(v) => setForm({ ...form, fullName: v })}
              />
              <ProfileField
                label="Имэйл"
                value={editing ? form.email : profile.email}
                editing={editing}
                onChange={(v) => setForm({ ...form, email: v })}
                type="email"
              />
              <ProfileField
                label="Утас"
                value={editing ? form.phone : profile.phone}
                editing={editing}
                onChange={(v) => setForm({ ...form, phone: v })}
              />
              <ProfileField
                label="Сургууль"
                value={editing ? form.school : profile.school}
                editing={editing}
                onChange={(v) => setForm({ ...form, school: v })}
              />
              <ProfileField
                label="Мэргэжил"
                value={editing ? form.major : profile.major}
                editing={editing}
                onChange={(v) => setForm({ ...form, major: v })}
              />
              <ProfileField
                label="Курс"
                value={editing ? form.grade : profile.grade}
                editing={editing}
                onChange={(v) => setForm({ ...form, grade: v })}
              />
              <div className="sm:col-span-2">
                <ProfileField
                  label="Танилцуулга"
                  value={editing ? form.bio : profile.bio}
                  editing={editing}
                  onChange={(v) => setForm({ ...form, bio: v })}
                  multiline
                />
              </div>
              <ProfileField
                label="Бүртгүүлсэн огноо"
                value={profile.joined}
                editing={false}
              />
            </div>
          </div>
        )}

        {tab === "activity" && (
          <div className="grid md:grid-cols-2 gap-5 fade-in">
            <div
              className="rounded-3xl p-5 sm:p-6"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-[11px] font-mono opacity-60 tracking-[0.15em] mb-4">
                7 ХОНОГИЙН ИДЭВХ
              </div>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-md"
                      style={{
                        background:
                          i < 5
                            ? `var(--accent)${["FF", "CC", "99", "66", "33"][i]}`
                            : "var(--surface-mute)",
                      }}
                    ></div>
                  ))}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div
                    className="font-display text-3xl font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    32ц
                  </div>
                  <div className="text-xs opacity-60">Сурлагын цаг</div>
                </div>
                <div>
                  <div
                    className="font-display text-3xl font-bold"
                    style={{ color: "var(--cool)" }}
                  >
                    19
                  </div>
                  <div className="text-xs opacity-60">Үйл ажиллагаа</div>
                </div>
              </div>
            </div>

            <div
              className="rounded-3xl p-5 sm:p-6"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="text-[11px] font-mono opacity-60 tracking-[0.15em] mb-4">
                СҮҮЛИЙН ҮЙЛДЛҮҮД
              </div>
              <div className="space-y-3 text-sm">
                {[
                  {
                    icon: "✨",
                    text: "AI-аас 12 асуулт асуусан",
                    time: "өнөөдөр",
                  },
                  {
                    icon: "📚",
                    text: "React хичээл — 4-р модуль дууссан",
                    time: "өчигдөр",
                  },
                  {
                    icon: "🎓",
                    text: "Б.Энхбат ментортой 1ц хичээл",
                    time: "2 өдөр",
                  },
                  {
                    icon: "🏆",
                    text: "12 хоногийн streak хадгалсан",
                    time: "3 өдөр",
                  },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xl">{a.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {a.text}
                      </div>
                      <div className="text-[10px] opacity-60">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "achievements" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-in">
            {[
              {
                emoji: "🔥",
                title: "Streak Хааныи",
                desc: "12 хоног дараалан хичээл хийсэн",
                color: "#FF6B35",
                earned: true,
              },
              {
                emoji: "🌟",
                title: "AI Pro",
                desc: "AI-аас 100+ асуулт асууж хариулт авсан",
                color: "#C8FF3A",
                earned: true,
              },
              {
                emoji: "🎓",
                title: "Сурлагын одон",
                desc: "5 хичээлээс шилдэг үнэлгээтэй дууссан",
                color: "#FFE66A",
                earned: true,
              },
              {
                emoji: "🏆",
                title: "Хакерт",
                desc: "Хакатонд оролцох — 0/1",
                color: "#9D7CFF",
                earned: false,
              },
              {
                emoji: "💼",
                title: "Багтай ажилласан",
                desc: "Багт сард 10+ удаа идэвхтэй байх",
                color: "#5DD3FA",
                earned: false,
              },
              {
                emoji: "📚",
                title: "100 цаг сурсан",
                desc: "Платформ дээр 100ц-ийг өнгөрөөх — 32/100",
                color: "#E580B0",
                earned: false,
              },
            ].map((a, i) => (
              <div
                key={i}
                className="p-5 rounded-3xl text-center transition-all"
                style={{
                  background: a.earned
                    ? `linear-gradient(135deg, ${a.color}30, ${a.color}10)`
                    : "var(--card)",
                  border: `1px solid ${a.earned ? a.color + "40" : "var(--border)"}`,
                  opacity: a.earned ? 1 : 0.5,
                }}
              >
                <div className="text-4xl mb-2">{a.emoji}</div>
                <div className="font-display text-lg font-bold mb-1">
                  {a.title}
                </div>
                <div className="text-xs opacity-70">{a.desc}</div>
                {a.earned && (
                  <div
                    className="text-[10px] font-mono mt-2 inline-block px-2 py-0.5 rounded-full"
                    style={{ background: a.color + "30", color: a.color }}
                  >
                    АВСАН
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "bookmarks" && (
          <div className="text-center py-16 fade-in">
            <Bookmark className="w-12 h-12 mx-auto opacity-30 mb-3" />
            <div className="font-display text-xl font-bold mb-1">
              Хадгалсан зүйл алга
            </div>
            <div className="text-sm opacity-60">
              Та хичээл, эвент, газар хадгалаагүй байна.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileStat({ label, value, color, icon }) {
  return (
    <div
      className="rounded-2xl p-3 text-center"
      style={{ background: "var(--surface-mute)" }}
    >
      <div className="text-xl mb-1">{icon}</div>
      <div className="font-display text-xl font-bold" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] opacity-60 mt-0.5">{label}</div>
    </div>
  );
}

function ProfileField({
  label,
  value,
  editing,
  onChange,
  type = "text",
  multiline,
}) {
  return (
    <div>
      <div className="text-[11px] font-mono opacity-60 mb-2 tracking-[0.15em]">
        {label.toUpperCase()}
      </div>
      {editing ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-xl text-sm resize-none focus:outline-none"
            style={{
              background: "var(--surface-mute)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 rounded-xl text-sm focus:outline-none"
            style={{
              background: "var(--surface-mute)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
        )
      ) : (
        <div className="text-base font-medium">{value || "—"}</div>
      )}
    </div>
  );
}

// =============================================================
// SETTINGS VIEW
// =============================================================

function SettingsView({ theme, toggleTheme, handleLogout, showToast }) {
  return (
    <div className="fade-in">
      <div
        className="px-4 sm:px-8 py-5 sm:py-6 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-xs font-mono opacity-50 tracking-[0.2em]">
          ХЭРЭГЛЭГЧИЙН ТОХИРГОО
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold mt-2">
          Тохиргоо.
        </h1>
      </div>

      <div className="px-4 sm:px-8 py-6 max-w-3xl space-y-5 pb-12">
        <SettingsSection title="Харагдалт" desc="Сайтын өнгө, дизайн">
          <SettingRow
            icon={
              theme === "dark" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )
            }
            title={theme === "dark" ? "Шөнийн горим" : "Өдрийн горим"}
            subtitle="Сайтын өнгөний горим"
          >
            <button
              onClick={toggleTheme}
              className="w-12 h-6 rounded-full relative transition-colors"
              style={{
                background:
                  theme === "dark" ? "var(--accent)" : "var(--border-strong)",
              }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm"
                style={{
                  transform:
                    theme === "dark" ? "translateX(26px)" : "translateX(2px)",
                }}
              />
            </button>
          </SettingRow>
        </SettingsSection>

        <SettingsSection title="Мэдэгдэл" desc="Сануулга, имэйл, push">
          <SettingRow
            icon={<Bell className="w-5 h-5" />}
            title="Push мэдэгдэл"
            subtitle="Хичээлийн сануулга, чат"
          >
            <Toggle defaultOn />
          </SettingRow>
          <SettingRow
            icon={<Mail className="w-5 h-5" />}
            title="Имэйл мэдэгдэл"
            subtitle="Долоо хоногийн товч мэдээ"
          >
            <Toggle defaultOn />
          </SettingRow>
          <SettingRow
            icon={<Megaphone className="w-5 h-5" />}
            title="Маркетинг"
            subtitle="Шинэ feature, эвент"
          >
            <Toggle />
          </SettingRow>
        </SettingsSection>

        <SettingsSection title="Аюулгүй байдал" desc="Нууц үг, нэвтрэлт">
          <SettingRow
            icon={<Lock className="w-5 h-5" />}
            title="Нууц үг солих"
            subtitle="Сүүлд солих: 2 сар"
          >
            <button
              onClick={() => showToast("Нууц үг солих хуудас", "info")}
              className="text-[10px] font-mono px-3 py-1.5 rounded-full"
              style={{ background: "var(--surface-mute)" }}
            >
              СОЛИХ
            </button>
          </SettingRow>
          <SettingRow
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Хоёр шатлалт нэвтрэлт"
            subtitle="Илүү аюулгүй"
          >
            <Toggle />
          </SettingRow>
          <SettingRow
            icon={<Eye className="w-5 h-5" />}
            title="Профайл харагдалт"
            subtitle="Бусад оюутанд харагдах эсэх"
          >
            <Toggle defaultOn />
          </SettingRow>
        </SettingsSection>

        <SettingsSection
          title="Холболтууд"
          desc="Сургуулийн систем, гадны үйлчилгээ"
        >
          <SettingRow
            icon={<Building2 className="w-5 h-5" />}
            title="ШУТИС SiSi"
            subtitle="Сургуулийн системтэй холбогдсон"
          >
            <div
              className="text-[10px] font-mono px-3 py-1.5 rounded-full flex items-center gap-1"
              style={{ background: "rgba(92,138,58,0.15)", color: "#7AAD4D" }}
            >
              <CheckCircle className="w-3 h-3" /> ХОЛБОГДСОН
            </div>
          </SettingRow>
          <SettingRow
            icon={<Globe className="w-5 h-5" />}
            title="e-Mongolia"
            subtitle="Иргэний мэдээлэл"
          >
            <div
              className="text-[10px] font-mono px-3 py-1.5 rounded-full flex items-center gap-1"
              style={{ background: "rgba(93,211,250,0.15)", color: "#5DD3FA" }}
            >
              <CheckCircle className="w-3 h-3" /> БАТАЛГААЖСАН
            </div>
          </SettingRow>
        </SettingsSection>

        <SettingsSection title="Хэрэглэгчийн данс" desc="">
          <button
            onClick={() => showToast("Дата экспортлогдлоо", "success")}
            className="w-full p-4 rounded-2xl flex items-center gap-3 transition-colors hover:opacity-80 text-left"
            style={{ background: "var(--surface-mute)" }}
          >
            <Download className="w-5 h-5 opacity-70" />
            <div className="flex-1">
              <div className="text-sm font-medium">Миний өгөгдлийг татах</div>
              <div className="text-xs opacity-60">JSON форматтай файл</div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>
          <button
            onClick={handleLogout}
            className="w-full p-4 rounded-2xl flex items-center gap-3 transition-colors text-left"
            style={{
              background: "rgba(255,107,53,0.1)",
              color: "#FF6B35",
              border: "1px solid rgba(255,107,53,0.2)",
            }}
          >
            <LogOut className="w-5 h-5" />
            <div className="flex-1">
              <div className="text-sm font-semibold">Системээс гарах</div>
              <div className="text-xs opacity-70">
                Дараа дахин нэвтрэхийн тулд имэйлээ хэрэглэнэ
              </div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              showToast("Дансаа устгах хүсэлт илгээгдсэн", "error")
            }
            className="w-full p-4 rounded-2xl flex items-center gap-3 transition-colors hover:opacity-80 text-left"
            style={{ background: "var(--surface-mute)", color: "var(--warm)" }}
          >
            <Trash2 className="w-5 h-5" />
            <div className="flex-1">
              <div className="text-sm font-medium">Дансаа устгах</div>
              <div className="text-xs opacity-70">
                Энэ үйлдэл буцах боломжгүй
              </div>
            </div>
          </button>
        </SettingsSection>

        <div className="text-center text-xs opacity-50 pt-6">
          <div className="font-display font-bold text-2xl mb-1">OYU</div>
          <div>Version 0.7.0 · 2026 erxes Academy PADA-1</div>
          <div className="mt-2 opacity-70">Болдын бүтээл</div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({ title, desc, children }) {
  return (
    <div>
      <div className="mb-3">
        <div className="text-[11px] font-mono opacity-60 tracking-[0.15em]">
          {title.toUpperCase()}
        </div>
        {desc && <div className="text-xs opacity-50 mt-0.5">{desc}</div>}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function SettingRow({ icon, title, subtitle, children }) {
  return (
    <div
      className="flex items-center justify-between gap-3 p-4 rounded-2xl"
      style={{ background: "var(--surface-mute)" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "var(--card)" }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate">{title}</div>
          <div className="text-xs opacity-60 truncate">{subtitle}</div>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className="w-12 h-6 rounded-full relative transition-colors"
      style={{ background: on ? "var(--accent)" : "var(--border-strong)" }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm"
        style={{ transform: on ? "translateX(26px)" : "translateX(2px)" }}
      />
    </button>
  );
}
