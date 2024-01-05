"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TableCell } from "./ui/table";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { ArrowRight, Heart, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

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
import { buttonVariants } from "./ui/button";

export type Columns = {
  id: string;
  jpg: any;
  images: any;
  name: string;
  favorites: number;
  nicknames: string[];
  name_kanji: string;
  about: string;
  url: string;
};

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "() => {}",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.images.jpg.image_url}
          alt={row.original.images.jpg.image_url}
          className="h-20 w-20 rounded-full"
          height={80}
          width={80}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <TableCell className=" ">
          <p className="text-lg font-medium text-gray-900">
            {row.original.name} <span className=" font-extrabold">/</span>{" "}
            {row.original.name_kanji}
          </p>
          <div className="">
            {row.original.nicknames.map((nickname) => (
              <Badge
                key={nickname}
                className="rounded-md text-sm mt-5 border-2 mr-2"
                variant="outline"
              >
                {nickname}
              </Badge>
            ))}
          </div>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "favorites",
    header: "Favourite",
    cell: ({ row }) => {
      return (
        <TableCell>
          <p className="text-lg flex items-center justify-center gap-2 font-medium text-gray-900">
            <Heart size={32} strokeWidth={3} color="#ff0000" />
            {row.original.favorites}
          </p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "dqw",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="border-l-2 flex  border-gray-300 h-[80px]">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <ArrowRight
                className="text-purple-500 my-auto hover:text-purple-700 hover:scale-110 transition
            cursor-pointer ml-8"
                size={45}
                strokeWidth={3}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> */}
                <AlertDialogDescription>
                  <div className="flex gap-2">
                    <Image
                      src={row.original.images.jpg.image_url}
                      alt={row.original.images.jpg.image_url}
                      className="h-20 w-20 rounded-full"
                      height={80}
                      width={80}
                    />
                    <div className="">
                      <Link
                        href={row.original.url}
                        target="_blank"
                        className="flex gap-2 items-center"
                      >
                        <p className="text-3xl text-purple-600 font-bold">
                          {row.original.name}
                        </p>
                        <LinkIcon
                          className="text-purple-800 hover:scale-110"
                          strokeWidth={3}
                        />
                      </Link>
                      <p className="text-3xl text-gray-600">
                        {row.original.name_kanji}
                      </p>
                    </div>
                  </div>

                  {row.original.nicknames.map((nickname) => (
                    <Badge
                      key={nickname}
                      className="rounded-md text-sm mt-5 border-2 mr-2"
                      variant="outline"
                    >
                      {nickname}
                    </Badge>
                  ))}
                  <div className="mt-5">
                    <p>{row.original.about?.substring(0, 300)}</p>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({ variant: "purple" })}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
