// CommonJS syntax for Tailwind when package.json has "type": "module"
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}", // keep in case you add pages/
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
