import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "./style.module.css";

function CircularIndeterminate() {
  return (
    <Box className={styles.circle}>
      <CircularProgress size={30} color="inherit" />
    </Box>
  );
}

export default CircularIndeterminate;
