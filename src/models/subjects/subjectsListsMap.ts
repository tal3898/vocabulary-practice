import { SubjectType } from "./subjectType";
import { COLORS } from "./subjectsList/colors";
import { DAYS } from "./subjectsList/days";
import { MONTHS } from "./subjectsList/month";

export const SUBJECT_LIST = {
  [SubjectType.COLORS]: COLORS,
  [SubjectType.MONTHS]: MONTHS,
  [SubjectType.DAYS]: DAYS,
};

export const DEFAULT_SUBJECT = SubjectType.COLORS;
