# Roamin' in Rome – 20-Minute Pub Quiz

A fast, accessible, mobile-first team quiz game built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Zustand**. Perfect for quiz nights and team events. Works on phones, tablets, and desktop. Deploy to Vercel in seconds.

**Note:** This app is configured for a one-time quiz night with the "Roamin' in Rome" quiz hardcoded. The quiz loads automatically - no YAML editing needed!

## Features

✅ **Two Game Modes**
- **Phones-as-Buzzers**: Players join via room code, real-time sync (optional)
- **Team Mode**: Single-screen pass-the-phone play (no external services)

✅ **Quiz Management**
- Rome quiz pre-loaded and ready to use
- Automatic quiz loading - no configuration needed
- Simple one-click start for quiz night

✅ **Question Types**
- Multiple choice
- Picture (with lazy loading)
- Audio
- Speed (reaction time scoring)
- Wager Final (bet from current score)

✅ **Gameplay**
- Per-round timer with visual progress
- Optimistic UI, idempotent events
- Haptic feedback (Vibration API)
- Audio cues (muted by default)
- Streak bonuses
- Animated scoreboard

✅ **Accessibility (WCAG AA)**
- Large text option
- High-contrast mode
- ARIA live regions (timer, reveals)
- Semantic HTML, keyboard navigation
- Focus indicators

✅ **Mobile-First Design**
- One-hand reach (48px+ targets)
- Sticky bottom controls
- Safe area insets (notch-aware)
- Swipe gestures (framer-motion)
- PWA ready (installable, offline)

✅ **Color Scheme** (no purple)
- Muted Green: `#1e7f4f` (primary actions)
- Soft Red: `#d24848` (highlights, incorrect)
- Off-White: `#f7f7f5` (backgrounds)
- White: `#ffffff` (surfaces)
- Dark Text: `#0f1210`

✅ **Performance**
- Lean dependencies
- Cold start < 2s on Vercel
- Static pages + API routes
- CSS variables for theming
- Tailwind CSS purging

---

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Deploy

```bash
npm run build
npm run start
```

Deploy to Vercel:

```bash
npm i -g vercel
vercel
```

---

## Usage

### Host Mode (`/host`)

1. **Start the Quiz**
   - Click "Host Quiz" on the landing page
   - The Rome quiz loads automatically
   - Room code is generated automatically (4-character code like `A1B2`)

2. **Share Room Code**
   - Copy the room code or shareable link
   - Display on projector or share via messaging
   - Players use this code to join

3. **Run Session**
   - Click "Start Session" to begin
   - Bottom control bar: Play/Pause, Reveal, Next/Prev, Settings
   - Keyboard shortcuts: Space, R, →, ←, A+, ◐, ⛶
   - Navigate through 4 rounds with 20 questions total

4. **Scoreboard**
   - Toggle scoreboard anytime to see live standings
   - Animated rank changes as scores update

### Player Join (`/join/:room?name=...`)

1. **Enter Room Code**
   - Click "Join with Code" on landing page
   - Enter the 4-character room code from host

2. **Enter Your Name**
   - Type your name and continue

3. **Create or Join Team**
   - If no teams exist: Create a new team with a name
   - If teams exist: Join an existing team OR create a new one
   - Each team gets a unique color

4. **Play**
   - Wait for host to start the question
   - Buzz in when ready (big green BUZZ button)
   - Lock in your answer by tapping an option
   - See your score after the host reveals answers

### Team Mode (`/play`) - Alternative Single-Screen Mode

1. Host navigates to `/play` instead of `/host`
2. Add teams on the host device (one-hand reach)
3. Pass phone around - each team taps buzzer for their turn
4. Lock answers, reveal, score
5. Navigate to next question
6. **Works completely offline** - no internet needed after first load

---

## Current Quiz: "Roamin' in Rome"

The app comes pre-loaded with a 20-minute Rome-themed quiz:

- **4 Rounds** (5 minutes each):
  1. **Ancient Rome** - Historical questions about the Colosseum, Via Appia, Seven Hills, Pantheon, and Julius Caesar
  2. **Landmarks & City Layout** - Trevi Fountain, Piazza Navona, Spanish Steps, St. Peter's Basilica
  3. **Food, Drink & Daily Life** - Roman pasta dishes, street food, Campo de' Fiori, Bocca della Verità
  4. **Modern Rome, Pop Culture & Sport** - Derby della Capitale, La Dolce Vita, aqueducts, Fiumicino airport

- **20 Questions Total** - All multiple choice
- **Scoring**: 10 points per question, 15 points for bonus questions (Q5 in each round)
- **Total Possible**: 210 points

**Note:** The quiz is hardcoded in the app. To change it, edit `src/lib/constants.ts` and modify the `EXAMPLE_QUIZ` constant.

---

## Architecture

### State Management (Zustand)

```typescript
quizSpec           // Quiz metadata + questions
phase              // "idle" | "showing" | "revealed" | "finished"
roundIdx           // Current round
questionIdx        // Current question
teams[]            // Team list { id, name, color }
scores{}           // teamId -> score
streaks{}          // teamId -> consecutive correct
settings           // soundOn, largeText, highContrast, etc.
```

All state persists to `localStorage` automatically.

### Pages

- `/` – Landing (Host / Join / Example)
- `/host` – YAML editor, room code, session controls
- `/play` – Team Mode single-screen
- `/join/:room` – Player join + buzzer UI
- `/scoreboard` – Public read-only standings

### Components

- `Button.tsx` – Base button with variants
- `YAMLEditor.tsx` – Validator with error display
- `RoomCode.tsx` – Room code + shareable link
- `HostControls.tsx` – Sticky bottom bar + shortcuts
- `Timer.tsx` – Countdown with progress ring
- `QuizCard.tsx` – Polymorphic card renderer
- `Scoreboard.tsx` – Animated standings

