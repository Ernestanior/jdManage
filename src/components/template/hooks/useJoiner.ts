// import useIntlDep from "../intl/useIntlDep";

const useJoiner = () => {
  // const loadtext = useIntlDep();

  // const joiner = (msgList: TmsgList[]) => {
  // return msgList.map((t) => t.id).join("");
  // };
  const joiner = (msgList: any[]) => {
    return msgList.join("");
  };
  return joiner;
};
export default useJoiner;

// type TmsgList = { intl: boolean; id: string };
