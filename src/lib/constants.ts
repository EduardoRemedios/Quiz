export const COLORS = {
  accentGreen: '#1e7f4f',
  accentRed: '#d24848',
  bg: '#f7f7f5',
  card: '#ffffff',
  text: '#0f1210',
  border: '#e0e0dd',
  disabled: '#c0c0b8',
  success: '#2a9d6f',
  warning: '#c96969',
};

export const DEFAULT_ROUND_DURATION = 30;
export const DEFAULT_WAGER_DURATION = 60;
export const DEFAULT_POINTS = 10;

export const TEAM_COLORS = [
  '#1e7f4f',
  '#d24848',
  '#2a9d6f',
  '#c96969',
  '#1a5f3f',
  '#e67c6b',
];

export const EXAMPLE_QUIZ = `title: "Symphony Solutions Team Challenge"
description: "A quick 20-min team quiz for colleagues in Rome"
rounds:
  - id: round-1
    title: "Know Your Company"
    duration: 30
    questions:
      - id: q1
        type: multiple_choice
        question: "In what city was Symphony Solutions founded?"
        options:
          - "Milan"
          - "Rome"
          - "Venice"
        correctAnswer: 1
        explanation: "Symphony Solutions was founded in Rome!"
        points: 10
      - id: q2
        type: speed
        question: "How many employees does Symphony have?"
        options:
          - "Over 500"
        points: 20
  - id: round-2
    title: "Picture Round"
    duration: 45
    questions:
      - id: q3
        type: picture
        question: "Which city is this famous for?"
        image: "/round-assets/rome.jpg"
        options:
          - "Rome"
          - "Milan"
          - "Venice"
        correctAnswer: 0
        explanation: "The eternal city, Rome!"
        points: 15
  - id: round-3
    title: "Finale"
    duration: 60
    questions:
      - id: q4
        type: wager_final
        question: "What year did Symphony Solutions launch?"
        correctAnswer: "2015"
        explanation: "Symphony Solutions launched in 2015!"
        points: 50`;
