import { Link } from "react-router";
import { Paths } from "../constants/paths.ts";

function Home() {
  return (
    <>
      <h1 className="text-center w-full">Home</h1>
      <div className="flex justify-center p-4">
        <Link className="" to={Paths.SandboxMode}>
          <div className="p-4 bg-red-300 w-fit">
            Rozpocznij grę! (tryb swobodny)
          </div>
        </Link>
      </div>
    </>
  );
}

export default Home;
