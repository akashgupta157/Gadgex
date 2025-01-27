"use client";
import qs from "qs";
import axios from "axios";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { MoveRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { clearProducts, fetchProducts } from "@/redux/slices/productSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = useParams().category.slice(0, -1).split("%20").join("_");
  const [brandList, setBrandList] = useState([]);
  const [brandCount, setBrandCount] = useState(5);
  const { isDark } = useSelector((state) => state.theme);
  const [selected, setSelected] = useState({
    brands: searchParams.getAll("brand") || [],
    ratings: searchParams.getAll("rating") || [],
    minPrice: Number(searchParams.get("minPrice")) || "",
    maxPrice: Number(searchParams.get("maxPrice")) || "",
    sort: searchParams.get("sort") || "",
    minDiscount: Number(searchParams.get("minDiscount")) || "",
    maxDiscount: Number(searchParams.get("maxDiscount")) || "",
  });
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);

      if (Array.isArray(value)) {
        params.delete(name);
        value.forEach((val) => params.append(name, val));
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );
  const fetchBrandList = async () => {
    try {
      const {
        data: { brands },
      } = await axios.get(`/api/brand/${category}`);
      setBrandList(brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
  useEffect(() => {
    fetchBrandList();
  }, []);
  const handleFilter_Sort = debounce(() => {
    let params = {
      category,
    };
    selected.brands.length > 0 && (params.brand = selected.brands);
    selected.ratings.length > 0 && (params.rating = selected.ratings);
    selected.minPrice && (params.minPrice = selected.minPrice);
    selected.maxPrice && (params.maxPrice = selected.maxPrice);
    selected.sort && (params.sort = selected.sort);
    selected.minDiscount && (params.minDiscount = selected.minDiscount);
    selected.maxDiscount && (params.maxDiscount = selected.maxDiscount);
    dispatch(
      fetchProducts({
        params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      })
    );
  }, 300);
  useEffect(() => {
    dispatch(clearProducts());
    handleFilter_Sort();
  }, [searchParams]);
  const handleViewMore = () => {
    if (brandCount < brandList.length) {
      setBrandCount(brandList.length);
    } else {
      setBrandCount(5);
    }
  };
  const handleSortChange = (value) => {
    setSelected({ ...selected, sort: value });
    router.push(`${pathname}?${createQueryString("sort", value)}`);
  };
  const handleBrandChange = (brand) => {
    const updatedBrands = selected.brands.includes(brand)
      ? selected.brands.filter((b) => b !== brand)
      : [...selected.brands, brand];
    setSelected({ ...selected, brands: updatedBrands });
    router.push(`${pathname}?${createQueryString("brand", updatedBrands)}`);
  };
  const handleRatingChange = (rating) => {
    const updatedRatings = selected.ratings.includes(rating)
      ? selected.ratings.filter((r) => r !== rating)
      : [...selected.ratings, rating];
    setSelected({ ...selected, ratings: updatedRatings });
    router.push(`${pathname}?${createQueryString("rating", updatedRatings)}`);
  };
  const handlePriceChange = ({ name, value }) => {
    setSelected({ ...selected, [name]: Number(value) });
  };
  const handlePriceRangeFilter = () => {
    const { minPrice, maxPrice } = selected;
    if (!minPrice && !maxPrice) {
      alert("Please provide at least one price value.");
      return;
    }
    if (minPrice && maxPrice && minPrice > maxPrice) {
      alert("Minimum price should not exceed maximum price.");
      return;
    }
    const params = new URLSearchParams(searchParams);
    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  const handleDiscountRangeFilter = (minDiscount, maxDiscount) => {
    if (
      selected.minDiscount === minDiscount &&
      selected.maxDiscount === maxDiscount
    ) {
      setSelected({ ...selected, minDiscount: null, maxDiscount: null });
      const params = new URLSearchParams(searchParams);
      params.delete("minDiscount");
      params.delete("maxDiscount");
      router.push(`${pathname}?${params.toString()}`);
    } else {
      setSelected({ ...selected, minDiscount, maxDiscount });
      const params = new URLSearchParams(searchParams);
      params.set("minDiscount", minDiscount);
      params.set("maxDiscount", maxDiscount);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <>
      {brandList.length > 0 && (
        <div
          className={`hidden lg:block lg:w-[25%] lg:min-w-[25%] lg:pr-5 lg:space-y-5 ${
            isDark ? "text-zinc-50" : "text-zinc-950"
          }`}
        >
          <Select value={selected.sort} onValueChange={handleSortChange}>
            <SelectTrigger className={`${isDark && "bg-zinc-950"}`}>
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent className={`${isDark && "bg-zinc-950"}`}>
              <SelectGroup>
                <SelectItem
                  className={`${
                    isDark &&
                    "text-zinc-50 focus:bg-zinc-800/50 focus:text-zinc-50"
                  }`}
                  value="lth"
                >
                  Low to High
                </SelectItem>
                <SelectItem
                  className={`${
                    isDark &&
                    "text-zinc-50 focus:bg-zinc-800/50 focus:text-zinc-50"
                  }`}
                  value="htl"
                >
                  High to Low
                </SelectItem>
                <SelectItem
                  className={`${
                    isDark &&
                    "text-zinc-50 focus:bg-zinc-800/50 focus:text-zinc-50"
                  }`}
                  value="relevance"
                >
                  Relevance
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="space-y-4">
            <h1 className="font-semibold text-lg">Brands</h1>
            <div className="space-y-2">
              {brandList.slice(0, brandCount).map((brand, id) => (
                <div className="flex items-center gap-2" key={id}>
                  <Checkbox
                    id={`brand-${id}`}
                    className={`data-[state=checked]:bg-[#FFC501] data-[state=checked]:border-[#FFC501] ${
                      isDark && "border-white"
                    }`}
                    checked={selected.brands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <label htmlFor={`brand-${id}`}>{brand}</label>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center">
              {brandList.length > 5 && (
                <Button
                  onClick={handleViewMore}
                  className={`rounded-full bg-transparent border text-xs ${
                    isDark ? "text-zinc-50" : "text-zinc-950 hover:bg-zinc-100"
                  }`}
                >
                  {brandCount < brandList.length ? "View More" : "View Less"}
                </Button>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="font-semibold text-lg">Rating</h1>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating, id) => (
                <div className="flex items-center gap-2" key={id}>
                  <Checkbox
                    className={`data-[state=checked]:bg-[#FFC501] data-[state=checked]:border-[#FFC501] ${
                      isDark && "border-white"
                    }`}
                    checked={selected.ratings.includes(String(rating))}
                    onCheckedChange={() => handleRatingChange(String(rating))}
                  />
                  <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        color="#FFC501"
                        fill={index < rating ? "#FFC501" : "none"}
                        size={16}
                      />
                    ))}
                  </div>
                  <p className="text-sm">({rating})</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="font-semibold text-lg">Price Range</h1>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Min Price"
                type="number"
                value={selected.minPrice}
                onChange={(e) =>
                  handlePriceChange({
                    name: "minPrice",
                    value: e.target.value,
                  })
                }
                className={`border-0 ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
              />
              <Input
                placeholder="Max Price"
                type="number"
                value={selected.maxPrice}
                onChange={(e) =>
                  handlePriceChange({
                    name: "maxPrice",
                    value: e.target.value,
                  })
                }
                className={`border-0 ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
              />
              <Button
                className={`${
                  isDark ? "bg-zinc-800" : "bg-zinc-200 hover:bg-zinc-300"
                }`}
                onClick={handlePriceRangeFilter}
              >
                <MoveRight
                  className={`${isDark ? "text-zinc-50" : "text-zinc-950"}`}
                />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="font-semibold text-lg">Discount</h1>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="discount"
                  className={`data-[state=checked]:bg-[#FFC501] data-[state=checked]:border-[#FFC501] ${
                    isDark && "border-white"
                  }`}
                  checked={
                    selected.minDiscount === 10 && selected.maxDiscount === 15
                  }
                  onCheckedChange={() => {
                    handleDiscountRangeFilter(10, 15);
                  }}
                />
                <label htmlFor="discount">10% to 15%</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="discount"
                  className={`data-[state=checked]:bg-[#FFC501] data-[state=checked]:border-[#FFC501] ${
                    isDark && "border-white"
                  }`}
                  checked={
                    selected.minDiscount === 15 && selected.maxDiscount === 20
                  }
                  onCheckedChange={() => {
                    handleDiscountRangeFilter(15, 20);
                  }}
                />
                <label htmlFor="discount">15% to 20%</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="discount"
                  className={`data-[state=checked]:bg-[#FFC501] data-[state=checked]:border-[#FFC501] ${
                    isDark && "border-white"
                  }`}
                  checked={
                    selected.minDiscount === 20 && selected.maxDiscount === 25
                  }
                  onCheckedChange={() => {
                    handleDiscountRangeFilter(20, 25);
                  }}
                />
                <label htmlFor="discount">20% to 25%</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="discount"
                  className={`data-[state=checked]:bg-[#FFC501] data-[state=checked]:border-[#FFC501] ${
                    isDark && "border-white"
                  }`}
                  checked={
                    selected.minDiscount === 25 && selected.maxDiscount === 30
                  }
                  onCheckedChange={() => {
                    handleDiscountRangeFilter(25, 30);
                  }}
                />
                <label htmlFor="discount">25% to 30%</label>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="lg:hidden fixed left-0 bottom-0 w-full z-10 border-t">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className={`w-1/2 py-7 md:text-lg rounded-none border-r `}>
              Filter
            </Button>
          </DrawerTrigger>
          <DrawerContent
            className={`${
              isDark ? "bg-zinc-800 text-zinc-50" : "bg-zinc-50"
            } h-[60%] md:h-[40%]`}
          >
            <DrawerHeader className="flex justify-between items-center border-b">
              <DrawerTitle>Filter</DrawerTitle>
            </DrawerHeader>
            <Tabs defaultValue="brands" className="h-full flex">
              <TabsList
                className={`w-1/2 flex flex-col h-full justify-start p-5 space-y-5 ${
                  isDark && "bg-zinc-950 "
                }`}
              >
                <TabsTrigger
                  value="brands"
                  className={`w-full md:text-lg ${
                    isDark &&
                    "data-[state=active]:text-zinc-50 data-[state=active]:bg-zinc-700"
                  }`}
                >
                  Brands
                </TabsTrigger>
                <TabsTrigger
                  value="ratings"
                  className={`w-full md:text-lg ${
                    isDark &&
                    "data-[state=active]:text-zinc-50 data-[state=active]:bg-zinc-700"
                  }`}
                >
                  Ratings
                </TabsTrigger>
                <TabsTrigger
                  value="price"
                  className={`w-full md:text-lg ${
                    isDark &&
                    "data-[state=active]:text-zinc-50 data-[state=active]:bg-zinc-700"
                  }`}
                >
                  Price
                </TabsTrigger>
                <TabsTrigger
                  value="discount"
                  className={`w-full md:text-lg ${
                    isDark &&
                    "data-[state=active]:text-zinc-50 data-[state=active]:bg-zinc-700"
                  }`}
                >
                  Discount
                </TabsTrigger>
              </TabsList>
              <div className="w-1/2 px-5">
                <TabsContent value="brands">
                  <div className="space-y-4">
                    <h1
                      className={`font-semibold text-lg md:text-2xl ${
                        isDark && "text-zinc-50"
                      }`}
                    >
                      Brands
                    </h1>
                    <div className="space-y-2 h-[250px] md:h-[300px] overflow-y-scroll">
                      {brandList.map((brand, id) => (
                        <div className="flex items-center gap-2" key={id}>
                          <Checkbox
                            className={`data-[state=checked]:bg-[#FFC501] md:size-6 data-[state=checked]:border-[#FFC501] ${
                              isDark && "border-white"
                            }`}
                            checked={selected.brands.includes(brand)}
                            onCheckedChange={() => handleBrandChange(brand)}
                          />
                          <label
                            htmlFor={`brand-${id}`}
                            className={`${isDark && "text-zinc-50"}`}
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="ratings">
                  <div className="space-y-4">
                    <h1
                      className={`font-semibold text-lg md:text-2xl ${
                        isDark && "text-zinc-50"
                      }`}
                    >
                      Ratings
                    </h1>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating, id) => (
                        <div className="flex items-center gap-2" key={id}>
                          <Checkbox
                            className={`data-[state=checked]:bg-[#FFC501] md:size-6 data-[state=checked]:border-[#FFC501] ${
                              isDark && "border-white"
                            }`}
                            checked={selected.ratings.includes(String(rating))}
                            onCheckedChange={() =>
                              handleRatingChange(String(rating))
                            }
                          />
                          <div className="flex gap-1 items-center">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                color="#FFC501"
                                fill={index < rating ? "#FFC501" : "none"}
                                className="size-4 md:size-6"
                              />
                            ))}
                          </div>
                          <p
                            className={`text-sm md:text-base ${
                              isDark && "text-zinc-50"
                            }`}
                          >
                            ({rating})
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="price">
                  <div className="space-y-4">
                    <h1
                      className={`font-semibold text-lg md:text-2xl ${
                        isDark && "text-zinc-50"
                      }`}
                    >
                      Price Range
                    </h1>
                    <div className="space-y-3">
                      <Input
                        placeholder="Min Price"
                        type="number"
                        value={selected.minPrice}
                        onChange={(e) =>
                          handlePriceChange({
                            name: "minPrice",
                            value: e.target.value,
                          })
                        }
                        className={`border-0 md:text-lg ${
                          isDark
                            ? "bg-zinc-800 text-zinc-50 border"
                            : "bg-zinc-200"
                        }`}
                      />
                      <Input
                        placeholder="Max Price"
                        type="number"
                        value={selected.maxPrice}
                        onChange={(e) =>
                          handlePriceChange({
                            name: "maxPrice",
                            value: e.target.value,
                          })
                        }
                        className={`border-0 md:text-lg ${
                          isDark
                            ? "bg-zinc-800 text-zinc-50 border"
                            : "bg-zinc-200"
                        }`}
                      />
                      <Button
                        className={`w-full md:text-lg`}
                        onClick={handlePriceRangeFilter}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="discount">
                  <div className="space-y-4">
                    <h1 className="font-semibold text-lg">Discount</h1>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="discount"
                          className={`data-[state=checked]:bg-[#FFC501] md:size-6 data-[state=checked]:border-[#FFC501] ${
                            isDark && "border-white"
                          }`}
                          checked={
                            selected.minDiscount === 10 &&
                            selected.maxDiscount === 15
                          }
                          onCheckedChange={() => {
                            handleDiscountRangeFilter(10, 15);
                          }}
                        />
                        <label htmlFor="discount">10% to 15%</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="discount"
                          className={`data-[state=checked]:bg-[#FFC501] md:size-6 data-[state=checked]:border-[#FFC501] ${
                            isDark && "border-white"
                          }`}
                          checked={
                            selected.minDiscount === 15 &&
                            selected.maxDiscount === 20
                          }
                          onCheckedChange={() => {
                            handleDiscountRangeFilter(15, 20);
                          }}
                        />
                        <label htmlFor="discount">15% to 20%</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="discount"
                          className={`data-[state=checked]:bg-[#FFC501] md:size-6 data-[state=checked]:border-[#FFC501] ${
                            isDark && "border-white"
                          }`}
                          checked={
                            selected.minDiscount === 20 &&
                            selected.maxDiscount === 25
                          }
                          onCheckedChange={() => {
                            handleDiscountRangeFilter(20, 25);
                          }}
                        />
                        <label htmlFor="discount">20% to 25%</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="discount"
                          className={`data-[state=checked]:bg-[#FFC501] md:size-6 data-[state=checked]:border-[#FFC501] ${
                            isDark && "border-white"
                          }`}
                          checked={
                            selected.minDiscount === 25 &&
                            selected.maxDiscount === 30
                          }
                          onCheckedChange={() => {
                            handleDiscountRangeFilter(25, 30);
                          }}
                        />
                        <label htmlFor="discount">25% to 30%</label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className={`w-1/2 py-7 md:text-lg rounded-none`}>
              Sort
            </Button>
          </DrawerTrigger>
          <DrawerContent
            className={`${isDark ? "bg-zinc-800 text-zinc-50" : "bg-zinc-50"}`}
          >
            <DrawerHeader className="flex justify-between items-center border-b">
              <DrawerTitle>Sort By Price</DrawerTitle>
            </DrawerHeader>
            <div className="space-y-5 px-5 py-5">
              <p
                onClick={() => handleSortChange("lth")}
                className={`${
                  selected.sort === "lth" && "text-[#38B854] font-bold"
                }`}
              >
                Low to High
              </p>
              <p
                onClick={() => handleSortChange("htl")}
                className={`${
                  selected.sort === "htl" && "text-[#38B854] font-bold"
                }`}
              >
                High to Low
              </p>
              <p
                onClick={() => handleSortChange("relevance")}
                className={`${
                  selected.sort === "relevance" && "text-[#38B854] font-bold"
                }`}
              >
                Relevance
              </p>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
