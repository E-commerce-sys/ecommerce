import Button from "../../../components/Button";
import { useLoaderData } from "react-router-dom";
import TableDemo from "./TableDemo";
function Catagories() {
  const data = useLoaderData();

  console.log("LOADER DATA:", data); // 👈 you wanted to see it
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">Categories</p>
          <p className="text-sm text-gray-500">
            Manage your product categories here
          </p>
        </div>
        <Button size="sm">Add +</Button>
      </div>
      <div className="w-full">
        <TableDemo categories={data.data} />
      </div>
    </div>
  );
}

export default Catagories;
