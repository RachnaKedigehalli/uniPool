import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import env from "react-dotenv";

function LocationSearch(props) {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isBlurred, setIsBlurred] = useState(true);
  const api_key = `${env.REACT_APP_API_KEY}`;

  const call_api = async () => {
    if (location != "") {
      var query = location.replace(" ", "%20");
      console.log("query string: ", query);
      await axios
        .get(
          `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}&userLocation=${props.latitude},${props.longitude},${props.accuracy}&key=${api_key}`
        )
        .then((res) => {
          setSuggestions(res.data.resourceSets[0].resources[0].value);
          console.log(
            "bing response: ",
            res.data.resourceSets[0].resources[0].value
          );
        })
        .catch(console.log);
    } else {
      setSuggestions([]);
    }
  };
  useEffect(() => {
    call_api();
  }, [location]);
  return (
    <>
      <Text
        fontSize={"tags"}
        fontWeight={"500"}
        color={useColorModeValue("tagText.light", "tagText.dark")}
        ml={1}
        mt={3}
      >
        {props.label}
      </Text>
      <Stack
        style={{
          borderWidth: 1,
          //   borderColor: "black",

          borderRadius: "20px 20px 20px 20px",
        }}
      >
        <Input
          mt={0}
          placeholder={props.placeholder}
          borderRadius={"input"}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => {
            setIsBlurred(false);
            call_api();
          }}
        />
        {!suggestions ? (
          <></>
        ) : (
          suggestions.map((suggestion, index) => {
            const sugg_name = suggestion.name;
            const sugg_address = suggestion.address.formattedAddress;
            return (
              <Button
                variant="link"
                onClick={() => {
                  setLocation(
                    sugg_name ? `${sugg_name}, ${sugg_address}` : sugg_address
                  );
                  props.setLoc(
                    sugg_name ? `${sugg_name}, ${sugg_address}` : sugg_address
                  );
                  setIsBlurred(true);
                }}
                borderBottomWidth={suggestions.length - 1 == index ? 0 : 0.5}
                style={{
                  padding: 15,
                }}
                //   borderColor={colorMode == "light" ? "bg.dark" : "bg.light"}
                key={index}
                display={isBlurred ? "none" : ""}
              >
                {/* <Box
                    
                  > */}
                {/* <Text>{suggestion.name}</Text> */}
                <Text
                  style={{
                    display: "flex",
                    overflowX: "hidden",
                    height: 20,
                  }}
                >
                  {sugg_name ? `${sugg_name}, ${sugg_address}` : sugg_address}
                </Text>
                {/* </Box> */}
              </Button>
            );
          })
        )}
      </Stack>
    </>
  );
}

export default LocationSearch;
