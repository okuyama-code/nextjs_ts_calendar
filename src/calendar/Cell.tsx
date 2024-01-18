import clsx from "clsx";

interface Props {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  date?: number;
  week?: string
}

const Cell: React.FC<Props> = ({
  onClick,
  className,
  isActive = false,
  date,
  week,
}) => {
  return (
    <div
      onClick={!isActive ? onClick : undefined}
      className={clsx(
        "h-20 border-b border-r select-none transition-colors",
        {
          "cursor-pointer hover:bg-gray-100 active:bg-gray-200":
            !isActive && onClick,
          "font-bold text-white bg-blue-200": isActive,
        },
        className
      )}
    >
      <div>
        {week}
        {date}
      </div>
      {/* <div>{title}</div> */}
    </div>
  );
};

export default Cell;
