export interface PlatformData {
  linkedin: number;
  wechat: number;
  weibo: number;
  kanzhun: number;
}

export interface TableRow {
  rank: number;
  companyName: string;
  logo: string;
  ebmIndex: number;
  indexChange: string;
  influence: number;
  activity: number;
  interactivity: number;
  platformData: PlatformData;
  showPlatformData: boolean;
} 