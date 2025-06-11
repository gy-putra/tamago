"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Edit2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { deleteShoes, updateShoes } from "@/lib/action/shoes.action";
import { toast } from "sonner";
import UpdateShoes from "./UpdateShoes";

const ListShoes = ({ shoes }: { shoes: any }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  console.log(shoes);

  let no = 1;

  const handleDeleteShoes = async (id: string) => {
    setIsDeleting(true);
    setOpen(true);

    try {
      const result = await deleteShoes(id);

      if (result.success) {
        toast.success("Sepatu berhasil dihapus");
      }
    } catch (error) {
      console.log(error);
      toast.error("Sepatu gagal dihapus");
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">LIST SEPATU</h3>
        <Link
          href="/admin/add-shoes"
          className="flex items-center gap-1 border px-4 py-2 rounded-full"
        >
          <Plus size={15} /> Tambah Sepatu
        </Link>
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Gambar</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Stok</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        {shoes.map((shoe: any) => (
          <TableBody key={shoe.id}>
            <TableRow>
              <TableCell className="font-medium">{no++}</TableCell>
              <TableCell>
                <img
                  src={shoe.image}
                  alt="shoes"
                  className="w-[75px] h-[75px] object-cover rounded-md"
                />
              </TableCell>
              <TableCell>{shoe.name}</TableCell>
              <TableCell>Rp. {shoe.price.toLocaleString("id-ID")}</TableCell>
              <TableCell>{shoe.stock}</TableCell>
              <TableCell>{shoe.description.slice(0, 20)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Sheet>
                    <SheetTrigger>
                      <Edit2
                        size={15}
                        className="text-green-500 cursor-pointer"
                      />
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Update Sepatu</SheetTitle>
                        <SheetDescription>
                          Edit sepatu di bawah ini
                        </SheetDescription>
                      </SheetHeader>
                      <UpdateShoes shoe={shoe} />
                    </SheetContent>
                  </Sheet>

                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger>
                      <Trash2
                        size={15}
                        className="text-red-500 cursor-pointer"
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Sepatu ini akan dihapus di database dan tidak dapat di
                          kembalikan
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteShoes(shoe.id)}
                        >
                          {isDeleting ? "Menghapus..." : "Hapus"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default ListShoes;
