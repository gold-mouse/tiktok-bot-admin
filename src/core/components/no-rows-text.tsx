import { Box, Typography } from "@mui/material";

const NoRowsOverlay = () => (
    <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Typography textAlign="center" mx={5} variant="h6">You have to Authenticate to send Email Template😒</Typography>
    </Box>
);

export default NoRowsOverlay
