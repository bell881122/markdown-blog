import styles from "./index.module.scss";

type Props = {
  wrapperClass?: string;
  innerClass?: string;
}

export default function ArrowIcon({ wrapperClass, innerClass }: Props) {
  return (
    <span className={`flex items-center ${wrapperClass ? wrapperClass : ""}`}>
      <i className={`${styles.arrow} ${innerClass ? innerClass : "border-gray-400"}`} />
    </span>
  )
}
