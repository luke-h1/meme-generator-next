'use client';

import { Anton } from 'next/font/google';
import Image from 'next/image';
import { useElementSize } from 'usehooks-ts';
import { MemeTemplate } from '../(data)/types';

const anton = Anton({ subsets: ['latin'], weight: '400' });

type Props = MemeTemplate;

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
