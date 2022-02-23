import { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface IProps {
  id: string;
  values?: {
    [key: string]: string;
  };
}

/**
 * 翻译
 */
const IntlDep: FC<IProps> = (props) => {
  const intl = useIntl();
  if (!props.values) {
    return <FormattedMessage id={props.id} />;
  }
  const values: any = {};
  for (const key in props.values) {
    if (Object.prototype.hasOwnProperty.call(props.values, key)) {
      const _key = key[0] === "_" ? key.substr(1) : key;
      values[_key] =
        key[0] !== "_"
          ? intl.formatMessage({
              id: props.values[key],
            })
          : props.values[key];
    }
  }
  return <FormattedMessage id={props.id} values={values} />;
};
export default IntlDep;
