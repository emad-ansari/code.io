import Pagination from "@mui/material/Pagination";
import { useAppDispatch, RootState } from "../app/store";
import { useSelector } from "react-redux";
import { setProblemSet } from "../features/problemSlice";
import { memo } from 'react';


export const CustomPagination = memo(() => {
    const dispatch = useAppDispatch();
    const { pagination } = useSelector((state: RootState) => state.problem);

    return (
        <Pagination
            count={pagination.paginationCount}
            variant="outlined"
            sx={{
                "& .MuiPaginationItem-root": {
                    backgroundColor: "#2B2A2B",
                    color: "#fff", // Change the text color if needed
                    "&:hover": {
                        backgroundColor: "#0c8a45", // Change the background color on hover
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#0FA958", // Change the background color of the selected item
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#0c8a45", // Change the background color on hover for the selected item
                        },
                    },
                },
            }}
            onChange={(_, value) => {
                dispatch(setProblemSet(value));
            }}
        />
    )
});