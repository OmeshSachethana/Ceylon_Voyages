import React from "react";
import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { debounce } from "lodash";

import { getAllUsers } from "../../services/user";
import axios from "axios";

function Users() {
  const [userRes, setUserRes] = useState("");
  console.log("userRes", userRes)
  const refresh = debounce(() => {
    // getAllUsers().then(({ data }) => setUserRes(data));
    axios
      .get(`http://localhost:4000/api/users/`)
      .then((res) => {
        setUserRes(res.data)
      })
  }, 300);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            User List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Username",
                  "First Name",
                  "Last Name",
                  "Date of Birth",
                  "Active",
                  "Mobile",
                  "Gender",
                  "",
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
              {userRes &&
                userRes.map(
                  ({
                    _id,
                    username,
                    first_name,
                    last_name,
                    dob,
                    mobile,
                    gender,
                    active,
                  }) => {
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
                                {username}
                              </Typography>
                              {/* <Typography className="text-xs font-normal text-blue-gray-500">
                                {first_name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {last_name}
                              </Typography> */}
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {first_name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {last_name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {dob}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={active === true ? "green" : "red"}
                            value={active}
                            className="py-0.5 px-2 text-[11px] font-medium"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {mobile}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {gender}
                          </Typography>
                        </td>
                        {/* <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            mark as complete
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

export default Users;
