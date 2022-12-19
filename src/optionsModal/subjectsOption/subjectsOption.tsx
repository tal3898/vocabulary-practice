import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { LearningOption } from "../../models/learningOption";
import { SubjectType } from "../../models/subjects/subjectType";
import { Word } from "../../models/word";
import "./subjectsOption.css";
import { TbNumbers } from "react-icons/tb";
import { HiCalendar } from "react-icons/hi";
import { WiDaySunny } from "react-icons/wi";
import { VscSymbolColor } from "react-icons/vsc";
import { IoIosMan } from "react-icons/io";
import { SubjectItem } from "./subjectItem/subjectItem";

interface Props {
  selectedSubject: SubjectType;
  setSelectedSubject: (type: SubjectType) => void;
}

export const SubjectsOption = ({
  selectedSubject,
  setSelectedSubject,
}: Props) => {
  return (
    <div>
      <div></div>
      <FormControl>
        <FormLabel
          id="subject-radios"
          style={{ fontSize: 20, marginBottom: 10 }}
        >
          Choose the subject to practice with
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(+e.target.value)}
        >
          <FormControlLabel
            value={SubjectType.MONTHS}
            control={<Radio />}
            label={<SubjectItem icon={HiCalendar} text={"Months"} />}
          />
          <FormControlLabel
            value={SubjectType.DAYS}
            control={<Radio />}
            label={<SubjectItem icon={WiDaySunny} text={"Days"} />}
          />
          <FormControlLabel
            value={SubjectType.NUMBERS}
            control={<Radio />}
            label={<SubjectItem icon={TbNumbers} text={"Numbers"} />}
          />
          <FormControlLabel
            value={SubjectType.COLORS}
            control={<Radio />}
            label={<SubjectItem icon={VscSymbolColor} text={"Colors"} />}
          />
          <FormControlLabel
            value={SubjectType.BODY_PARTS}
            control={<Radio />}
            label={<SubjectItem icon={IoIosMan} text={"Body Parts"} />}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
