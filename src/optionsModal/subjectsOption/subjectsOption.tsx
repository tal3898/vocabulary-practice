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
        <FormLabel id="subject-radios">
          Choose the subject to practice with
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(+e.target.value)}
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
