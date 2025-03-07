/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
  
  declare let dataLayer: any[];
  declare function gtag(...args: any[]): void;