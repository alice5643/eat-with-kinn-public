/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      General: ["General Sans", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      Macondo: ["Macondo", "cursive"],
      Kalam: ["Kalam", "cursive"],
    },
    fontSize: {
      // Body text styles from your typography system
      'body-xs': ['10px', { lineHeight: '1.4', fontWeight: '600' }],
      'body-sm': ['12px', { lineHeight: '1.4', fontWeight: '600' }],
      'body-md': ['14px', { lineHeight: '1.4', fontWeight: '600' }],
      'body-lg': ['16px', { lineHeight: '1.4', fontWeight: '600' }],
      'body-xl': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
      
      // Medium weight variations
      'body-xs-medium': ['10px', { lineHeight: '1.4', fontWeight: '500' }],
      'body-sm-medium': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
      'body-md-medium': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
      'body-lg-medium': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
      'body-xl-medium': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
      
      // Regular weight variations
      'body-xs-regular': ['10px', { lineHeight: '1.4', fontWeight: '400' }],
      'body-sm-regular': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      'body-md-regular': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
      'body-lg-regular': ['16px', { lineHeight: '1.4', fontWeight: '400' }],
      'body-xl-regular': ['18px', { lineHeight: '1.4', fontWeight: '400' }],
      
      // Keep existing sizes for compatibility
      ...defaultTheme.fontSize,
    },
    colors: {
      ...colors,
      transparent: "transparent",
      Mblack: "#171717",
      Myellow: "#FEC51C",
      MsoftYellow: "#FFF0DC",
      Mgray: "#525252",
      Mbg: "#151D38",
      // New brand colors
      Knavy: "#49507C",
      Kpink80: "#FDD6C9",
      Kpink40: "#FBEBE5",
      Kbeige: "#F0E1CE",
      Kmint: "#E8FFD5",
    },
    screens: {
      xxs: "375px",
      xx: "425px",
      ss: "480px",
      xs: "576px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
