import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddPlayerForm() {
  return (
    <div className="w-full h-screen ">
      <div className="w-full bg-blue-400 p-4">
        <h1 className="text-2xl font-bold text-black">Add Player</h1>
      </div>
      <div className="p-4">
        <form className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">Id</label>
            <Input type="text" placeholder="AB102" className="mt-1 w-full" />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Name</label>
            <Input type="text" placeholder="Abcbdnmd" className="mt-1 w-full" />av
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Phone Number</label>
            <Input type="text" placeholder="123-215-2590" className="mt-1 w-full" />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <Input type="password" placeholder="xcfdsl2@3#" className="mt-1 w-full" />
          </div>
          <div className="flex items-center">
            <label className="block text-lg font-medium text-gray-700 mr-4">Referral Code</label>
            <Input type="text" placeholder="xcfdsl2@3#" className="mt-1 w-full" />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="bg-blue-400 px-6 py-2 text-lg font-bold text-black">Add Player</Button>
          </div>
        </form>
      </div>
    </div>
  );
}