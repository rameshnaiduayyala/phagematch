import ReusableTable from "../../components/ReusableTable";
import userService from "../../service/userService";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import RowActions from "../../components/RowActions";
import ModalComp from "../../components/ModalComp";
import { showConfirm } from "../../components/Confirm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone Number",
      accessorKey: "phone_number",
    },
    {
      header: "Organization",
      accessorKey: "affiliated_org_name",
    },
    {
      header: "Status",
      accessorKey: "is_approved",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            row.original.is_approved
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.is_approved ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <RowActions
          row={row}
          bgClass=" text-white"
          actions={[
            {
              label: "Edit",
              className: "bg-blue-600 text-white hover:bg-blue-700",
              onClick: () => toast.success("Event has been created."),
            },
            {
              label: "Delete",
              className: "bg-red-600 text-white hover:bg-red-700",
              onClick: (data) => console.log("Delete", data),
              show: (data) => data.is_approved,
            },
            {
              label: "Approve",
              className: "bg-purple-600 text-white hover:bg-purple-700",
              onClick: (data) => handleApprove(data.id, true),
              show: (data) => !data.is_approved,
            },
            {
              label: "Inactivate",
              className: "bg-yellow-600 text-white hover:bg-yellow-700",
              onClick: (data) => handleApprove(data.id, false),
              show: (data) => data.is_approved,
            },
          ]}
        />
      ),
    },
  ];

  const getAllUsers = async () => {
    try {
      const response = await userService.GetAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  async function handleApprove(userId, is_approved) {
    const confirmed = await showConfirm({
      title: is_approved ? "Approve User" : "Inactivate User",
      message: "Are you sure you want to confirm this?",
      okText: is_approved ? "Approve" : "Inactivate",
      cancelText: "Cancel",
      variant: "ok",
    });

    if (confirmed) {
      try {
        const response = await userService.ApproveUser(userId, is_approved);
        console.log("User approved:", response);
        getAllUsers();
      } catch (error) {
        console.error("Error approving user:", error);
      }
    } else {
      console.log("User canceled.");
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mt-4">
          <h2 className="text-xl font-medium mb-4 text-gray-900">User List</h2>
          <ReusableTable columns={columns} data={users} />
        </div>
      </div>
      <ModalComp
        open={open}
        onClose={() => setOpen(false)}
        size="lg"
        header={<h2 className="text-lg font-semibold">My Modal</h2>}
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        }
      >
        <p>This is fully customizable modal content. Put anything here!</p>
      </ModalComp>
    </>
  );
};

export default UserList;
