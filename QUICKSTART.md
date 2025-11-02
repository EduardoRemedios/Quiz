# Quick Start – 2 Minutes to Playing

## Step 1: Install & Run (1 min)

```bash
cd quiz
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Step 2: Host a Quiz (30 sec)

1. Click **"Host Quiz"** on the landing page
2. The Rome quiz loads automatically
3. Room code is generated (e.g., `A1B2`)
4. Copy the room code or shareable link
5. Click **"Start Session"** when ready

**That's it!** The quiz is pre-loaded - no configuration needed.

---

## Step 3: Get Players to Join (30 sec)

### Mobile Players

**On each player's phone:**
1. Visit the app URL (localhost:3000 or your Vercel URL)
2. Click **"Join with Code"**
3. Enter the 4-character room code (e.g., `A1B2`)
4. Enter your name
5. **Create or join a team:**
   - First player: Create a team (e.g., "Team Alpha")
   - Other players: Join existing team OR create new team
6. Wait for host to start

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

## Current Quiz: "Roamin' in Rome"

The app comes with a pre-loaded Rome quiz:

- **4 Rounds** × 5 minutes each = 20 minutes total
- **20 Questions** - All about Rome (ancient history, landmarks, food, modern culture)
- **210 Points** possible (10 pts/question, 15 pts for bonus questions)

Perfect for a pub quiz night! No setup needed - just click "Host Quiz" and start.

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
| Players can't see teams | They need to create a team first - click "Create Team" and enter a name |
| Players can't join | Ensure you're on same WiFi (or use Vercel URL) |
| No sound | Click 🔊 button on host bar to enable |
| Mobile layout broken | Open Chrome DevTools, refresh page |
| Build fails | Run `npm install` again, then `npm run build` |
| Quiz not loading | Clear browser cache and localStorage, refresh page |

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
