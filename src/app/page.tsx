import MemeDisplay from '@frontend/app/(components)/MemeDisplay';

const Home = () => {
  return (
    <main
      className="max-w-[1200px] mx-auto">
      <MemeDisplay
        background={{
          src: '/disaster-girl.jpg',
          width: 1200,
          height: 900,
          alt: 'Disaster Girl',
        }}
        textBlocks={[
          {
            id: 'saying',
            top: 750,
            left: 100,
            width: 1000,
            height: 100,
            fontSize: 100,
            color: 'white',
            text: 'Im gonna be rich',
          },
        ]}
      />
    </main>
  );
};
export default Home;
