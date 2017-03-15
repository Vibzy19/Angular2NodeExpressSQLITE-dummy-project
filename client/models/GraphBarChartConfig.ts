export interface GraphBarChartConfig { 
  settings: { fill: string, interpolation: string };
  dataset: {timestamp:number, value:number, category:string }
}