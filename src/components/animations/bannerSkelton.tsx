import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function BannerSkelton() {
  return (
    <div className=" w-full lg:block md:block">
      <div className="relative h-[400px] sm:h-[500px] md:h-[500px] overflow-hidden object-fill">
        <Stack>
          {/* <Skeleton variant="rounded" width={"100%"} height={500} /> */}
          <Skeleton
            animation="pulse"
            variant="rectangular"
            sx={{ bgcolor: "grey.400" }}
            width={"100%"}
            height={600}
          />
        </Stack>
      </div>
    </div>
  );
}

export default BannerSkelton;
