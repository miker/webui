export interface LayoutContainer {
  layout:string;
  align: string;
  gap:string;
}

export interface LayoutChild {
  flex: string;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  order?: string;
  offset?: string;
  align?: string;
  fill?: boolean;
}
