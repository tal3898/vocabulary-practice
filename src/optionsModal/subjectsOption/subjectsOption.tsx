import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { LearningOption } from "../../models/learningOption";
import { SubjectType } from "../../models/subjectType";
import { Word } from "../../models/word";
import "./subjectsOption.css";

interface Props {
  a: string;
}

const DEFAULT_SUBJECT = SubjectType.COLORS;

export const SubjectsOption = ({ a }: Props) => {
  const [selectedSubject, setSelectedSubject] = useState(DEFAULT_SUBJECT);

  return (
    <div>
      <div></div>
      <FormControl>
        <FormLabel id="subject-radios">
          Choose the subject to practice with
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={DEFAULT_SUBJECT}
          name="radio-buttons-group"
        >
          <FormControlLabel
            value={SubjectType.COLORS}
            control={<Radio />}
            label="Colors"
          />
          <FormControlLabel
            value={SubjectType.MONTHS}
            control={<Radio />}
            label="Months"
          />
          <FormControlLabel
            value={SubjectType.DAYS}
            control={<Radio />}
            label="Days"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
