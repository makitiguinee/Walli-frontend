import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  ButtonAdd,
  ButtonSelectSeach,
  DateButtonSelected,
} from "../Button/ButtonAdd";
import { IoMdDownload } from "react-icons/io";

interface FileBodyProps {
  clientData: any;
  columns: any[];
  handleModalOpen: () => void;
  onSelectChange: (value: string) => void;
}

const FileBody: React.FC<FileBodyProps> = (props) => {
  return (
    <Box
      marginTop="25px"
      marginLeft="40px"
      marginRight="40px"
      height="75vh"
      sx={{
        background: "#ffffff",
        "& .nom-column--cell": {
          color: `var(--color-text-black)`,
        },
        "& .MuiDataGrid-row": {
          color: `var(--color-text-black)`,
        },
        "& .MuiDataGrid-columnHeadersInner": {
          bgcolor: "#FFFFFF",
        },
        "& .MuiDataGrid-VirtualScroller": {
          bgcolor: "#FFFFFF",
        },
        "& .MuiDataGrid-footerContainer": {
          bgcolor: "#FFFFFF",
        },
        "&.css-128fb87-MuiDataGrid-toolbarContainer": {
          bgcolor: "#FFFFFF",
        },
        "& .MuiDataGrid-virtualScrollerContent": {
          bgcolor: "#FFFFFF",
        },
      }}
    >
      <DataGrid
        rows={props.clientData}
        columns={props.columns}
        getRowId={(row) => row.id}
        pagination={true}
        checkboxSelection
        initialState={{
          pagination: { paginationModel: { pageSize: 9 } },
        }}
        pageSizeOptions={[5, 9, 25]}
        slots={{
          toolbar: () => (
            <GridToolbarContainer
              sx={{
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: "10px",
              }}
            >
              <div>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
              </div>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <DateButtonSelected />
                <ButtonSelectSeach onSelectChange={props.onSelectChange} />
                <ButtonAdd onClick={props.handleModalOpen} />
                <Button
                  variant="outlined"
                  // onClick={() => clientDataExport(ClientData)}
                  sx={{
                    color: "rgba(0, 0, 160, 0.70)",
                    borderColor: "rgba(0, 0, 160, 0.70)",
                    borderRadius: "0px",
                    minWidth: "36px",
                    minHeight: "36px",
                    padding: "0",
                    mb: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor: "#000000",
                      color: "#ffffff",
                    },
                  }}
                >
                  <IoMdDownload />
                </Button>
              </Box>
            </GridToolbarContainer>
          ),
        }}
      />
    </Box>
  );
};
export default FileBody;
