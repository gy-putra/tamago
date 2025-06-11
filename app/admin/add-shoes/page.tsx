import Link from "next/link";
import CreateShoes from "../_components/CreateShoes";
import { ArrowLeft } from "lucide-react";

const AddShoesPage = () => {
  return (
    <div className="md:px-16 px-4 py-10">
      <div className="flex flex-col gap-10">
        <h3 className="text-2xl text-center">TAMBAH SEPATU</h3>
        <CreateShoes />
        <Link href="/admin" className="flex items-center gap-1 underline">
          {" "}
          <ArrowLeft size={18} /> Kembali
        </Link>
      </div>
    </div>
  );
};

export default AddShoesPage;
