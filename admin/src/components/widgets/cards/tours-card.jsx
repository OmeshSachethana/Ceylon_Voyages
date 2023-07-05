import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

import React from "react";

export function ToursCard({
  _id,
  tourName,
  tourType,
  description,
  duration,
  imagePath,
  handleDelete,
  handleUpdate,
}) {
  return (
    <Card>
      <CardHeader color={"gray"}>
        <img
          src={imagePath}
          alt="img-blur-shadow"
          className="h-52 w-full select-none object-cover object-center"
          layout="fill"
        />
      </CardHeader>
      <CardBody className="h-[12rem] px-6 pt-6 pb-4">
        <Typography
          variant="small"
          color="blue-gray"
          className=" font-semibold"
        >
          {tourType} | {duration} {duration == 1 ? "day" : "days"}
        </Typography>
        <Typography variant="h6" color="blue-gray">
          {tourName}
        </Typography>
        <Typography
          variant="small"
          className="pt-1 font-normal text-blue-gray-600"
        >
          {description.slice(0, 150) + "..."}
        </Typography>
      </CardBody>

      <CardFooter className="border-blue-green-50 border-t px-6 py-5">
        <button
          value={_id}
          onClick={(e) => {
            handleUpdate(e.target.value);
          }}
          className="mr-5 text-blue-600"
        >
          Upgrade
        </button>
        <button
          value={_id}
          onClick={(e) => {
            handleDelete(e.target.value);
          }}
          className="text-red-600"
        >
          Delete
        </button>
      </CardFooter>
    </Card>
  );
}

ToursCard.defaultProps = {
  color: "blue",
  footer: null,
};

ToursCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

ToursCard.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default ToursCard;
