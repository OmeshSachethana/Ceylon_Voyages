import React from "react";
import { useEffect, useState } from "react";

import { debounce } from "lodash";

import {
  getAllItems,
  deleteItem,
  createItem,
  updateItem,
} from "../../services/items";

import { ItemsCard } from "@/components/widgets/cards";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export function Items() {
  const [itemsRes, setItemRes] = useState("");

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const [itemNameUpdate, setItemNameUpdate] = useState("");
  const [categoryUpdate, setCategoryUpdate] = useState("");
  const [descriptionUpdate, setDescriptionUpdate] = useState("");
  const [cuisineUpdate, setCuisineUpdate] = useState("");
  const [priceUpdate, setPriceUpdate] = useState("");
  const [locationUpdate, setLocationUpdate] = useState("");

  const [isEmpty, setIsEmpty] = useState(false);
  const [isEmptyUpdate, setIsEmptyUpdate] = useState(false);

  const refresh = debounce(() => {
    getAllItems().then(({ data }) => setItemRes(data));
  }, 300);

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = (id) => {
    deleteItem(id)
      .then(() => {
        refresh();
        // alert("Item deleted successfully");
      })
      .catch((err) => {
        // alert("Something went wrong. Please try again later");
      });
  };

  const handleFileSelect = (e) => {
    setImage(e.target.files[0]);
  };

  // handle form box
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      itemName.trim() === "" ||
      category.trim() === "" ||
      description.trim() === "" ||
      location.trim() === ""
    ) {
      // do

      alert("Please fill all fields");

      setIsEmpty(true);
      console.log(isEmpty);
      return;
    } else {
      const formData = new FormData();
      formData.append("itemName", itemName);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("cuisine", cuisine);
      formData.append("price", price);
      formData.append("location", location);
      formData.append("image", image);

      await createItem(formData)
        .then((res) => {
          if (res) {
            //do
            refresh();
          } else {
            //do
          }
        })
        .catch((err) => {
          //dp
        });

      setOpen(false);
      setItemName("");
      setCategory("");
      setDescription("");
      setCuisine("");
      setPrice("");
      setLocation("");
    }
  };

  const [updateId, setUpdateId] = useState("");

  const handleUpdateBox = async (id) => {
    const tour = itemsRes.find((tour) => tour._id === id);

    tour && setUpdateId(tour._id);
    tour && setItemNameUpdate(tour.itemName);
    tour && setCategoryUpdate(tour.category);
    tour && setDescriptionUpdate(tour.description);
    tour && setCuisineUpdate(tour.cuisine);
    tour && setPriceUpdate(tour.price);
    tour && setLocationUpdate(tour.location);
    tour && setOpen2(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      itemName: itemNameUpdate,
      category: categoryUpdate,
      description: descriptionUpdate,
      cuisine: cuisineUpdate,
      price: priceUpdate,
      location: locationUpdate,
    };

    if (
      itemNameUpdate.trim() === "" ||
      categoryUpdate.trim() === "" ||
      descriptionUpdate.trim() === "" ||
      cuisineUpdate.trim() === ""||
      priceUpdate.trim() === ""||
      locationUpdate.trim() === ""
    ) {
      setIsEmptyUpdate(true);
      return;
    } else {
      await updateItem(updateId, data)
        .then((res) => {
          if (res) {
            //do
            refresh();
          } else {
            //do
          }
        })
        .catch((err) => {
          //dp
        });

      setOpen2(false);
      setItemNameUpdate("");
      setCategoryUpdate("");
      setDescriptionUpdate("");
      setCuisineUpdate("");
      setPriceUpdate("");
      setLocationUpdate("");
    }
  };

  const [value, setValue] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const items =
    itemsRes &&
    itemsRes
      .filter((tour) => !value || tour.category === value)
      .map((props) => (
        <ItemsCard
          key={props._id}
          {...props}
          handleDelete={handleDelete}
          handleUpdate={handleUpdateBox}
        />
      ));

  return (
    <div className="mt-12">
      <div className="mb-10 flex items-center justify-between gap-6">
        <div className="w-[40rem]">
          <Tabs value={value}>
            <TabsHeader>
              <Tab value="" onClick={() => setValue("")}>
                All
              </Tab>
              <Tab value="hotel" onClick={() => handleChange("hotel")}>
                Hotels
              </Tab>
              <Tab value="restaurant" onClick={() => handleChange("restaurant")}>
                Restaurants
              </Tab>
            </TabsHeader>
          </Tabs>
        </div>
        <div className="mr-5 flex items-center">
          <Button className="bg-blue-700" onClick={handleOpen}>
            ADD NEW HOTEL/ RESTAURANT
          </Button>
        </div>
      </div>
      <div className="mb-6 mt-14 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {items}
      </div>

      <Dialog open={open} handler={handleOpen}>
        <form className="w-full">
          <div className="flex items-center justify-between">
            <DialogHeader>Add New Hotel/ Restaurant</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
          </div>
          <DialogBody divider>
            <div className="grid w-full gap-6">
              <Input
                error={isEmpty && itemName === ""}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                label="Name of the Hotel/ Restaurant"
              />
              <Select
                label="Select Category"
                error={isEmpty && category === ""}
                value={category}
                onChange={(e) => setCategory(e.target ? e.target.value : e)}
              >
                <Option value="hotel">Hotel</Option>
                <Option value="restaurant">Restaurant</Option>
              </Select>
              <Textarea
                value={description}
                error={isEmpty && description === ""}
                onChange={(e) => setDescription(e.target.value)}
                className=""
                label="Description"
              />
              <Input
                value={cuisine}
                error={isEmpty && cuisine === ""}
                onChange={(e) => setCuisine(e.target.value)}
                label="Cuisine"
              />
              <Input
                value={price}
                error={isEmpty && price === ""}
                onChange={(e) => setPrice(e.target.value)}
                label="Price"
              />
              <Input
                value={location}
                error={isEmpty && location === ""}
                onChange={(e) => setLocation(e.target.value)}
                label="Location"
              />
              <div>
                <label
                  htmlFor="formFile"
                  className="text-neutral-700 dark:text-neutral-200 mb-2 inline-block"
                >
                  Upload Image
                </label>
                <input
                  className={`border-neutral-300 text-neutral-700 file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary relative m-0 block w-full min-w-0 flex-auto rounded border border-solid ${
                    isEmpty && image === null ? "border-red-500" : ""
                  } bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition cuisine-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:transition file:cuisine-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] focus:outline-none`}
                  type="file"
                  required
                  onChange={handleFileSelect}
                  accept="image/*"
                  id="formFile"
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              type="submit"
              variant="gradient"
              color="blue"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              submit
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      <Dialog open={open2} handler={handleOpen2}>
        <form className="w-full">
          <div className="flex items-center justify-between">
            <DialogHeader>Update Hotel/ Restaurant</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen2} />
          </div>
          <DialogBody divider>
            <div className="grid w-full gap-6">
              <Input
                error={isEmptyUpdate && itemNameUpdate === ""}
                value={itemNameUpdate}
                onChange={(e) => setItemNameUpdate(e.target.value)}
                label="Name of the Hotel/ Restaurant"
              />
              <Select
                label="Select category"
                error={isEmptyUpdate && categoryUpdate === ""}
                value={categoryUpdate}
                onChange={(e) =>
                  setCategoryUpdate(e.target ? e.target.value : e)
                }
              >
                <Option value="hotel">Hotel</Option>
                <Option value="restaurant">Restaurant</Option>
              </Select>
              <Textarea
                value={descriptionUpdate}
                error={isEmptyUpdate && descriptionUpdate === ""}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
                className=""
                label="Description"
              />
              <Input
                value={cuisineUpdate}
                error={isEmptyUpdate && cuisineUpdate === ""}
                onChange={(e) => setCuisineUpdate(e.target.value)}
                label="Cuisine"
              />
              <Input
                value={priceUpdate}
                error={isEmptyUpdate && priceUpdate === ""}
                onChange={(e) => setPriceUpdate(e.target.value)}
                label="Price"
              />
              <Input
                value={locationUpdate}
                error={isEmptyUpdate && locationUpdate === ""}
                onChange={(e) => setLocationUpdate(e.target.value)}
                label="Location"
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              type="submit"
              variant="gradient"
              color="blue"
              onClick={(e) => {
                handleUpdate(e);
              }}
            >
              submit
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

export default Items;
