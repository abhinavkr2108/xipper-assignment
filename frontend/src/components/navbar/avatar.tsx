import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "lucide-react";

export default function UserAvatar() {
  return (
    <Avatar>
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
}
