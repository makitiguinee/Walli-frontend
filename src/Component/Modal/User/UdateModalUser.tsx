import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { userSchema } from "../../Helper/InitialevalueFormik";
import "react-toastify/dist/ReactToastify.css";
import {
  UpdateModalUserProps,
  User,
  UserUpdate,
} from "../../Interface/InterfaceClient";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GetAllRoles,
  GetAllUsers,
  updateUser,
} from "../../../backEnd/AuthService";
import { toast } from "react-toastify";

const UpdateModalUser: React.FC<UpdateModalUserProps> = ({
  isOpen,
  handleClose,
  initialUserValues,
  id,
}) => {
  const {
    data: dataUser,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: GetAllUsers,
  });

  const filteredUsers: User[] =
    dataUser?.filter((user) => user.id === id) ?? [];
  const filteredUser = filteredUsers.length > 0 ? filteredUsers[0] : null;
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [initialValues, setInitialValues] = useState<any>(initialUserValues);
  const queryClient = useQueryClient();
  const notify = () => toast.success("Mise a jours  effectuée avec succès!");
  const notifyErreur = () =>
    toast.error("Mise a jour a echouée", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    if (filteredUser) {
      setInitialValues(filteredUser);
    }
  }, [filteredUser]);

  const mutation = useMutation({
    mutationFn: (user: any) => updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllUsers"],
        exact: true,
        refetchType: "active",
      });
      handleClose();
      notify();
    },
    onError: (error: any) => {
      notifyErreur();
      handleClose();
    },
  });

  const handleSubmit = (values: UserUpdate) => {
    const { id, roles, ...restvalue } = values;
    const transformedValues = {
      ...restvalue,
      roleId: roles,
    };
    console.log(transformedValues);
    mutation.mutate(transformedValues);
  };
  const { data: roles } = useQuery({
    queryKey: ["getAllRoles"],
    queryFn: GetAllRoles,
  });

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "45%",
          background: "white",
        },
      }}
      maxWidth="lg"
      open={isOpen}
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
          Mise à jour d'un utilisateur
        </DialogTitle>
        <Button
          sx={{ fontSize: "1.3rem", fontWeight: "bold", mr: 1.5 }}
          onClick={handleClose}
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

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <DialogContent dividers>
              <Box
                sx={{
                  p: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "14px",
                }}
              >
                <Box>
                  <label htmlFor="firstname">Prénom</label>
                  <TextField
                    fullWidth
                    type="text"
                    size="small"
                    name="firstname"
                    id="outlined-firstname"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstname}
                    error={!!touched.firstname && !!errors.firstname}
                    helperText={touched.firstname && errors.firstname}
                  />
                </Box>
                {/* <Box>
                  <label htmlFor="lastname">Nom</label>
                  <TextField
                    fullWidth
                    type="text"
                    size="small"
                    name="lastname"
                    id="outlined-lastname"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname}
                    error={!!touched.lastname && !!errors.lastname}
                    helperText={touched.lastname && errors.lastname}
                  />
                </Box>
                <Box>
                  <label htmlFor="username">Nom d'utilisateur</label>
                  <TextField
                    fullWidth
                    type="text"
                    size="small"
                    name="username"
                    id="outlined-username"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                  />
                </Box>
                <Box>
                  <label htmlFor="sexe">Sexe</label>
                  <Select
                    fullWidth
                    size="small"
                    id="outlined-sexe"
                    name="sexe"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.sexe}
                    error={!!touched.sexe && !!errors.sexe}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Sélectionner le sexe
                    </MenuItem>
                    <MenuItem value="masculin">Masculin</MenuItem>
                    <MenuItem value="feminin">Feminin</MenuItem>
                  </Select>
                </Box>
                <Box>
                  <label htmlFor="email">Email</label>
                  <TextField
                    fullWidth
                    type="email"
                    size="small"
                    name="email"
                    id="outlined-email"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box>
                  <label htmlFor="role">Rôle</label>
                  <Select
                    fullWidth
                    size="small"
                    id="outlined-role"
                    name="roles"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.roles}
                    error={!!touched.roles && !!errors.roles}
                  >
                    <MenuItem value="" disabled>
                      Sélectionner un rôle
                    </MenuItem>
                    {roles?.map((role: any) => (
                      <MenuItem key={role.id} value={role.roleId}>
                        {role.nameRole}
                      </MenuItem>
                    ))}
                  </Select>
                </Box> */}
              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                justifyContent: "space-between",
                marginTop: "15px",
                mr: 2.8,
                ml: 2.5,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  bgcolor: "#F33E3E",
                  color: "white",
                  ml: "0px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  height: "36px",
                  width: "170px",
                  border: "none",
                  "&:hover": {
                    bgcolor: "black",
                    color: "white",
                    height: "36px",
                  },
                }}
                onClick={handleClose}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  bgcolor: "rgba(0, 0, 160, 0.70)",
                  borderRadius: "5px",
                  height: "36px",
                  color: "white",
                  width: "170px",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "black",
                    color: "white",
                    height: "36px",
                  },
                }}
              >
                Mettre à jour
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UpdateModalUser;
