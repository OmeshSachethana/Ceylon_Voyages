import React from "react";
import { useEffect, useState } from "react";

import { debounce } from "lodash";

import {
  getAllTours,
  deleteTour,
  createTour,
  updateTour,
} from "../../services/tours";

import { ToursCard } from "@/components/widgets/cards";
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

export function Tours() {
  const [toursRes, setToursRes] = useState("");

  const [tourName, setTourName] = useState("");
  const [tourType, setTourType] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);

  const [tourNameUpdate, setTourNameUpdate] = useState("");
  const [tourTypeUpdate, setTourTypeUpdate] = useState("");
  const [descriptionUpdate, setDescriptionUpdate] = useState("");
  const [durationUpdate, setDurationUpdate] = useState("");

  const [isEmpty, setIsEmpty] = useState(false);
  const [isEmptyUpdate, setIsEmptyUpdate] = useState(false);

  const refresh = debounce(() => {
    getAllTours().then(({ data }) => setToursRes(data));
  }, 300);

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = (id) => {
    deleteTour(id)
      .then(() => {
        refresh();
        // alert("Tour deleted successfully");
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
      tourName.trim() === "" ||
      tourType.trim() === "" ||
      description.trim() === "" ||
      duration.trim() === ""
    ) {
      // do

      alert("Please fill all fields");

      setIsEmpty(true);
      console.log(isEmpty);
      return;
    } else {
      const formData = new FormData();
      formData.append("tourName", tourName);
      formData.append("tourType", tourType);
      formData.append("description", description);
      formData.append("duration", duration);
      formData.append("image", image);

      await createTour(formData)
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
      setTourName("");
      setTourType("");
      setDescription("");
      setDuration("");
    }
  };

  const [updateId, setUpdateId] = useState("");

  const handleUpdateBox = async (id) => {
    const tour = toursRes.find((tour) => tour._id === id);

    tour && setUpdateId(tour._id);
    tour && setTourNameUpdate(tour.tourName);
    tour && setTourTypeUpdate(tour.tourType);
    tour && setDescriptionUpdate(tour.description);
    tour && setDurationUpdate(tour.duration);
    tour && setOpen2(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      tourName: tourNameUpdate,
      tourType: tourTypeUpdate,
      description: descriptionUpdate,
      duration: durationUpdate,
    };

    if (
      tourNameUpdate.trim() === "" ||
      tourTypeUpdate.trim() === "" ||
      descriptionUpdate.trim() === "" ||
      durationUpdate.trim() === ""
    ) {
      setIsEmptyUpdate(true);
      return;
    } else {
      await updateTour(updateId, data)
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
      setTourNameUpdate("");
      setTourTypeUpdate("");
      setDescriptionUpdate("");
      setDurationUpdate("");
    }
  };

  const [value, setValue] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const tours =
    toursRes &&
    toursRes
      .filter((tour) => !value || tour.tourType === value)
      .map((props) => (
        <ToursCard
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
              <Tab value="cultural" onClick={() => handleChange("cultural")}>
                Cultural
              </Tab>
              <Tab value="adventure" onClick={() => handleChange("adventure")}>
                Adventure
              </Tab>
              <Tab value="beach" onClick={() => handleChange("beach")}>
                Beach
              </Tab>
              <Tab value="camping" onClick={() => handleChange("camping")}>
                Camping
              </Tab>
            </TabsHeader>
          </Tabs>
        </div>
        <div className="mr-5 flex items-center">
          <Button className="bg-blue-700" onClick={handleOpen}>
            ADD NEW TOUR
          </Button>
        </div>
      </div>
      <div className="mb-6 mt-14 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {tours}
      </div>

      <Dialog open={open} handler={handleOpen}>
        <form className="w-full">
          <div className="flex items-center justify-between">
            <DialogHeader>Add New Tour</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
          </div>
          <DialogBody divider>
            <div className="grid w-full gap-6">
              <Input
                error={isEmpty && tourName === ""}
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
                label="Name of the Tour"
              />
              <Select
                label="Select Tour Type"
                error={isEmpty && tourType === ""}
                value={tourType}
                onChange={(e) => setTourType(e.target ? e.target.value : e)}
              >
                <Option value="cultural">Cultural</Option>
                <Option value="adventure">Adventure</Option>
                <Option value="wildlife">Wildlife</Option>
                <Option value="camping">Camping</Option>
                <Option value="beach">Beach</Option>
              </Select>
              <Textarea
                value={description}
                error={isEmpty && description === ""}
                onChange={(e) => setDescription(e.target.value)}
                className=""
                label="Description"
              />
              <Input
                value={duration}
                error={isEmpty && duration === ""}
                onChange={(e) => setDuration(e.target.value)}
                type="number"
                label="Duration"
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
                  } bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] focus:outline-none`}
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
            <DialogHeader>Update Tour</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen2} />
          </div>
          <DialogBody divider>
            <div className="grid w-full gap-6">
              <Input
                error={isEmptyUpdate && tourNameUpdate === ""}
                value={tourNameUpdate}
                onChange={(e) => setTourNameUpdate(e.target.value)}
                label="Name of the Tour"
              />
              <Select
                label="Select Tour Type"
                error={isEmptyUpdate && tourTypeUpdate === ""}
                value={tourTypeUpdate}
                onChange={(e) =>
                  setTourTypeUpdate(e.target ? e.target.value : e)
                }
              >
                <Option value="cultural">Cultural</Option>
                <Option value="adventure">Adventure</Option>
                <Option value="wildlife">Wildlife</Option>
                <Option value="camping">Camping</Option>
                <Option value="beach">Beach</Option>
              </Select>
              <Textarea
                value={descriptionUpdate}
                error={isEmptyUpdate && descriptionUpdate === ""}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
                className=""
                label="Description"
              />
              <Input
                value={durationUpdate}
                error={isEmptyUpdate && durationUpdate === ""}
                onChange={(e) => setDurationUpdate(e.target.value)}
                type="number"
                label="Duration"
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

export default Tours;
