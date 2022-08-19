import styles from "./index.module.scss";

type Props = {
  style?: string;
}

export default function ArrowIcon({ style }: Props) {
  return (
    <span className={`flex items-center`}>
      <i className={`${styles.arrow} ${style ? style : "border-gray-400"}`} />
    </span>
  )
}
