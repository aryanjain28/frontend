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
  Tooltip,
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
import CopyIcon from "@mui/icons-material/ContentCopyOutlined";
import TickIcon from "@mui/icons-material/DoneOutlined";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CHAR_LIMIT } from "../constants/message.constants";
import { en } from "../constants/labels";
import { Button } from "../components/Button";

interface Item {
  name: string;
  number: string;
  isSelected: boolean;
  index: number;
}

const SelectContacts = ({
  items,
  setItems,
}: {
  items: Item[];
  setItems: (value: Item[]) => void;
}) => {
  const [query, setQuery] = useState<string>("");

  const filteredItems = useMemo(
    () =>
      items.filter(
        ({ name, number }) => name.includes(query) || number.includes(query)
      ),
    [query, items]
  );

  const selected = useMemo(
    () => filteredItems.filter((p) => p.isSelected),
    [items, filteredItems, query]
  );

  const toggleAllSelected = useCallback(() => {
    setItems(
      items.map((p) => ({
        ...p,
        isSelected: !(selected.length === items.length),
      }))
    );
  }, [items, selected, filteredItems]);

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
          placeholder={en.searchByNameNumber}
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
            onChange={toggleAllSelected}
            checked={selected.length === items.length}
            indeterminate={
              selected.length !== items.length && selected.length !== 0
            }
            disabled={items.length === 0}
          />
        }
        title={en.selectedContacts}
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
        {filteredItems.map(
          ({
            name,
            number,
            isSelected,
            index,
          }: {
            name: string;
            number: string;
            isSelected: boolean;
            index: number;
          }) => {
            return (
              <ListItem
                key={`${index}_${name}`}
                role="listitem"
                button
                onClick={() => {}}
                disablePadding
                sx={{ px: 1, py: 1 }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => {
                      items[index].isSelected = !isSelected;
                      setItems([...items]);
                    }}
                    size="small"
                  />
                </ListItemIcon>
                <Box>
                  <Typography letterSpacing={1} fontSize={15}>
                    {name}
                  </Typography>
                  <Typography color={palette.primary.tint} variant="subtitle2">
                    {`+91 ${number.slice(0, 5)} ${number.slice(5)}`}
                  </Typography>
                </Box>
              </ListItem>
            );
          }
        )}
        <ListItem />
      </List>
    </Card>
  );
};

export const SendMessageForm = (props: SendMessageFormProps) => {
  const [selectedType, setSelectedType] = useState<number>(3);
  const [copied, setCopied] = useState<boolean>(false);

  const typeMap = {
    1: { icon: <WhatsappIcon />, label: "WhatsApp" },
    2: { icon: <EmailIcon />, label: "Email" },
    3: { icon: <SMSIcon fontSize="small" />, label: "SMS" },
  };

  const options = [
    { icon: <WhatsappIcon />, label: "WhatsApp", value: 1 },
    { icon: <EmailIcon />, label: "Email", value: 2 },
    { icon: <SMSIcon />, label: "SMS", value: 3 },
  ];

  const clients = [
    { index: 0, isSelected: false, name: "Ashok Kumar", number: "6538473035" },
    { index: 1, isSelected: false, name: "Aryan Jain", number: "9479488833" },
    { index: 2, isSelected: false, name: "Parth Kodape", number: "8261874468" },
    { index: 3, isSelected: false, name: "Sandeep Sao", number: "9479848823" },
    { index: 4, isSelected: false, name: "Ashok Kumar", number: "5235896545" },
    { index: 5, isSelected: false, name: "Aryan Jain", number: "7823434565" },
    { index: 6, isSelected: false, name: "Parth Kodape", number: "9988343456" },
    { index: 7, isSelected: false, name: "Sandeep Sao", number: "7435899495" },
  ];

  const [formValues, setFormValues] = useState({
    type: "",
    template: "",
    content: "",
  });

  const [items, setItems] = useState<Item[]>(clients);

  const getLabel = useCallback(
    (icon: JSX.Element, label: string) => (
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        {icon}
        <Typography>{label}</Typography>
      </Box>
    ),
    []
  );

  const handleSendMessage = useCallback(() => {
    const payload = {
      type: formValues.type,
      template: formValues.template,
      message: formValues.content,
      clients: items.filter((p) => p.isSelected),
      platform: selectedType,
    };
    console.log(payload);
  }, [formValues, items, selectedType]);

  const rand =
    "Sometimes, programmers require to create a string which is generated by selecting the random characters. Random String Generator helps to create a random string by choosing some characters randomly. This string can be a simple character string or an alpha-numeric string.  In this chapter, you will get the different methods to create a random string generator. We will create a random string generator program using the JavaScript programming language to generate a random string. Each time it will generate a new string. For this, we will use the Math.random() function of JavaScript.";

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
            {en.selectContacts}
          </Typography>
          <SelectContacts items={items} setItems={setItems} />
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
              {en.message}
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
                selectedOption={formValues.type}
                handleSelectOption={(type) =>
                  setFormValues({ ...formValues, type })
                }
                options={["Type1", "Type2"]}
              />
              <Box width="100%">
                <FormInput
                  rows={8}
                  label=""
                  value={formValues.content}
                  handleOnChange={(value) => {
                    CHAR_LIMIT === (value as string).length - 1
                      ? null
                      : setFormValues({
                          ...formValues,
                          content: (value as string).slice(0, CHAR_LIMIT),
                        });
                  }}
                  sx={{
                    maxHeight: 400,
                    fontSize: 10,
                    overflowY: "auto",
                    width: "100%",
                  }}
                  placeholder="Message Content..."
                />
                <Typography
                  fontSize={10}
                  fontWeight={700}
                  color={palette.primary.tint}
                  fontStyle="oblique"
                >
                  {`Characters remaining ${
                    CHAR_LIMIT - formValues.content.length
                  }/${CHAR_LIMIT}`}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="success"
                label={getLabel(typeMap[3].icon, typeMap[3].label as string)}
                onClick={handleSendMessage}
              />
            </Grid>
          </Box>
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
              {en.templates}
            </Typography>
          </Box>
          <Box width="100%" height="90%" sx={{ overflowY: "scroll" }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="space-between"
            >
              {new Array(10).fill(rand).map((p) => (
                <Box
                  my={1}
                  display="flex"
                  alignItems="start"
                  justifyContent="start"
                  width="90%"
                  height={120}
                  borderRadius={2}
                  gap={2}
                  sx={{
                    p: 1,
                    boxShadow: 3,
                    background: palette.primary.main,
                    color: palette.primary.white,
                  }}
                >
                  <Tooltip
                    title={copied ? "Copied!" : "Copy"}
                    onMouseLeave={() => setCopied(false)} //setTimeout(() => setCopied(false), 100)}
                  >
                    <CopyIcon
                      sx={{ cursor: "pointer", my: 0.5, fontSize: 20 }}
                      onClick={() => {
                        setCopied(true);
                        navigator.clipboard.writeText(p);
                      }}
                    />
                  </Tooltip>

                  <Box sx={{ overflow: "auto", height: "100%" }}>
                    <Typography variant="subtitle2" letterSpacing={1}>
                      {p}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

interface SendMessageFormProps {}
