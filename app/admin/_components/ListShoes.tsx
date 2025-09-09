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
import { toast } from "sonner";
import UpdateShoes from "./UpdateShoes";
import { formatCurrency } from "@/lib/formatCurrency";
import { useRouter } from "next/navigation";

const ListShoes = ({ shoes }: { shoes: any }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  let no = 1;

  const handleDeleteShoes = async (id: string) => {
    setIsDeleting(true);
    setDeletingId(id);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Sepatu berhasil dihapus");
        // Refresh the page to update the product list
        router.refresh();
      } else {
        toast.error(data.error || "Gagal menghapus sepatu");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Terjadi kesalahan saat menghapus sepatu");
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ADMIN DASHBOARD</h3>
        <div className="flex gap-2">
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 border px-4 py-2 rounded-full bg-blue-500 text-white"
          >
            View Orders
          </Link>
          <Link
            href="/admin/reviews"
            className="flex items-center gap-1 border px-4 py-2 rounded-full bg-purple-500 text-white"
          >
            Manage Reviews
          </Link>
          <Link
            href="/admin/add-shoes"
            className="flex items-center gap-1 border px-4 py-2 rounded-full"
          >
            <Plus size={15} /> Add Shoes
          </Link>
        </div>
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
              <TableCell>{formatCurrency(shoe.price)}</TableCell>
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

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="flex items-center justify-center">
                        <Trash2
                          size={15}
                          className="text-red-500 cursor-pointer hover:text-red-700"
                        />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Sepatu "{shoe.name}" akan dihapus dari database dan tidak dapat dikembalikan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteShoes(shoe.id)}
                          disabled={isDeleting && deletingId === shoe.id}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {isDeleting && deletingId === shoe.id ? "Menghapus..." : "Hapus"}
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
