import React from "react";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { StateProvider } from "../../StateProvider";

const ProfileOptions = () => {
  return (
    <Menu>
      <MenuButton
        // as={Button}
        // rounded={"full"}
        variant={"ghost"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          src={
            "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
          }
        />
      </MenuButton>
      <MenuList>
        <MenuItem>My Account</MenuItem>
        <MenuItem>My Bookings</MenuItem>
        <MenuDivider />
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileOptions;
