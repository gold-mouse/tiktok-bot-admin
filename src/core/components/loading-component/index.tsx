import { Box, CircularProgress } from "@mui/material";

const LoadingFallback = () => (
    (
        <Box
            sx={{
                position: "fixed",
                minWidth: "101vw",
                minHeight: "101vh",
                backgroundColor: "#000000aa",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999999,
            }}
        >
            <CircularProgress />
        </Box>
    )
)

export default LoadingFallback
