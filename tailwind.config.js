/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                rubik: ["Rubik", "sans-serif"],
            },
            colors: {
                White: "#ffffff",
                Black: "#303841",
                Gray: "#777777",
                Yellow: "#F6C90E",
                bgShoe: "rgb(225, 231, 237)",
            },
            keyframes: {
                wave: {
                    "0%": {
                        transform: "translateX(-50%) skew(0deg,-8deg)",
                    },

                    "100%": {
                        transform: "translateX(-30%) skew(8deg,-4deg)",
                    },
                },
            },
            animation: {
                "app-wave": "wave ease-in-out infinite alternate",
            },
        },
        screens: {
            'minimoblie': '400px',

            'tablet': '820px',
            // => @media (min-width: 640px) { ... }
      
          },
    },
    plugins: [],
};
