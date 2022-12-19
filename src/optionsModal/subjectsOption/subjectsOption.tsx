import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { LearningOption } from "../../models/learningOption";
import { Word } from "../../models/word";
import "./subjectsOption.css";

interface Props {
  a: string;
}

export const SubjectsOption = ({ a }: Props) => {
  return (
    <div>
      <div></div>
      <FormControl>
        <FormLabel id="subject-radios">
          Choose the subject to practice with
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
