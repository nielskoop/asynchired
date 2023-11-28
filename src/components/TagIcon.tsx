import Image from "next/image";

export function TagIcon(props: {
  text: string;
  type: string;
  className: string;
}) {
  return (
    <div className={`flex items-center ${props.className}`}>
      <Image
        src={`/JobTags/${props.type}.svg`}
        height={20}
        width={20}
        alt={`${props.text} ${props.type} tag`}
      />
      <span>{props.text}</span>
    </div>
  );
}