### Card Types

- `MultipleChoiceCard.tsx`
- `PictureCard.tsx`
- `AudioCard.tsx`
- `SpeedCard.tsx`
- `WagerFinalCard.tsx`

---

## Accessibility

### Features

- **Large Text**: Toggle to increase base font from 16px to 18px
- **High Contrast**: Deeper greens/reds (#0d4a2f, #a01e1e), black text
- **ARIA Live**: Timer ticks, answer reveals announced
- **Focus Indicators**: 2px green outlines with offset
- **Semantic HTML**: Proper `<button>`, `<form>`, `role=` attributes
- **Keyboard**: Tab, Space, Enter, Arrow keys work

### WCAG AA Compliance

- Color not sole indicator (icons + text)
- 48px+ touch targets
- 2px focus outlines
- Dark text on light backgrounds

---

## PWA & Offline

- **Manifest**: `public/manifest.json` (installable)
- **Service Worker**: `public/service-worker.js` (caching strategy)
- **Offline Support**: Team Mode works after first load
- **Icons**: 192x192, 512x512 (in `public/`)

Register service worker in your browser to enable offline.

---

## Optional: Realtime Sync

By default, Team Mode works **without** external services (fully local).

To add real-time sync for Phones-as-Buzzers mode:

### Option 1: Vercel KV + WebSockets (Recommended)

```bash
vercel env add NEXT_PUBLIC_REALTIME
# Answer: vercel
```

- Uses Vercel KV for room state
- WebSockets for real-time sync
- Zero additional cost with Vercel Hobby

### Option 2: Pusher

```bash
npm install pusher pusher-js
```

Set env vars:

```
NEXT_PUBLIC_REALTIME=pusher
NEXT_PUBLIC_PUSHER_KEY=...
NEXT_PUBLIC_PUSHER_CLUSTER=...
PUSHER_SECRET=...
```

If `NEXT_PUBLIC_REALTIME` is unset, app runs in Team Mode (local only).

---

## Deployment

### Vercel (Recommended)

```bash
vercel
```

- Auto-builds on git push
- Edge functions for real-time
- PWA works out-of-the-box
- <100ms cold start

### Self-Hosted

```bash
npm run build
npm run start
```

Works on any Node.js host (Heroku, Railway, DigitalOcean, etc.).

---

## Project Structure

```
quiz/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root + meta
│   │   ├── page.tsx             # Landing
│   │   ├── host/page.tsx        # Host mode
│   │   ├── play/page.tsx        # Team Mode
│   │   ├── join/page.tsx        # Join flow
│   │   ├── join/[room]/page.tsx # Player buzzer
│   │   ├── scoreboard/page.tsx  # Standings
│   │   ├── api/
│   │   │   └── quiz/validate/route.ts
│   │   └── globals.css
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── LandingPage.tsx
│   │   ├── YAMLEditor.tsx
│   │   ├── RoomCode.tsx
│   │   ├── HostControls.tsx
│   │   ├── Timer.tsx
│   │   ├── QuizCard.tsx
│   │   ├── Scoreboard.tsx
│   │   └── cards/
│   │       ├── MultipleChoiceCard.tsx
│   │       ├── PictureCard.tsx
│   │       ├── AudioCard.tsx
│   │       ├── SpeedCard.tsx
│   │       └── WagerFinalCard.tsx
│   ├── lib/
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   └── yaml-parser.ts
│   └── store/
│       └── quiz.ts              # Zustand
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   └── round-assets/            # Quiz media
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── postcss.config.js
```

---

## Dependencies

**Core:**
- `next@16` – Framework
- `react@19` – UI library
- `typescript` – Type safety
- `tailwindcss@3` – CSS utility framework

**State & Logic:**
- `zustand@4` – State management
- `zod@3` – Schema validation
- `js-yaml@4` – YAML parser

**UI & Animation:**
- `framer-motion@11` – Smooth animations
- `clsx@2`, `tailwind-merge` – Conditional classes

**Total: ~1.5 MB bundle (production build)**

---

## Tips

### Hosting Your Own Assets

Place images/audio in `public/round-assets/`:

```
public/
└── round-assets/
    ├── rome.jpg
    ├── song.mp3
    └── ...
```

Reference in YAML:

```yaml
image: "/round-assets/rome.jpg"
audio: "/round-assets/song.mp3"
```

### Sharing Quizzes

Encode quiz to URL:

```typescript
import { encodeQuizToUrl } from '@/lib/utils';
const payload = encodeQuizToUrl(yamlString);
// Share: https://yoursite.com/host?q=<payload>
```

Decode on load:

```typescript
import { decodeQuizFromUrl } from '@/lib/utils';
const yaml = decodeQuizFromUrl(urlPayload);
```

### Keyboard Shortcuts (Host Mode)

- **Space**: Play/Pause
- **R**: Reveal Answer
- **→**: Next Question
- **←**: Previous Question

---

## Troubleshooting

### "Realtime unavailable; local play mode" banner

- `NEXT_PUBLIC_REALTIME` is unset → use Team Mode
- Or real-time service is down → graceful fallback to local

### High Contrast not applying

- Ensure data attribute: `[data-high-contrast="true"]`
- Check CSS variables are defined in `globals.css`

### Service Worker not caching

- Open DevTools → Application → Service Workers
- Verify "Offline" toggle; reload page
- Check `public/service-worker.js`

---

## License

MIT – Enjoy! 🎉

---

**Symphony Solutions, Rome** – Built with ❤️ for teams.
