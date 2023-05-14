import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationCrosshairs,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function BookingCard({ book }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/users/id/${book.creatorUserId}`)
      .then(async (res) => {
        console.log("user: ", res.data);
        setUser(res.data);
      })
      .catch(console.log);
  }, []);
  return (
    <Box
      borderColor={colorMode == "light" ? "#000000" : "#ffffff"}
      style={{
        borderWidth: 3,
        borderRadius: 20,
        padding: 25,
        marginRight: 80,
        marginLeft: 20,
        marginBottom: 20,
        cursor: "pointer",
      }}
      onClick={() => {
        navigate("/booking", { state: book });
      }}
      onMouseOver={(e) => {
        // e.target.style.background = "red";
      }}
    >
      <HStack>
        <FontAwesomeIcon icon={faLocationDot} />
        <Text
          style={{
            //   overflowX: "hidden",
            marginRight: 20,
            fontWeight: "900",
          }}
        >
          source:
        </Text>
        <Text
          style={{
            overflowX: "hidden",
          }}
        >
          {book.source}
        </Text>
      </HStack>

      <HStack mt={5}>
        <FontAwesomeIcon icon={faLocationCrosshairs} />
        <Text
          style={{
            //   overflowX: "hidden",
            marginRight: 20,
            fontWeight: "900",
          }}
        >
          destination:
        </Text>
        <Text
          style={{
            overflowX: "hidden",
          }}
        >
          {book.destination}
        </Text>
      </HStack>
      <HStack mt={5}>
        <FontAwesomeIcon icon={faClock} />
        <Text
          style={{
            //   overflowX: "hidden",
            marginRight: 20,
            fontWeight: "900",
          }}
        >
          Preference Window:
        </Text>
        <Text
          style={{
            overflowX: "hidden",
          }}
        >
          {`${new Date(book.startTime).toLocaleTimeString()} to ${new Date(
            book.endTime
          ).toLocaleTimeString()}`}
        </Text>
      </HStack>
      <HStack mt={5}>
        <FontAwesomeIcon icon={faUser} />
        <Text
          style={{
            //   overflowX: "hidden",
            marginRight: 20,
            fontWeight: "900",
          }}
        >
          :
        </Text>
        <Text
          style={{
            overflowX: "hidden",
          }}
        >
          {user ? `${user.firstName} ${user.lastName}` : ""}
        </Text>
      </HStack>
    </Box>
  );
}

export default BookingCard;
