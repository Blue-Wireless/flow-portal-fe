type StatField = {
  label: string;
  value: string | number;
  unit?: string;
};

export type Props = {
  title: string;
  image?: string;
  fields: [StatField, StatField, StatField];
};

const StatisticCard = ({ title, image, fields }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-[#164555] p-4 shadow-sm">
      {image && (
        <img
          src={image}
          alt=""
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 opacity-10 h-36 w-36"
        />
      )}
      <div className="relative z-10">
        <div className="text-lg font-medium text-[#E3E8ED]">{title}</div>
        <div className="mt-4 grid grid-cols-3 grid-rows-2 gap-y-2 gap-x-2 text-center">
          {fields.map((field) => (
            <div
              key={`${field.label}-label`}
              className="text-xs text-[#E3E8ED] uppercase"
            >
              {field.label}
            </div>
          ))}
          {fields.map((field) => (
            <div
              key={`${field.label}-value`}
              className="mt-2 flex items-baseline justify-center"
            >
              <span className="text-2xl font-medium text-[#E3E8ED]">
                {field.value}
              </span>
              {field.unit && (
                <span className="font-medium text-sm text-[#E3E8ED] ml-1">
                  {field.unit}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
