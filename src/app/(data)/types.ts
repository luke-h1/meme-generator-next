export interface Background {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface TextBlock extends Omit<Background, 'src' | 'alt'> {
  id: string;
  top: number;
  left: number;
  text: string;
  size: number;
  outlineColor: string;
  fontSize: number;
  color: string;
}

export interface MemeTemplate {
  id: string;
  background: Background;
  textBlocks: TextBlock[];
}
