import MemeDisplay from '@frontend/components/MemeDisplay';

const Home = () => {
  return (
    <main className="max-w-[1200px] mx-auto">
      <MemeDisplay
        background={{
          src: '/disaster-girl.jpg',
          width: 1200,
          height: 900,
          alt: 'Disaster Girl',
        }}
      />
    </main>
  );
};
export default Home;
