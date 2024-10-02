/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                "montserrat": ["Montserrat", "sans-serif"]
            },
            textColor: {
                "primary": "#2db4eb"
            },
            borderColor: {
                "primary": "#2db4eb"
            },
            backgroundColor: {
                "primary": "#2db4eb",
            },
            backgroundImage: {
                "panel": "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@headlessui/tailwindcss')({prefix: 'ui'})
    ],
}
