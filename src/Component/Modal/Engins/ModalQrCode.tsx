import React, { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Logo from "../../../assets/logo.png";
import {
  Box,
  Dialog,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetByIdEngin } from "../../../backEnd/AuthService";

const ModalQrCode = ({ id }: { id: number }) => {
  const contentToPrint = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  // Fonction pour imprimer
  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current!,
    documentTitle: "QR Code Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
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
  console.log("immatricule:", dataUser?.immatricule || "");
  // Fonction pour fermer le modal
  const closeQrcode = () => {
    navigate("/engins/engin1");
  };

  const qrCard = () => (
    <div style={{ width: "250px", border: "10px solid rgba(0, 0, 160, 0.70)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h4 style={{ color: "black" }}>Walli Group Transport</h4>
      </div>
      <QRCodeSVG
        value={dataUser?.immatricule || ""}
        size={220}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={true}
        imageSettings={{
          src: Logo,
          height: 30,
          width: 30,
          excavate: true,
        }}
      />
    </div>
  );

  const actions = [
    {
      icon: <DisabledByDefaultIcon sx={{ color: "rgba(0, 0, 160, 0.70)" }} />,
      name: "Fermer",
      onClick: closeQrcode,
    },
    {
      icon: <PrintIcon sx={{ color: "rgba(0, 0, 160, 0.70)" }} />,
      name: "Imprimer",
      onClick: handlePrint,
    },
  ];

  // Fonction qui retourne le bouton SpeedDial
  const downloadButton = () => (
    <Box sx={{ position: "fixed", bottom: 16, left: 16, zIndex: 1000 }}>
      <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );

  // Crée un tableau d'éléments QR code
  const qrCards = Array.from({ length: 10 }, (_, i) => (
    <div key={i} style={{ margin: "10px" }}>
      {qrCard()}
    </div>
  ));

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
      maxWidth={false}
      open={searchParams.get("isOpenModalQrCode") === "true"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div
        ref={contentToPrint}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "80px",
          flex: 1,
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        {qrCards}
      </div>
      {downloadButton()}
    </Dialog>
  );
};

export default ModalQrCode;
