import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            background: string;
            surface: string;
            text: string;
            textSecondary: string;
            primary: string;
            secondary: string;
            success: string;
            danger: string;
            warning: string;
            info: string;
            border: string;
            hover: string;
            shadow: string;
        };
    }
}
