import Banner from "@/components/banner";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <div className="mt-4 sm:mt-8">
      <Banner />
      <Welcome />
    </div>
  );
}
