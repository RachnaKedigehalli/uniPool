import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import LocationSearch from "./LocationSearch";
import "../styles/DatePicker.css";
import DatePicker from "./DatePicker.tsx";
import { useStateValue } from "../StateProvider";
import BookingList from "./BookingList";

function HomeSearch() {
  const [state, dispatch] = useStateValue();
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [userLocation, setUserLocation] = useState([]);
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const { colorMode, toggleColorMode } = useColorMode();
  const [bookings, setBookings] = useState();
  const [booking, setBooking] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const check_booking = async () => {
    setIsLoading(true);
    var start_string = `${date}T${startTime}:00`;
    var start_date = new Date(start_string);
    var end_string = `${date}T${endTime}:00`;
    var end_date = new Date(end_string);
    console.log("start time date object: ", start_date);
    console.log("end time date object: ", end_date);
    const check_booking_body = {
      creatorUserId: state.user.userId,
      source: source,
      destination: destination,
      setTime: new Date(date).toISOString(),
      startTime: start_date.toISOString(),
      endTime: end_date.toISOString(),
    };
    console.log("data from user form: ", check_booking_body);

    await axios
      .post("/api/bookings/search", check_booking_body)
      .then(async (res) => {
        console.log("bookings: ", res.data);
        setIsLoading(false);
        setBooking(check_booking_body);
        setBookings(res.data);
      })
      .catch(console.log);
  };
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    setUserLocation([crd.latitude, crd.longitude, crd.accuracy]);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(success);

            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, [navigator]);
  return (
    <>
      <HStack>
        <Stack
          style={{
            alignSelf: "left",
            width: "45%",
            padding: 100,
            marginLeft: 2,
          }}
        >
          <Text
            fontFamily={"navbar"}
            style={{
              fontWeight: "900",
              fontSize: 32,
            }}
          >
            Look for your trip
          </Text>
          <LocationSearch
            label={"Source location"}
            placeholder={"Enter source location"}
            setLoc={setSource}
            latitude={userLocation[0]}
            longitude={userLocation[1]}
            accuracy={userLocation[2]}
          />
          <LocationSearch
            label={"Destination location"}
            placeholder={"Enter destination location"}
            setLoc={setDestination}
            latitude={userLocation[0]}
            longitude={userLocation[1]}
            accuracy={userLocation[2]}
          />
          <Box
            style={{
              marginTop: 20,
            }}
          >
            <Text
              fontSize={"tags"}
              fontWeight={"500"}
              color={useColorModeValue("tagText.light", "tagText.dark")}
              ml={1}
              mt={3}
              mb={2}
            >
              Date of journey
            </Text>
            <Input
              borderRadius="input"
              placeholder="Select Date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></Input>
            <HStack alignItems={"flex-end"}>
              <VStack alignItems={"flex-start"}>
                <Text
                  fontSize={"tags"}
                  fontWeight={"500"}
                  color={useColorModeValue("tagText.light", "tagText.dark")}
                  mt={3}
                  ml={1}
                  mb={2}
                >
                  Starting of time
                </Text>
                <Input
                  borderRadius="input"
                  placeholder="Select Date and Time"
                  type="time"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                ></Input>
              </VStack>
              <VStack>
                <Text mb={2} px={5}>
                  to
                </Text>
              </VStack>
              <VStack alignItems={"flex-start"}>
                <Text
                  fontSize={"tags"}
                  fontWeight={"500"}
                  color={useColorModeValue("tagText.light", "tagText.dark")}
                  mt={3}
                  mb={2}
                  ml={1}
                >
                  End of window
                </Text>
                <Input
                  borderRadius="input"
                  placeholder="Select Date and Time"
                  type="time"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                ></Input>
              </VStack>
            </HStack>
          </Box>
          <Button
            onClick={() => {
              check_booking();
            }}
            bg={useColorModeValue("bg.dark", "bg.light")}
            color={useColorModeValue("bg.light", "bg.dark")}
            style={{
              transition: "1s",
              width: "100%",
              marginTop: 30,
            }}
            _hover={{
              color: useColorModeValue("bg.dark", "bg.light"),
              background: "accents.grad",
              transition: "1s",
            }}
            borderRadius={"button"}
            w="80%"
            isDisabled={!source || !destination}
            isLoading={isLoading}
          >
            Search
          </Button>
        </Stack>
        {bookings == undefined ? (
          <></>
        ) : (
          <BookingList bookings={bookings} booking={booking} />
        )}
      </HStack>
    </>
  );
}

export default HomeSearch;
