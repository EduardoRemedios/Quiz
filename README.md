# Roamin' in Rome – 20-Minute Pub Quiz

A simple, accessible quiz host app built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Zustand**. Perfect for quiz nights where the host reads questions and players write answers on paper.

**Note:** This app is configured for a one-time quiz night with the "Roamin' in Rome" quiz hardcoded. The quiz loads automatically - no YAML editing needed!

## Features

✅ **Simple Host Mode**
- Host reads questions from device/tablet
- Large, readable question text (3xl-4xl font size)
- Players write answers on paper (no devices needed)
- Toggle to show/hide answers during quiz
- Easy navigation: Previous, Next, Show Answer

✅ **End-of-Quiz Summary**
- Complete list of all questions and answers
- Correct answers highlighted in green
- Explanations included for each question
- Perfect for reading out loud to mark papers
- Organized by round

✅ **Quiz Management**
- Rome quiz pre-loaded and ready to use
- Delightful Italian-themed UI with flag colors
- Automatic quiz loading - no configuration needed
- Simple one-click start for quiz night

✅ **Question Types**
- Multiple choice (current implementation)
- Extensible for picture, audio, speed, and wager questions

✅ **Accessibility (WCAG AA)**
- Large text option
- High-contrast mode
- Semantic HTML, keyboard navigation
- Focus indicators
- Safe area insets (notch-aware)

✅ **Mobile-First Design**
- Optimized for tablets and phones
- Large touch targets
- Sticky bottom controls
- Italian flag-inspired color scheme
- Clean, readable interface

✅ **Color Scheme** (Italian Flag Theme)
- Vibrant Green: `#009246` (Italian flag green)
- Vibrant Red: `#ce2b37` (Italian flag red)
- White: `#ffffff` (Italian flag white)
- Clean backgrounds and high contrast text

✅ **Performance**
- Lean dependencies
- Fast loading
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
   - Click "Start Quiz" to begin

2. **Read Questions**
   - Questions appear in large, readable text (3xl-4xl font)
   - Read each question aloud to players
   - Players write their answers on paper

3. **Navigate Questions**
   - Use "Previous" to go back
   - Use "Next" to advance
   - Use "Show Answer" to reveal the correct answer (optional)
   - Click "Finish" after the last question

4. **End-of-Quiz Summary**
   - After clicking "Finish", view all questions and answers
   - Read through the summary to mark papers
   - Correct answers are highlighted in green
   - Explanations are included for each question

---

## Current Quiz: "Roamin' in Rome"

The app comes pre-loaded with a 20-minute Rome-themed quiz:

- **4 Rounds**:
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
settings           // largeText, highContrast, etc.
```

All state persists to `localStorage` automatically.

### Pages

- `/` – Landing page (Host Quiz button)
- `/host` – Main quiz interface with questions and summary

### Components

- `Button.tsx` – Base button with variants
- `YAMLEditor.tsx` – Validator with error display (for custom quizzes)
- `QuizCard.tsx` – Polymorphic card renderer
- `Timer.tsx` – Small countdown timer (minimized header)

### Card Types

- `MultipleChoiceCard.tsx` – Multiple choice questions (currently used)
- Other card types available but not used in current simplified mode

---

## Accessibility

### Features

- **Large Text**: Toggle to increase base font from 16px to 18px
- **High Contrast**: Deeper greens/reds (#0d4a2f, #a01e1e), black text
- **Focus Indicators**: 2px green outlines with offset
- **Semantic HTML**: Proper `<button>`, semantic markup
- **Keyboard Navigation**: Tab, Enter, Arrow keys work

### WCAG AA Compliance

- Color not sole indicator (icons + text)
- 48px+ touch targets
- 2px focus outlines
- Dark text on light backgrounds
- Large, readable question text (3xl-4xl)

---

## PWA & Offline

- **Manifest**: `public/manifest.json` (installable)
- **Service Worker**: `public/service-worker.js` (caching strategy)
- **Offline Support**: Works after first load
- **Icons**: 192x192, 512x512 (in `public/`)

Register service worker in your browser to enable offline.

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
│   │   ├── layout.tsx           # Root + meta + Italian flag accent
│   │   ├── page.tsx             # Landing
│   │   ├── host/page.tsx        # Host mode (main interface)
│   │   ├── api/
│   │   │   └── quiz/validate/route.ts
│   │   └── globals.css          # Italian flag colors
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── LandingPage.tsx
│   │   ├── YAMLEditor.tsx       # For custom quizzes
│   │   ├── Timer.tsx            # Small countdown timer
│   │   ├── QuizCard.tsx
│   │   └── cards/
│   │       ├── MultipleChoiceCard.tsx
│   │       └── ... (other card types available)
│   ├── lib/
│   │   ├── types.ts
│   │   ├── constants.ts         # Rome quiz hardcoded here
│   │   ├── utils.ts
│   │   └── yaml-parser.ts
│   └── store/
│       └── quiz.ts              # Zustand state management
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   └── round-assets/            # Quiz media (if needed)
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

## Troubleshooting

### High Contrast not applying

- Ensure data attribute: `[data-high-contrast="true"]`
- Check CSS variables are defined in `globals.css`

### Service Worker not caching

- Open DevTools → Application → Service Workers
- Verify "Offline" toggle; reload page
- Check `public/service-worker.js`

### Questions not displaying

- Ensure quiz is loaded (should auto-load on `/host`)
- Check browser console for errors
- Verify `EXAMPLE_QUIZ` in `src/lib/constants.ts` is valid YAML

---

## License

MIT – Enjoy! 🎉

---

**Symphony Solutions, Rome** – Built with ❤️ for teams.
