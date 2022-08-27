import {
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { SelectComponent } from "../components/Select";
import { gradients, palette } from "../styles/theme";
import { FormInput } from "./FormInput";
import ButtonWithOptions from "../components/ButonWithOptions";
import WhatsappIcon from "@mui/icons-material/Whatsapp";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import SMSIcon from "@mui/icons-material/TextsmsOutlined";
import { useState } from "react";

const SelectContacts = () => {
  const items = [
    { isSelected: false, name: "Ashok Kumar", number: "9479848823" },
    { isSelected: false, name: "Aryan Jain", number: "9479848823" },
    { isSelected: false, name: "Parth Kodape", number: "9479848823" },
    { isSelected: false, name: "Sandeep Sao", number: "9479848823" },
    { isSelected: false, name: "Ashok Kumar", number: "9479848823" },
    { isSelected: false, name: "Aryan Jain", number: "9479848823" },
    { isSelected: false, name: "Parth Kodape", number: "9479848823" },
    { isSelected: false, name: "Sandeep Sao", number: "9479848823" },
  ];

  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<{ name: string; number: string }[]>(
    []
  );

  return (
    <Card
      sx={{
        boxShadow: 0,
        width: "90%",
      }}
    >
      <Box p={1} width="100%">
        <FormInput
          label=""
          placeholder="Search"
          value={query}
          handleOnChange={(value) => setQuery(value as string)}
          sx={{ width: "100%" }}
        />
      </Box>
      <Divider />
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onChange={(e) =>
              selected.length === items.length
                ? setSelected([])
                : setSelected(items)
            }
            checked={selected.length === items.length}
            indeterminate={
              selected.length !== items.length && selected.length !== 0
            }
            disabled={items.length === 0}
          />
        }
        title={"Selected Contacts"}
        subheader={`${selected.length}/${items.length} selected`}
      ></CardHeader>

      <Divider />
      <List
        sx={{
          height: 235,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
      >
        {items.map(({ name, number, isSelected }) => {
          return (
            <ListItem
              key={name}
              role="listitem"
              button
              onClick={() => {}}
              disablePadding
              sx={{ px: 1, py: 1 }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={isSelected}
                  // onChange={(e) => (e.target.checked ? "remove" : "")}
                  size="small"
                />
              </ListItemIcon>
              <Box>
                <Typography letterSpacing={1} fontSize={15}>
                  {name}
                </Typography>
                <Typography fontSize={12}>{number}</Typography>
              </Box>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
};

export const SendMessageForm = (props: SendMessageFormProps) => {
  const [selectedType, setSelectedType] = useState<number>(1);

  const typeMap = {
    1: { icon: <WhatsappIcon />, label: "WhatsApp" },
    2: { icon: <EmailIcon />, label: "Email" },
    3: { icon: <SMSIcon />, label: "SMS" },
  };

  const options = [
    { icon: <WhatsappIcon />, label: "WhatsApp", value: 1 },
    { icon: <EmailIcon />, label: "Email", value: 2 },
    { icon: <SMSIcon />, label: "SMS", value: 3 },
  ];

  const [formValues, setFormValues] = useState({ content: "" });

  const getLabel = (icon: JSX.Element, label: string) => (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
      {icon}
      <Typography>{label}</Typography>
    </Box>
  );

  return (
    <Box display="flex" alignItems="start" justifyContent="center">
      <Box
        display="flex"
        alignItems="start"
        justifyContent="center"
        width="100%"
        p={1}
        py={3}
        gap={7}
        border={`${palette.primary.border} 1px solid`}
        style={{ background: gradients.gradient5 }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          width="25%"
          height={415}
          borderRadius={3}
          sx={{ boxShadow: 3, background: palette.primary.white }}
          py={2}
        >
          <Typography color={palette.primary.tint} letterSpacing={1}>
            Select Contacts
          </Typography>
          <SelectContacts />
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          width="25%"
          height={415}
          borderRadius={3}
          sx={{ boxShadow: 3, background: palette.primary.white }}
          py={2}
        >
          <Box
            display="flex"
            alignItems="start"
            justifyContent="center"
            height="6%"
            width="100%"
          >
            <Typography color={palette.primary.tint} letterSpacing={1}>
              Message
            </Typography>
          </Box>
          <Box
            height="94%"
            width="100%"
            alignItems="center"
            justifyContent="space-around"
            p={2}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              height="100%"
            >
              <SelectComponent
                selectedOption={""}
                handleSelectOption={() => {}}
                options={["Type1", "Type2"]}
              />
              <SelectComponent
                selectedOption={""}
                handleSelectOption={() => {}}
                options={["Type1", "Type2"]}
              />
              <Box width="100%">
                <TextareaAutosize
                  style={{ resize: "none", width: "100%" }}
                  minRows={8}
                  value={formValues.content}
                  onChange={(e) =>
                    setFormValues({ ...formValues, content: e.target.value })
                  }
                />
                <Typography
                  fontSize={10}
                  fontWeight={700}
                  color={palette.primary.tint}
                  fontStyle="oblique"
                >
                  {`Characters remaining ${
                    100 - formValues.content.length
                  }/100`}
                </Typography>
              </Box>
              <ButtonWithOptions
                label={getLabel(
                  typeMap[selectedType as keyof typeof typeMap].icon,
                  typeMap[selectedType as keyof typeof typeMap].label
                )}
                options={options.map(({ value, icon, label }) => ({
                  label: getLabel(icon, label),
                  value,
                }))}
                handleClick={() => {}}
                handleSelected={(value) => setSelectedType(value as number)}
                selectedOption={selectedType as number}
                sx={{ background: palette.primary.success }}
              />
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

interface SendMessageFormProps {}
