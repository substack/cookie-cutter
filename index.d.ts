// Type definitions for cookie-cutter
// Project: cookie-cutter
// Definitions by: Yansel Gonzalez Tejeda
declare namespace cookieCutter {
    interface CookieOptions {
        expires?: Date;
        path?: string;
        domain?: string;
        secure?: string;
    }

    interface cookieCutter {
        set(key: string, value: string|number|null, opts?: CookieOptions): void;
        get(key: string): string|undefined;
    }
}

declare let cookieCutter: cookieCutter.cookieCutter;
export = cookieCutter;
