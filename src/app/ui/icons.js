// Centralized Icon Registry for Swaya
// Automatically generated refactored icon exports

export {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BarChart2,
  BellPlus,
  Bookmark,
  Briefcase,
  Brush,
  Calendar,
  CalendarX2,
  Captions,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  Clapperboard,
  Clock,
  Coins,
  Copy,
  Cpu,
  Database,
  Dna,
  DollarSign,
  Download,
  Droplets,
  Edit2,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  FastForward,
  FileJson,
  Film,
  Flame,
  Gift,
  FolderOpen,
  FolderPlus,
  FolderSync,
  FolderTree,
  Gem,
  GitFork,
  GitMerge,
  Globe,
  GripVertical,
  Heart,
  Home,
  HelpCircle,
  Image,
  ImageOff,
  Inbox,
  Info,
  Key,
  KeyRound,
  Languages,
  Layers,
  Library,
  Lock,
  Link,
  Link2,
  List,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Mars,
  Maximize2,
  Minimize2,
  Minus,
  Palette,
  Package,
  Pause,
  PenLine,
  Pencil,
  PictureInPicture2,
  Play,
  PlayCircle,
  Plus,
  Power,
  RefreshCw,
  Rewind,
  RotateCcw,
  Ruler,
  ScrollText,
  Search,
  Settings,
  Settings2,
  SkipBack,
  SkipForward,
  Sliders,
  SlidersHorizontal,
  Sparkles,
  Square,
  Star,
  Tag,
  Trash2,
  TrendingUp,
  Tv,
  Upload,
  User,
  UserPlus,
  UserRound,
  Users,
  Venus,
  VenusAndMars,
  Video,
  Volume2,
  VolumeX,
  Wrench,
  Zap,
  X
} from 'lucide-react';

// Semantic Entity Mappings
import {
  Film,
  Tv,
  Video,
  FileText,
  User,
  Home,
  FolderSync,
  Library,
  Bookmark,
  Star,
  History,
  Settings,
  Info,
  BarChart2,
} from 'lucide-react';

export const ENTITY_ICONS = {
  movie: Film,
  tv: Tv,
  episode: Video,
  extra: FileText,
  performer: User,
  performers: User,
};

export const SIDEBAR_ICONS = {
  dashboard: Home,
  organizer: FolderSync,
  library: Library,
  lists: Bookmark,
  myRatings: Star,
  statistics: BarChart2,
  history: History,
  settings: Settings,
  about: Info,
};

import { createElement } from 'react';

export const GitHubIcon = ({ size = 16, className = '' }) =>
  createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      'aria-hidden': true,
      className,
    },
    createElement('path', {
      d: 'M12 .5C5.649.5.5 5.649.5 12A11.5 11.5 0 0 0 8.36 22.08c.575.106.785-.25.785-.556 0-.274-.01-1-.016-1.963-3.184.692-3.855-1.534-3.855-1.534-.52-1.323-1.27-1.675-1.27-1.675-1.038-.71.078-.696.078-.696 1.148.08 1.752 1.178 1.752 1.178 1.02 1.75 2.675 1.245 3.327.952.104-.739.399-1.245.726-1.531-2.542-.289-5.215-1.271-5.215-5.657 0-1.249.446-2.271 1.176-3.071-.118-.289-.51-1.452.111-3.026 0 0 .96-.307 3.146 1.173A10.94 10.94 0 0 1 12 6.03c.977.004 1.962.132 2.882.389 2.184-1.48 3.143-1.173 3.143-1.173.623 1.574.231 2.737.113 3.026.732.8 1.175 1.822 1.175 3.07 0 4.397-2.678 5.365-5.228 5.649.41.353.775 1.05.775 2.117 0 1.529-.014 2.762-.014 3.138 0 .31.207.668.79.555A11.503 11.503 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z',
    })
  );

export const DiscordIcon = ({ size = 16, className = '' }) =>
  createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      'aria-hidden': true,
      className,
    },
    createElement('path', {
      d: 'M20.317 4.37A19.791 19.791 0 0 0 15.429 3a13.915 13.915 0 0 0-.625 1.29 18.27 18.27 0 0 0-5.608 0A13.935 13.935 0 0 0 8.57 3a19.736 19.736 0 0 0-4.89 1.372C.587 9.04-.252 13.59.167 18.075a19.9 19.9 0 0 0 5.993 2.925 14.312 14.312 0 0 0 1.282-2.11 12.944 12.944 0 0 1-2.014-.98c.17-.124.337-.254.498-.388 3.885 1.824 8.101 1.824 11.94 0 .163.134.33.264.5.388a12.88 12.88 0 0 1-2.016.982A14.218 14.218 0 0 0 17.632 21a19.857 19.857 0 0 0 5.995-2.925c.492-5.195-.84-9.705-3.31-13.705ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419Zm7.96 0c-1.182 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.177 1.095 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z',
      fill: 'currentColor',
    })
  );

export const PlexIcon = ({ size = 20, className = '' }) =>
  createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      'aria-hidden': true,
      className,
    },
    createElement('path', {
      d: 'M5.25 2H10.75L18.75 12L10.75 22H5.25L13.25 12L5.25 2Z',
      fill: 'var(--brand-plex)',
    })
  );

export const JellyfinIcon = ({ size = 20, className = '' }) =>
  createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      'aria-hidden': true,
      className,
    },
    createElement('path', {
      d: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.76 4 17.14 5.37 18.57 7.43L12 11.5L5.43 7.43C6.86 5.37 9.24 4 12 4ZM5.07 9.47L11 13.18V20C7.38 19.54 4.54 16.7 4.08 13.08C3.93 11.83 4.29 10.57 5.07 9.47ZM13 20V13.18L18.93 9.47C19.71 10.57 20.07 11.83 19.92 13.08C19.46 16.7 16.62 19.54 13 20Z',
      fill: 'url(#jellyfin-gradient)',
    }),
    createElement(
      'defs',
      null,
      createElement(
        'linearGradient',
        {
          id: 'jellyfin-gradient',
          x1: '2',
          y1: '2',
          x2: '22',
          y2: '22',
          gradientUnits: 'userSpaceOnUse',
        },
        createElement('stop', { stopColor: 'var(--brand-jellyfin-start)' }),
        createElement('stop', { offset: '1', stopColor: 'var(--brand-jellyfin-end)' })
      )
    )
  );

export const KodiIcon = ({ size = 20, className = '' }) =>
  createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      'aria-hidden': true,
      className,
    },
    createElement('path', {
      d: 'M12 2L2 12L12 22L22 12L12 2Z',
      fill: 'var(--brand-kodi-primary)',
    }),
    createElement('path', {
      d: 'M12 6L6 12L12 18L18 12L12 6Z',
      fill: 'var(--brand-kodi-secondary)',
    }),
    createElement('rect', {
      x: '11.25',
      y: '11.25',
      width: '1.5',
      height: '1.5',
      fill: 'var(--brand-kodi-accent)',
    })
  );

export const GithubIcon = ({ size = 20, className = '' }) =>
  createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': true,
      className,
    },
    createElement('path', {
      d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    }),
    createElement('path', {
      d: 'M9 18c-4.51 2-5-2-7-2',
    })
  );
