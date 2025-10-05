import { useNavigate } from "react-router";
import { Paths } from "../constants/paths.ts";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-custom-yellow to-white">
      <div className="bg-gradient-to-b from-zus/30 to-transparent"></div>
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="animate-show">
          <h1 className="text-6xl md:text-8xl font-bold text-zus mb-6">
            <span className="text-black">Five</span>LifesRun
          </h1>
        </div>
        <p className="text-black mt-6 max-w-96 mx-auto flex items-center justify-center text-center">
          Learn about the impact of your lifestyle choices on your health,
          finances, happiness, and many other aspects of life.
        </p>

        <div className="flex flex-col gap-4 mt-24">
          <div
            className="cursor-pointer shadow-lg p-4 rounded-lg border-1 hover:scale-105 transition-transform duration-200 ease-in-out bg-white"
            onClick={() => {
              navigate(Paths.SandboxMode);
            }}
          >
            Sandbox Mode
          </div>
          <div className="relative shadow-lg p-4 rounded-lg border-1 hover:scale-105 transition-transform duration-200 ease-in-out bg-white">
            Challenges Mode
            <span className="absolute top-2 right-2 transform translate-x-6 bg-red-400 text-xs text-black px-2 py-0.5 rounded font-semibold italic pointer-events-none select-none">
              Coming Soon
            </span>
          </div>
          <div className="relative shadow-lg p-4 rounded-lg border-1 hover:scale-105 transition-transform duration-200 ease-in-out bg-white">
            Story Mode
            <span className="absolute top-2 right-2 transform translate-x-6 bg-red-400 text-xs text-black px-2 py-0.5 rounded font-semibold italic pointer-events-none select-none">
              Coming Soon
            </span>
          </div>
          {/* TODO: on click it navigates to the github repository README file */}
          <div
            className="cursor-pointer shadow-lg p-4 rounded-lg border-1 hover:scale-105 transition-transform duration-200 ease-in-out bg-zus/60"
            onClick={() => {}}
          >
            About the Game
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
