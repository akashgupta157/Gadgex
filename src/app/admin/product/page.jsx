"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadCloudinary } from "@/utils/misc";
import axios from "axios";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
export default function page() {
  return (
    <div className="border max-h-[90svh] w-[80svw] p-4">
      <AddNewProduct />
      <ProductList />
    </div>
  );
}
const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "OnePlus",
  "Oppo",
  "Vivo",
  "Realme",
  "Motorola",
  "LG",
  "Nokia",
  "Sony",
  "Toshiba",
  "MI",
  "Asus",
  "Lenovo",
  "Huawei",
  "HP",
  "Google",
  "Dell",
  "Redmi",
  "Honor",
  "Acer",
  "Haier",
  "Whirlpool",
];
const AddNewProduct = () => {
  const [openPop, setOpenPop] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleSave = async () => {
    if (
      !product.name ||
      !product.brand ||
      !product.description ||
      !product.price ||
      !product.category ||
      !images.length
    ) {
      alert("Please fill all fields");
      return;
    }

    const uploadedImages = [];
    for (let i = 0; i < images.length; i++) {
      const { url } = await uploadCloudinary(images[i]);
      uploadedImages.push(url);
    }
    await axios.post("/api/product", { ...product, image: uploadedImages });
    handleReset();
    window.location.reload();
  };

  const handleReset = () => {
    setProduct({
      name: "",
      brand: "",
      description: "",
      price: "",
      category: "",
    });
    setImages([]);
    setImagePreviews([]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prev) => [...prev, ...droppedFiles]);

    const previews = droppedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prev) => [...prev, ...selectedFiles]);

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <>
      <Sheet onOpenChange={(open) => !open && handleReset()}>
        <SheetTrigger className="w-full flex justify-end">
          <h1 className="bg-zinc-900 text-zinc-50 rounded px-4 py-2">
            Add New Product
          </h1>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle className="text-2xl mb-3">Add New Product</SheetTitle>
          <div className="p-1 max-h-[89svh] h-[89svh] overflow-y-scroll hide-scrollbar flex flex-col justify-between">
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <Popover open={openPop} onOpenChange={setOpenPop}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setOpenPop(true)}
                  >
                    {product.brand || "Select Brand"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Search brand..." />
                    <CommandList>
                      {brands.sort().map((brand) => (
                        <CommandItem
                          key={brand}
                          onSelect={(currentValue) => {
                            setProduct({ ...product, brand: currentValue });
                            setOpenPop(false);
                          }}
                        >
                          {brand}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Textarea
                placeholder="Product Description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Product Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
              <Select
                onValueChange={(value) =>
                  setProduct({ ...product, category: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Product Category" />
                </SelectTrigger>
                <SelectContent value={product.category}>
                  <SelectItem value="television">Television</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="washing_machine">
                    Washing Machine
                  </SelectItem>
                  <SelectItem value="refrigerator">Refrigerator</SelectItem>
                  <SelectItem value="air_purifier">Air Purifier</SelectItem>
                  <SelectItem value="headphone">Headphone</SelectItem>
                  <SelectItem value="watch">Watch</SelectItem>
                  <SelectItem value="air_conditioner">
                    Air Conditioner
                  </SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                </SelectContent>
              </Select>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-dashed border-2 p-4 text-center cursor-pointer"
              >
                <p>Drag and drop images here, or click to select files</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4 sticky bottom-0">
              <Button onClick={handleSave}>Add Product</Button>
              <SheetClose className="border border-zinc-900 bg-white rounded px-4 py-1">
                Cancel
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
const ProductList = () => {
  const [data, setData] = useState([]);
  async function getData() {
    const { data } = await axios.get("/api/product");
    setData(data.products);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <h1>Product List</h1>
      <div className="max-h-[75svh] overflow-y-scroll space-y-10 hide-scrollbar">
        {data.map((product) => (
          <div key={product._id} className="border p-4">
            <h2>{product.name}</h2>
            <p>{product.brand}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <div className="flex">
              {product.image.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
