import {
  Box,
  Button,
  HStack,
  Spacer,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClock,
  faCross,
  faCrosshairs,
  faDrawPolygon,
  faLocationCrosshairs,
  faLocationDot,
  faUser,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function BookingPage(props) {
  const location = useLocation();
  const [book, setBook] = useState(location.state);
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState();
  const [pool, setPool] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useStateValue();

  const handleAccept = async (poolId) => {
    await axios
      .get(`/api/bookings/pool/acceptRequest/${poolId}`)
      .then((res) => {
        console.log("accept success: ", res.data);
        setIsLoading(!isLoading);
      })
      .catch(console.log);

    // setPool(pool);
  };

  const removePoolMember = async (poolId) => {
    await axios
      .delete(`/api/bookings/pool/${poolId}`)
      .then((res) => {
        console.log("deleted success: ", res.data);
        setIsLoading(!isLoading);
      })
      .catch(console.log);

    // setPool(pool);
  };
  const handleReject = async (poolId) => {
    await axios
      .get(`/api/bookings/pool/rejectRequest/${poolId}`)
      .then((res) => {
        console.log("reject success: ", res.data);
        setIsLoading(!isLoading);
      })
      .catch(console.log);
  };

  const sendPoolRequest = async () => {
    // setIsLoading(true);
    const body = {
      bookingId: book.bookingId,
      userId: state.user.userId,
    };
    await axios
      .post(`/api/bookings/pool/sendRequest`, body)
      .then(async (res) => {
        console.log("add pool member: ", res.data);
      })
      .catch(console.log);
    // setIsLoading(false);
  };

  useEffect(() => {
    axios
      .get(`/api/users/id/${book.creatorUserId}`)
      .then(async (res) => {
        console.log("users: ", res.data);
        setUser(res.data);
      })
      .catch(console.log);

    axios
      .get(`/api/bookings/pool/getPoolMembers/${book.bookingId}`)
      .then(async (res1) => {
        console.log("pool: ", res1.data);
        var pool_members = [];
        for (var i = 0; i < res1.data.length; i++) {
          var p = res1.data[i];
          await axios
            .get(`/api/users/id/${p.userId}`)
            .then(async (res2) => {
              pool_members.push({ ...p, ...res2.data });
              console.log("pool user: ", { ...p, ...res2.data });
            })
            .catch(console.log);
        }
        setPool(pool_members);

        console.log("pool list:", pool);
      })
      .catch(console.log);
  }, [isLoading]);

  return (
    <>
      <Box
        style={{
          margin: 80,
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
        {state.user.userId != book.creatorUserId ? (
          <HStack>
            <Button
              onClick={() => {
                sendPoolRequest();
              }}
              bg={colorMode == "light" ? "bg.dark" : "bg.light"}
              color={colorMode == "light" ? "bg.light" : "bg.dark"}
              style={{
                transition: "1s",
                width: "250px",
                marginTop: 30,
              }}
              _hover={{
                color: colorMode == "light" ? "bg.dark" : "bg.light",
                background: "accents.grad",
                transition: "1s",
              }}
              borderRadius={"button"}
              // isDisabled={!source || !destination}
              // isLoading={isLoading}
            >
              Send Pool Request
            </Button>
          </HStack>
        ) : (
          <>
            <Text fontSize={26} fontWeight={"bold"} mt={35}>
              Pending pooling requests
            </Text>
            <VStack alignItems={"flex-start"}>
              {pool.map((pool_user, index) => {
                return pool_user.status == "PENDING" ? (
                  <HStack
                    mt={5}
                    style={{
                      borderWidth: 1,
                      borderRadius: 20,
                      padding: "10px 20px",
                      width: 250,
                    }}
                    justifyContent={"space-between"}
                    key={index}
                  >
                    <FontAwesomeIcon icon={faUser} />

                    <Text
                      style={{
                        overflowX: "hidden",
                      }}
                    >
                      {pool_user
                        ? `${pool_user.firstName} ${pool_user.lastName}`
                        : ""}
                    </Text>
                    <Box ml={10} onClick={() => handleAccept(pool_user.poolId)}>
                      <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    </Box>
                    <Box ml={10} onClick={() => handleReject(pool_user.poolId)}>
                      <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </Box>
                  </HStack>
                ) : (
                  <></>
                );
              })}
            </VStack>
          </>
        )}

        <Text fontSize={26} fontWeight={"bold"} mt={35}>
          Pool members
        </Text>
        <VStack alignItems={"flex-start"}>
          {pool.map((pool_user, index) => {
            return pool_user.status == "ADDED" ||
              pool_user.status == "ACCEPTED" ? (
              <HStack
                mt={5}
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  padding: "10px 20px",
                  width: 250,
                }}
                key={index}
                justifyContent={"space-between"}
              >
                <FontAwesomeIcon icon={faUser} />

                <Text
                  style={{
                    overflowX: "hidden",
                  }}
                >
                  {pool_user
                    ? `${pool_user.firstName} ${pool_user.lastName}`
                    : ""}
                </Text>
                {state.user.userId == book.creatorUserId ? (
                  <Box
                    ml={10}
                    onClick={() => removePoolMember(pool_user.poolId)}
                  >
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                  </Box>
                ) : (
                  <Box w={5}></Box>
                )}
              </HStack>
            ) : (
              <></>
            );
          })}
        </VStack>
      </Box>
    </>
  );
}

export default BookingPage;
