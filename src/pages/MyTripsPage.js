import { Box, VStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import axios from "axios";
import BookingCard from "../components/BookingCard";

function MyTripsPage(props) {
  const [state, dispatch] = useStateValue();
  const [bookings, setBookings] = useState([]);
  const getUserBookings = async () => {
    await axios
      .get(`/api/bookings/user/${state.user.userId}`)
      .then((res) => {
        console.log(res.data);
        setBookings(res.data);
      })
      .catch(console.log);
  };

  useEffect(() => {
    getUserBookings();
  }, []);

  return (
    <>
      <VStack>
        <Text as="b" fontSize="27" mb="7" mt="5">
          My Trips
        </Text>
        <Box w={"50vw"}>
          {bookings.length == 0 ? (
            <></>
          ) : (
            <>
              {bookings.map((book, index) => {
                return <BookingCard book={book} key={index} />;
              })}
            </>
          )}
        </Box>
      </VStack>
    </>
  );
}

export default MyTripsPage;
