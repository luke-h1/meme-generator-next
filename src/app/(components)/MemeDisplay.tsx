'use client';

import { Anton } from 'next/font/google';
import Image from 'next/image';
import { useElementSize } from 'usehooks-ts';

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
  const [memeRef, { width }] = useElementSize();

  const ratio = width / background.width;

  return (
    <div className="relative" ref={memeRef}>
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
              top: textBlock.top * ratio,
              left: textBlock.left * ratio,
              width: textBlock.width * ratio,
              height: textBlock.height * ratio,
            }}
          >
            <div
              className={`${anton.className} text-center text-white text-stroke-white`}
              style={{
                fontSize: textBlock.fontSize * ratio,
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
