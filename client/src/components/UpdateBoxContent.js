import { Box, styled } from '@mui/system';

const UpdateBoxContent = styled(Box)({
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
    borderRadius: "5px",
    maxWidth: "500px",
    paddingBottom: "40px"
})

export default UpdateBoxContent;
