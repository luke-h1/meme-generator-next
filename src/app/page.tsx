import MemeDisplay from '@frontend/app/(components)/MemeDisplay';

const Home = async () => {
  const memeTemplates = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/meme-templates`,
  ).then(res => res.json());

  return (
    <main className="max-w-[1200px] mx-auto">
      <MemeDisplay {...memeTemplates[0]} />
    </main>
  );
};
export default Home;
