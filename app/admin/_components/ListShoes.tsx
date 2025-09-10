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
        <h2 className="text-sm font-semibold">Admin Panel</h2>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Link
            href="/admin/orders"
            className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="relative z-10">View Orders</span>
          </Link>
          <Link
            href="/admin/reviews"
            className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="relative z-10">Manage Reviews</span>
          </Link>
          <Link
            href="/admin/add-shoes"
            className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden border border-emerald-400/30"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Plus size={16} className="transition-transform group-hover:rotate-90 relative z-10" />
            <span className="relative z-10">Add Shoes</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
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
