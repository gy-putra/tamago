"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createShoes } from "@/lib/action/shoes.action";
import { uploadFiles } from "@/utils/uploadthing";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const CreateShoes = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);

  const handleChangeImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const values = Object.fromEntries(formData.entries());

      let imageUrl = image;

      if (file) {
        const res = await uploadFiles("imageUploader", {
          files: [file],
        });

        const url = res[0]?.ufsUrl;
        if (!url) throw new Error("Failed to upload image");

        imageUrl = url;
      }
      const data = await createShoes({
        values,
        image: imageUrl,
      });

      if (data.success) {
        toast.success("Sepatu berhasil ditambahkan");
      }
    } catch (error) {
      console.log(error);
      toast.error("Sepatu gagal ditambahkan");
    } finally {
      setIsLoading(false);
      router.push("/admin");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="image">Gambar</Label>
        <Input
          type="file"
          accept="image/*"
          name="image"
          placeholder="Nama Sepatu"
          className="cursor-pointer"
          required
          onChange={handleChangeImage}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Nama Sepatu</Label>
        <Input name="name" placeholder="Nama Sepatu" required />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="price">Harga Sepatu</Label>
        <Input name="price" type="number" placeholder="Harga Sepatu" required />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="stock">Stok</Label>
        <Input name="stock" type="number" placeholder="Stok" required />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="description">
          Deskripsi <span className="text-red-500">(Opsional)</span>
        </Label>
        <Textarea name="description" placeholder="Deskripsi" />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="flex justify-center items-center bg-indigo-500 px-4 py-2 rounded-full cursor-pointer text-white text-center disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="animate-spin text-center" />
        ) : (
          "Tambah Sepatu"
        )}
      </button>
    </form>
  );
};

export default CreateShoes;
