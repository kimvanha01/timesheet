import { createTheme } from "@mui/material";
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
    textWhite: {
      main: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    textWhite: {
      main: string;
    };
  }
}
const defaultTheme = {
  status: {
    danger: "#e53e3e",
  },
  textWhite: {
    main: "#fff",
  },
  palette: {
    primary: {
      main: "#009688",
    },
  },
  typography: {
    fontSize: 14,
    h6: {
      fontSize: "16px",
      "@media (min-width:600px)": {
        fontSize: "16px",
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

const theme = {
  default: createTheme({ ...defaultTheme }),
};

export default theme;
