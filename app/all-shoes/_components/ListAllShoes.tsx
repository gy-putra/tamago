import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const ListAllShoes = ({ shoes }: { shoes: any }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
      {shoes.map((shoe: any) => (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{shoe.name}</CardTitle>
              <CardAction>
                <Link
                  href={`/shoes/${shoe.id}`}
                  className="border text-sm px-3 py-1 rounded-full bg-indigo-500 text-white"
                >
                  Lihat
                </Link>
              </CardAction>
            </div>
          </CardHeader>
          <CardContent>
            <Image
              src={shoe.image}
              alt={shoe.name}
              width={300}
              height={300}
              className="rounded-md w-full"
            />
          </CardContent>
          <CardFooter className="text-muted-foreground">
            Rp. {shoe.price.toLocaleString("id-ID")}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ListAllShoes;
