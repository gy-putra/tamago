import { CaraouselHero } from "./_components/CaraouselHero";
import CollectionProduct from "./_components/CollectionProduct";
import FeatureProduct from "./_components/FeatureProduct";

const RootLayout = () => {
  return (
    <main className="px-4 md:px-16 ">
      <section>
        <CaraouselHero />
      </section>
      <section>
        <FeatureProduct />
      </section>
      <section>
        <CollectionProduct />
      </section>
    </main>
  );
};

export default RootLayout;
