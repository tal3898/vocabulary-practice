import { SubjectType } from "./subjectType";
import { COLORS } from "./subjectsList/colors";
import { DAYS } from "./subjectsList/days";
import { MONTHS } from "./subjectsList/month";
import { BODY_PARTS } from "./subjectsList/bodyParts";

export const SUBJECT_LIST = {
  [SubjectType.COLORS]: COLORS,
  [SubjectType.MONTHS]: MONTHS,
  [SubjectType.DAYS]: DAYS,
  [SubjectType.BODY_PARTS]: BODY_PARTS,
};

export const DEFAULT_SUBJECT = SubjectType.COLORS;
