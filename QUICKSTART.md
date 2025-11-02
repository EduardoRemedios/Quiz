# Quick Start – 5 Minutes to Playing

## Step 1: Install & Run (2 min)

```bash
cd quiz
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Step 2: Host a Quiz (2 min)

### Option A: Load Example
1. Click **"Load Example Quiz"**
2. It auto-loads and redirects to host mode

### Option B: Write Your Own YAML
1. Click **"Host a Quiz"**
2. Paste or write YAML (see format below)
3. Click **"Validate & Preview"** (should turn green)
4. Click **"Start Session"**

---

## Step 3: Get Players to Join (1 min)

### Mobile Players

**On each player's phone:**
1. Visit the room link (appears on host screen)
   - **Or**: Visit http://localhost:3000/join, enter room code
2. Enter name
3. Pick team
4. Wait for host to start

**On host screen:**
- Room code shown (4 chars like `A1B2`)
- Share link is clickable/copyable
- Scoreboard visible

---

## Step 4: Play! (Ongoing)

### Host Controls
- **Bottom bar buttons**:
  - ← Prev / Reveal / Next →
  - Play/Pause (Space key)
  - 🔊 Sound, A+ Text, ◐ Contrast, ⛶ Fullscreen

- **Keyboard shortcuts**:
  - `Space`: Play/Pause
  - `R`: Reveal Answer
  - `→`: Next Question
  - `←`: Previous Question

### Player Actions
1. **Buzz** when timer starts (big green button)
2. **Lock in answer** (tap option)
3. **See score** after reveal

---

## Quick YAML Template

```yaml
title: "My Awesome Quiz"
description: "Team challenge"
rounds:
  - id: round-1
    title: "Round 1"
    duration: 30
    questions:
      - id: q1
        type: multiple_choice
        question: "What is 2+2?"
        options:
          - "3"
          - "4"
          - "5"
        correctAnswer: 1
        explanation: "Correct!"
        points: 10
```

**Question Types:**
- `multiple_choice`: Options with single correct answer
- `picture`: Image + options
- `audio`: Audio file + options
- `speed`: Reaction time (fastest = highest score)
- `wager_final`: Bet your score on final question

---

## Testing Locally

### Mobile Emulation
1. Open Chrome DevTools (F12)
2. Click device icon (top-left)
3. Select iPhone or Android

### Multiple Browsers
- Host: http://localhost:3000/host
- Player 1: http://localhost:3000/join?room=TEST
- Player 2: Open same URL on another tab/phone

---

## Deploy to Vercel (30 sec)

```bash
npm i -g vercel
vercel
```

Follow prompts. Done! Your quiz is live.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| YAML error | Check indentation (2 spaces, no tabs) |
| Players can't join | Ensure you're on same WiFi (or use Vercel URL) |
| No sound | Click 🔊 button on host bar to enable |
| Mobile layout broken | Open Chrome DevTools, refresh page |
| Build fails | Run `npm install` again, then `npm run build` |

---

## Tips

- **One-hand reach**: Use sticky bottom bar on mobile
- **Projector**: Fullscreen host mode (⛶ button)
- **Accessibility**: Toggle A+ (large text) and ◐ (high contrast)
- **Offline**: Team Mode works without internet
- **Realtime** (optional): Set `NEXT_PUBLIC_REALTIME=vercel` env var

---

## Next: Deep Dive

- **Customization**: See README.md
- **Deployment**: See DEPLOY.md
- **Full Spec**: See IMPLEMENTATION_SUMMARY.md

---

**Ready to quiz? Have fun! 🎉**
