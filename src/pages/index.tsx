import {
  Box,
  Typography,
  Button,
  useTheme,
  Pagination,
  PaginationItem,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import { useQuery } from "react-query";
import { checkNumber } from "utils";
import { rainbowColors } from "utils/colors";

const HomePage = () => {
  const [counterValues, setCounterValues] = useState<number[]>([]);
  const counterStartValue = 2;
  const [counterValue, setCounterValue] = React.useState(counterStartValue);
  const [currentPower, setCurrentPower] = React.useState(counterStartValue);
  const [color, setColor] = React.useState("success.main");
  const [currentRainbowColorIndex, setCurrentRainbowColorIndex] =
    React.useState(0);

  let interval: any = useRef(null);

  useEffect(() => {
    setColor(checkNumber(counterValue));
    setCounterValues([...counterValues, counterValue]);
  }, [counterValue]);

  const { data, isLoading, isFetching } = useQuery(
    ["FETCH NUMBER", counterValue],
    async () =>
      axios.get(`https://api.isevenapi.xyz/api/iseven/${counterValue}/`),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setCurrentRainbowColorIndex(0);
        clearInterval(interval.current);
        if (data.data.iseven) {
          interval.current = setInterval(() => {
            setCurrentRainbowColorIndex((prev) => prev + 1);
          }, 2000);
        } else {
          clearInterval(interval.current);
        }
      },
    }
  );

  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (currentRainbowColorIndex > 6) {
      setCurrentRainbowColorIndex(0);
    }
  }, [currentRainbowColorIndex]);

  const theme = useTheme();
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography
        sx={{
          color,
        }}
        variant="h1"
      >
        {counterValue}
      </Typography>
      <Stack spacing={2}>
        <Pagination
          count={counterValues.length}
          renderItem={(item: any) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
              page={counterValues[item.page - 1]}
            />
          )}
        />
      </Stack>
      <Box marginTop={theme.spacing(5)}>
        <Button
          disabled={isLoading || isFetching}
          onClick={() => {
            clearInterval(interval.current);
            const counterPower = Math.pow(counterStartValue, currentPower);
            setCounterValue(counterPower);
            setCurrentPower(currentPower + 1);
            setCurrentRainbowColorIndex(0);
            clearInterval(interval.current);
          }}
          variant="contained"
        >
          Square
        </Button>
        <Button
          disabled={isLoading || isFetching}
          onClick={() => {
            clearInterval(interval.current);
            const val = Math.sqrt(counterValue);
            setCounterValue(val);
            setCurrentRainbowColorIndex(0);
          }}
          sx={{ marginLeft: theme.spacing(2) }}
          variant="outlined"
        >
          Square Root
        </Button>
      </Box>
      {isLoading || isFetching ? (
        <CircularProgress
          sx={{
            marginTop: theme.spacing(2),
          }}
        />
      ) : (
        <Button
          sx={{
            background: `rgb(${rainbowColors[currentRainbowColorIndex]})`,
            boxShadow: `0 5px 15px rgba(${rainbowColors[currentRainbowColorIndex]}, 0.8)`,
            marginTop: theme.spacing(2),
            transition: "transition: all 0.2s ease-in-out",
          }}
        >
          {memoizedData?.data?.iseven ? "Even Number" : "Odd Number"}
        </Button>
      )}
    </Box>
  );
};

export default HomePage;
