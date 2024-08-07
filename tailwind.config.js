/** @type {import('tailwindcss').Config} */
// import plugin from "tailwindcss/line-clamp";
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primarygray: "#f8f8f8",
        qblack: "#222222",
        qyellow: "#FFBB38",
        qred: "#EF262C",
        qgray: "#797979",
        qblacktext: "#1D1D1D",
        qgraytwo: "#8E8E8E",
        "custom-orange": "#F7941D",
        "qgray-border": "#EFEFEF",
        "qblue-white": "#CBECFF",
        "qh2-green": "#2D6F6D",
        "qh4-pink": "#FDB2BB",
        "qh5-bwhite": "#95D7DE",
        "qh3-blue": "#1868D5",
      },
      scale: {
        60: "0.6",
      },
      borderRadius: {
        1: "0.5rem",
        2: "0.7rem", // Add custom border-radius values here
        3: "1rem",
        4: "1.5rem",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["focus-within"],
      borderStyle: ["last"],
    },
  },
  // plugins: [plugin],
};
