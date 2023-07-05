import React from "react";
import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { debounce } from "lodash";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

import StarRating from "./starRating";

import { getAllReviews } from "../../services/reviews";

export function Reviews() {
  const [reviewRes, setReviewRes] = useState("");

  const refresh = debounce(() => {
    getAllReviews().then(({ data }) => setReviewRes(data));
  }, 300);

  useEffect(() => {
    refresh();
  }, []);

  const [value, setValue] = useState("");

  const handleChange = (val) => {
    setValue(val);
  };

  return (
    <div className="mt-6 mb-8 flex flex-col gap-12">
      <div className="w-[20rem]">
        <Tabs value={value}>
          <TabsHeader>
            <Tab value="" onClick={() => setValue("")}>
              All
            </Tab>
            <Tab value="tour" onClick={() => handleChange("tour")}>
              Tours
            </Tab>
            <Tab value="hotel" onClick={() => handleChange("hotel")}>
              Hotels/Restaurants
            </Tab>
          </TabsHeader>
        </Tabs>
      </div>
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Reviews
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Name",
                  "Tour",
                  "Hotel/ Restaurant",
                  "Text",
                  "Date",
                  "rating",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reviewRes &&
                reviewRes.map(
                  ({ _id, user, tour, item, date, text, rating }) => {
                    const className = `py-3 px-5`;
                    let displayData;

                    if (value === "tour") {
                      if (tour) {
                        displayData = tour.tourName;
                      } else {
                        // Skip rendering if the tour data is not available
                        return null;
                      }
                    } else if (value === "hotel") {
                      if (item) {
                        displayData = item.itemName;
                      } else {
                        // Skip rendering if the item data is not available
                        return null;
                      }
                    } else {
                      displayData = "";
                    }
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
                                {user}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className} style={{ width: "300px" }}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {tour && tour.tourName && tour.tourName}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {item && item.itemName && item.itemName}
                          </Typography>
                        </td>
                        <td className={className} style={{ width: "300px" }}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {text}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {date.slice(0, 10)}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            <StarRating rating={rating} />
                          </Typography>
                        </td>
                        {/* <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-600 hover:underline"
                          >
                            Reply
                          </Typography>
                        </td> */}
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Reviews;
