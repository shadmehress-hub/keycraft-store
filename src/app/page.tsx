import { name } from "next/dist/server/ci-info";

export default function Home() {
  const renderName = (name: string) => {
    console.log("test");
    const name2 = "ali";
    return <span>{name2}</span>;
  };
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>my first page</div>
      {renderName("ali")}
    </div>
  );
}
