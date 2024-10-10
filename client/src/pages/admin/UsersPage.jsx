import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const getAllUsers = async () => {
    const res = await axios.get("http://localhost:3000/api/user/getall", {
      withCredentials: true,
    });
    console.log(res);
    setUsers(res.data.users);
    console.log(res.data.users);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUserHandler = async (e, user) => {
    e.preventDefault();
    console.log(user);
    const res = await axios.delete(
      `http://localhost:3000/api/user/delete/${user._id}`,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    if (res.data.success) {
      toast({
        title: "Пользователь был удален",
        description: "Пользователь был удален",
      });
      setUsers(users.filter((u) => u._id !== user._id));
      getAllUsers();
    }
  };
  const editUserHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(
        `http://localhost:3000/api/user/editfromadmin/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Почта</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Фото</TableHead>
            <TableHead>Редактировать</TableHead>
            <TableHead>Удалить</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={"http://localhost:3000" + user.image}
                    alt="@shadcn"
                  />
                  <AvatarFallback> {user.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <FaRegEdit
                  size={20}
                  className="hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    setShowEditDialog(true);
                    setSelectedUser(user);
                  }}
                />
              </TableCell>
              <TableCell>
                <MdDeleteOutline
                  className="hover:text-red-500 cursor-pointer"
                  onClick={(e) => setShowDeleteDialog(true)}
                  size={24}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удаление пользователя</DialogTitle>
            <DialogDescription className="mb-4">
              Вы уверены, что хотите удалить пользователя?
            </DialogDescription>
            <div className="flex gap-6 items-center justify-between mt-8">
              <Button
                variant="destructive"
                onClick={(e) => deleteUserHandler(e, user)}
              >
                ДА
              </Button>
              <Button onClick={() => setShowDeleteDialog(false)}>НЕТ</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование пользователя</DialogTitle>
            <DialogDescription className="mb-4"></DialogDescription>
            <div className="flex flex-col gap-4 items-center justify-between">
              <Label>Имя пользователя</Label>
              <Input
                defaultValue={selectedUser?.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <Label>Почта</Label>
              <Input
                defaultValue={selectedUser?.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Button
                className="w-full mt-4"
                onClick={(e) => editUserHandler(e)}
              >
                Сохранить
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
