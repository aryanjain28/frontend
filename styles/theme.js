import { createTheme } from "@mui/material";

export const palette = {
  primary: {
    main: "#1e2746",
    tint: "#64677f",
    light: "#afb0bd",
    white: "#FFFFFF",
    black: "#000000",
    border: "#ACABB3",
    error: "#f70000",
    success: "#188050",
    warning: "#f4891e",
  },
  secondary: {
    main: "#485d8c",
    tint: "#f8f8f8",
    light: "#dadedf",
  },
  neutral: {
    main: "#757575",
    tint: "#e9edf2",
  },
};

export const gradients = {
  gradient1: "linear-gradient(to right bottom, #6782B4, #B1BFD8)",
  gradient2: "linear-gradient(to right bottom, #28313B, #485461)",
  gradient3: "linear-gradient(to right bottom, #96A7CF, #E3EFE8)",
  gradient4: "linear-gradient(to right bottom, #C3CBDC, #EDF1F4)",
  gradient5: "linear-gradient(to right bottom, #7C98B3, #637081)",
  gradient6: "linear-gradient(to right bottom, #C9C6C6, #F1F2F6)",
  gradient7: "linear-gradient(to right bottom, #8693AB, #BDD4E7)",
};

export const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});

// export const theme = createTheme({
//   components: {
//     MuiCssBaseline: {
//       "@global": {
//         "*": {
//           "scrollbar-width": "thin",
//         },
//         "*::-webkit-scrollbar": {
//           width: "1px",
//           height: "4px",
//         },
//         // styleOverrides: {
//         //   body: {
//         //     scrollbarColor: "#6b6b6b #2b2b2b",
//         //     scrollbarWidth: "1px",
//         //     "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
//         //       backgroundColor: "#2b2b2b",
//         //       width: "0.4em",
//         //     },
//         //     "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
//         //       borderRadius: 8,
//         //       backgroundColor: "#6b6b6b",
//         //       border: "3px solid #2b2b2b",
//         //     },
//         //     "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
//         //       {
//         //         backgroundColor: "#959595",
//         //       },
//         //     "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
//         //       {
//         //         backgroundColor: "#959595",
//         //       },
//         //     "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
//         //       {
//         //         backgroundColor: "#959595",
//         //       },
//         //     "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
//         //       backgroundColor: "#2b2b2b",
//         //     },
//         //   },
//         // },
//       },
//     },
//   },
// });
