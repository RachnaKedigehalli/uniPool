import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import BookingCard from "./BookingCard";

function BookingList({ bookings, booking }) {
  const [bookingList, setBookingList] = useState(bookings);
  const [isLoading, setIsLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const add_booking = async () => {
    setIsLoading(true);
    await axios
      .post("/api/bookings/", booking)
      .then(async (res) => {
        console.log("booking: ", res.data);
        setIsLoading(false);
        setBookingList([...bookings, res.data]);
      })
      .catch(console.log);
  };
  return (
    <>
      <Box h={"90vh"} paddingY={20} overflowY={"auto"}>
        {bookingList.length == 0 ? (
          <>
            <Text>
              No bookings found that match your requirements. Create a new
              booking?
            </Text>
            <Button isLoading={isLoading} onClick={() => add_booking()}>
              Add booking
            </Button>
          </>
        ) : (
          <>
            {bookingList.map((book, index) => {
              return <BookingCard book={book} key={index} />;
            })}
          </>
        )}
      </Box>
    </>
  );
}

export default BookingList;
