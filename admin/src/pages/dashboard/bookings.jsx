import React from "react";
import { useEffect, useState } from "react";

import { Button } from "@material-tailwind/react";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { debounce } from "lodash";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

import {
  archiveBooking,
  deleteBooking,
  getAllBookings,
} from "../../services/booking";
import { updateBookingStatus } from "../../services/booking";

export function Bookings() {
  const [bookingRes, setBookingRes] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const refresh = debounce(() => {
    getAllBookings().then(({ data }) => setBookingRes(data));
  }, 300);

  useEffect(() => {
    refresh();
  }, []);

  const handleChange = (val) => {
    setValue(val);
  };

  const handleArchive = (id) => {
    archiveBooking(id).then(() => refresh());
  };

  const handleDelete = (id) => {
    deleteBooking(id).then(() => refresh());
  };

  const handleOpen = () => setOpen(!open);

  const handleBookingBox = (id) => {
    const booking = bookingRes.find((booking) => booking._id === id);
    booking && setBookingId(booking._id);
    booking && setName(booking.name);
    booking && setEmail(booking.email);
    booking && setOpen(true);
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!name || !email || !description) {
      setIsEmpty(true);
      return;
    } else {
      const booking = {
        name,
        email,
        body: description,
        status: "Completed",
      };
      updateBookingStatus(bookingId, booking).then(() => refresh());
      setOpen(false);
      setDescription("");
      setName("");
      setEmail("");
    }
  };

  return (
    <div className="mt-6 mb-8 flex flex-col gap-12">
      <div className="w-[20rem]">
        <Tabs value={value ? value : "false"}>
          <TabsHeader>
            <Tab value="false" onClick={() => setValue(false)}>
              All
            </Tab>
            <Tab value="true" onClick={() => handleChange(true)}>
              Archived
            </Tab>
          </TabsHeader>
        </Tabs>
      </div>
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Booking Requests
          </Typography>
        </CardHeader>
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Name", "Tour", "status", "date", "budget", "", ""].map(
                (el) => (
                  <th
                    key={el + Math.random()}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {bookingRes &&
              bookingRes
                .filter((booking) => booking.archived === value)
                .map(({ _id, name, email, tourId, date, status, budget }) => {
                  const className = `py-3 px-5`;
                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {tourId.tourName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status === "Completed" ? "green" : "blue-gray"}
                          value={status}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date.slice(0, 10)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {budget > 0 ? budget : "-"}
                        </Typography>
                      </td>
                      {value ? null : (
                        <td className={className}>
                          <button
                            className="text-xs font-semibold text-blue-gray-600 hover:text-green-500"
                            onClick={() => {
                              handleBookingBox(_id);
                            }}
                          >
                            Send Quatation
                          </button>
                        </td>
                      )}
                      <td className={className}>
                        <button
                          onClick={() => {
                            value ? handleDelete(_id) : handleArchive(_id);
                          }}
                          className=" text-xs font-semibold text-red-600 hover:underline"
                        >
                          {value ? "delete" : "archive"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </Card>

      <Dialog open={open} handler={handleOpen}>
        <form className="w-full" onSubmit={handleBooking}>
          <div className="flex items-center justify-between">
            <DialogHeader>Send a Quatation</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
          </div>
          <DialogBody divider>
            <div className="grid w-full gap-6">
              <Textarea
                value={description}
                error={isEmpty && description === ""}
                onChange={(e) => setDescription(e.target.value)}
                className=""
                label="Quatation"
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button type="submit" variant="gradient" color="blue">
              Send
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

export default Bookings;
