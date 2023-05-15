import MemeDisplay from '@frontend/app/(components)/MemeDisplay';
import MemeEditor from './(components)/MemeEditor';
import { Meme, MemeTemplate } from './(data)/types';

const Home = async () => {
  const memeTemplates = (await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/meme-templates`,
  ).then(res => res.json())) as MemeTemplate[];

  const memes = (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/memes`, {
    cache: 'no-cache',
  }).then(res => res.json())) as Meme[];

  return (
    <main className="max-w-[1200px] mx-auto">
      <MemeEditor templates={memeTemplates} />
      <h2 className="text-3xl font-bold mt-5 text-white">Memes</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
        {memes &&
          memes.map(meme => (
            <MemeDisplay
              key={meme.id}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              {...memeTemplates.find(t => t.id === meme.template)!}
              values={meme.values}
            />
          ))}
      </div>
    </main>
  );
};
export default Home;
