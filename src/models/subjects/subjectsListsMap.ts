import { SubjectType } from "./subjectType";
import { COLORS } from "./subjectsList/colors";

export const SUBJECT_LIST = {
  [SubjectType.COLORS]: COLORS,
  [SubjectType.MONTHS]: COLORS,
  [SubjectType.DAYS]: COLORS,
};

export const DEFAULT_SUBJECT = SubjectType.COLORS;
