"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateShoes } from "@/lib/action/shoes.action";
import { uploadFiles } from "@/utils/uploadthing";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const UpdateShoes = ({ shoe }: { shoe: any }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formValues, setFormValues] = useState({
    name: shoe.name || "",
    price: shoe.price || 0,
    stock: shoe.stock || 0,
    description: shoe.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = shoe.image;

      if (file) {
        const res = await uploadFiles("imageUploader", {
          files: [file],
        });

        const url = res[0]?.ufsUrl;
        if (!url) throw new Error("Failed to upload image");

        imageUrl = url;
      }

      const result = await updateShoes(shoe.id, {
        ...formValues,
        image: imageUrl,
      });

      if (result.success) {
        toast.success("Sepatu berhasil diperbarui");
        router.refresh();
      } else {
        throw new Error("Gagal update");
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui sepatu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 p-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="image">Gambar</Label>
        <Input
          type="file"
          accept="image/*"
          name="image"
          className="cursor-pointer"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Nama Sepatu</Label>
        <Input
          name="name"
          value={formValues.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="price">Harga Sepatu</Label>
        <Input
          name="price"
          type="number"
          value={formValues.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="stock">Stok Sepatu</Label>
        <Input
          name="stock"
          type="number"
          value={formValues.stock}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="flex justify-center items-center bg-indigo-500 px-4 py-2 rounded-full cursor-pointer text-white text-center disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Update Sepatu"}
      </button>
    </form>
  );
};

export default UpdateShoes;
