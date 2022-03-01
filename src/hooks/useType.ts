import { BehaviorSubject } from "rxjs";
import useBehaviorSubject from "./useBehaviorSubject";

const type = new BehaviorSubject<string | null>(null);
export const changeType = (value: string) => {
  if (type.getValue() !== value) {
    type.next(value);
  }
};
const useType = () => useBehaviorSubject<string>(type);

export default useType;
