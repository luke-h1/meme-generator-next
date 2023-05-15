import { Anton } from 'next/font/google';
import Image from 'next/image';

const anton = Anton({ subsets: ['latin'], weight: '400' });

interface Props {
  background: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  textBlocks: {
    id: string;
    top: number;
    left: number;
    width: number;
    height: number;
    color: string;
    fontSize: number;
    text: string;
  }[];
}

const MemeDisplay = ({ background, textBlocks }: Props) => {
  return (
    <div className="relative">
      <Image
        src={background.src}
        width={background.width}
        height={background.height}
        alt={background.alt}
      />
      {textBlocks &&
        textBlocks.map(textBlock => (
          <div
            key={textBlock.id}
            className="absolute"
            style={{
              top: textBlock.top,
              left: textBlock.left,
              width: textBlock.width,
              height: textBlock.height,
            }}
          >
            <div
              className={`${anton.className} text-center text-white text-stroke-white`}
              style={{
                fontSize: textBlock.fontSize,
                lineHeight: '1.1',
              }}
            >
              {textBlock.text}
            </div>
          </div>
        ))}
    </div>
  );
};
export default MemeDisplay;
