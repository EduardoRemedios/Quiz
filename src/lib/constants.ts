export const COLORS = {
  accentGreen: '#009246', // Vibrant Italian flag green
  accentRed: '#ce2b37', // Vibrant Italian flag red
  bg: '#fefefe',
  card: '#ffffff',
  text: '#1a1a1a',
  border: '#d4d4d4',
  disabled: '#c0c0b8',
  success: '#009246', // Use Italian green for success
  warning: '#ce2b37', // Use Italian red for warnings
};

export const DEFAULT_ROUND_DURATION = 30;
export const DEFAULT_WAGER_DURATION = 60;
export const DEFAULT_POINTS = 10;

export const TEAM_COLORS = [
  '#009246', // Italian green
  '#ce2b37', // Italian red
  '#2a9d6f', // Variant green
  '#c96969', // Variant red
  '#1a5f3f', // Dark green
  '#e67c6b', // Light red
];

export const EXAMPLE_QUIZ = `title: "Roamin' in Rome — 20-Minute Pub Quiz"
description: "Team challenge"
rounds:
  - id: round-1
    title: "Ancient Rome"
    duration: 300
    questions:
      - id: r1q1
        type: multiple_choice
        question: "Construction of the Colosseum began under which emperor?"
        options:
          - "Vespasian"
          - "Titus"
          - "Hadrian"
          - "Nero"
        correctAnswer: 0
        explanation: "Vespasian commissioned it; Titus inaugurated it in 80 CE."
        points: 10
      - id: r1q2
        type: multiple_choice
        question: "Which road was the great ancient highway linking Rome to southern Italy?"
        options:
          - "Via Flaminia"
          - "Via Appia"
          - "Via Salaria"
          - "Via Aurelia"
        correctAnswer: 1
        explanation: "The Via Appia (Appian Way) connected Rome toward Brindisi."
        points: 10
      - id: r1q3
        type: multiple_choice
        question: "Which of these is NOT one of the traditional Seven Hills of Rome?"
        options:
          - "Palatine"
          - "Capitoline"
          - "Aventine"
          - "Vatican"
        correctAnswer: 3
        explanation: "The Vatican Hill lies across the Tiber and isn't among the seven."
        points: 10
      - id: r1q4
        type: multiple_choice
        question: "What type of structure is the Pantheon most famous for?"
        options:
          - "Brick dome with oculus"
          - "Marble spire"
          - "Granite pyramid"
          - "Timber truss roof"
        correctAnswer: 0
        explanation: "Its unreinforced concrete brick dome with an oculus is iconic."
        points: 10
      - id: r1q5
        type: multiple_choice
        question: "Who crossed the Rubicon, setting off a civil war?"
        options:
          - "Julius Caesar"
          - "Augustus"
          - "Pompey"
          - "Marcus Aurelius"
        correctAnswer: 0
        explanation: "Julius Caesar's crossing in 49 BCE made 'alea iacta est' famous."
        points: 15
  - id: round-2
    title: "Landmarks & City Layout"
    duration: 300
    questions:
      - id: r2q1
        type: multiple_choice
        question: "Which fountain is the traditional spot to toss a coin to 'return to Rome'?"
        options:
          - "Trevi Fountain"
          - "Fountain of the Four Rivers"
          - "Turtle Fountain"
          - "Barcaccia Fountain"
        correctAnswer: 0
        explanation: "The Trevi coin toss tradition is world-famous."
        points: 10
      - id: r2q2
        type: multiple_choice
        question: "Which piazza is dominated by Bernini's Fountain of the Four Rivers?"
        options:
          - "Piazza Navona"
          - "Piazza di Spagna"
          - "Piazza del Popolo"
          - "Piazza Venezia"
        correctAnswer: 0
        explanation: "Piazza Navona centers on Bernini's dramatic river gods."
        points: 10
      - id: r2q3
        type: multiple_choice
        question: "The Spanish Steps connect Piazza di Spagna to which church?"
        options:
          - "Trinità dei Monti"
          - "Sant'Ignazio di Loyola"
          - "Santa Maria in Aracoeli"
          - "Sant'Andrea della Valle"
        correctAnswer: 0
        explanation: "They climb up to the church of Trinità dei Monti."
        points: 10
      - id: r2q4
        type: multiple_choice
        question: "Which ancient stadium's footprint gives Piazza Navona its long oval shape?"
        options:
          - "Stadium of Domitian"
          - "Circus Maximus"
          - "Theatre of Marcellus"
          - "Ludus Magnus"
        correctAnswer: 0
        explanation: "Piazza Navona sits atop the Stadium of Domitian."
        points: 10
      - id: r2q5
        type: multiple_choice
        question: "Which basilica houses Michelangelo's Pietà?"
        options:
          - "St. Peter's Basilica"
          - "San Giovanni in Laterano"
          - "Santa Maria Maggiore"
          - "San Paolo fuori le Mura"
        correctAnswer: 0
        explanation: "Michelangelo's Pietà is displayed in St. Peter's."
        points: 15
  - id: round-3
    title: "Food, Drink & Daily Life"
    duration: 300
    questions:
      - id: r3q1
        type: multiple_choice
        question: "Which dish is a classic of Rome's 'quattro piatti' pastas?"
        options:
          - "Cacio e Pepe"
          - "Pesto alla Genovese"
          - "Bolognese"
          - "Pasta al Pesto Trapanese"
        correctAnswer: 0
        explanation: "Rome's big four: Cacio e Pepe, Carbonara, Amatriciana, Gricia."
        points: 10
      - id: r3q2
        type: multiple_choice
        question: "Traditional Roman carbonara is made WITHOUT which ingredient?"
        options:
          - "Cream"
          - "Guanciale"
          - "Eggs"
          - "Pecorino Romano"
        correctAnswer: 0
        explanation: "No cream in the classic; it's eggs, Pecorino, and guanciale."
        points: 10
      - id: r3q3
        type: multiple_choice
        question: "Which Roman street food is a filled, fried rice ball?"
        options:
          - "Supplì"
          - "Arancino"
          - "Panzerotto"
          - "Trapizzino"
        correctAnswer: 0
        explanation: "Supplì are Roman; arancini are more Sicilian."
        points: 10
      - id: r3q4
        type: multiple_choice
        question: "'Campo de' Fiori' translates most closely to what?"
        options:
          - "Field of Flowers"
          - "Square of Fountains"
          - "Market of Fruits"
          - "Garden of Statues"
        correctAnswer: 0
        explanation: "It literally means 'Field of Flowers,' now a lively market square."
        points: 10
      - id: r3q5
        type: multiple_choice
        question: "Where would you find the 'Bocca della Verità' (Mouth of Truth)?"
        options:
          - "Santa Maria in Cosmedin"
          - "San Clemente"
          - "Santa Maria sopra Minerva"
          - "Sant'Andrea al Quirinale"
        correctAnswer: 0
        explanation: "It's set in the portico of Santa Maria in Cosmedin."
        points: 15
  - id: round-4
    title: "Modern Rome, Pop Culture & Sport"
    duration: 300
    questions:
      - id: r4q1
        type: multiple_choice
        question: "Which two clubs contest the Derby della Capitale?"
        options:
          - "AS Roma & SS Lazio"
          - "AS Roma & Juventus"
          - "SS Lazio & Napoli"
          - "AS Roma & AC Milan"
        correctAnswer: 0
        explanation: "Rome's fiery derby is Roma vs. Lazio."
        points: 10
      - id: r4q2
        type: multiple_choice
        question: "In 'La Dolce Vita,' Anita Ekberg famously wades into which fountain?"
        options:
          - "Trevi Fountain"
          - "Fountain of the Naiads"
          - "Barcaccia Fountain"
          - "Triton Fountain"
        correctAnswer: 0
        explanation: "Fellini's classic etched Trevi's midnight scene into film history."
        points: 10
      - id: r4q3
        type: multiple_choice
        question: "Which monumental street leads from Piazza Venezia toward the Colosseum?"
        options:
          - "Via dei Fori Imperiali"
          - "Via del Corso"
          - "Via Veneto"
          - "Via Giulia"
        correctAnswer: 0
        explanation: "Via dei Fori Imperiali cuts past the Imperial Forums."
        points: 10
      - id: r4q4
        type: multiple_choice
        question: "Which park contains remnants of ancient aqueducts and is popular for cycling?"
        options:
          - "Parco degli Acquedotti"
          - "Villa Borghese"
          - "Villa Ada"
          - "Appia Antica Caffarella Park"
        correctAnswer: 0
        explanation: "Parco degli Acquedotti showcases soaring aqueduct arches."
        points: 10
      - id: r4q5
        type: multiple_choice
        question: "Which airport is Rome's main international hub?"
        options:
          - "Leonardo da Vinci–Fiumicino (FCO)"
          - "Ciampino (CIA)"
          - "Urbe (QPA)"
          - "Pratica di Mare (LIRE)"
        correctAnswer: 0
        explanation: "Fiumicino (FCO) is the principal international airport."
        points: 15
  - id: round-5
    title: \"Bonus Round: Gambling Industry\"
    duration: 300
    questions:
      - id: r5q1
        type: multiple_choice
        question: \"What does RTP stand for in online casino games?\"
        options:
          - \"Return to Player\"
          - \"Real-Time Processing\"
          - \"Random Transaction Protocol\"
          - \"Revenue Target Percentage\"
        correctAnswer: 0
        explanation: \"RTP (Return to Player) is the percentage of wagered money a slot or casino game will pay back to players over time.\"
        points: 20
      - id: r5q2
        type: multiple_choice
        question: \"In sports betting, what does 'EV' typically stand for?\"
        options:
          - \"Expected Value\"
          - \"Enhanced Verification\"
          - \"Event Variance\"
          - \"Exchange Volume\"
        correctAnswer: 0
        explanation: \"Expected Value (EV) is a key concept in sports betting that calculates the average outcome of a bet over the long term.\"
        points: 20`;
