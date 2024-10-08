import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Tab,
  Typography,
} from "@mui/material";

import { useNavigate, useSearchParams } from "react-router-dom";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useQuery } from "@tanstack/react-query";
import { GetByIdEngin } from "../../../backEnd/AuthService";
import React from "react";

const ModalShowEngin = ({ id }: { id: number }) => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const {
    data: dataUser,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getProprietaireByIdClient", id],
    queryFn: () => GetByIdEngin(id),
    enabled: !!id,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "85%",
          maxHeight: 500,
          background: "white",
        },
      }}
      maxWidth="lg"
      open={searchParams.get("isOpenModalShow") === "true"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ml: 1.3,
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          Information d'un client
        </DialogTitle>
        <Button
          sx={{ fontSize: "1.3rem", fontWeight: "bold", mr: 1.5 }}
          onClick={() => navigate("/engins/engin1")}
        >
          <CancelPresentationIcon
            sx={{
              color: "rgba(0, 0, 160, 0.70) ",
              width: "30px",
              height: "30px",
            }}
          />
        </Button>
      </Box>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Vos Informations Personnelles" value="1" />
              <Tab label="Vos Engins" value="2" />
              <Tab label="Vos Taxes" value="3" />
              <Tab label="Autres Activités" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Nom
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.proprietaire?.user?.lastname}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Prénom
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.proprietaire?.user?.firstname}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Sexe
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.proprietaire?.user?.sexe}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Numéro Téléphone
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.proprietaire?.phone}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Adresse Mail
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.proprietaire?.user?.email}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Date de Naissance
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {new Date(
                      dataUser?.proprietaire?.dateOfBirth
                    ).toLocaleDateString()}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Immatriculation
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.immatricule}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Marque
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.marque}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Modèle
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.model}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Type d'activité
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.typeActivity}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Date de mise en service
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {new Date(dataUser?.dateService).toLocaleDateString()}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Numéro carte verte
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.numeroCarteVerte}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Assurance existe
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.existAssurance ? "Oui" : "Non"}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Date expiration assurance
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {new Date(
                      dataUser?.dateEpireAssurance
                    ).toLocaleDateString()}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Carte grise existe
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.existCarteGris ? "Oui" : "Non"}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Date expiration carte grise
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {new Date(
                      dataUser?.dateEpireCarteGris
                    ).toLocaleDateString()}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Vignette existe
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.existVignette ? "Oui" : "Non"}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Date expiration vignette
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {new Date(dataUser?.dateEpireVignette).toLocaleDateString()}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Ville de Naissance
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.proprietaire?.city}
                  </span>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Nationalité
                  </Typography>
                  <span style={{ fontSize: "14px", color: "gray" }}>
                    {dataUser?.proprietaire?.nationality}
                  </span>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item Four</TabPanel>
        </TabContext>
      </Box>
    </Dialog>
  );
};

export default ModalShowEngin;
