/** Shared shape of one career chapter, rendered by CareerIndex. */

export type CareerLink = {
  label: string;
  href: string;
};

export type CareerScope = {
  label: string;
  detail: string;
};

export type CareerEntry = {
  key: string;
  label: string;
  period: string;
  periodLabel: string;
  role: string;
  org: string;
  orgHref?: string;
  status: string;
  outcome: string;
  body: React.ReactNode;
  stack?: string[];
  scope: CareerScope[];
  links?: CareerLink[];
  shot?: string;
  shotAlt?: string;
  shotHref?: string;
  shotCaption?: string;
  shotFit?: "cover" | "contain";
  flagship?: boolean;
};
